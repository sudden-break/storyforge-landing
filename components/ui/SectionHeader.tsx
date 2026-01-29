'use client';

import React from 'react';
import { useReducedMotion, useInView, type AnimationPreset } from '@/lib/motion';

// ============================================================================
// Types
// ============================================================================

export type HeaderSize = 'sm' | 'md' | 'lg' | 'xl';
export type HeaderAlign = 'left' | 'center' | 'right';

export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Section title/headline
   */
  title: string;

  /**
   * Optional subtitle/description
   */
  subtitle?: string;

  /**
   * Size of the header
   * @default 'md'
   */
  size?: HeaderSize;

  /**
   * Alignment of the header
   * @default 'center'
   */
  align?: HeaderAlign;

  /**
   * Badge component to display
   */
  badge?: React.ReactNode;

  /**
   * Animation preset for entrance
   */
  animation?: AnimationPreset;

  /**
   * Max width of the header content
   * @default '2xl' (672px)
   */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'none';
}

// ============================================================================
// Size Styles
// ============================================================================

const titleSizeStyles: Record<HeaderSize, string> = {
  sm: 'text-2xl font-semibold',
  md: 'text-3xl md:text-4xl font-semibold',
  lg: 'text-4xl md:text-5xl font-bold',
  xl: 'text-5xl md:text-6xl font-bold',
};

const subtitleSizeStyles: Record<HeaderSize, string> = {
  sm: 'text-base',
  md: 'text-lg',
  lg: 'text-xl',
  xl: 'text-2xl',
};

const alignStyles: Record<HeaderAlign, string> = {
  left: 'text-left items-start',
  center: 'text-center items-center',
  right: 'text-right items-end',
};

const maxWidthClasses: Record<string, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  '2xl': 'max-w-2xl',
  '3xl': 'max-w-3xl',
  none: '',
};

// ============================================================================
// Component
// ============================================================================

/**
 * SectionHeader component for consistent section titles.
 *
 * Provides a standardized layout for section headers with optional
 * badge, subtitle, and alignment options.
 *
 * @example
 * ```tsx
 * <SectionHeader
 *   title="Everything You Need"
 *   subtitle="Powerful features for everyone"
 *   size="lg"
 *   align="center"
 * />
 * ```
 */
export const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  (
    {
      title,
      subtitle,
      size = 'md',
      align = 'center',
      badge,
      animation = 'fade-in',
      maxWidth = '2xl',
      className = '',
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();
    const { ref: inViewRef, isInView } = useInView({ threshold: 0.1 });

    const alignClass = alignStyles[align];
    const maxWidthStyles = maxWidthClasses[maxWidth];
    const mxClass = align === 'center' ? 'mx-auto' : '';

    const animationClass =
      !prefersReducedMotion && animation && isInView
        ? `animate-${animation}`
        : prefersReducedMotion || isInView
        ? ''
        : 'opacity-0';

    const containerClasses = [
      'flex',
      'flex-col',
      'gap-3',
      'md:gap-4',
      alignClass,
      maxWidthStyles,
      mxClass,
      animationClass,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const combinedRef = (node: HTMLDivElement | null) => {
      if (node) {
        if (typeof ref === 'function') ref(node);
        else if (ref) ref.current = node;
        inViewRef.current = node;
      }
    };

    return (
      <div ref={combinedRef} className={containerClasses} {...props}>
        {badge && <div className="flex justify-center">{badge}</div>}
        <h2 className={[titleSizeStyles[size], 'font-display letter-tight text-white'].join(' ')}>
          {title}
        </h2>
        {subtitle && (
          <p className={[subtitleSizeStyles[size], 'text-[#A0A0A0] font-body leading-relaxed'].join(' ')}>
            {subtitle}
          </p>
        )}
      </div>
    );
  }
);

SectionHeader.displayName = 'SectionHeader';
