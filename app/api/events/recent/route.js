
import dbConnect from "@/lib/mongoose";
import Event from "@/models/Event";

export async function GET(req) {
  await dbConnect();
  
  try {
    // Get query parameters
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit')) || 5;
    
    const recentEvents = await Event.find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .select('title description status createdAt')
      .lean();
    
    return new Response(JSON.stringify({
      success: true,
      data: recentEvents,
      count: recentEvents.length
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    });
    
  } catch (error) {
    console.error('Error fetching recent events:', error);
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