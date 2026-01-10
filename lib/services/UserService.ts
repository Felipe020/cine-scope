
import { prisma } from '@/lib/prisma';
import { User, Role } from '@/types';

export class UserService {
  // RF-1, RF-2: Cadastro de Visitante/Usuário
  static async register(data: Pick<User, 'name' | 'email'> & { password: string }) {
    // In a real app, hash password here
    return await prisma.user.create({
      data: {
        ...data,
        role: 'USER', // Default role
      },
    });
  }

  // RF-11.2: Adicionar Administrador
  static async createAdmin(data: Pick<User, 'name' | 'email'> & { password: string }) {
     return await prisma.user.create({
      data: {
        ...data,
        role: 'ADMIN',
      },
    });
  }

  // RF-9: Gerenciar Usuários (Listar)
  static async getAll() {
    return await prisma.user.findMany();
  }

  // RF-9.2, RF-11.1: Excluir Usuário/Admin
  static async delete(id: string) {
    return await prisma.user.delete({
      where: { id },
    });
  }

  // RF-9.3: Tornar Usuário um Crítico
  static async promoteToCritic(userId: string) {
    return await prisma.user.update({
      where: { id: userId },
      data: { role: 'CRITIC' },
    });
  }

  // RF-3: Solicitar Verificação de Crítico
  static async requestCriticStatus(userId: string, justification: string) {
    return await prisma.criticRequest.create({
      data: {
        userId,
        justification,
      },
    });
  }
}
