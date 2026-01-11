
import { MovieService } from '@/lib/services/MovieService';
import { deleteMovie } from '../actions';
import Link from 'next/link';

// RF-6: Gerenciar Filmes
export default async function AdminMoviesPage() {
  const movies = await MovieService.getAll();

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Gerenciar Filmes</h1>
        <Link href="/admin/movies/new" className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700">
          + Novo Filme
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border text-left bg-white text-black">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Título</th>
              <th className="border p-2">Ano</th>
              <th className="border p-2">Gênero</th>
              <th className="border p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie) => (
              <tr key={movie.id}>
                <td className="border p-2">{movie.title}</td>
                <td className="border p-2">{movie.year}</td>
                <td className="border p-2">{movie.genre}</td>
                <td className="border p-2 flex gap-2">
                  <button className="text-blue-600 underline disabled:opacity-50">Editar</button>
                  <form action={deleteMovie.bind(null, movie.id)}>
                    <button className="text-red-600 underline">Excluir</button>
                  </form>
                </td>
              </tr>
            ))}
             {movies.length === 0 && (
                <tr>
                    <td colSpan={4} className="p-4 text-center">Nenhum filme cadastrado.</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
