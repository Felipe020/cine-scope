import { notFound } from 'next/navigation';
import Image from 'next/image';
import { prisma } from '@/lib/db';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { addReview } from './actions';
import { Star, Calendar, User } from 'lucide-react';

// RF-4, RF-7, RF-8
export default async function MovieDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // RF-4
  const movie = await prisma.movie.findUnique({
    where: { id },
  });

  if (!movie) {
    notFound();
  }

  // RF-7
  const reviews = await prisma.review.findMany({
    where: { movieId: id },
    include: { user: true },
    orderBy: { createdAt: 'desc' }
  });

  // RF-8
  const cookieStore = await cookies();
  const token = cookieStore.get('auth_token')?.value;
  let userId: string | null = null;

  if (token) {
    try {
      const decoded = jwt.decode(token) as any;
      userId = decoded?.userId;
    } catch {
      userId = null;
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      
      <div className="relative w-full h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10" />
        {movie.posterUrl && (
          <Image 
            src={movie.posterUrl} 
            alt="Backdrop" 
            fill 
            className="object-cover opacity-30 blur-sm"
            priority
          />
        )}
      </div>

      <div className="max-w-7xl mx-auto px-6 -mt-80 relative z-20">
        <div className="flex flex-col md:flex-row gap-8">
          
          <div className="flex-shrink-0 w-72 rounded-xl overflow-hidden shadow-2xl border-4 border-[#1a1a1a]">
            {movie.posterUrl ? (
              <Image 
                src={movie.posterUrl} 
                alt={movie.title} 
                width={288} 
                height={430} 
                className="w-full h-auto object-cover"
                priority
              />
            ) : (
              <div className="w-full h-[400px] bg-zinc-800 flex items-center justify-center text-zinc-500">
                Sem Imagem
              </div>
            )}
          </div>

          <div className="flex-1 pt-4">
            <h1 className="text-5xl font-bold mb-4 text-white drop-shadow-md">{movie.title}</h1>
            
            <div className="flex flex-wrap items-center gap-6 text-zinc-300 text-sm mb-6">
              <div className="flex items-center gap-2">
                <Calendar size={18} className="text-red-500" />
                <span>{movie.year}</span>
              </div>
              <div className="flex items-center gap-2">
                <User size={18} className="text-red-500" />
                <span>{movie.director}</span>
              </div>
              {movie.genre && (
                <div className="flex gap-2">
                  {movie.genre.split(',').map((g, i) => (
                    <span key={i} className="px-3 py-1 bg-zinc-800 rounded-full text-xs font-medium border border-zinc-700">
                      {g.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 mb-8">
              <div className="flex text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={24} fill="currentColor" className="text-yellow-500" />
                ))}
              </div>
              <span className="text-xl font-bold ml-2">8.6</span>
              <span className="text-zinc-500 text-sm">/10</span>
            </div>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="md:col-span-2">
                <h3 className="text-2xl font-bold mb-4 border-l-4 border-red-600 pl-4">Sinopse</h3>
                <p className="text-zinc-300 leading-relaxed text-lg">
                  {movie.synopsis}
                </p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 text-zinc-100">Elenco</h3>
                <div className="flex flex-col gap-3">
                  {movie.cast ? movie.cast.split(',').map((actor, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors">
                       <div className="w-2 h-2 bg-red-600 rounded-full" />
                       <span>{actor.trim()}</span>
                    </div>
                  )) : (
                    <span className="text-zinc-500">Elenco indisponível</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 max-w-4xl">
           <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
             Avaliações e Comentários <span className="text-zinc-500 text-lg font-normal">({reviews.length})</span>
           </h3>

           {/* RF-8 */}
           {userId ? (
              <form action={addReview.bind(null, movie.id, userId)} className="bg-[#121212] p-6 rounded-xl border border-zinc-800 mb-8">
                  <h3 className="font-semibold mb-4 text-zinc-300">Deixe sua avaliação</h3>
                  <textarea 
                    name="comment"
                    placeholder="O que você achou do filme?"
                    required
                    className="w-full bg-[#0a0a0a] border border-zinc-800 rounded-lg p-4 text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 min-h-[100px] resize-none"
                  />
                  <div className="flex justify-between items-center mt-4">
                     <div className="flex items-center gap-2">
                        <span className="text-sm text-zinc-400">Nota:</span>
                        <input 
                          type="number" 
                          name="rating" 
                          min="0" 
                          max="10" 
                          required
                          className="w-16 bg-[#0a0a0a] border border-zinc-800 rounded p-1 text-center text-white focus:outline-none focus:border-red-600"
                        />
                        <span className="text-sm text-zinc-500">/ 10</span>
                     </div>
                     <button type="submit" className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors">
                        Publicar Avaliação
                     </button>
                  </div>
              </form>
           ) : (
              <div className="bg-[#121212] p-6 rounded-xl border border-zinc-800 mb-8 text-center">
                  <p className="text-zinc-400">Faça login para deixar um comentário.</p>
              </div>
           )}
           
           {/* RF-7 */}
           <div className="space-y-6 pb-12">
             {reviews.length > 0 ? reviews.map((review) => (
               <div key={review.id} className={`p-6 rounded-xl border ${review.isProfessional ? 'bg-yellow-900/10 border-yellow-700/30' : 'bg-[#121212] border-zinc-800'}`}>
                 <div className="flex justify-between items-start mb-3">
                   <div className="flex items-center gap-3">
                     <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400 font-bold">
                       {review.user?.name?.charAt(0).toUpperCase() || 'U'}
                     </div>
                     <div>
                       <div className="font-bold text-white flex items-center gap-2">
                         {review.user?.name || 'Anônimo'}
                         {review.user?.role === 'CRITIC' && (
                           <span className="text-[10px] bg-yellow-500/20 text-yellow-500 px-2 py-0.5 rounded border border-yellow-500/30 uppercase tracking-wider font-bold">
                             Especialista
                           </span>
                         )}
                       </div>
                       <div className="text-xs text-zinc-500">{new Date(review.createdAt).toLocaleDateString()}</div>
                     </div>
                   </div>
                   <div className="flex items-center gap-1 bg-zinc-900 px-3 py-1 rounded-lg border border-zinc-800">
                     <Star size={14} className="text-yellow-500" fill="currentColor" />
                     <span className="font-bold text-white">{review.rating}</span>
                     <span className="text-zinc-500 text-xs">/10</span>
                   </div>
                 </div>
                 <p className="text-zinc-300 leading-relaxed">{review.comment}</p>
               </div>
             )) : (
               <div className="text-center py-12 bg-[#121212] rounded-xl border border-zinc-800 border-dashed">
                 <p className="text-zinc-500">Este filme ainda não tem avaliações. Seja o primeiro!</p>
               </div>
             )}
           </div>
        </div>

      </div>
    </div>
  );
}