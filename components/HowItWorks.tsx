'use client';

import { Users, Eye, Sparkles } from 'lucide-react';
import { SectionHeader } from './ui/SectionHeader';
import { useInView, useReducedMotion, STAGGER_DELAY } from '@/lib/motion';
import content from '@/data/content';

// ============================================================================
// Types
// ============================================================================

interface StepProps {
  step: typeof content.howItWorks.steps[number];
  index: number;
  isInView: boolean;
  prefersReducedMotion: boolean;
}

// ============================================================================
// Icon Mapping
// ============================================================================

const iconMap = {
  Users,
  Eye,
  Sparkles,
} as const;

// ============================================================================
// Step Component
// ============================================================================

function Step({ step, index, isInView, prefersReducedMotion }: StepProps) {
  const Icon = iconMap[step.icon as keyof typeof iconMap] || Sparkles;
  const stepNumber = `0${index + 1}`;

  const getAnimationDelay = () => {
    if (prefersReducedMotion) return {};
    return {
      animationDelay: `${STAGGER_DELAY[(index + 1) as keyof typeof STAGGER_DELAY]}ms`,
    };
  };

  const getStepClass = () => {
    const baseClasses = [
      'relative',
      'flex',
      'flex-col',
      'items-center',
      'text-center',
      'p-6',
      'md:p-8',
    ];

    const animationClasses = isInView && !prefersReducedMotion
      ? ['animate-slide-up', 'opacity-100']
      : ['opacity-0', 'transition-opacity', 'duration-300'];

    return [...baseClasses, ...animationClasses].join(' ');
  };

  return (
    <div className={getStepClass()} style={getAnimationDelay()}>
      {/* Step Number with Gradient */}
      <div className="relative mb-6">
        <div className="text-6xl md:text-7xl font-bold bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF] bg-clip-text text-transparent opacity-20">
          {stepNumber}
        </div>

        {/* Icon Circle - Positioned to overlap the number */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-[#1A1A1A] to-[#222222] border border-[#333333] flex items-center justify-center shadow-lg">
            <Icon className="w-8 h-8 md:w-10 md:h-10 text-[#DD2A7B]" strokeWidth={1.5} />
          </div>
        </div>
      </div>

      {/* Step Title */}
      <h3 className="text-xl md:text-2xl font-semibold text-white mb-3 font-display">
        {step.title}
      </h3>

      {/* Step Description */}
      <p className="text-[#A0A0A0] text-base leading-relaxed max-w-sm font-body">
        {step.description}
      </p>
    </div>
  );
}

// ============================================================================
// Connection Lines
// ============================================================================

interface ConnectionLineProps {
  isInView: boolean;
  prefersReducedMotion: boolean;
}

function HorizontalConnectionLine({ isInView, prefersReducedMotion }: ConnectionLineProps) {
  const lineClass = isInView && !prefersReducedMotion
    ? 'animate-scale-x opacity-100'
    : 'opacity-0 scale-x-0';

  return (
    <div
      className={[
        'hidden md:block absolute top-1/2 left-1/6 right-1/6 h-0.5 -translate-y-1/2 -z-10',
        'origin-left',
        'transition-all duration-500 ease-out',
        lineClass,
      ].join(' ')}
    >
      <div className="h-full w-full bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] opacity-30" />
    </div>
  );
}

function VerticalConnectionLine({ isInView, prefersReducedMotion }: ConnectionLineProps) {
  const lineClass = isInView && !prefersReducedMotion
    ? 'animate-scale-y opacity-100'
    : 'opacity-0 scale-y-0';

  return (
    <div
      className={[
        'md:hidden absolute left-8 top-24 bottom-24 w-0.5 -z-10',
        'origin-top',
        'transition-all duration-500 ease-out',
        lineClass,
      ].join(' ')}
    >
      <div className="h-full w-full bg-gradient-to-b from-[#F58529] via-[#DD2A7B] to-[#8134AF] opacity-30" />
    </div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

/**
 * HowItWorks section explaining the 3-step process.
 *
 * Features:
 * - Horizontal layout on desktop with connection lines
 * - Vertical layout on mobile with vertical connection line
 * - Large gradient numbers (01, 02, 03)
 * - Scroll-triggered animations with stagger
 * - Anchor link: #how-it-works
 */
export default function HowItWorks() {
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  const { title, subtitle, steps } = content.howItWorks;

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Section Header */}
      <div className="mb-16 md:mb-24">
        <SectionHeader
          title={title}
          subtitle={subtitle}
          size="lg"
          align="center"
          animation="fade-in"
        />
      </div>

      {/* Steps Container */}
      <div className="relative">
        {/* Desktop: Horizontal connection line */}
        <HorizontalConnectionLine isInView={isInView} prefersReducedMotion={prefersReducedMotion} />

        {/* Mobile: Vertical connection line */}
        <VerticalConnectionLine isInView={isInView} prefersReducedMotion={prefersReducedMotion} />

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 relative z-10">
          {steps.map((step, index) => (
            <Step
              key={step.id}
              step={step}
              index={index}
              isInView={isInView}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>
      </div>

      {/* Background gradient decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#DD2A7B] blur-[200px] opacity-5 -z-20" />
    </section>
  );
}
