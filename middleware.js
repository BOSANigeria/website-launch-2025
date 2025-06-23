import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(req) {
  const token = req.cookies.get('token')?.value
  const { pathname } = req.nextUrl

  console.log('Middleware running for:', pathname, 'Token exists:', !!token)

  // If no token exists, redirect protected routes to login
  if (!token) {
    if (pathname.startsWith('/member-dashboard')) {
      console.log('No token, redirecting to login')
      return NextResponse.redirect(new URL('/login', req.url))
    }
    if (pathname.startsWith('/super-admin')) {
      console.log('No token, redirecting to login')
      return NextResponse.redirect(new URL('/login', req.url))
    }
    // Allow access to login page and other public routes
    return NextResponse.next()
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const { payload } = await jwtVerify(token, secret)
    
    const isAdmin = payload?.role === 'admin'
    const isUser = payload?.role === 'user' || !payload?.role // default role is user

    console.log('Token decoded:', { userId: payload.userId, role: payload.role })

    // If already logged in, redirect away from login page
    if (pathname === '/login') {
      if (isAdmin) {
        console.log('Admin already logged in, redirecting to superadmin')
        return NextResponse.redirect(new URL('/super-admin', req.url))
      } else if (isUser) {
        console.log('User already logged in, redirecting to dashboard')
        return NextResponse.redirect(new URL('/member-dashboard', req.url))
      }
    }

    // Block non-admin access to superadmin routes
    if (pathname.startsWith('/super-admin') && !isAdmin) {
      console.log('Non-admin trying to access superadmin, redirecting to dashboard')
      return NextResponse.redirect(new URL('/member-dashboard', req.url))
    }

    return NextResponse.next()
  } catch (err) {
    console.error('JWT verification failed:', err.message)
    
    // Invalid or expired token - clear it and redirect to login
    const response = NextResponse.redirect(new URL('/login', req.url))
    
    // Forcefully delete the invalid token
    response.cookies.delete('token')
    response.cookies.set('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      expires: new Date(0),
      maxAge: 0,
      sameSite: 'strict',
    })
    
    return response
  }
}

// Specify which routes the middleware should run on
export const config = {
  matcher: [
    '/member-dashboard/:path*',
    '/super-admin/:path*',
    '/login',
  ]
}