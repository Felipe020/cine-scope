
import { UserService } from '@/lib/services/UserService';
import { deleteUser, promoteUserToCritic } from '../actions';

// RF-9, RF-11: Gerenciar Usuários
export default async function AdminUsersPage() {
  const users = await UserService.getAll();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Gerenciar Usuários</h1>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border text-left bg-white text-black">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Nome</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Papel</th>
              <th className="border p-2">Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border p-2">{user.name}</td>
                <td className="border p-2">{user.email}</td>
                <td className="border p-2">{user.role}</td>
                <td className="border p-2 flex gap-2">
                  {user.role === 'USER' && (
                     <form action={promoteUserToCritic.bind(null, user.id)}>
                        <button className="text-blue-600 underline">Promover a Crítico</button>
                     </form>
                  )}
                  <form action={deleteUser.bind(null, user.id)}>
                    <button className="text-red-600 underline">Excluir</button>
                  </form>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
                <tr>
                    <td colSpan={4} className="p-4 text-center">Nenhum usuário encontrado.</td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
