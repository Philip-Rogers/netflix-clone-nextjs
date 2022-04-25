/* eslint-disable */ 
// Nextresponce is an extension of the native response interface
import { NextResponse } from 'next/server';
import { verifyToken } from '../lib/utils';


// Function to check token verification at login level
// If verification fails api routes will not execute and user will be redirected to login
export async function middleware(req) {
  const token = req ? req.cookies?.token : null;
  const userId = await verifyToken(token);
 
  const nextUrl = req.nextUrl.clone();

  if(nextUrl.pathname.includes('/api/login') || userId || nextUrl.pathname.includes('/static')) {
    return NextResponse.next();
  };
    
  // If no token return to login
  if (!token && nextUrl.pathname !== '/login') {
      nextUrl.pathname = '/login';
      return NextResponse.redirect(nextUrl);
  };
};


// const { pathname } = req.nextUrl;

  // if(pathname.includes('/api/login') || userId || pathname.includes('/static')) {
  //   return NextResponse.next();
  // }

  // if (!token && pathname !== '/login') {
  //   return NextResponse.redirect('/login');
  // }