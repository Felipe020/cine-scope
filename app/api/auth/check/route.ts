import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (!token) {
      return NextResponse.json(
        { isAuthenticated: false, role: null },
        { status: 200 }
      );
    }

    const secret = new TextEncoder().encode(
      process.env.JWT_SECRET || 'your-secret-key'
    );

    const { payload } = await jwtVerify(token, secret);

    return NextResponse.json(
      { 
        isAuthenticated: true, 
        role: payload.role,
        userId: payload.userId
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { isAuthenticated: false, role: null },
      { status: 200 }
    );
  }
}
