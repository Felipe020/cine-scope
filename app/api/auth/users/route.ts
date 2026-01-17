import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      select: { 
        id: true, 
        name: true, 
        email: true, 
        role: true, 
        createdAt: true 
      }
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching users' }, { status: 500 });
  }
}