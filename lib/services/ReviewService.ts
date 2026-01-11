
import { prisma } from '@/lib/db';
import { Review } from '@/types';

export class ReviewService {
  // RF-7: Comentar e Avaliar
  static async create(data: Pick<Review, 'rating' | 'comment' | 'userId' | 'movieId'> & { isProfessional?: boolean }) {
    // Fetch user to check role if isProfessional is not provided?
    // For simplicity, we just save what is passed.
    
    return await prisma.review.create({
      data: {
         ...data,
         isProfessional: data.isProfessional || false
      },
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
