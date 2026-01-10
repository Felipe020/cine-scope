
import { prisma } from '@/lib/prisma';
import { Movie } from '@/types';

export class MovieService {
  // RF-6.1: Cadastrar Novo Filme
  static async create(data: Omit<Movie, 'id' | 'createdAt'>) {
    return await prisma.movie.create({
      data,
    });
  }

  // RF-4: Exibir Catálogo
  static async getAll() {
    return await prisma.movie.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  // RF-4: Detalhes do filme
  static async getById(id: string) {
    return await prisma.movie.findUnique({
      where: { id },
      include: {
        reviews: {
          include: { user: true },
          orderBy: { createdAt: 'desc' },
        },
      },
    });
  }

  // RF-5: Busca de Filmes
  static async search(query: string) {
    return await prisma.movie.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { genre: { contains: query, mode: 'insensitive' } },
          { cast: { contains: query, mode: 'insensitive' } },
        ],
      },
    });
  }

  // RF-6.2: Editar Sinopse (Update Movie)
  static async update(id: string, data: Partial<Movie>) {
    return await prisma.movie.update({
      where: { id },
      data,
    });
  }

  // RF-6.3: Excluir Filme
  static async delete(id: string) {
    return await prisma.movie.delete({
      where: { id },
    });
  }
}
