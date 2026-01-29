'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/Button';
import { Container } from './ui/Container';
import { useReducedMotion } from '@/lib/motion';

// ============================================================================
// Types
// ============================================================================

export interface NavItem {
  label: string;
  href: string;
}

export interface NavigationProps {
  /**
   * Navigation links to display
   */
  navItems?: NavItem[];
}

// ============================================================================
// Constants
// ============================================================================

const DEFAULT_NAV_ITEMS: NavItem[] = [
  { label: 'Features', href: '#features' },
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

const APP_URL = 'https://app.storyforge.cloud';

// Height of the navigation for scroll padding
export const NAV_HEIGHT = 80;
export const NAV_HEIGHT_SHRUNK = 64;

// ============================================================================
// Component
// ============================================================================

/**
 * Navigation component with glassmorphism effect and responsive mobile menu.
 *
 * Features:
 * - Sticky positioning with shrink effect on scroll
 * - Glassmorphism backdrop blur
 * - Mobile hamburger menu with slide-in animation
 * - Focus trap for accessibility
 * - Smooth scrolling to anchor links
 * - Keyboard navigation (Escape to close mobile menu)
 */
export const Navigation: React.FC<NavigationProps> = ({
  navItems = DEFAULT_NAV_ITEMS,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Refs for focus trap
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);
  const lastFocusableRef = useRef<HTMLAnchorElement>(null);

  // Handle scroll event for shrink effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Set scroll padding for anchor links to account for fixed navigation
  useEffect(() => {
    document.documentElement.style.scrollPaddingTop = `${NAV_HEIGHT}px`;
    return () => {
      document.documentElement.style.scrollPaddingTop = '';
    };
  }, []);

  // Focus trap for mobile menu
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      const focusableElements = mobileMenuRef.current?.querySelectorAll<
        HTMLElement
      >(
        'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );

      if (!focusableElements || focusableElements.length === 0) return;

      const firstElement = focusableElements[0] as HTMLElement;
      const lastElement = focusableElements[
        focusableElements.length - 1
      ] as HTMLElement;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleTabKey);
    document.addEventListener('keydown', handleEscape);

    // Focus first element when menu opens
    firstFocusableRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleTabKey);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Handle smooth scroll to anchor
  const handleAnchorClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setIsMobileMenuOpen(false);

      const targetId = href.replace('#', '');
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        const offsetTop = targetElement.offsetTop - NAV_HEIGHT;
        const scrollOptions: ScrollToOptions = prefersReducedMotion
          ? { behavior: 'auto' as const }
          : { behavior: 'smooth' as const };

        window.scrollTo({
          top: offsetTop,
          ...scrollOptions,
        });

        // Set focus for accessibility
        targetElement.setAttribute('tabindex', '-1');
        targetElement.focus();
      }
    },
    [prefersReducedMotion]
  );

  // Toggle mobile menu
  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  // Navigation classes based on scroll state
  const navClasses = [
    'fixed top-0 left-0 right-0 z-[var(--z-sticky)]',
    'transition-all duration-fast ease-out-expo',
    'bg-[#0D0D0D]/80 backdrop-blur-md',
    'border-b border-white/10',
    isScrolled ? 'py-3' : 'py-5',
  ].join(' ');

  // Mobile menu panel classes
  const mobileMenuClasses = [
    'fixed inset-y-0 right-0 z-[var(--z-modal)]',
    'w-full max-w-sm bg-[#0D0D0D]',
    'border-l border-white/10',
    'shadow-glass',
    prefersReducedMotion
      ? isMobileMenuOpen
        ? 'opacity-100 translate-x-0'
        : 'opacity-0 translate-x-full'
      : 'transition-all duration-base ease-out-expo',
    !isMobileMenuOpen && prefersReducedMotion
      ? 'hidden'
      : isMobileMenuOpen || !prefersReducedMotion
        ? ''
        : 'hidden',
    isMobileMenuOpen || !prefersReducedMotion
      ? prefersReducedMotion
        ? ''
        : isMobileMenuOpen
          ? 'translate-x-0'
          : 'translate-x-full'
      : '',
  ].join(' ');

  // Overlay/backdrop classes
  const overlayClasses = [
    'fixed inset-0 bg-black/60 z-[var(--z-modal-backdrop)]',
    prefersReducedMotion
      ? isMobileMenuOpen
        ? 'opacity-100'
        : 'opacity-0 pointer-events-none'
      : 'transition-opacity duration-base ease-out-expo',
    isMobileMenuOpen || !prefersReducedMotion
      ? prefersReducedMotion
        ? ''
        : isMobileMenuOpen
          ? 'opacity-100'
          : 'opacity-0 pointer-events-none'
      : '',
  ].join(' ');

  // Logo container styles
  const logoContainerStyles: React.CSSProperties = {
    transition: prefersReducedMotion
      ? 'none'
      : 'transform 150ms cubic-bezier(0.19, 1, 0.22, 1)',
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav className={navClasses} aria-label="Main navigation">
        <Container>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a
              href="/"
              className="font-display font-bold text-xl tracking-tight flex items-center gap-0.5 hover:opacity-80 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded"
              style={logoContainerStyles}
            >
              StoryForge
              <span className="bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF] bg-clip-text text-transparent">
                .cloud
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <ul className="flex items-center gap-8">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(e) => handleAnchorClick(e, item.href)}
                      className="text-[#A0A0A0] hover:text-white transition-colors duration-fast focus:outline-none focus-visible:ring-2 focus-visible:ring-white rounded px-2 py-1 -mx-2 -my-1"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
              <Button
                variant="primary"
                size="md"
                gradient
                href={APP_URL}
                asLink
                className="hover-lift"
              >
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              ref={firstFocusableRef}
              type="button"
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              className="lg:hidden p-2 text-white hover:bg-[#1A1A1A] rounded-lg transition-colors duration-fast focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </Container>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={overlayClasses}
        aria-hidden="true"
        onClick={toggleMobileMenu}
      />

      {/* Mobile Menu Panel */}
      <div
        id="mobile-menu"
        ref={mobileMenuRef}
        className={mobileMenuClasses}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <span className="font-display font-bold text-lg">Menu</span>
            <button
              type="button"
              onClick={toggleMobileMenu}
              aria-label="Close menu"
              className="p-2 text-white hover:bg-[#1A1A1A] rounded-lg transition-colors duration-fast focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X className="w-6 h-6" aria-hidden="true" />
            </button>
          </div>

          {/* Mobile Menu Links */}
          <nav className="flex-1 overflow-y-auto p-6" aria-label="Mobile navigation">
            <ul className="flex flex-col gap-2">
              {navItems.map((item, index) => (
                <li key={item.href}>
                  <a
                    ref={index === navItems.length - 1 ? lastFocusableRef : undefined}
                    href={item.href}
                    onClick={(e) => handleAnchorClick(e, item.href)}
                    className="block px-4 py-3 text-lg text-[#A0A0A0] hover:text-white hover:bg-[#1A1A1A] rounded-lg transition-colors duration-fast focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mobile Menu CTA */}
          <div className="p-6 border-t border-white/10">
            <Button
              variant="primary"
              size="lg"
              gradient
              href={APP_URL}
              asLink
              fullWidth
              className="hover-lift"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>

      {/* Spacer for fixed navigation */}
      <div style={{ height: isScrolled ? NAV_HEIGHT_SHRUNK : NAV_HEIGHT }} aria-hidden="true" />
    </>
  );
};

Navigation.displayName = 'Navigation';
