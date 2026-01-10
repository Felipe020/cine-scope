
'use client';
import { useState } from 'react';

// RF-3: Solicitar Verificação de Crítico
export default function CriticRequestPage() {
    const [justification, setJustification] = useState('');

    return (
        <div className="container mx-auto max-w-lg p-6">
            <h1 className="text-2xl font-bold mb-4">Solicitação de Crítico</h1>
            <p className="mb-4 text-gray-600">
                Envie uma justificativa para se tornar um crítico verificado na plataforma.
            </p>
            <textarea
                className="w-full border p-3 rounded h-32 mb-4"
                placeholder="Por que você deve ser um crítico? (Ex: Links de trabalhos anteriores...)"
                value={justification}
                onChange={(e) => setJustification(e.target.value)}
            />
            <button className="w-full bg-blue-600 text-white py-2 rounded font-semibold">
                Enviar Solicitação
            </button>
        </div>
    );
}
