import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET() {
  try {
    const movies = await prisma.movie.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(movies);
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching movies' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.title || !body.year) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const newMovie = await prisma.movie.create({
      data: {
        title: body.title,
        year: parseInt(body.year),
        director: body.director || 'Desconhecido',
        genre: body.genre,
        cast: body.cast,
        posterUrl: body.posterUrl,
        synopsis: body.synopsis,
      },
    });

    return NextResponse.json(newMovie, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error creating movie' }, { status: 500 });
  }
}