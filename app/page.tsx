
import { MovieService } from "@/lib/services/MovieService";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const movies = await MovieService.getAll();

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Filmes em Destaque</h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {movies.map((movie) => (
          <Link 
            key={movie.id} 
            href={`/movie/${movie.id}`}
            className="group relative flex flex-col bg-[var(--color-surface)] rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden"
          >
            <div className="relative aspect-[2/3] w-full bg-gray-800">
              {movie.posterUrl ? (
                <Image
                  src={movie.posterUrl}
                  alt={movie.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  Sem Imagem
                </div>
              )}
            </div>
            <div className="p-3">
              <h3 className="font-semibold text-sm line-clamp-1 text-white" title={movie.title}>{movie.title}</h3>
              <p className="text-xs text-[var(--color-text-secondary)] mt-1">{movie.year} • {movie.genre.split(',')[0]} ...</p>
            </div>
          </Link>
        ))}
        {movies.length === 0 && (
            <p className="text-[var(--color-text-secondary)] col-span-full text-center py-10">Nenhum filme encontrado.</p>
        )}
      </div>
    </div>
  );
}

