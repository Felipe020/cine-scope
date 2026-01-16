'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, Upload } from 'lucide-react';

interface MovieFormProps {
  initialData?: any;
  isEditing?: boolean;
}

const GENRES_LIST = [
  "Action", "Comedy", "Drama", "Horror", "Sci-Fi", 
  "Romance", "Thriller", "Fantasy", "Adventure", "Mystery"
];

export default function MovieForm({ initialData, isEditing = false }: MovieFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    posterUrl: '',
    year: '',
    director: '',
    synopsis: ''
  });

  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [castMember, setCastMember] = useState('');
  const [castList, setCastList] = useState<string[]>([]);

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        posterUrl: initialData.posterUrl || '',
        year: initialData.year?.toString() || '',
        director: initialData.director || '',
        synopsis: initialData.synopsis || ''
      });
      
      if (initialData.genre) {
        setSelectedGenres(initialData.genre.split(',').map((g: string) => g.trim()));
      }
      
      if (initialData.cast) {
        setCastList(initialData.cast.split(',').map((c: string) => c.trim()));
      }
    }
  }, [initialData]);

  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter(g => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  const addCastMember = (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (castMember.trim()) {
      setCastList([...castList, castMember.trim()]);
      setCastMember('');
    }
  };

  const removeCastMember = (member: string) => {
    setCastList(castList.filter(c => c !== member));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      year: parseInt(formData.year),
      genre: selectedGenres.join(', '),
      cast: castList.join(', ')
    };

    try {
      const url = isEditing 
        ? `/api/auth/movies/${initialData.id}` 
        : '/api/auth/movies';
        
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        alert('Erro ao salvar filme.');
      }
    } catch (error) {
      console.error(error);
      alert('Erro de conexão.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-5xl mx-auto space-y-6">
      
      <div className="space-y-2">
        <label className="text-sm text-zinc-400">Title *</label>
        <input 
          type="text" 
          required
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          className="w-full bg-[#121212] border border-zinc-800 rounded-lg p-3 text-white focus:border-zinc-600 focus:outline-none placeholder-zinc-600"
          placeholder="Ex: Quantum Shadows"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm text-zinc-400">Poster URL *</label>
        <div className="flex gap-4">
          <input 
            type="text" 
            value={formData.posterUrl}
            onChange={(e) => setFormData({...formData, posterUrl: e.target.value})}
            className="flex-1 bg-[#121212] border border-zinc-800 rounded-lg p-3 text-white focus:border-zinc-600 focus:outline-none placeholder-zinc-600"
            placeholder="https://example.com/poster.jpg"
          />
          <button type="button" className="px-6 py-2 bg-transparent text-red-500 border border-red-600 rounded-lg flex items-center gap-2 hover:bg-red-900/10 transition-colors">
            <Upload size={18} /> Upload
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm text-zinc-400">Year *</label>
          <input 
            type="number" 
            required
            value={formData.year}
            onChange={(e) => setFormData({...formData, year: e.target.value})}
            className="w-full bg-[#121212] border border-zinc-800 rounded-lg p-3 text-white focus:border-zinc-600 focus:outline-none placeholder-zinc-600"
            placeholder="2024"
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm text-zinc-400">Director *</label>
          <input 
            type="text" 
            value={formData.director}
            onChange={(e) => setFormData({...formData, director: e.target.value})}
            className="w-full bg-[#121212] border border-zinc-800 rounded-lg p-3 text-white focus:border-zinc-600 focus:outline-none placeholder-zinc-600"
            placeholder="Director Name"
          />
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-sm text-zinc-400">Genres * (select at least one)</label>
        <div className="flex flex-wrap gap-2">
          {GENRES_LIST.map(genre => (
            <button
              key={genre}
              type="button"
              onClick={() => toggleGenre(genre)}
              className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors border ${
                selectedGenres.includes(genre)
                  ? 'bg-red-600 text-white border-red-600'
                  : 'bg-[#18181b] text-zinc-400 border-zinc-800 hover:border-zinc-600'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <label className="text-sm text-zinc-400">Cast Members</label>
        <div className="flex gap-2">
          <input 
            type="text" 
            value={castMember}
            onChange={(e) => setCastMember(e.target.value)}
            className="flex-1 bg-[#121212] border border-zinc-800 rounded-lg p-3 text-white focus:border-zinc-600 focus:outline-none placeholder-zinc-600"
            placeholder="Add cast member name"
          />
          <button 
            type="button" 
            onClick={addCastMember}
            className="px-6 py-2 bg-transparent text-red-500 border border-red-600 rounded-lg font-medium hover:bg-red-900/10"
          >
            Add
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-2">
          {castList.map((member, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-[#1e1e1e] text-zinc-300 px-3 py-1.5 rounded-md text-sm border border-zinc-800">
              {member}
              <button type="button" onClick={() => removeCastMember(member)} className="hover:text-red-400">
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-zinc-400">Synopsis *</label>
        <textarea 
          required
          rows={4}
          value={formData.synopsis}
          onChange={(e) => setFormData({...formData, synopsis: e.target.value})}
          className="w-full bg-[#121212] border border-zinc-800 rounded-lg p-3 text-white focus:border-zinc-600 focus:outline-none resize-none placeholder-zinc-600"
          placeholder="Write a brief synopsis of the movie..."
        />
      </div>

      <div className="flex gap-4 pt-6">
        <button 
          type="submit" 
          disabled={loading}
          className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors"
        >
          {loading ? 'Saving...' : (isEditing ? 'Update Movie' : 'Add Movie')}
        </button>
        <button 
          type="button" 
          onClick={() => router.back()}
          className="flex-1 py-3 bg-transparent border border-red-600 text-red-500 hover:bg-red-900/10 font-bold rounded-lg transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}