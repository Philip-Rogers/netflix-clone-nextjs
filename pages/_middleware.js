// NextResponse is an extension of the native response interface
import { NextResponse } from 'next/server';
import { verifyToken } from '../lib/utils';


// Function to check token verification at login level
// If verification fails api routes will not execute and user will be redirected to login
export async function middleware(req) {
  const token = req ? req.cookies?.token : null;
  const userId = await verifyToken(token);
 
  const url = req.nextUrl.clone();

  // Skip static folder path so images load onto page
  if(url.pathname.includes('/api/login') || userId || url.pathname.includes('/static')) {
    return NextResponse.next();
  }
    
  // If no token return to login
  if (!token && url.pathname !== '/login') {
      url.pathname = '/login';
      return NextResponse.redirect(url);
  }
};