
'use client';

// RF-6: Gerenciar Filmes
export default function AdminMoviesPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Gerenciar Filmes</h1>
        <button className="rounded bg-green-600 px-4 py-2 text-white">
          + Novo Filme
        </button>
      </div>

      <table className="w-full border-collapse border text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Título</th>
            <th className="border p-2">Ano</th>
            <th className="border p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">Exemplo Filme 1</td>
            <td className="border p-2">2024</td>
            <td className="border p-2 space-x-2">
              <button className="text-blue-600 underline">Editar</button>
              <button className="text-red-600 underline">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
