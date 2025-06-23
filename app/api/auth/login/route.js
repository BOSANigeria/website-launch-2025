import { NextResponse } from 'next/server';
import User from '@/models/user.model'; // Adjust path if needed
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
<<<<<<< HEAD
import connectDB from '@/lib/mongodb';
=======
import { connectDB } from '@/lib/mongodb'; // assuming you have this
>>>>>>> acda6954a52be60ae0cf22cb4eb211a3568336ab

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    if (!user.password) {
      return NextResponse.json({ error: 'User has no password set. Contact admin.' }, { status: 403 });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Sign token using jose
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({
      userId: user._id.toString(),
      email: user.email,
      role: user.role,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('7d')
      .sign(secret);

<<<<<<< HEAD
    // Send as HTTP-only cookie
    const response = NextResponse.json({ message: 'Login successful' });
    response.cookies.set('token', token, {
=======
    const res = NextResponse.json({ 
      message: 'Login successful',
      id: user._id,
      email: user.email,
      role: user.role 
    });
    res.cookies.set('token', token, {
>>>>>>> acda6954a52be60ae0cf22cb4eb211a3568336ab
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
