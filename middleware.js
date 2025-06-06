// middleware.ts

import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

export function middleware(req) {
  const token = req.cookies.get('token')?.value

  const { pathname } = req.nextUrl

  if (!token) {
    if (pathname.startsWith('/member-dashboard')) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
    if (pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/admin-login', req.url))
    }
    return NextResponse.next()
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    const isAdmin = decoded?.role === 'admin'

    // If already logged in, redirect away from login pages
    if (pathname === '/member-login' && decoded.role === 'user') {
      return NextResponse.redirect(new URL('/member-dashboard', req.url))
    }

    if (pathname === '/admin-login' && isAdmin) {
      return NextResponse.redirect(new URL('/admin', req.url))
    }

    // Block access if not admin
    if (pathname.startsWith('/admin') && !isAdmin) {
      return NextResponse.redirect(new URL('/member-dashboard', req.url))
    }

    return NextResponse.next()
  } catch (err) {
    // Invalid token
    if (pathname.startsWith('/member-dashboard')) {
      return NextResponse.redirect(new URL('/member-login', req.url))
    }
    if (pathname.startsWith('/admin')) {
      return NextResponse.redirect(new URL('/admin-login', req.url))
    }
    return NextResponse.next()
  }
}

