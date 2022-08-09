// NextResponse is an extension of the native response interface
import { NextResponse } from 'next/server';
import { verifyToken } from './lib/utils';


// Function to check token verification at login level
// If verification fails api routes will not execute and user will be redirected to login
export async function middleware(req, ev) {
  const token = req ? req.cookies.get("token") : null;
  const userId = await verifyToken(token);
 
  const url = req.nextUrl.clone();
  const { pathname } = req.nextUrl;

  // Skip static folder path so images load onto page
  if (token && userId || pathname.includes(`/api/login`) || pathname.includes('/static')) {
    return NextResponse.next();
  }
    
  // If no token return to login
  if (!token && pathname !== '/login') {
      url.pathname = '/login';
      return NextResponse.redirect(url);
  }
};