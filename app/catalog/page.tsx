
import Link from 'next/link';

// Mock data to simulate MovieService.getAll()
const movies = [
  { id: '1', title: 'Example Movie 1', genre: 'Action', year: 2024, posterUrl: 'https://placehold.co/200x300' },
  { id: '2', title: 'Example Movie 2', genre: 'Drama', year: 2023, posterUrl: 'https://placehold.co/200x300' },
];

export default function CatalogPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-6 text-3xl font-bold">Catálogo de Filmes</h1>
      
      {/* Search Bar (RF-5) */}
      <div className="mb-6">
        <input 
          type="text" 
          placeholder="Buscar filmes..." 
          className="w-full rounded border p-3"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-5">
        {movies.map((movie) => (
          <Link key={movie.id} href={`/movie/${movie.id}`} className="block rounded border p-2 hover:shadow-lg">
            <img src={movie.posterUrl} alt={movie.title} className="h-64 w-full object-cover mb-2" />
            <h2 className="text-lg font-semibold">{movie.title}</h2>
            <p className="text-sm text-gray-500">{movie.year} • {movie.genre}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
