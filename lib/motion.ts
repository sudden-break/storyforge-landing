'use client';

import React from 'react';

/**
 * Motion System - Animation utilities and reduced motion detection
 *
 * This module provides utilities for creating accessible animations
 * that respect the user's motion preferences.
 */

/**
 * Animation duration constants (in milliseconds)
 */
export const ANIMATION_DURATION = {
  fast: 150,
  base: 300,
  slow: 500,
} as const;

/**
 * Easing functions for smooth animations
 */
export const EASING = {
  easeOutExpo: 'cubic-bezier(0.19, 1, 0.22, 1)',
  easeInOutCubic: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  easeOutCubic: 'cubic-bezier(0.33, 1, 0.68, 1)',
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
} as const;

/**
 * Stagger delay steps (in milliseconds)
 * Use these for sequential animations in lists/grids
 */
export const STAGGER_DELAY = {
  none: 0,
  1: 50,
  2: 100,
  3: 150,
  4: 200,
  5: 250,
  6: 300,
  7: 350,
  8: 400,
} as const;

/**
 * Animation preset types
 */
export type AnimationPreset =
  | 'fade-in'
  | 'fade-out'
  | 'slide-up'
  | 'slide-down'
  | 'slide-left'
  | 'slide-right'
  | 'scale-in'
  | 'scale-out'
  | 'spin'
  | 'pulse'
  | 'bounce'
  | 'shimmer';

/**
 * Get CSS class for animation preset
 */
export function getAnimationClass(
  preset: AnimationPreset,
  duration: keyof typeof ANIMATION_DURATION = 'base'
): string {
  return `animate-${preset} duration-${duration}`;
}

/**
 * Check if reduced motion is preferred on the server side
 * This is a conservative default - assumes animations are OK
 */
export function isReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * React hook to detect reduced motion preference
 *
 * @returns boolean - true if user prefers reduced motion
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const prefersReducedMotion = useReducedMotion();
 *   return (
 *     <div className={prefersReducedMotion ? 'no-animation' : 'animate-fade-in'}>
 *       Content
 *     </div>
 *   );
 * }
 * ```
 */
export function useReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;

  // Client-side only hook
  const [prefersReducedMotion, setPrefersReducedMotion] = React.useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
    // Legacy fallback
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }

    return undefined;
  }, []);

  return prefersReducedMotion;
}

/**
 * Get animation styles respecting reduced motion preference
 *
 * @param prefersReducedMotion - Whether to disable animations
 * @param options - Animation configuration
 * @returns CSS style object
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const reducedMotion = useReducedMotion();
 *   const animationStyle = getAnimationStyle(reducedMotion, {
 *     duration: 'base',
 *     easing: EASING.easeOutExpo,
 *   });
 *
 *   return <div style={animationStyle}>Content</div>;
 * }
 * ```
 */
export function getAnimationStyle(
  prefersReducedMotion: boolean,
  options: {
    duration?: keyof typeof ANIMATION_DURATION;
    easing?: string;
    delay?: number;
  } = {}
): React.CSSProperties {
  if (prefersReducedMotion) {
    return {
      animation: 'none',
      transition: 'none',
    };
  }

  const { duration = 'base', easing = EASING.easeOutExpo, delay = 0 } = options;

  return {
    animationDuration: `${ANIMATION_DURATION[duration]}ms`,
    animationTimingFunction: easing,
    animationDelay: `${delay}ms`,
    transitionDuration: `${ANIMATION_DURATION[duration]}ms`,
    transitionTimingFunction: easing,
    transitionDelay: `${delay}ms`,
  };
}

/**
 * Props for animated components
 */
export interface MotionProps {
  /**
   * Animation preset to apply
   */
  animation?: AnimationPreset;

  /**
   * Animation duration
   */
  duration?: keyof typeof ANIMATION_DURATION;

