'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Film, Mail, Lock, AlertCircle } from 'lucide-react';
import Button from './Button';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        router.push('/');
        router.refresh();
      } else {
        const data = await response.json();
        setError(data.message || 'Falha no login');
      }
    } catch (error) {
      setError('Ocorreu um erro ao conectar com o servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center px-4 py-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Film size={40} className="text-[var(--color-primary)]" />
            <span className="text-3xl font-bold">CineScope</span>
          </div>
          <h2 className="mb-2 text-xl font-bold text-white">Bem vindo</h2>
          <p className="text-[var(--color-text-secondary)]">Faça login para continuar</p>
        </div>

        <div className="bg-[var(--color-surface)] rounded-[12px] p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/50 rounded-[10px] text-red-500 text-sm">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block mb-2 text-sm text-[var(--color-text-secondary)]">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]" size={20} />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-[var(--color-background)] border border-gray-800 rounded-[10px] text-white placeholder:text-[var(--color-text-secondary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block mb-2 text-sm text-[var(--color-text-secondary)]">
                Senha
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]" size={20} />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-[var(--color-background)] border border-gray-800 rounded-[10px] text-white placeholder:text-[var(--color-text-secondary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                />
              </div>
            </div>

            {/* <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded accent-[var(--color-primary)] bg-gray-700 border-gray-600" />
                <span className="text-sm text-[var(--color-text-secondary)]">Lembre-me</span>
              </label>
              <Link href="/forgot-password" className="text-sm text-[var(--color-primary)] hover:underline">
                Esqueceu sua senha?
              </Link>
            </div> */}

            <Button 
              type="submit" 
              variant="primary" 
              className="w-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Login'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-[var(--color-text-secondary)]">
              Não tem uma conta?{' '}
              <Link href="/register" className="text-[var(--color-primary)] hover:underline">
                Registre-se aqui
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}