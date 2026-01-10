
'use client';
import { use } from 'react';

// Mock Component for Movie Details (RF-4)
export default function MovieDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  
  return (
    <div className="container mx-auto p-4">
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-1">
          <img src="https://placehold.co/300x450" alt="Poster" className="w-full rounded" />
        </div>
        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold mb-2">Movie Title {resolvedParams.id}</h1>
          <p className="text-gray-600 mb-4">2024 • Action • Cast: Actor A, Actor B</p>
          <p className="mb-6">Sinopse do filme aqui...</p>
          
          {/* Reviews Section (RF-7, RF-8) */}
          <div className="border-t pt-6">
            <h2 className="text-2xl font-bold mb-4">Avaliações e Comentários</h2>
            
            {/* Form to Add Review */}
            <form className="mb-8 rounded bg-gray-50 p-4">
              <textarea 
                className="w-full border p-2 rounded mb-2" 
                placeholder="Deixe seu comentário..."
              ></textarea>
              <div className="flex items-center gap-4">
                 <input type="number" min="0" max="10" placeholder="Nota" className="w-20 border p-2 rounded" />
                 <button className="bg-blue-600 text-white px-4 py-2 rounded">Avaliar</button>
              </div>
            </form>

            <div className="space-y-4">
              <div className="rounded border p-4 bg-yellow-50 border-yellow-200">
                <div className="font-bold flex justify-between">
                    <span>Crítico Especialista</span> 
                    <span className="text-sm bg-yellow-200 px-2 rounded">Profissional</span>
                </div>
                <p className="text-sm text-gray-600">Nota: 9/10</p>
                <p className="mt-2 text-gray-800">Análise técnica detalhada do filme...</p>
              </div>

              <div className="rounded border p-4">
                <div className="font-bold">Usuário Comum</div>
                <p className="text-sm text-gray-600">Nota: 8/10</p>
                <p className="mt-2 text-gray-800">Gostei bastante!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
