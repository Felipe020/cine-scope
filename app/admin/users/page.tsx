
'use client';

// RF-9, RF-11: Gerenciar Usuários
export default function AdminUsersPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Gerenciar Usuários</h1>

      <table className="w-full border-collapse border text-left">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Nome</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Papel</th>
            <th className="border p-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border p-2">João Silva</td>
            <td className="border p-2">joao@email.com</td>
            <td className="border p-2">USUÁRIO</td>
            <td className="border p-2 space-x-2">
              <button className="text-blue-600 underline">Promover a Crítico</button>
              <button className="text-red-600 underline">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
