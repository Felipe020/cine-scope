
export type Role = 'VISITOR' | 'USER' | 'CRITIC' | 'ADMIN' | 'MANAGER';

export type RequestStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  createdAt: Date;
}

export interface Movie {
  id: string;
  title: string;
  year: number;
  synopsis: string;
  genre: string;
  cast: string;
  posterUrl?: string;
  createdAt: Date;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  isProfessional: boolean;
  createdAt: Date;
  userId: string;
  user?: User;
  movieId: string;
  movie?: Movie;
}

export interface CriticRequest {
  id: string;
  userId: string;
  user?: User;
  justification: string;
  status: RequestStatus;
  createdAt: Date;
}
