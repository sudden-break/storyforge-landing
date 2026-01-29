'use client';

import React from 'react';

// ============================================================================
// Types
// ============================================================================

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type ContainerPadding = 'none' | 'sm' | 'md' | 'lg';

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Maximum width of the container
   * @default 'xl'
   */
  size?: ContainerSize;

  /**
   * Horizontal padding
   * @default 'md'
   */
  padding?: ContainerPadding;

  /**
   * Center the container horizontally
   * @default true
   */
  centered?: boolean;

  /**
   * Child content
   */
  children: React.ReactNode;
}

// ============================================================================
// Size Styles
// ============================================================================

const sizeStyles: Record<ContainerSize, string> = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
  full: 'max-w-full',
};

const paddingStyles: Record<ContainerPadding, string> = {
  none: '',
  sm: 'px-4',
  md: 'px-6',
  lg: 'px-8',
};

// ============================================================================
// Component
// ============================================================================

/**
 * Container component for consistent layout width and padding.
 *
 * Provides a responsive container with configurable max-width and
 * horizontal padding for content sections.
 *
 * @example
 * ```tsx
 * <Container size="xl" padding="md">
 *   <section>Content</section>
 * </Container>
 * ```
 */
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      size = 'xl',
      padding = 'md',
      centered = true,
      className = '',
      children,
      ...props
    },
    ref
  ) => {
    const classes = [
      sizeStyles[size],
      paddingStyles[padding],
      centered && 'mx-auto',
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

Container.displayName = 'Container';
