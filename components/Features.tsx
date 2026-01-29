'use client';

import type { LucideIcon } from 'lucide-react';
import {
  Eye,
  Sparkles,
  Shield,
  Users,
} from 'lucide-react';
import { Container } from './ui/Container';
import { GlassCard } from './ui/GlassCard';
import { Badge } from './ui/Badge';
import { SectionHeader } from './ui/SectionHeader';
import { useInView, useReducedMotion, STAGGER_DELAY } from '@/lib/motion';
import content from '@/data/content';

// ============================================================================
// Icon Mapping
// ============================================================================

const iconMap: Record<string, LucideIcon> = {
  Eye,
  Sparkles,
  Shield,
  Users,
};

// ============================================================================
// Types
// ============================================================================

interface FeatureCardProps {
  feature: {
    id: string;
    title: string;
    description: string;
    icon: string;
    badge?: string;
  };
  index: number;
  isInView: boolean;
  prefersReducedMotion: boolean;
}

// ============================================================================
// Feature Card Component
// ============================================================================

/**
 * Individual feature card with icon, title, and description.
 */
function FeatureCard({ feature, index, isInView, prefersReducedMotion }: FeatureCardProps) {
  const Icon = iconMap[feature.icon];

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
        padding="lg"
        hover
        glow
        className={[
          'h-full',
          'group',
          'relative',
          'overflow-hidden',
        ].join(' ')}
      >
        {/* Decorative gradient on hover */}
        <div className={[
          'absolute',
          'inset-0',
          'bg-gradient-to-br',
          'from-white/5',
          'to-transparent',
          'opacity-0',
          'group-hover:opacity-100',
          'transition-opacity',
          'duration-base',
          'ease-out-expo',
          'pointer-events-none',
        ].join(' ')} />

        <div className="relative z-10">
          {/* Icon with gradient background */}
          <div className={[
            'inline-flex',
            'items-center',
            'justify-center',
            'w-12',
            'h-12',
            'rounded-xl',
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
                'w-6',
                'h-6',
                'text-transparent',
                'bg-clip-text',
                'bg-gradient-to-r',
                'from-[#F58529]',
                'to-[#8134AF]',
              ].join(' ')} />
            )}
          </div>

          {/* Title and Badge */}
          <div className="flex items-center gap-2 mb-2">
            <h3 className={[
              'text-xl',
              'font-semibold',
              'font-display',
              'letter-tight',
              'text-white',
            ].join(' ')}>
              {feature.title}
            </h3>
            {feature.badge && (
              <Badge variant="premium" size="sm">
                {feature.badge}
              </Badge>
            )}
          </div>

          {/* Description */}
          <p className={[
            'text-base',
            'text-[#A0A0A0]',
            'font-body',
            'leading-relaxed',
          ].join(' ')}>
            {feature.description}
          </p>
        </div>
      </GlassCard>
    </div>
  );
}

// ============================================================================
// Features Section Component
// ============================================================================

/**
 * Features section with balanced grid layout.
 *
 * Layout:
 * - Mobile: 1 column
 * - Tablet (md): 2 columns
 * - Desktop (lg): 2 columns (2x2 grid)
 *
 * Features:
 * - Scroll-triggered fade-in animations via IntersectionObserver
 * - Staggered animation delays for visual flow
 * - Respects reduced-motion preference
 * - Hover effects with subtle scale and glow
 * - AI-Generation features highlighted with Premium badge
 */
export default function Features() {
  const featuresContent = content.features;
  const prefersReducedMotion = useReducedMotion();
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.1 });

  return (
    <section
      id="features"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className={[
        'relative',
        'py-20',
        'md:py-32',
        'overflow-hidden',
      ].join(' ')}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0D0D0D] to-[#0D0D0D] -z-10" />

      <Container size="xl" padding="md">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <SectionHeader
            title={featuresContent.title}
            subtitle={featuresContent.subtitle}
            size="lg"
            align="center"
          />
        </div>

        {/* Balanced 2x2 Grid Layout */}
        {/* Mobile: 1 col, Tablet/Desktop: 2 col (2x2 grid) */}
        <div className={[
          'grid',
          'grid-cols-1',
          'md:grid-cols-2',
          'gap-4',
          'md:gap-6',
        ].join(' ')}>
          {featuresContent.features.map((feature, index) => (
            <div key={feature.id}>
              <FeatureCard
                feature={feature}
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
