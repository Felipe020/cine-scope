'use server'

import { ReviewService } from "@/lib/services/ReviewService";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db"; // Direct DB access to check user role quickly

export async function addReview(movieId: string, userId: string, formData: FormData) {
  const comment = formData.get('comment') as string;
  const rating = parseInt(formData.get('rating') as string);

  if (!comment || isNaN(rating)) {
    return;
  }

  // Check user role to determine if review is professional
  const user = await prisma.user.findUnique({ where: { id: userId } });
  const isProfessional = user?.role === 'CRITIC';

  await ReviewService.create({
    movieId,
    userId,
    rating,
    comment,
    isProfessional
  });

  revalidatePath(`/movie/${movieId}`);
}
