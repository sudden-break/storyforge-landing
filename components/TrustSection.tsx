'use client';

import type { LucideIcon } from 'lucide-react';
import {
  Shield,
  CreditCard,
  XCircle,
  CheckCircle,
} from 'lucide-react';
import { Container } from './ui/Container';
import { GlassCard } from './ui/GlassCard';
import { SectionHeader } from './ui/SectionHeader';
import { useInView, useReducedMotion, STAGGER_DELAY } from '@/lib/motion';
import content from '@/data/content';

// ============================================================================
// Icon Mapping
// ============================================================================

const iconMap: Record<string, LucideIcon> = {
  Shield,
  CreditCard,
  XCircle,
  CheckCircle,
};

// ============================================================================
// Types
// ============================================================================

interface TrustCardProps {
  item: {
    icon: string;
    text: string;
  };
  index: number;
  isInView: boolean;
  prefersReducedMotion: boolean;
}

// ============================================================================
// Trust Card Component
// ============================================================================

/**
 * Individual trust card with icon and text.
 */
function TrustCard({ item, index, isInView, prefersReducedMotion }: TrustCardProps) {
  const Icon = iconMap[item.icon];

  // Stagger delay based on index
  const delayClass = !prefersReducedMotion ? `stagger-${Math.min(index + 1, 8) as keyof typeof STAGGER_DELAY}` : '';

  // Animation classes - use section-level isInView
  const animationClass = !prefersReducedMotion && isInView
    ? 'animate-slide-up'
    : !prefersReducedMotion && !isInView
    ? 'opacity-0'
    : '';

  return (
    <div
      className={[
        animationClass,
        delayClass,
      ].filter(Boolean).join(' ')}
    >
      <GlassCard
        variant="subtle"
        padding="md"
        hover
        className={[
          'h-full',
          'group',
          'flex',
          'flex-col',
          'items-center',
          'justify-center',
          'text-center',
        ].join(' ')}
      >
        {/* Icon with gradient background */}
        <div className={[
          'inline-flex',
          'items-center',
          'justify-center',
          'w-14',
          'h-14',
          'rounded-full',
          'bg-gradient-to-br',
          'from-[#F58529]/20',
          'to-[#8134AF]/20',
          'mb-4',
          'group-hover:scale-110',
          'transition-transform',
          'duration-base',
          'ease-out-expo',
        ].join(' ')}>
          {Icon && (
            <Icon className={[
              'w-7',
              'h-7',
              'text-transparent',
              'bg-clip-text',
              'bg-gradient-to-r',
              'from-[#F58529]',
              'to-[#8134AF]',
            ].join(' ')} />
          )}
        </div>

        {/* Trust text */}
        <p className={[
          'text-lg',
          'font-medium',
          'font-display',
          'letter-tight',
          'text-white',
        ].join(' ')}>
          {item.text}
        </p>
      </GlassCard>
    </div>
  );
}

// ============================================================================
// Trust Section Component
// ============================================================================

/**
 * Trust section with 4 trust badges.
 *
 * Layout:
 * - 2x2 grid on desktop
 * - 1 column on mobile
 *
 * Trust Elements (verifiable claims only):
 * - Secure & Private - data is not shared
 * - Crypto & Card Payments via BoomFi
 * - Cancel Anytime - no long-term contracts
 * - Built for Reliability - instead of fictitious uptime numbers
 *
 * Features:
 * - Scroll-triggered fade-in animations via IntersectionObserver
 * - Staggered animation delays for visual flow
 * - Respects reduced-motion preference
 * - Hover effects with subtle scale
 */
export default function TrustSection() {
  const trustContent = content.trust;
  const prefersReducedMotion = useReducedMotion();
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.1 });

  return (
    <section
      id="trust"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className={[
        'relative',
        'py-16',
        'md:py-24',
        'overflow-hidden',
      ].join(' ')}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D] to-transparent -z-10" />

      <Container size="xl" padding="md">
        {/* Section Header */}
        <div className="mb-10 md:mb-12">
          <SectionHeader
            title={trustContent.title}
            size="md"
            align="center"
          />
        </div>

        {/* 2x2 Grid Layout */}
        {/* Mobile: 1 col, Desktop: 2 col */}
        <div className={[
          'grid',
          'grid-cols-1',
          'sm:grid-cols-2',
          'gap-4',
          'md:gap-6',
          'max-w-4xl',
          'mx-auto',
        ].join(' ')}>
          {trustContent.items.map((item, index) => (
            <div key={index}>
              <TrustCard
                item={item}
                index={index}
                isInView={isInView}
                prefersReducedMotion={prefersReducedMotion}
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
