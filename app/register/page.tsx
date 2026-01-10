
'use client';
import { useState } from 'react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Call UserService.register API (implementation omitted for now)
    console.log('Registering:', formData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 rounded bg-white p-6 shadow">
        <h1 className="text-2xl font-bold">Cadastro</h1>
        <input
          type="text"
          placeholder="Nome"
          className="w-full rounded border p-2"
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full rounded border p-2"
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Senha"
          className="w-full rounded border p-2"
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button type="submit" className="w-full rounded bg-blue-600 p-2 text-white">
          Cadastrar
        </button>
      </form>
    </div>
  );
}
