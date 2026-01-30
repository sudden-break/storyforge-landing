'use client';

import { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';
import { Badge } from './ui/Badge';
import { Button } from './ui/Button';
import { GlassCard } from './ui/GlassCard';
import { SectionHeader } from './ui/SectionHeader';
import { Container } from './ui/Container';
import { useReducedMotion, useInView } from '@/lib/motion';
import { fetchPlans, formatPrice, formatInterval, getAiGenerationLimit, type PlanConfig } from '@/lib/api';
import content from '@/data/content';

// ============================================================================
// Types
// ============================================================================

interface DisplayPlan {
  id: string;
  name: string;
  price: string;
  period?: string;
  description: string;
  features: Array<{ text: string; included: boolean }>;
  badge?: string;
  cta: string;
}

interface PricingCardProps {
  plan: DisplayPlan;
  isHighlighted: boolean;
  index: number;
  isInView: boolean;
}

// ============================================================================
// Helper: Convert API plan to display format
// ============================================================================

function planToDisplay(plan: PlanConfig): DisplayPlan {
  const features: Array<{ text: string; included: boolean }> = [];

  // Profile limit
  features.push({
    text: `${plan.max_profiles} Instagram profile${plan.max_profiles > 1 ? 's' : ''}`,
    included: true,
  });

  // Check interval
  features.push({
    text: formatInterval(plan.check_interval_min, plan.check_interval_max),
    included: true,
  });

  // Story archiving (always included)
  features.push({
    text: 'Story archiving',
    included: true,
  });

  // Desktop notifications (always included)
  features.push({
    text: 'Desktop notifications',
    included: true,
  });

  // AI generation with quota
  const aiLimit = getAiGenerationLimit(plan.features);
  if (plan.has_ai && aiLimit) {
    features.push({
      text: `AI generation (${aiLimit}/month)`,
      included: true,
    });
  } else if (plan.has_ai) {
    features.push({
      text: 'AI generation',
      included: true,
    });
  } else {
    features.push({
      text: 'AI generation',
      included: false,
    });
  }

  // Priority support (tier3 only)
  features.push({
    text: 'Priority support',
    included: plan.tier === 'tier3',
  });

  // Price formatting
  const price = formatPrice(plan.price_amount, plan.price_currency);
  const period = plan.price_amount && plan.price_amount > 0 ? '/month' : undefined;

  // CTA text
  let cta = 'Get Started';
  if (plan.plan_id === 'starter') cta = 'Choose Starter';
  else if (plan.plan_id === 'pro') cta = 'Choose Pro';
  else if (plan.plan_id === 'enterprise') cta = 'Choose Pro+';

  return {
    id: plan.plan_id,
    name: plan.name,
    price,
    period,
    description: plan.description || getDefaultDescription(plan.plan_id),
    features,
    badge: plan.plan_id === 'pro' ? 'Most Popular' : undefined,
    cta,
  };
}

function getDefaultDescription(planId: string): string {
  switch (planId) {
    case 'free':
      return 'Perfect for getting started';
    case 'starter':
      return 'For casual users';
    case 'pro':
      return 'Most popular for professionals';
    case 'enterprise':
      return 'For teams and power users';
    default:
      return '';
  }
}

// ============================================================================
// Pricing Card Component
// ============================================================================

function PricingCard({ plan, isHighlighted, index, isInView }: PricingCardProps) {
  const prefersReducedMotion = useReducedMotion();

  // Register URL - redirect to registration with plan pre-selected
  const registerUrl = `https://app.storyforge.cloud/register?plan=${plan.id}`;

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
                {feature.included ? (
                  <Check className="w-5 h-5" strokeWidth={2.5} />
                ) : (
                  <X className="w-5 h-5" strokeWidth={2.5} />
                )}
              </span>
              <span
                className={[
                  'text-sm font-body',
                  feature.included ? 'text-[#A0A0A0]' : 'text-[#666666] line-through',
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
          href={registerUrl}
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
// Loading Skeleton
// ============================================================================

function PricingSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {[0, 1, 2, 3].map((i) => (
        <GlassCard key={i} padding="lg" className="h-[420px] animate-pulse">
          <div className="text-center mb-6">
            <div className="h-7 bg-white/10 rounded w-24 mx-auto mb-3" />
            <div className="h-10 bg-white/10 rounded w-20 mx-auto mb-3" />
            <div className="h-4 bg-white/5 rounded w-32 mx-auto" />
          </div>
          <div className="space-y-3 mb-8">
            {[0, 1, 2, 3, 4, 5].map((j) => (
              <div key={j} className="h-5 bg-white/5 rounded w-full" />
            ))}
          </div>
          <div className="h-10 bg-white/10 rounded w-full mt-auto" />
        </GlassCard>
      ))}
    </div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export default function DynamicPricing() {
  const pricingContent = content.pricing;
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.1 });
  const [plans, setPlans] = useState<DisplayPlan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPlans() {
      try {
        const response = await fetchPlans();
        const displayPlans = response.plans
          .sort((a, b) => a.sort_order - b.sort_order)
          .map(planToDisplay);
        setPlans(displayPlans);
      } catch (err) {
        console.error('Failed to fetch plans:', err);
        setError('Failed to load pricing');
        // Fallback to static content
        setPlans(pricingContent.plans);
      } finally {
        setIsLoading(false);
      }
    }

    loadPlans();
  }, [pricingContent.plans]);

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
        {isLoading ? (
          <PricingSkeleton />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {plans.map((plan, index) => (
              <PricingCard
                key={plan.id}
                plan={plan}
                isHighlighted={plan.id === 'pro'}
                index={index}
                isInView={isInView}
              />
            ))}
          </div>
        )}

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
