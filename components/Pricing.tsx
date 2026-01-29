'use client';

import { Check } from 'lucide-react';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { GlassCard } from './ui/GlassCard';
import { SectionHeader } from './ui/SectionHeader';
import { Container } from './ui/Container';
import { useReducedMotion, useInView } from '@/lib/motion';
import content from '@/data/content';

// ============================================================================
// Types
// ============================================================================

export interface PricingCardProps {
  plan: {
    id: string;
    name: string;
    price: string;
    period?: string;
    description: string;
    features: Array<{ text: string; included: boolean }>;
    badge?: string;
    cta: string;
  };
  isHighlighted: boolean;
  index: number;
  isInView: boolean;
}

// ============================================================================
// Pricing Card Component
// ============================================================================

/**
 * Individual pricing card with features list and CTA.
 *
 * Displays plan name, price, description, feature list with checkmarks,
 * and a call-to-action button. Highlighted cards (Pro plan) get special
 * styling with gradient border and glow effect.
 */
function PricingCard({ plan, isHighlighted, index, isInView }: PricingCardProps) {
  const prefersReducedMotion = useReducedMotion();

  // Billing URL mapping
  const billingUrl = `https://app.storyforge.cloud/billing?plan=${plan.id}`;

  // Animation delay based on index
  const staggerDelay = index * 50;

  const animationClass =
    !prefersReducedMotion && isInView ? 'animate-slide-up' : prefersReducedMotion || isInView ? '' : 'opacity-0';

  return (
    <div
      className={[animationClass, !prefersReducedMotion && `stagger-${index + 1}`].filter(Boolean).join(' ')}
      style={
        !prefersReducedMotion
          ? {
              animationDelay: `${staggerDelay}ms`,
              transitionDelay: `${staggerDelay}ms`,
            }
          : undefined
      }
    >
      <GlassCard
        variant={isHighlighted ? 'gradient' : 'default'}
        padding="lg"
        hover
        glow={isHighlighted}
        className={[
          'relative h-full flex flex-col',
          isHighlighted && 'border-[#F58529]/30 shadow-glow-ig scale-105 z-10',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {/* Most Popular Badge */}
        {plan.badge && isHighlighted && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <Badge variant="popular" size="sm">
              {plan.badge}
            </Badge>
          </div>
        )}

        {/* Plan Header */}
        <div className={['text-center mb-6', isHighlighted && 'mt-2'].filter(Boolean).join(' ')}>
          <h3 className="text-2xl font-semibold font-display text-white mb-2">{plan.name}</h3>
          <div className="flex items-baseline justify-center gap-1 mb-3">
            <span className="text-4xl font-bold font-display text-white">{plan.price}</span>
            {plan.period && <span className="text-[#A0A0A0] font-body">{plan.period}</span>}
          </div>
          <p className="text-sm text-[#A0A0A0] font-body">{plan.description}</p>
        </div>

        {/* Features List */}
        <ul className="space-y-3 mb-8 flex-1">
          {plan.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span
                className={[
                  'flex-shrink-0 mt-0.5',
                  feature.included ? 'text-[#00D26A]' : 'text-[#666666]',
                ].join(' ')}
              >
                <Check className="w-5 h-5" strokeWidth={2.5} />
              </span>
              <span
                className={[
                  'text-sm font-body',
                  feature.included ? 'text-[#A0A0A0]' : 'text-[#666666]',
                ].join(' ')}
              >
                {feature.text}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Button
          variant={isHighlighted ? 'primary' : 'secondary'}
          size="md"
          asLink
          href={billingUrl}
          gradient={isHighlighted}
          fullWidth
          className="mt-auto"
        >
          {plan.cta}
        </Button>
      </GlassCard>
    </div>
  );
}

// ============================================================================
// Pricing Section Component
// ============================================================================

/**
 * Pricing section with 4-tier pricing plans.
 *
 * Features:
 * - Free, Starter, Pro, and Pro+ plans
 * - Pro plan highlighted as "Most Popular"
 * - Feature comparison with checkmarks
 * - CTAs linking to billing with plan selection
 * - Responsive grid layout
 * - Staggered entrance animations
 *
 * @example
 * ```tsx
 * <Pricing />
 * ```
 */
export default function Pricing() {
  const pricingContent = content.pricing;
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.1 });

  return (
    <section id="pricing" ref={sectionRef as React.RefObject<HTMLElement>} className="relative py-20 md:py-32 bg-[#0D0D0D]">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D] via-[#0D0D0D] to-[#1A1A1A]/50 -z-10" />

      <Container size="xl" padding="md">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <SectionHeader title={pricingContent.title} subtitle={pricingContent.subtitle} size="lg" align="center" />
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {pricingContent.plans.map((plan, index) => (
            <PricingCard
              key={plan.id}
              plan={plan}
              isHighlighted={plan.id === 'pro'}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* Payment Note */}
        <div className="text-center">
          <p className="text-sm text-[#666666] font-body flex items-center justify-center gap-2">
            <span>Crypto & Card payments via BoomFi</span>
          </p>
        </div>
      </Container>
    </section>
  );
}
