'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, Plus, Pencil, Trash2, User as UserIcon, ShieldCheck } from 'lucide-react';

interface Movie {
  id: string;
  title: string;
  year: number;
  director?: string;
  posterUrl?: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

// RF-11: Acesso de Administrador
export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('movies');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [movies, setMovies] = useState<Movie[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [resMovies, resUsers] = await Promise.all([
          fetch('/api/auth/movies'),
          fetch('/api/auth/users')
        ]);
        
        const dataMovies = await resMovies.json();
        const dataUsers = await resUsers.json();

        if (Array.isArray(dataMovies)) setMovies(dataMovies);
        if (Array.isArray(dataUsers)) setUsers(dataUsers);
      } catch (error) {
        console.error("Erro ao carregar dados", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDeleteMovie = async (id: string) => {
    if (confirm('Excluir este filme?')) {
      await fetch(`/api/auth/movies/${id}`, { method: 'DELETE' });
      setMovies(movies.filter((m) => m.id !== id));
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (confirm('Tem certeza que deseja banir este usuário?')) {
      await fetch(`/api/auth/users/${id}`, { method: 'DELETE' });
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  const handlePromoteUser = async (id: string) => {
    if (confirm('Promover este usuário a CRÍTICO?')) {
      const res = await fetch(`/api/auth/users/${id}`, { 
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: 'CRITIC' })
      });
      
      if (res.ok) {
        setUsers(users.map(u => u.id === id ? { ...u, role: 'CRITIC' } : u));
      }
    }
  };

  const filteredMovies = movies.filter((m) => m.title.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredUsers = users.filter((u) => u.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-[#0a0a0a] p-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-zinc-400">Painel de Controle</p>
          </div>
          {activeTab === 'movies' && (
            <Link href="/admin/movies/new" className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 font-medium transition-colors">
              <Plus size={18} /> Add Movie
            </Link>
          )}
        </div>

        <div className="mb-8 space-y-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={20} />
            <input
              type="text"
              placeholder={`Search in ${activeTab}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#121212] border border-zinc-800 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-zinc-600"
            />
          </div>

          <div className="flex gap-8 border-b border-zinc-800">
            <button onClick={() => setActiveTab('movies')} className={`pb-3 font-medium transition-colors ${activeTab === 'movies' ? 'text-red-500 border-b-2 border-red-500' : 'text-zinc-400 hover:text-white'}`}>
              Movies ({movies.length})
            </button>
            <button onClick={() => setActiveTab('users')} className={`pb-3 font-medium transition-colors ${activeTab === 'users' ? 'text-red-500 border-b-2 border-red-500' : 'text-zinc-400 hover:text-white'}`}>
              Users ({users.length})
            </button>
          </div>
        </div>

        {activeTab === 'movies' && (
          <div className="bg-[#121212] rounded-xl border border-zinc-800 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#0f0f0f] border-b border-zinc-800">
                <tr>
                  <th className="p-4 text-zinc-400 font-medium">Filme</th>
                  <th className="p-4 text-zinc-400 font-medium">Ano</th>
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
                          {movie.posterUrl ? <Image src={movie.posterUrl} alt={movie.title} fill className="object-cover" /> : <div className="bg-zinc-800 w-full h-full" />}
                        </div>
                        <span className="font-medium text-white">{movie.title}</span>
                      </div>
                    </td>
                    <td className="p-4 text-zinc-300">{movie.year}</td>
                    <td className="p-4 text-zinc-300">{movie.director || '-'}</td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/movies/${movie.id}/edit`} className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-700 rounded-lg"><Pencil size={18} /></Link>
                        <button onClick={() => handleDeleteMovie(movie.id)} className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-900/20 rounded-lg"><Trash2 size={18} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-[#121212] rounded-xl border border-zinc-800 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#0f0f0f] border-b border-zinc-800">
                <tr>
                  <th className="p-4 text-zinc-400 font-medium">User</th>
                  <th className="p-4 text-zinc-400 font-medium">Email</th>
                  <th className="p-4 text-zinc-400 font-medium">Role</th>
                  <th className="p-4 text-zinc-400 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400">
                          <UserIcon size={20} />
                        </div>
                        <span className="font-medium text-white">{user.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-zinc-300">{user.email}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        user.role === 'ADMIN' ? 'bg-red-900/30 text-red-400 border border-red-900' : 
                        (user.role === 'CRITIC' ? 'bg-blue-900/30 text-blue-400 border border-blue-900' : 'bg-zinc-800 text-zinc-400')
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {user.role !== 'ADMIN' && user.role !== 'CRITIC' && (
                          <button onClick={() => handlePromoteUser(user.id)} title="Promover" className="px-3 py-1 bg-yellow-600/20 text-yellow-500 border border-yellow-600/50 rounded hover:bg-yellow-600/40 text-xs font-medium transition-colors">
                             Promote
                          </button>
                        )}
                        <button onClick={() => handleDeleteUser(user.id)} className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-900/20 rounded-lg">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}