import { MovieService } from "@/lib/services/MovieService";
import Link from "next/link";
import Image from "next/image";
import SearchBar from "@/components/SearchBar";
import { ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 5;

export default async function Home(props: {
  searchParams: Promise<{ q?: string; page?: string }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.q || "";
  const currentPage = Number(searchParams?.page) || 1;
  

  const allMovies = await MovieService.getAll(query);

  
  const totalItems = allMovies.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);


  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentMovies = allMovies.slice(startIndex, endIndex);

  return (
    <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <SearchBar />

      <h1 className="text-3xl font-bold mb-8 text-white">
        {query ? `Results for "${query}"` : "Most Popular"}
      </h1>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {currentMovies.map((movie) => (
          <Link 
            key={movie.id} 
            href={`/movie/${movie.id}`}
            className="group relative flex flex-col bg-[var(--color-surface)] rounded-xl shadow-lg hover:shadow-red-900/20 transition-all duration-300 overflow-hidden border border-zinc-800 hover:border-zinc-700"
          >
            <div className="relative aspect-[2/3] w-full bg-zinc-900">
              {movie.posterUrl ? (
                <Image
                  src={movie.posterUrl}
                  alt={movie.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-zinc-600">
                  Sem Imagem
                </div>
              )}
              <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-md flex items-center gap-1">
                <span className="text-yellow-500 text-xs">★</span>
                <span className="text-white text-xs font-bold">8.6</span>
              </div>
            </div>
            <div className="p-4 bg-zinc-900">
              <h3 className="font-bold text-base line-clamp-1 text-white mb-1" title={movie.title}>{movie.title}</h3>
              <p className="text-xs text-zinc-400">{movie.year}</p>
              <div className="flex items-center gap-2 mt-3 text-zinc-500 text-xs">
                 <span>♥ 3241</span>
                 <span>💬 712</span>
              </div>
            </div>
          </Link>
        ))}
        
        {currentMovies.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-zinc-500">
              <p className="text-lg">Nenhum filme encontrado para "{query}".</p>
              <Link 
                href="/" 
                className="mt-4 text-red-500 hover:text-red-400 font-medium hover:underline transition-colors"
              >
                Limpar filtros
              </Link>
            </div>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-12 border-t border-zinc-800 pt-8">
          <Link
            href={`/?page=${currentPage - 1}${query ? `&q=${query}` : ''}`}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              currentPage <= 1 
                ? 'bg-zinc-900 text-zinc-600 pointer-events-none' 
                : 'bg-zinc-800 text-white hover:bg-red-600'
            }`}
            aria-disabled={currentPage <= 1}
          >
            <ChevronLeft size={20} /> Previous
          </Link>

          <span className="text-zinc-400 text-sm font-medium">
            Page <span className="text-white">{currentPage}</span> of <span className="text-white">{totalPages}</span>
          </span>

          <Link
            href={`/?page=${currentPage + 1}${query ? `&q=${query}` : ''}`}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              currentPage >= totalPages 
                ? 'bg-zinc-900 text-zinc-600 pointer-events-none' 
                : 'bg-zinc-800 text-white hover:bg-red-600'
            }`}
            aria-disabled={currentPage >= totalPages}
          >
            Next <ChevronRight size={20} />
          </Link>
        </div>
      )}

    </div>
  );
}