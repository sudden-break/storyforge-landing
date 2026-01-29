'use client';

import React from 'react';
import { useReducedMotion } from '@/lib/motion';

// ============================================================================
// Types
// ============================================================================

export type BadgeVariant = 'default' | 'popular' | 'premium' | 'new' | 'success' | 'warning';
export type BadgeSize = 'sm' | 'md';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Visual variant of the badge
   * @default 'default'
   */
  variant?: BadgeVariant;

  /**
   * Size of the badge
   * @default 'sm'
   */
  size?: BadgeSize;

  /**
   * Display as a dot/indicator only
   * @default false
   */
  dot?: boolean;

  /**
   * Child content
   */
  children?: React.ReactNode;
}

// ============================================================================
// Variant Styles
// ============================================================================

const baseStyles = [
  'inline-flex',
  'items-center',
  'gap-1.5',
  'font-medium',
  'font-body',
  'transition-colors',
  'duration-fast',
  'ease-out-expo',
].join(' ');

const variantStyles: Record<BadgeVariant, { bg: string; text: string; dot: string }> = {
  default: {
    bg: 'bg-[#1A1A1A]',
    text: 'text-[#A0A0A0]',
    dot: 'bg-[#A0A0A0]',
  },

  popular: {
    bg: 'bg-[#F58529]/10',
    text: 'text-[#F58529]',
    dot: 'bg-[#F58529]',
  },

  premium: {
    bg: 'bg-gradient-to-r from-[#DD2A7B]/10 to-[#8134AF]/10',
    text: 'text-transparent bg-clip-text bg-gradient-to-r from-[#DD2A7B] to-[#8134AF]',
    dot: 'bg-[#DD2A7B]',
  },

  new: {
    bg: 'bg-[#00D4FF]/10',
    text: 'text-[#00D4FF]',
    dot: 'bg-[#00D4FF]',
  },

  success: {
    bg: 'bg-[#00D26A]/10',
    text: 'text-[#00D26A]',
    dot: 'bg-[#00D26A]',
  },

  warning: {
    bg: 'bg-[#FFC947]/10',
    text: 'text-[#FFC947]',
    dot: 'bg-[#FFC947]',
  },
};

const sizeStyles: Record<BadgeSize, { padding: string; text: string; dot: string }> = {
  sm: {
    padding: 'px-2 py-0.5',
    text: 'text-xs',
    dot: 'w-1.5 h-1.5',
  },
  md: {
    padding: 'px-2.5 py-1',
    text: 'text-sm',
    dot: 'w-2 h-2',
  },
};

// ============================================================================
// Component
// ============================================================================

/**
 * Badge component for status indicators and labels.
 *
 * Commonly used for "Popular", "Premium", "New" tags on pricing cards
 * and feature lists.
 *
 * @example
 * ```tsx
 * <Badge variant="premium">Premium</Badge>
 * <Badge variant="new" dot>New Feature</Badge>
 * ```
 */
export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      variant = 'default',
      size = 'sm',
      dot = false,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();
    const styles = variantStyles[variant];
    const sizeClass = sizeStyles[size];

    const classes = [
      baseStyles,
      styles.bg,
      styles.text,
      sizeClass.padding,
      sizeClass.text,
      'rounded-full',
      !prefersReducedMotion && 'hover-scale',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <span ref={ref} className={classes} {...props}>
        {dot && (
          <span
            className={[sizeClass.dot, styles.dot, 'rounded-full'].join(' ')}
            aria-hidden="true"
          />
        )}
        {children && <span>{children}</span>}
      </span>
    );
  }
);

Badge.displayName = 'Badge';
