import dbConnect from "@/lib/mongoose";
import Event from "@/models/Event";

export async function GET() {
  await dbConnect();

  try {
    const totalEvents = await Event.countDocuments({});

    const events = await Event.find({});

    return new Response(JSON.stringify({ success: true, data: events, total: totalEvents }), { 
      status: 200 
    });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
  }
}

export async function POST(req) {
  await dbConnect();

  try {
    const body = await req.json();
    const { title, date, time, location, status, description, image } = body;

    if (!title || !date || !time || !location || !status || !description) {
      return new Response(JSON.stringify({ success: false, message: "Missing required fields" }), { status: 400 });
    }

    const event = new Event({ 
      title, 
      date, 
      time, 
      location, 
      status, 
      description: description.trim(), 
      image: image || null, 
    });

    await event.save();

    return new Response(JSON.stringify({ success: true, data: event }), { status: 201 });
  } catch (error) {
    return new Response(JSON.stringify({ success: false, message: error.message }), { status: 500 });
  }
}