  /**
   * Stagger delay step
   */
  stagger?: keyof typeof STAGGER_DELAY;

  /**
   * Whether to respect reduced motion preference
   * @default true
   */
  respectReducedMotion?: boolean;

  /**
   * CSS class name
   */
  className?: string;

  /**
   * Children to animate
   */
  children: React.ReactNode;
}

/**
 * Internal props for the withMotion wrapper
 */
interface MotionWrapperProps extends MotionProps {
  [key: string]: any;
}

/**
 * Create a motion component with the specified HTML element
 */
function createMotionComponent(
  tagName: string,
  defaultAnimation?: AnimationPreset
): React.ForwardRefExoticComponent<MotionProps & React.RefAttributes<HTMLElement>> {
  const MotionComponent = React.forwardRef<HTMLElement, MotionProps>(
    (
      {
        animation = defaultAnimation,
        duration = 'base',
        stagger,
        respectReducedMotion = true,
        className = '',
        children,
        ...props
      },
      ref
    ) => {
      const prefersReducedMotion = respectReducedMotion ? useReducedMotion() : false;

      const motionClasses = [
        className,
        !prefersReducedMotion && animation ? `animate-${animation}` : '',
        !prefersReducedMotion ? `duration-${duration}` : '',
        !prefersReducedMotion && stagger ? `stagger-${stagger}` : '',
        prefersReducedMotion ? 'motion-reduce' : '',
      ]
        .filter(Boolean)
        .join(' ');

      return React.createElement(
        tagName,
        { ...props, ref, className: motionClasses || undefined },
        children
      );
    }
  );

  MotionComponent.displayName = `Motion.${tagName.charAt(0).toUpperCase() + tagName.slice(1)}`;

  return MotionComponent;
}

/**
 * HOC that adds motion classes respecting reduced motion
 *
 * @example
 * ```tsx
 * const AnimatedDiv = withMotion('div');
 * <AnimatedDiv animation="fade-in" stagger={1}>Content</AnimatedDiv>
 * ```
 */
export function withMotion(
  tagName: string,
  defaultAnimation?: AnimationPreset
): React.ForwardRefExoticComponent<MotionProps & React.RefAttributes<HTMLElement>> {
  return createMotionComponent(tagName, defaultAnimation);
}

/**
 * Pre-configured motion components
 */
export const Motion = {
  Div: createMotionComponent('div'),
  Span: createMotionComponent('span'),
  Section: createMotionComponent('section'),
  Article: createMotionComponent('article'),
};

/**
 * Intersection observer hook for scroll-triggered animations
 *
 * @param options - Intersection Observer options
 * @returns ref and isInView state
 *
 * @example
 * ```tsx
 * function ScrollAnimatedComponent() {
 *   const { ref, isInView } = useInView<HTMLDivElement>({ threshold: 0.1 });
 *   const reducedMotion = useReducedMotion();
 *
 *   return (
 *     <div
 *       ref={ref}
 *       className={isInView && !reducedMotion ? 'animate-fade-in' : ''}
 *     >
 *       Content
 *     </div>
 *   );
 * }
 * ```
 */
export function useInView<T extends HTMLElement = HTMLElement>(
  options: IntersectionObserverInit = {}
): { ref: React.RefObject<T | null>; isInView: boolean } {
  const ref = React.useRef<T | null>(null);
  const [isInView, setIsInView] = React.useState(false);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        // Optional: disconnect after first trigger
        // observer.disconnect();
      } else {
        const threshold = options.threshold;
        // Reset when out of view for repeat animations (unless threshold is 1)
        const shouldReset = threshold === undefined ||
          (Array.isArray(threshold) ? threshold[0] : threshold) < 1;
        if (shouldReset) {
          setIsInView(false);
        }
      }
    }, { threshold: 0.1, ...options });

    observer.observe(element);

    return () => observer.disconnect();
  }, [options.threshold]);

  return { ref, isInView };
}
