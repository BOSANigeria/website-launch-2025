import dbConnect from "@/lib/mongoose";
import Transaction from "@/models/Transaction";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export async function GET(req) {
  
  try {
    await dbConnect();
  } catch (dbError) {
    return new Response(
      JSON.stringify({ success: false, message: "Database connection failed" }),
      { status: 500 }
    );
  }

  try {
    // Get the token from cookies
    const cookieStore = cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return new Response(
        JSON.stringify({ success: false, message: "Authentication required" }),
        { status: 401 }
      );
    }

    // Verify the token and get user ID
    let userId;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      userId = decoded.userId || decoded.id;
      
      if (!userId) {
        return new Response(
          JSON.stringify({ success: false, message: "Invalid token structure" }),
          { status: 401 }
        );
      }
    } catch (jwtError) {
      return new Response(
        JSON.stringify({ success: false, message: "Invalid token" }),
        { status: 401 }
      );
    }

    // Get query parameters for pagination and filtering
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 50;
    const skip = (page - 1) * limit;

    // Build query
    const query = { userId: userId };

    // Check if Transaction model exists and has data
    try {
      const allTransactions = await Transaction.find({}).limit(5);
      // console.log("📊 Sample transactions in DB:", allTransactions.length);
      // console.log("📋 Sample transaction structure:", allTransactions[0] || "No transactions found");
    } catch (modelError) {
      // console.error("❌ Transaction model error:", modelError);
      return new Response(
        JSON.stringify({ success: false, message: "Transaction model error" }),
        { status: 500 }
      );
    }

    // Get transactions for the user
    const transactions = await Transaction.find(query)
      .sort({ createdAt: -1 }) // Sort by newest first
      .skip(skip)
      .limit(limit)
      .lean(); // Use lean() for better performance

    // console.log("📄 User transactions found:", transactions.length);

    // // Get total transaction count
    // const allTransactions = await Transaction.countDocuments({});

    // Get total count for pagination
    const totalTransactions = await Transaction.countDocuments(query);
    // console.log("📊 Total user transactions:", totalTransactions);

    return new Response(
      JSON.stringify({
        success: true,
        transactions,
        total: totalTransactions,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalTransactions / limit),
          totalTransactions,
          hasNextPage: page < Math.ceil(totalTransactions / limit),
          hasPrevPage: page > 1,
        },
        debug: {
          userId,
          query,
          foundTransactions: transactions.length,
          totalTransactions
        }
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Error fetching user transactions:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Internal server error",
        error: error.message
      }),
      { status: 500 }
    );
  }
}