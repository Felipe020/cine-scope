
import { prisma } from '@/lib/prisma';
import { Review } from '@/types';

export class ReviewService {
  // RF-7: Comentar e Avaliar
  static async create(data: Pick<Review, 'rating' | 'comment' | 'userId' | 'movieId' | 'isProfessional'>) {
    return await prisma.review.create({
      data,
    });
  }

  // RF-10: Excluir Comentários
  static async delete(id: string) {
    return await prisma.review.delete({
      where: { id },
    });
  }

  static async getByMovieId(movieId: string) {
    return await prisma.review.findMany({
      where: { movieId },
      include: { user: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}
