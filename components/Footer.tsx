import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-gray-800 mt-8">
      <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="md:w-1/2">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl font-bold">CineScope</span>
            </div>
            <p className="max-w-md">
              Seu destino definitivo para descobrir filmes, ler críticas e
              conferir avaliações. Junte-se à nossa comunidade de cinéfilos.
            </p>
          </div>
          <div className="md:w-1/3">
            <ul className="space-y-2">
              <li>
                <Link href="/terms">Termos de serviço</Link>
              </li>
              <li>
                <Link href="/privacy">Política de privacidade</Link>
              </li>
              <li>
                <Link href="/cookies">Política de cookies</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 mt-8 pt-6">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm">
          <p>&copy; 2025 CineScope. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
