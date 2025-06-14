import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import dbConnect from '../../../../lib/mongodb';
import User from '../../../../models/user.model'; // Your Mongoose or Prisma User model

export async function GET(req) {
  try {
    const token = req.cookies.get('token')?.value;

    if (!token) {
      return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    await dbConnect(); // connect to MongoDB or Prisma DB

    const user = await User.findById(payload.userId).lean();

    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // remove sensitive fields before sending
    delete user.password;

    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    console.error('Auth check error:', err);
    return NextResponse.json({ message: 'Invalid or expired token' }, { status: 401 });
  }
}
