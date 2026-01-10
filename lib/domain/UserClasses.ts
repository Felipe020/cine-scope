
import { Movie, Review } from '@/types';

// Classe Base
export abstract class User {
  protected _id: string;
  protected _name: string;
  protected _email: string;

  constructor(id: string, name: string, email: string) {
    this._id = id;
    this._name = name;
    this._email = email;
  }

  // Getters e Setters
  public get id(): string {
    return this._id;
  }

  public set id(value: string) {
    this._id = value;
  }

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    if (value.length < 2) {
      throw new Error("O nome deve ter pelo menos 2 caracteres.");
    }
    this._name = value;
  }

  public get email(): string {
    return this._email;
  }

  public set email(value: string) {
    if (!value.includes('@')) {
      throw new Error("Email inválido.");
    }
    this._email = value;
  }

  abstract getRole(): string;
}

// Representa um visitante (não autenticado)
// Geralmente não é persistido no banco, mas existe conceitualmente
export class Visitor {
  searchMovies(query: string) {
    console.log(`Buscando filmes por: ${query}`);
  }

  viewCatalog() {
    console.log("Visualizando catálogo de filmes");
  }

  register(data: any) {
    console.log("Realizando cadastro...");
  }
}

// RF-1, RF-2: Usuário Cadastrado
export class RegisteredUser extends User {
  constructor(id: string, name: string, email: string) {
    super(id, name, email);
  }

  getRole(): string {
    return 'USER';
  }

  // RF-7: Comentar e Avaliar
  rateAndComment(movie: Movie, rating: number, comment: string): Review {
    if (rating < 0 || rating > 10) throw new Error("Nota deve ser entre 0 e 10");
    
    return {
      id: crypto.randomUUID(),
      movieId: movie.id,
      userId: this.id,
      rating,
      comment,
      isProfessional: false,
      createdAt: new Date()
    } as Review;
  }

  // RF-3: Solicitar Verificação
  requestCriticStatus(justification: string) {
    console.log(`Solicitando status de crítico: ${justification}`);
  }
}

// RF-8: Crítico (Especialista)
export class Critic extends RegisteredUser {
  getRole(): string {
    return 'CRITIC';
  }

  // Sobrescreve ou estende a funcionalidade de avaliação
  reviewProfessional(movie: Movie, rating: number, comment: string): Review {
    const review = super.rateAndComment(movie, rating, comment);
    review.isProfessional = true;
    return review;
  }
}

// RF-6, RF-9, RF-10: Administrador
export class Administrator extends RegisteredUser {
  getRole(): string {
    return 'ADMIN';
  }

  // RF-6: Gerenciar Filmes
  addMovie(movieData: any) {
    console.log("Filme adicionado");
  }

  removeMovie(movieId: string) {
    console.log(`Filme ${movieId} removido`);
  }

  // RF-9: Gerenciar Usuários
  banUser(userId: string) {
    console.log(`Usuário ${userId} banido`);
  }

  // RF-10: Excluir Comentários
  deleteComment(reviewId: string) {
    console.log(`Comentário ${reviewId} removido`);
  }
  
  // RF-9.3: Tornar Usuário um Crítico
  approveCriticRequest(userId: string) {
      console.log(`Usuário ${userId} promovido a Crítico`);
  }
}

// RF-11: Gerente
export class Manager extends Administrator {
  getRole(): string {
    return 'MANAGER';
  }

  // RF-11.2: Adicionar Administrador
  createAdminAccount(adminData: any) {
    console.log("Novo admin criado");
  }

  // RF-11.1: Excluir Administrador
  removeAdminAccount(adminId: string) {
    console.log(`Admin ${adminId} removido`);
  }
}
