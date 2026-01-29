'use client';

import React from 'react';
import { Sparkles, Eye } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { Badge } from './ui/Badge';
import { useReducedMotion } from '@/lib/motion';

// ============================================================================
// Types
// ============================================================================

export interface AppMockupProps {
  /**
   * Additional CSS classes
   */
  className?: string;
}

// ============================================================================
// Story Card Component (internal)
// ============================================================================

interface StoryCardProps {
  variant: 'new' | 'ai' | 'archived';
  index: number;
}

const StoryCard: React.FC<StoryCardProps> = ({ variant, index }) => {
  const prefersReducedMotion = useReducedMotion();

  // Different gradient for each variant
  const gradients = {
    new: 'from-[#F58529] via-[#DD2A7B] to-[#8134AF]',
    ai: 'from-[#00D4FF] via-[#515BD4] to-[#8134AF]',
    archived: 'from-[#666666] via-[#444444] to-[#333333]',
  };

  return (
    <div
      className={`
        relative rounded-lg overflow-hidden
        bg-[#1A1A1A] border border-white/5
        transition-transform duration-base ease-out-expo
        ${!prefersReducedMotion ? 'hover:scale-105' : ''}
      `}
      style={
        !prefersReducedMotion
          ? { animationDelay: `${index * 100}ms` }
          : undefined
      }
    >
      {/* Thumbnail placeholder with Instagram gradient */}
      <div
        className={`
          h-full w-full bg-gradient-to-br ${gradients[variant]}
          opacity-80
        `}
      >
        {/* Simulated story content lines */}
        <div className="p-3 space-y-2">
          <div className="h-2 bg-white/20 rounded w-3/4" />
          <div className="h-2 bg-white/10 rounded w-1/2" />
        </div>
      </div>

      {/* AI Badge for AI variant */}
      {variant === 'ai' && (
        <div className="absolute top-2 right-2">
          <div className="flex items-center gap-1 bg-[#00D4FF]/90 text-black text-[10px] px-1.5 py-0.5 rounded-full font-medium">
            <Sparkles size={10} />
            <span>AI</span>
          </div>
        </div>
      )}

      {/* Eye icon for new stories */}
      {variant === 'new' && (
        <div className="absolute bottom-2 right-2">
          <div className="bg-white/20 backdrop-blur-sm p-1 rounded-full">
            <Eye size={12} className="text-white" />
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================================================
// Mockup Header Component (internal)
// ============================================================================

const MockupHeader: React.FC = () => {
  return (
    <div className="flex items-center justify-between mb-4">
      {/* Window controls */}
      <div className="flex items-center gap-1.5">
        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
      </div>

      {/* Search bar placeholder */}
      <div className="flex-1 mx-4">
        <div className="h-6 bg-[#1A1A1A]/50 rounded-lg border border-white/5 max-w-[200px] mx-auto" />
      </div>

      {/* User avatar placeholder */}
      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#DD2A7B] to-[#8134AF]" />
    </div>
  );
};

// ============================================================================
// Stats Row Component (internal)
// ============================================================================

const StatsRow: React.FC = () => {
  const stats = [
    { label: 'Stories', value: '24' },
    { label: 'AI Generated', value: '12' },
    { label: 'Archived', value: '156' },
  ];

  return (
    <div className="grid grid-cols-3 gap-2 mb-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-[#1A1A1A]/40 rounded-lg p-2 text-center border border-white/5"
        >
          <div className="text-lg font-semibold text-white">{stat.value}</div>
          <div className="text-[10px] text-[#A0A0A0]">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

// ============================================================================
// Main Component
// ============================================================================

/**
 * AppMockup - A stylized dashboard mockup for the Hero section
 *
 * This component creates an abstract, lightweight representation of the
 * StoryForge dashboard using only CSS and SVG. It features:
 *
 * - Glassmorphism effect via GlassCard
 * - Abstract story cards with Instagram gradients
 * - AI generation badge
 * - Gentle floating animation
 * - Responsive sizing
 *
 * @example
 * ```tsx
 * <AppMockup />
 * ```
 */
export const AppMockup = React.forwardRef<HTMLDivElement, AppMockupProps>(
  ({ className = '' }, ref) => {
    const prefersReducedMotion = useReducedMotion();

    // Story cards configuration
    const storyCards: Array<{ variant: StoryCardProps['variant']; aspect: string }> = [
      { variant: 'new', aspect: 'aspect-[9/16]' },
      { variant: 'ai', aspect: 'aspect-[9/16]' },
      { variant: 'archived', aspect: 'aspect-[9/16]' },
      { variant: 'new', aspect: 'aspect-[9/16]' },
      { variant: 'ai', aspect: 'aspect-[9/16]' },
      { variant: 'archived', aspect: 'aspect-[9/16]' },
      { variant: 'new', aspect: 'aspect-[9/16]' },
      { variant: 'ai', aspect: 'aspect-[9/16]' },
    ];

    const classes = [
      'relative',
      'w-full',
      !prefersReducedMotion && 'animate-float',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes}>
        <GlassCard
          variant="gradient"
          padding="md"
          className="overflow-hidden"
        >
          {/* Mockup Header */}
          <MockupHeader />

          {/* Stats Row */}
          <StatsRow />

          {/* Section Header */}
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-white">Recent Stories</h3>
            <Badge variant="new" size="sm">
              <Sparkles size={10} />
              AI Active
            </Badge>
          </div>

          {/* Story Cards Grid */}
          <div className="grid grid-cols-4 gap-2">
            {storyCards.map((card, index) => (
              <div
                key={index}
                className={card.aspect}
              >
                <StoryCard variant={card.variant} index={index} />
              </div>
            ))}
          </div>

          {/* Bottom Status Bar */}
          <div className="mt-4 flex items-center justify-between text-[10px] text-[#666666]">
            <span>StoryForge Dashboard</span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00D26A] animate-pulse" />
              Monitoring Active
            </span>
          </div>
        </GlassCard>

        {/* Decorative glow behind */}
        {!prefersReducedMotion && (
          <div
            className="absolute -inset-4 -z-10 rounded-3xl opacity-30 blur-2xl"
            style={{
              background: 'linear-gradient(135deg, #DD2A7B 0%, #8134AF 50%, #515BD4 100%)',
            }}
          />
        )}
      </div>
    );
  }
);

AppMockup.displayName = 'AppMockup';

// Default export for convenience
export default AppMockup;
