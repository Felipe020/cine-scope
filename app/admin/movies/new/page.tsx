import MovieForm from '@/components/MovieForm';

export default function NewMoviePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Adicionar Filme</h1>
        <MovieForm />
      </div>
    </div>
  );
}