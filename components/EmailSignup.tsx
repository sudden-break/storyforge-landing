'use client';

import { useState } from 'react';

export default function EmailSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-md mx-auto">
        <h2 className="text-3xl font-bold mb-4 text-center">
          Bleib auf dem Laufenden
        </h2>
        <p className="text-text-secondary mb-8 text-center">
          Erhalte Updates zum Launch von StoryForge.cloud
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="deine@email.com"
            required
            disabled={status === 'loading' || status === 'success'}
            className="w-full px-4 py-3 bg-bg-card border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-ig-pink disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className="w-full py-3 bg-gradient-to-r from-ig-orange via-ig-pink to-ig-purple rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
          >
            {status === 'loading' ? 'Wird gespeichert...' : 'Updates erhalten'}
          </button>
        </form>

        {status === 'success' && (
          <p className="text-success-green text-center mt-4">
            ✅ Du bist auf der Liste!
          </p>
        )}
        {status === 'error' && (
          <p className="text-error-red text-center mt-4">
            ❌ Fehler. Bitte versuche es später nochmal.
          </p>
        )}
      </div>
    </section>
  );
}
