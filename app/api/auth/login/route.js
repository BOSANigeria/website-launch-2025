import { NextResponse } from 'next/server';
import User from '../../../../models/user.model'; // adjust path as needed
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { connectDB } from '@/lib/mongodb'; // assuming you have this

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { email, password } = body;

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

    // Create JWT using jose
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({ 
      userId: user._id.toString(), 
      role: user.role 
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('7d')
      .setIssuedAt()
      .sign(secret);

    const res = NextResponse.json({ 
      message: 'Login successful',
      id: user._id,
      email: user.email,
      role: user.role 
    });
    res.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
      sameSite: 'strict'
    });

    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}