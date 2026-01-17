"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
}

interface Movie {
  id: string;
  title: string;
  posterUrl?: string;
}

interface Review {
  id: string;
  rating: number;
  comment: string;
  isProfessional: boolean;
  createdAt: string;
  movie: Movie;
}

interface ProfileData {
  user: User;
  reviews: Review[];
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/api/auth/profile", {
          credentials: "include",
        });

        if (response.status === 401) {
          router.push("/login");
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to fetch profile");
        }

        const data: ProfileData = await response.json();
        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Erro ao carregar perfil");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  const getRoleLabel = (role: string) => {
    const roleMap: { [key: string]: string } = {
      ADMIN: "Administrador",
      USER: "Usuário",
      CRITIC: "Crítico",
      VISITOR: "Visitante",
    };
    return roleMap[role] || role;
  };

  const getRoleColor = (role: string) => {
    const colorMap: { [key: string]: string } = {
      ADMIN: "text-red-500",
      USER: "text-blue-500",
      CRITIC: "text-yellow-500",
      VISITOR: "text-gray-500",
    };
    return colorMap[role] || "text-gray-500";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-color-background flex items-center justify-center">
        <p className="text-2xl text-gray-400">Carregando perfil...</p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-color-background flex items-center justify-center">
        <p className="text-2xl text-red-500">{error || "Erro ao carregar perfil"}</p>
      </div>
    );
  }

  const { user, reviews } = profile;
  const joinDate = new Date(user.createdAt).toLocaleDateString("pt-BR");

  return (
    <div className="min-h-screen bg-color-background text-white py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header com informações do usuário */}
        <div className="bg-gray-800 rounded-lg p-8 mb-8 border border-gray-700">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">{user.name}</h1>
              <p className={`text-xl font-semibold ${getRoleColor(user.role)}`}>
                {getRoleLabel(user.role)}
              </p>
            </div>
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-4xl font-bold">
                {user.name.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-gray-400">
            <div>
              <p className="text-sm uppercase tracking-wide">Email</p>
              <p className="text-white">{user.email}</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-wide">Membro desde</p>
              <p className="text-white">{joinDate}</p>
            </div>
          </div>
        </div>

        {/* Seção de críticas */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Minhas Críticas</h2>

          {reviews.length === 0 ? (
            <div className="bg-gray-800 rounded-lg p-8 text-center border border-gray-700">
              <p className="text-gray-400 text-lg">
                Você ainda não fez nenhuma crítica.
              </p>
              <Link
                href="/"
                className="mt-4 inline-block px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
              >
                Explorar Filmes
              </Link>
            </div>
          ) : (
            <div className="grid gap-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-purple-500 transition-colors"
                >
                  <div className="flex gap-4">
                    {/* Poster do filme */}
                    {review.movie.posterUrl && (
                      <div className="flex-shrink-0">
                        <Image
                          src={review.movie.posterUrl}
                          alt={review.movie.title}
                          width={80}
                          height={120}
                          className="rounded object-cover"
                        />
                      </div>
                    )}

                    {/* Conteúdo da crítica */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <Link
                          href={`/movie/${review.movie.id}`}
                          className="text-xl font-semibold hover:text-purple-400 transition-colors"
                        >
                          {review.movie.title}
                        </Link>
                        {review.isProfessional && (
                          <span className="bg-yellow-600 text-white text-xs px-2 py-1 rounded">
                            Crítica Profissional
                          </span>
                        )}
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <span
                              key={i}
                              className={`text-lg ${
                                i < review.rating
                                  ? "text-yellow-400"
                                  : "text-gray-600"
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        <span className="text-gray-400">
                          {review.rating}/5
                        </span>
                      </div>

                      {/* Comentário */}
                      <p className="text-gray-300 mb-2">{review.comment}</p>

                      {/* Data */}
                      <p className="text-sm text-gray-500">
                        {new Date(review.createdAt).toLocaleDateString(
                          "pt-BR"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
