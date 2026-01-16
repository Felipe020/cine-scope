'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { User, Mail, Lock, AlertCircle, Film } from 'lucide-react';
import Button from './Button';

export default function Register() {
  const router = useRouter();
  
  // Estados dos campos
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [wantCritic, setWantCritic] = useState(false); // Checkbox de crítico

  // Estados de controle
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 1. Validação local: Senhas iguais?
    if (password !== confirmPassword) {
      setError('As senhas não coincidem.');
      return;
    }

    setLoading(true);

    try {
      // 2. Envia para a API (apenas os dados que o banco espera agora)
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        // Sucesso: Vai para o login
        router.push('/login');
      } else {
        const data = await response.json();
        setError(data.message || 'Falha ao cadastrar');
      }
    } catch (error) {
      setError('Ocorreu um erro ao conectar com o servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center px-4 py-8">
      <div className="max-w-md w-full">
        
        {/* Cabeçalho igual ao Protótipo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Film size={40} className="text-red-600" /> {/* Ícone Vermelho */}
            <span className="text-3xl font-bold text-white">CineScope</span>
          </div>
          <h2 className="mb-2 text-2xl font-bold text-white">Create Your Account</h2>
          <p className="text-gray-400">Join our community of movie enthusiasts</p>
        </div>

        <div className="bg-[var(--color-surface)] rounded-xl p-8 shadow-2xl border border-zinc-800/50">
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Mensagem de Erro */}
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-500 text-sm">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            {/* Campo Full Name */}
            <div>
              <label className="block mb-2 text-sm text-gray-400">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-[var(--color-background)] border border-zinc-700 rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all"
                />
              </div>
            </div>

            {/* Campo Email Address */}
            <div>
              <label className="block mb-2 text-sm text-gray-400">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-[var(--color-background)] border border-zinc-700 rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all"
                />
              </div>
            </div>

            {/* Campo Password */}
            <div>
              <label className="block mb-2 text-sm text-gray-400">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-[var(--color-background)] border border-zinc-700 rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all"
                />
              </div>
            </div>

            {/* Campo Confirm Password */}
            <div>
              <label className="block mb-2 text-sm text-gray-400">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full pl-11 pr-4 py-3 bg-[var(--color-background)] border border-zinc-700 rounded-lg text-white placeholder:text-gray-600 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all"
                />
              </div>
            </div>

            {/* Checkbox de Crítico (Visual conforme protótipo) */}
            <div className="flex items-start gap-3 p-1">
              <div className="flex items-center h-5">
                <input
                  id="critic-request"
                  type="checkbox"
                  checked={wantCritic}
                  onChange={(e) => setWantCritic(e.target.checked)}
                  className="w-4 h-4 rounded border-zinc-600 bg-zinc-700 text-red-600 focus:ring-red-600 focus:ring-offset-zinc-900"
                />
              </div>
              <div className="text-sm">
                <label htmlFor="critic-request" className="font-medium text-white">Request critic verification</label>
                <p className="text-gray-500 text-xs mt-0.5">Apply to become a verified critic. Your reviews will be highlighted and carry more weight.</p>
              </div>
            </div>

            {/* Botão Register */}
            <Button 
              type="submit" 
              variant="primary" 
              className="w-full py-3 font-bold bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-lg shadow-red-900/30 transition-all mt-2"
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Register'}
            </Button>
          </form>

          <div className="mt-8 text-center pt-6 border-t border-zinc-800">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <Link href="/login" className="text-red-500 hover:text-red-400 font-medium hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}