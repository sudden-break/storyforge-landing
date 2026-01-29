'use client';

import React from 'react';
import { Loader2 } from 'lucide-react';
import { useReducedMotion } from '@/lib/motion';

// ============================================================================
// Types
// ============================================================================

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'href'> {
  /**
   * Visual variant of the button
   * @default 'primary'
   */
  variant?: ButtonVariant;

  /**
   * Size of the button
   * @default 'md'
   */
  size?: ButtonSize;

  /**
   * Apply Instagram gradient background
   * @default false
   */
  gradient?: boolean;

  /**
   * Show loading state with spinner
   * @default false
   */
  loading?: boolean;

  /**
   * Icon element to display before text
   */
  iconLeft?: React.ReactNode;

  /**
   * Icon element to display after text
   */
  iconRight?: React.ReactNode;

  /**
   * Button displays as full width
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Render as an anchor link instead of button
   * @default false
   */
  asLink?: boolean;

  /**
   * URL when rendering as a link
   */
  href?: string;

  /**
   * Link target (e.g., '_blank' for external links)
   */
  target?: string;

  /**
   * Link rel attribute (e.g., 'noopener noreferrer' for external links)
   */
  rel?: string;

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
  'justify-center',
  'gap-2',
  'font-medium',
  'font-display',
  'letter-tight',
  'transition-all',
  'duration-fast',
  'ease-out-expo',
  'focus:outline-none',
  'focus-visible:ring-2',
  'focus-visible:ring-offset-2',
  'focus-visible:ring-offset-[#0D0D0D]',
  'disabled:opacity-50',
  'disabled:cursor-not-allowed',
  'disabled:pointer-events-none',
].join(' ');

const variantStyles: Record<ButtonVariant, string> = {
  primary: [
    'bg-white',
    'text-[#0D0D0D]',
    'hover:bg-[#E8E8E8]',
    'active:bg-[#D4D4D4]',
    'focus-visible:ring-white',
  ].join(' '),

  secondary: [
    'bg-[#1A1A1A]',
    'text-white',
    'border',
    'border-[#333333]',
    'hover:bg-[#222222]',
    'hover:border-[#444444]',
    'active:bg-[#2A2A2A]',
    'focus-visible:ring-[#00D4FF]',
  ].join(' '),

  ghost: [
    'bg-transparent',
    'text-white',
    'hover:bg-[#1A1A1A]',
    'active:bg-[#222222]',
    'focus-visible:ring-[#00D4FF]',
  ].join(' '),

  danger: [
    'bg-[#FF4757]',
    'text-white',
    'hover:bg-[#E64250]',
    'active:bg-[#CC3D48]',
    'focus-visible:ring-[#FF4757]',
  ].join(' '),
};

const gradientStyles = [
  'bg-gradient-to-r',
  'from-[#F58529]',
  'via-[#DD2A7B]',
  'to-[#8134AF]',
  'text-white',
  'hover:opacity-90',
  'active:opacity-80',
  'focus-visible:ring-[#DD2A7B]',
  'shadow-glow-ig',
].join(' ');

const sizeStyles: Record<ButtonSize, { padding: string; text: string; icon: string }> = {
  sm: {
    padding: 'px-3 py-1.5',
    text: 'text-sm',
    icon: 'w-4 h-4',
  },
  md: {
    padding: 'px-5 py-2.5',
    text: 'text-base',
    icon: 'w-5 h-5',
  },
  lg: {
    padding: 'px-6 py-3',
    text: 'text-lg',
    icon: 'w-5 h-5',
  },
};

// ============================================================================
// Component
// ============================================================================

/**
 * Button component with multiple variants and sizes.
 *
 * Supports reduced motion preferences and includes proper accessibility attributes.
 * Can render as a button or as an anchor link.
 *
 * @example
 * ```tsx
 * // As a button
 * <Button variant="primary" size="md" gradient>
 *   Get Started
 * </Button>
 *
 * // As a link
 * <Button variant="primary" size="md" gradient asLink href="https://example.com">
 *   Learn More
 * </Button>
 * ```
 */
export const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>(
  (
    {
      variant = 'primary',
      size = 'md',
      gradient = false,
      loading = false,
      iconLeft,
      iconRight,
      fullWidth = false,
      asLink = false,
      href,
      target,
      rel,
      disabled,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();

    const sizeClass = sizeStyles[size];
    const variantClass = gradient ? gradientStyles : variantStyles[variant];

    const classes = [
      baseStyles,
      variantClass,
      sizeClass.padding,
      sizeClass.text,
      'rounded-lg',
      fullWidth && 'w-full',
      prefersReducedMotion ? '' : 'hover-lift',
      disabled && 'opacity-50 cursor-not-allowed pointer-events-none',
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const iconSizeClass = sizeClass.icon;

    // Shared content rendering
    const content = (
      <>
        {loading ? (
          <Loader2 className={[iconSizeClass, 'animate-spin'].join(' ')} aria-hidden="true" />
        ) : iconLeft ? (
          <span className={iconSizeClass} aria-hidden="true">
            {iconLeft}
          </span>
        ) : null}

        {children && <span>{children}</span>}

        {!loading && iconRight && (
          <span className={iconSizeClass} aria-hidden="true">
            {iconRight}
          </span>
        )}
      </>
    );

    // Render as anchor link
    if (asLink && href) {
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target}
          rel={rel}
          className={classes}
          aria-busy={loading}
          {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    // Render as button
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        disabled={disabled || loading}
        className={classes}
        aria-busy={loading}
        {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';
