// src/app/api/auth/logout/route.js
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const response = NextResponse.json({
      message: 'Logged out successfully',
      success: true,
    });

    response.cookies.set('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      expires: new Date(0),
      maxAge: 0,
      sameSite: 'strict',
    });

    return response;
  } catch (error) {
    console.error('Logout API error:', error);

    const response = NextResponse.json({
      message: 'Logout encountered an error, but proceeding anyway.',
      success: true,
    });

    response.cookies.set('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      expires: new Date(0),
      maxAge: 0,
      sameSite: 'strict',
    });

    return response;
  }
}
