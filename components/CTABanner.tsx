'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/Button';
import { Container } from './ui/Container';
import { Motion } from '../lib/motion';

// ============================================================================
// CTA Banner Component
// ============================================================================

/**
 * CTA Banner section - Full-width call-to-action before footer.
 *
 * Features:
 * - Instagram gradient background
 * - Eye-catching headline and subheadline
 * - Large gradient CTA button linking to app
 * - Responsive typography
 * - Subtle animation on scroll
 */
export default function CTABanner() {
  const [mounted, setMounted] = useState(false);

  // Ensure animations only run after client-side mount
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative w-full py-20 md:py-28 overflow-hidden">
      {/* Instagram Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] opacity-100" />

      {/* Animated gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#F58529]/20 via-transparent to-[#8134AF]/20 animate-pulse" />

      {/* Decorative circles */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white/10 rounded-full blur-3xl" />

      <div className="relative z-10">
        <Container size="xl" padding="md">
          <div className="text-center space-y-6 md:space-y-8">
            {/* Headline */}
            {mounted && (
              <Motion.Div
                animation="slide-up"
                duration="base"
                className="space-y-4"
              >
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
                  Ready to get started?
                </h2>
              </Motion.Div>
            )}

            {/* Subheadline */}
            {mounted && (
              <Motion.Div
                animation="slide-up"
                duration="base"
                stagger={1}
              >
                <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                  Join StoryForge today and start monitoring Instagram Stories
                </p>
              </Motion.Div>
            )}

            {/* CTA Button */}
            {mounted && (
              <Motion.Div
                animation="slide-up"
                duration="base"
                stagger={2}
                className="pt-4"
              >
                <Button
                  variant="primary"
                  size="lg"
                  gradient
                  asLink
                  href="https://app.storyforge.cloud"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shadow-2xl hover:shadow-3xl bg-white text-[#0D0D0D] hover:bg-[#E8E8E8]"
                  iconLeft={
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  }
                >
                  Start Free
                </Button>
              </Motion.Div>
            )}

            {/* Trust indicator */}
            {mounted && (
              <Motion.Div
                animation="fade-in"
                duration="slow"
                stagger={3}
                className="pt-6"
              >
                <p className="text-sm text-white/70">
                  No credit card required • Free tier available • Cancel anytime
                </p>
              </Motion.Div>
            )}
          </div>
        </Container>
      </div>
    </section>
  );
}
