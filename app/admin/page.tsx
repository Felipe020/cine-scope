
import { redirect } from 'next/navigation';

// RF-11: Acesso de Administrador
export default function AdminPage() {
  // Redireciona para usuários por padrão
  redirect('/admin/users');
}
