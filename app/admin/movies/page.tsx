'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Plus, Pencil, Trash2 } from 'lucide-react';

// RF-6: Gerenciar Filmes
export default function AdminMoviesPage() {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Busca os filmes via API 
  useEffect(() => {
    fetch('/api/movies')
      .then(res => res.json())
      .then(data => {
        if(Array.isArray(data)) setMovies(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Tem certeza que deseja excluir este filme?')) {
      const res = await fetch(`/api/movies/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMovies(movies.filter(m => m.id !== id));
      } else {
        alert('Erro ao excluir');
      }
    }
  };

  const filteredMovies = movies.filter(movie => 
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Gerenciar Filmes</h1>
            <p className="text-zinc-400">Admin Dashboard</p>
          </div>
          <Link 
            href="/admin/movies/new" 
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors"
          >
            <Plus size={18} /> Novo Filme
          </Link>
        </div>

        
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
            <input
              type="text"
              placeholder="Buscar filmes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#121212] border border-zinc-800 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-zinc-600"
            />
          </div>
        </div>

        
        <div className="bg-[#121212] rounded-xl border border-zinc-800 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#0f0f0f] border-b border-zinc-800">
              <tr>
                <th className="p-4 text-zinc-400 font-medium">Título</th>
                <th className="p-4 text-zinc-400 font-medium">Ano</th>
                <th className="p-4 text-zinc-400 font-medium">Gênero</th>
                <th className="p-4 text-zinc-400 font-medium">Diretor</th>
                <th className="p-4 text-zinc-400 font-medium text-right">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredMovies.map((movie) => (
                <tr key={movie.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-14 relative bg-zinc-800 rounded overflow-hidden flex-shrink-0">
                        {movie.posterUrl ? (
                          <Image src={movie.posterUrl} alt={movie.title} fill className="object-cover" />
                        ) : (
                          <div className="w-full h-full bg-zinc-700" />
                        )}
                      </div>
                      <span className="font-medium text-white">{movie.title}</span>
                    </div>
                  </td>
                  <td className="p-4 text-zinc-300">{movie.year}</td>
                  <td className="p-4 text-zinc-300">{movie.genre ? movie.genre.split(',')[0] : '-'}</td>
                  <td className="p-4 text-zinc-300">{movie.director || '-'}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        href={`/admin/movies/${movie.id}/edit`} 
                        className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-lg transition-colors"
                      >
                        <Pencil size={18} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(movie.id)}
                        className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-900/20 rounded-lg transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {loading && (
             <div className="p-8 text-center text-zinc-500">Carregando filmes...</div>
          )}
          
          {!loading && filteredMovies.length === 0 && (
            <div className="p-8 text-center text-zinc-500">Nenhum filme encontrado.</div>
          )}
        </div>
      </div>
    </div>
  );
}