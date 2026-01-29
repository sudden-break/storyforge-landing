'use client';

import React from 'react';
import { useReducedMotion } from '@/lib/motion';

// ============================================================================
// Types
// ============================================================================

export type GlassVariant = 'default' | 'subtle' | 'gradient';
export type GlassPadding = 'none' | 'sm' | 'md' | 'lg';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Visual variant of the glass effect
   * @default 'default'
   */
  variant?: GlassVariant;

  /**
   * Padding inside the card
   * @default 'md'
   */
  padding?: GlassPadding;

  /**
   * Apply hover lift effect
   * @default false
   */
  hover?: boolean;

  /**
   * Apply border glow effect
   * @default false
   */
  glow?: boolean;

  /**
   * Child content
   */
  children: React.ReactNode;
}

// ============================================================================
// Variant Styles
// ============================================================================

const baseStyles = [
  'rounded-xl',
  'transition-all',
  'duration-base',
  'ease-out-expo',
].join(' ');

const variantStyles: Record<GlassVariant, string> = {
  default: [
    'bg-[#222222]/60',
    'backdrop-blur-md',
    'border',
    'border-white/10',
  ].join(' '),

  subtle: [
    'bg-[#1A1A1A]/40',
    'backdrop-blur-sm',
    'border',
    'border-white/5',
  ].join(' '),

  gradient: [
    'bg-gradient-to-br',
    'from-white/10',
    'to-white/5',
    'backdrop-blur-lg',
    'border',
    'border-white/15',
    'shadow-glass',
  ].join(' '),
};

const paddingStyles: Record<GlassPadding, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

const glowStyles = [
  'hover:shadow-glow',
  'hover:border-[#00D4FF]/30',
].join(' ');

// ============================================================================
// Component
// ============================================================================

/**
 * GlassCard component with glassmorphism effect.
 *
 * Uses backdrop-blur and semi-transparent backgrounds for a modern
 * frosted glass appearance.
 *
 * @example
 * ```tsx
 * <GlassCard variant="gradient" hover glow>
 *   <h3>Title</h3>
 *   <p>Content</p>
 * </GlassCard>
 * ```
 */
export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      variant = 'default',
      padding = 'md',
      hover = false,
      glow = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();

    const classes = [
      baseStyles,
      variantStyles[variant],
      paddingStyles[padding],
      !prefersReducedMotion && hover && 'hover-lift',
      !prefersReducedMotion && glow && glowStyles,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';
