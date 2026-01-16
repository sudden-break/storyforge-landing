'use client';

import { useState } from 'react';

export default function Hero() {
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
    <section className="hero-gradient min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-6xl md:text-7xl font-bold mb-6">
          StoryForge
          <span
            className="text-transparent bg-clip-text"
            style={{
              backgroundImage: 'linear-gradient(to right, #F58529, #DD2A7B, #8134AF)'
            }}
          >
            .cloud
          </span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-400">
          Instagram Story Monitoring and AI-Generation. Launching Soon.
        </p>

        <div className="max-w-md mx-auto">
          <p className="text-gray-400 mb-6 text-center">
            Stay updated for our launch
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              disabled={status === 'loading' || status === 'success'}
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="w-full py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 text-white"
              style={{
                backgroundImage: 'linear-gradient(to right, #F58529, #DD2A7B, #8134AF)'
              }}
            >
              {status === 'loading' ? 'Saving...' : 'Get Updates'}
            </button>
          </form>

          {status === 'success' && (
            <p className="text-green-500 text-center mt-4">
              ✅ You&apos;re on the list!
            </p>
          )}
          {status === 'error' && (
            <p className="text-red-500 text-center mt-4">
              ❌ Error. Please try again later.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
