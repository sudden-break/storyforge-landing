'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/Button';
import { Motion } from '../lib/motion';
import content from '../data/content';

// ============================================================================
// Hero Component
// ============================================================================

/**
 * Hero section with animated headline, CTAs, and email signup.
 *
 * Features:
 * - Staggered entrance animations
 * - Two CTAs linking to app and demo
 * - Email signup as alternative conversion path
 * - Gradient animated background
 * - AppMockup integration placeholder
 */
export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const heroContent = content.hero;

  // Ensure animations only run after client-side mount
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 hero-gradient -z-10" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0D0D0D] -z-10" />

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F58529] rounded-full blur-[128px] opacity-20 animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#8134AF] rounded-full blur-[128px] opacity-20 animate-float stagger-2" />

      <div className="relative z-10 w-full px-4 py-20 md:py-32">
        <div className="max-w-6xl mx-auto">
          {/* Hero Content - Two Column Layout */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left space-y-8">
              {/* Badge */}
              {mounted && (
                <Motion.Div
                  animation="fade-in"
                  duration="base"
                  className="inline-flex"
                >
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1A1A] border border-[#333333] text-sm">
                    <span className="w-2 h-2 rounded-full bg-[#00D26A] animate-pulse" />
                    <span className="text-[#A0A0A0]">Now in Beta</span>
                  </span>
                </Motion.Div>
              )}

              {/* Headline */}
              {mounted && (
                <Motion.Div
                  animation="slide-up"
                  duration="base"
                  stagger={1}
                  className="space-y-2"
                >
                  <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                    {heroContent.headline}
                  </h1>
                </Motion.Div>
              )}

              {/* Subheadline */}
              {mounted && (
                <Motion.Div
                  animation="slide-up"
                  duration="base"
                  stagger={2}
                >
                  <p className="text-lg md:text-xl text-[#A0A0A0] max-w-xl mx-auto lg:mx-0 leading-relaxed">
                    {heroContent.subheadline}
                  </p>
                </Motion.Div>
              )}

              {/* CTAs */}
              {mounted && (
                <Motion.Div
                  animation="slide-up"
                  duration="base"
                  stagger={3}
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                >
                  <Button
                    variant="primary"
                    size="lg"
                    gradient
                    asLink
                    href={heroContent.primaryCtaUrl}
                    className="shadow-glow-ig"
                  >
                    {heroContent.primaryCta}
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    asLink
                    href={heroContent.secondaryCtaUrl}
                  >
                    {heroContent.secondaryCta}
                  </Button>
                </Motion.Div>
              )}

              {/* Email Signup - Alternative CTA */}
              {mounted && (
                <Motion.Div
                  animation="slide-up"
                  duration="base"
                  stagger={4}
                  className="pt-4"
                >
                  <div className="text-sm text-[#666666] mb-4">
                    Or get launch updates via email
                  </div>
                  <EmailSignupForm />
                </Motion.Div>
              )}
            </div>

            {/* Right Column - App Mockup */}
            {mounted && (
              <Motion.Div
                animation="scale-in"
                duration="slow"
                stagger={2}
                className="relative"
              >
                {/* AppMockup Placeholder - to be replaced when Task 2.1 is complete */}
                <div className="relative aspect-[4/3] max-w-lg mx-auto">
                  {/* Glassmorphism card placeholder */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#222222] border border-[#333333] backdrop-blur-xl overflow-hidden animate-float">
                    {/* Mockup content placeholder */}
                    <div className="p-6 h-full flex flex-col">
                      {/* Header */}
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F58529] to-[#DD2A7B]" />
                        <div className="flex-1">
                          <div className="h-3 w-32 bg-[#333333] rounded mb-2" />
                          <div className="h-2 w-24 bg-[#2A2A2A] rounded" />
                        </div>
                      </div>

                      {/* Story cards */}
                      <div className="space-y-3 flex-1">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="flex gap-3 p-3 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A]">
                            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#8134AF] to-[#515BD4] flex-shrink-0" />
                            <div className="flex-1 space-y-2">
                              <div className="h-3 w-3/4 bg-[#333333] rounded" />
                              <div className="h-2 w-1/2 bg-[#2A2A2A] rounded" />
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* AI badge */}
                      <div className="mt-4 flex items-center justify-center gap-2 py-3 rounded-lg bg-[#1A1A1A] border border-[#DD2A7B]/30">
                        <span className="text-lg">sparkles</span>
                        <span className="text-sm text-[#DD2A7B]">AI Analysis Active</span>
                      </div>
                    </div>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl bg-gradient-to-br from-[#F58529] to-[#DD2A7B] opacity-60 blur-sm" />
                  <div className="absolute -bottom-4 -left-4 w-32 h-32 rounded-2xl bg-gradient-to-br from-[#8134AF] to-[#515BD4] opacity-40 blur-md" />
                </div>
              </Motion.Div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// Email Signup Form Component
// ============================================================================

interface EmailSignupFormState {
  email: string;
  status: 'idle' | 'loading' | 'success' | 'error';
}

function EmailSignupForm() {
  const [state, setState] = useState<EmailSignupFormState>({
    email: '',
    status: 'idle',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, status: 'loading' }));

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: state.email }),
      });

      if (response.ok) {
        setState({ email: '', status: 'success' });
      } else {
        setState((prev) => ({ ...prev, status: 'error' }));
      }
    } catch {
      setState((prev) => ({ ...prev, status: 'error' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 max-w-md mx-auto lg:mx-0">
      <input
        type="email"
        value={state.email}
        onChange={(e) => setState((prev) => ({ ...prev, email: e.target.value }))}
        placeholder="your@email.com"
        required
        disabled={state.status === 'loading' || state.status === 'success'}
        className="flex-1 px-4 py-3 bg-[#1A1A1A] border border-[#333333] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DD2A7B] focus:border-transparent disabled:opacity-50 transition-all text-sm"
      />
      <Button
        type="submit"
        variant="secondary"
        size="md"
        disabled={state.status === 'loading' || state.status === 'success'}
        loading={state.status === 'loading'}
      >
        {state.status === 'success' ? 'Joined!' : 'Join'}
      </Button>

      {state.status === 'success' && (
        <p className="absolute -bottom-8 left-0 text-sm text-[#00D26A]">
          You're on the list! We'll be in touch.
        </p>
      )}
      {state.status === 'error' && (
        <p className="absolute -bottom-8 left-0 text-sm text-[#FF4757]">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}
