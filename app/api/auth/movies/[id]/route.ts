import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const movie = await prisma.movie.findUnique({
    where: { id },
  });

  if (!movie) {
    return NextResponse.json({ message: 'Movie not found' }, { status: 404 });
  }

  return NextResponse.json(movie);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();

  try {
    const updatedMovie = await prisma.movie.update({
      where: { id },
      data: {
        title: body.title,
        year: parseInt(body.year),
        director: body.director,
        genre: body.genre,
        cast: body.cast,
        posterUrl: body.posterUrl,
        synopsis: body.synopsis,
      },
    });

    return NextResponse.json(updatedMovie);
  } catch (error) {
    return NextResponse.json({ message: 'Error updating movie' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    await prisma.movie.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Movie deleted' });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting movie' }, { status: 500 });
  }
}