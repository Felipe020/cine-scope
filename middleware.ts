import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';


export const config = {
  matcher: ['/admin/:path*'],
};

export async function middleware(request: NextRequest) {
  
  const token = request.cookies.get('auth_token')?.value;

  
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    
    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || 'your-secret-key'
    );
    
    
    const { payload } = await jwtVerify(token, secret);

    
    if (payload.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', request.url));
    }

    
    return NextResponse.next();

  } catch (error) {
    
    return NextResponse.redirect(new URL('/login', request.url));
  }
}