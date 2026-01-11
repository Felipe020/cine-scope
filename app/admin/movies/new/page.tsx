
'use client';

import { createMovie } from '../actions';
import Button from '@/components/Button'; // Assuming we can reuse or just use HTML button

export default function NewMoviePage() {
  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Cadastrar Novo Filme</h1>
      
      <form action={createMovie} className="space-y-4 bg-white p-6 rounded shadow-md text-black">
        <div>
          <label className="block mb-1 font-medium">Nome do Filme (Título)</label>
          <input 
            type="text" 
            name="title" 
            required 
            className="w-full border p-2 rounded" 
            placeholder="Ex: Matrix"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Link do Cartaz (URL)</label>
          <input 
            type="url" 
            name="posterUrl" 
            className="w-full border p-2 rounded" 
            placeholder="https://exemplo.com/poster.jpg"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Sinopse</label>
          <textarea 
            name="synopsis" 
            required 
            rows={4}
            className="w-full border p-2 rounded" 
            placeholder="Resumo do filme..."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
            <div>
                <label className="block mb-1 font-medium">Ano de Lançamento</label>
                <input 
                    type="number" 
                    name="year" 
                    required 
                    className="w-full border p-2 rounded" 
                    defaultValue={new Date().getFullYear()}
                />
            </div>
             <div>
                <label className="block mb-1 font-medium">Gênero</label>
                <input 
                    type="text" 
                    name="genre" 
                    className="w-full border p-2 rounded" 
                    placeholder="Ação, Drama, Sci-Fi"
                />
            </div>
        </div>

        <div>
            <label className="block mb-1 font-medium">Elenco</label>
            <input 
                type="text" 
                name="cast" 
                className="w-full border p-2 rounded" 
                placeholder="Ator 1, Ator 2..."
            />
        </div>

        <div className="flex justify-end gap-2 mt-4">
           <a href="/admin/movies" className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded">
              Cancelar
           </a>
           <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
              Salvar Filme
           </button>
        </div>
      </form>
    </div>
  );
}
