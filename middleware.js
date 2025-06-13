// middleware.ts
import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

export async function middleware(req) {
  const token = req.cookies.get('token')?.value
  const { pathname } = req.nextUrl

  console.log('Middleware running for:', pathname, 'Token exists:', !!token)

  if (!token) {
    if (pathname.startsWith('/member-dashboard')) {
      console.log('No token, redirecting to login')
      return NextResponse.redirect(new URL('/login', req.url))
    }
    if (pathname.startsWith('/super-admin')) {
      return NextResponse.redirect(new URL('/admin-login', req.url))
    }
    return NextResponse.next()
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const { payload } = await jwtVerify(token, secret)
    
    const isAdmin = payload?.role === 'admin'
    const isUser = payload?.role === 'user' || !payload?.role //default role is user

    // console.log('Token decoded:', { userId: payload.userId, role: payload.role })

    // If already logged in, redirect away from login pages
    if (pathname === '/login' && isUser) {
      console.log('User already logged in, redirecting to dashboard')
      return NextResponse.redirect(new URL('/member-dashboard', req.url))
    }

    if (pathname === '/admin-login' && isAdmin) {
      return NextResponse.redirect(new URL('/super-admin', req.url))
    }

    // Block access if not admin
    if (pathname.startsWith('/admin') && !isAdmin) {
      return NextResponse.redirect(new URL('/member-dashboard', req.url))
    }

    return NextResponse.next()
  } catch (err) {
    console.error('JWT verification failed:', err.message)
    // Invalid token - clear the invalid cookie
    const response = NextResponse.redirect(new URL('/login', req.url))
    response.cookies.delete('token')
    
    return response
  }
}

// Specify which routes the middleware should run on
export const config = {
  matcher: [
    '/member-dashboard/:path*',
    '/admin/:path*',
    '/login',
    '/admin-login'
  ]
}