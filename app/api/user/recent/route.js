
import dbConnect from "@/lib/mongoose";
import User from "@/models/user.model";

export async function GET(req) {
  await dbConnect();
  
  try {
    // Get query parameters
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit')) || 5;
    
    const recentUsers = await User.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('fullName status createdAt')
      .lean();
    
    return new Response(JSON.stringify({
      success: true,
      data: recentUsers,
      count: recentUsers.length
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
  } catch (error) {
    console.error('Error fetching recent user:', error);
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