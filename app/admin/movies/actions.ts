
'use server'

import { MovieService } from "@/lib/services/MovieService";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createMovie(formData: FormData) {
  const title = formData.get('title') as string;
  const synopsis = formData.get('synopsis') as string;
  const posterUrl = formData.get('posterUrl') as string;
  const year = parseInt(formData.get('year') as string);
  const genre = formData.get('genre') as string;
  const cast = formData.get('cast') as string;

  if (!title || !year) {
      // Basic validation
      return;
  }

  await MovieService.create({
    title,
    synopsis,
    posterUrl,
    year,
    genre: genre || 'Gênero não especificado',
    cast: cast || 'Elenco não informado'
  });

  revalidatePath('/admin/movies');
  redirect('/admin/movies');
}
