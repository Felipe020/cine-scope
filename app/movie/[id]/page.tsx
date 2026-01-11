
import { MovieService } from '@/lib/services/MovieService';
import { addReview } from './actions';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

// Component Details (RF-4, RF-7, RF-8)
export default async function MovieDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const movie = await MovieService.getById(id);

  if (!movie) {
    notFound();
  }

  // Get current user from token
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  let userId: string | null = null;
  let userRole: string | null = null;

  if (token) {
    try {
      const decoded = jwt.decode(token) as any;
      userId = decoded?.userId;
      userRole = decoded?.role;
    } catch {
      // Invalid token
    }
  }

  return (
    <div className="container mx-auto p-4 py-8">
      <div className="grid gap-8 md:grid-cols-3">
        {/* Poster Column */}
        <div className="md:col-span-1">
          <div className="relative aspect-[2/3] w-full rounded-lg overflow-hidden shadow-xl">
             {movie.posterUrl ? (
                <Image 
                  src={movie.posterUrl} 
                  alt={movie.title} 
                  fill 
                  className="object-cover"
                  priority
                />
             ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">Sem Imagem</div>
             )}
          </div>
        </div>

        {/* Info Column */}
        <div className="md:col-span-2 text-black">
          <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
          <p className="text-gray-600 mb-6 text-lg">
            {movie.year} • {movie.genre} 
          </p>
          
          <div className="mb-6">
            <h3 className="font-semibold text-lg mb-2">Sinopse</h3>
            <p className="text-gray-800 leading-relaxed">{movie.synopsis}</p>
          </div>

          <div className="mb-8">
             <h3 className="font-semibold text-lg mb-2">Elenco</h3>
             <p className="text-gray-700">{movie.cast}</p>
          </div>
          
          {/* Reviews Section (RF-7, RF-8) */}
          <div className="border-t pt-8">
            <h2 className="text-2xl font-bold mb-6">Avaliações e Comentários</h2>
            
            {/* Form to Add Review */}
            {userId ? (
                <form action={addReview.bind(null, movie.id, userId)} className="mb-10 rounded-xl bg-gray-50 p-6 shadow-sm border">
                <h3 className="font-semibold mb-4">Deixe sua avaliação</h3>
                <textarea 
                    name="comment"
                    className="w-full border p-3 rounded-lg mb-4 h-24 focus:ring-2 focus:ring-blue-500 outline-none" 
                    placeholder="O que você achou do filme?"
                    required
                ></textarea>
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Nota:</span>
                        <input 
                            name="rating"
                            type="number" 
                            min="0" 
                            max="10" 
                            required
                            className="w-20 border p-2 rounded-lg text-center" 
                        />
                        <span className="text-sm text-gray-500">/ 10</span>
                    </div>
                    <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors ml-auto">
                        Publicar Avaliação
                    </button>
                </div>
                </form>
            ) : (
                <div className="mb-8 p-4 bg-blue-50 text-blue-800 rounded-lg">
                    Faça login para deixar um comentário.
                </div>
            )}

            <div className="space-y-6">
              {movie.reviews && movie.reviews.length > 0 ? (
                  movie.reviews.map((review: any) => (
                    <div key={review.id} className={`rounded-xl border p-5 ${review.isProfessional ? 'bg-yellow-50 border-yellow-200' : 'bg-white'}`}>
                        <div className="flex justify-between items-start mb-2">
                            <div className="font-bold text-lg">
                                {review.user.name}
                                {review.isProfessional && (
                                    <span className="ml-2 text-xs bg-yellow-400 text-yellow-900 px-2 py-0.5 rounded-full uppercase tracking-wide font-bold">
                                        Especialista
                                    </span>
                                )}
                            </div>
                            <div className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded">
                                <span className="font-bold text-lg">{review.rating}</span>
                                <span className="text-xs text-gray-500">/10</span>
                            </div>
                        </div>
                        <p className="text-gray-700 mt-2">{review.comment}</p>
                        <p className="text-xs text-gray-400 mt-4">
                            {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                  ))
              ) : (
                  <p className="text-gray-500 italic">Este filme ainda não tem avaliações. Seja o primeiro!</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
