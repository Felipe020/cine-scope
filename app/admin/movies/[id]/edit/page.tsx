import MovieForm from '@/components/MovieForm';
import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';

export default async function EditMoviePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const movie = await prisma.movie.findUnique({
    where: { id }
  });

  if (!movie) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Editar Filme</h1>
        <MovieForm initialData={movie} isEditing={true} />
      </div>
    </div>
  );
}