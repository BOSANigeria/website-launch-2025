
import dbConnect from "@/lib/mongoose";
import Transaction from "@/models/Transaction";

export async function GET(req) {
  await dbConnect();
  
  try {
    // Get query parameters
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit')) || 5;
    
    const recentTransactions = await Transaction.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('Name amount status createdAt')
      .lean();
    
    return new Response(JSON.stringify({
      success: true,
      data: recentTransactions,
      count: recentTransactions.length
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
  } catch (error) {
    console.error('Error fetching recent transactions:', error);
    return new Response(JSON.stringify({
      success: false,
      message: error.message
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      }
    });
  }
}