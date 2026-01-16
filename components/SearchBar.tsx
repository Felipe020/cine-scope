'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react'; 
import { useState, useEffect } from 'react';

const CATEGORIES = [
  "All", "Action", "Comedy", "Drama", "Horror", "Sci-Fi", 
  "Romance", "Thriller", "Fantasy", "Adventure", "Mystery"
];

export default function SearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Estado local para controle imediato do input
  const [term, setTerm] = useState(searchParams.get('q') || "");

  // Atualiza o input se a URL mudar externamente (ex: voltar do navegador)
  useEffect(() => {
    setTerm(searchParams.get('q') || "");
  }, [searchParams]);

  // Debounce: Atualiza a URL 300ms após o usuário parar de digitar
  useEffect(() => {
    const handler = setTimeout(() => {
      const currentQuery = searchParams.get('q') || "";
      
      // Só atualiza se o termo mudou em relação à URL atual
      if (term !== currentQuery) {
        const params = new URLSearchParams(searchParams.toString());
        
        if (term && term !== "All") {
          params.set('q', term);
        } else {
          params.delete('q');
        }
        
        router.replace(`/?${params.toString()}`);
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [term, router, searchParams]);

  function handleCategoryClick(category: string) {
    if (category === "All") {
      setTerm("");
    } else {
      setTerm(category);
    }
  }

  return (
    <div className="relative w-full mb-10">
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search movies..."
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          className="w-full py-4 pl-12 pr-4 text-white bg-[#121212] border border-zinc-800 rounded-xl focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all placeholder-zinc-500"
        />
        <Search className="absolute left-4 top-4 h-6 w-6 text-zinc-500" />
      </div>

      <div className="flex flex-wrap gap-3">
        {CATEGORIES.map((category) => {
          const isActive = category === "All" 
            ? term === "" 
            : term.toLowerCase() === category.toLowerCase();

          return (
            <button
              key={category}
              onClick={() => handleCategoryClick(category)}
              className={`
                px-6 py-2 rounded-full text-sm font-medium transition-all duration-200
                ${isActive 
                  ? 'bg-red-600 text-white shadow-lg shadow-red-900/40' 
                  : 'bg-zinc-800/50 text-zinc-400 hover:bg-zinc-800 hover:text-white border border-transparent hover:border-zinc-700'
                }
              `}
            >
              {category}
            </button>
          );
        })}
      </div>
    </div>
  );
}