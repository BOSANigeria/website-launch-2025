import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import User from '@/models/user.model'; // Example for MongoDB
import { connectDB } from '@/lib/mongodb'; // Example for other databases

const JWT_SECRET = process.env.JWT_SECRET 
const ADMIN_SECRET_KEY = process.env.ADMIN_SECRET_KEY 

export async function POST(request) {
  try {
    // connect to database 
    await connectDB()

    const { name, fullName, email, password, adminSecretKey } = await request.json();

    // Validate required fields
    if (!name || !fullName || !email || !password || !adminSecretKey) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Verify admin secret key
    if (adminSecretKey !== ADMIN_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Invalid admin secret key' },
        { status: 403 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Validate password strength
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: "admin" })
    
    if (existingAdmin) {
      return NextResponse.json(
        { error: 'Admin user already exists' },
        { status: 409 }
      );
    }


    // Check if admin with this email already exists
    const existingUser = await User.findOne({ email })
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'Admin with email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create admin user
    const adminData = User({
      name,
      fullName,
      email,
      password: hashedPassword,
      role: 'admin',
      isActive: true,
      createdAt: new Date(),
    });

    // Save to database
    const newAdmin = await adminData.save()
    
    // Generate JWT token
    const token = jwt.sign(
      { 
        id: newAdmin._id 
      },
      JWT_SECRET,
      { expiresIn: '1d' }
    );

    // Create response
    const response = NextResponse.json(
      {
        message: 'Admin registered successfully',
        // admin: {
        //   id: newAdmin.id,
        //   name: newAdmin.name,
        //   email: newAdmin.email,
        //   role: newAdmin.role,
        // },
      },
      { status: 201 }
    );

    // Set HTTP-only cookie
    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Admin registration error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}