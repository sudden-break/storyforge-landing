'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useReducedMotion } from '@/lib/motion';

// ============================================================================
// Types
// ============================================================================

export interface AccordionItemProps {
  /**
   * Unique identifier for the accordion item
   */
  id: string;

  /**
   * The question or title text
   */
  title: string;

  /**
   * The answer or content to display when expanded
   */
  content: React.ReactNode;

  /**
   * Whether the item is initially open
   * @default false
   */
  defaultOpen?: boolean;
}

export interface AccordionProps {
  /**
   * Array of accordion items
   */
  items: Omit<AccordionItemProps, 'id'>[] | AccordionItemProps[];

  /**
   * Allow multiple items to be open at once
   * @default false
   */
  allowMultiple?: boolean;

  /**
   * Index of the item that should be open by default (0-based)
   * Only applies when allowMultiple is false
   * @default 0
   */
  defaultOpenIndex?: number;

  /**
   * Additional CSS class for the accordion container
   */
  className?: string;
}

// ============================================================================
// Internal Components
// ============================================================================

interface SingleAccordionItemProps extends Omit<AccordionItemProps, 'id'> {
  isOpen: boolean;
  onToggle: () => void;
  index: number;
  prefersReducedMotion: boolean;
}

/**
 * Single accordion item with header and expandable content
 */
function AccordionItem({
  title,
  content,
  isOpen,
  onToggle,
  index,
  prefersReducedMotion,
}: SingleAccordionItemProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number>(0);

  // Calculate content height for smooth animation
  useEffect(() => {
    if (contentRef.current) {
      if (isOpen) {
        setHeight(contentRef.current.scrollHeight);
      } else {
        setHeight(0);
      }
    }
  }, [isOpen]);

  // Generate unique IDs for ARIA attributes
  const headerId = `accordion-header-${index}`;
  const contentId = `accordion-content-${index}`;

  // Keyboard handler
  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onToggle();
    }
  };

  return (
    <div className="border-b border-white/10 last:border-b-0">
      <button
        id={headerId}
        type="button"
        className={`
          flex w-full items-center justify-between gap-4
          py-4 text-left font-display text-lg font-medium
          text-white transition-colors duration-fast
          hover:text-white/80 focus:text-white/80
          focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00D4FF]
          focus-visible:ring-offset-2 focus-visible:ring-offset-[#0D0D0D]
          ${isOpen ? 'text-white' : 'text-white/90'}
        `}
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-controls={contentId}
      >
        <span className="pr-4">{title}</span>
        <ChevronDown
          className={`
            flex-shrink-0 transition-transform duration-base ease-out-expo
            ${isOpen ? 'rotate-180' : 'rotate-0'}
            ${prefersReducedMotion ? 'transition-none' : ''}
          `}
          aria-hidden="true"
          width={20}
          height={20}
        />
      </button>

      <div
        id={contentId}
        ref={contentRef}
        className="overflow-hidden"
        style={{
          maxHeight: prefersReducedMotion ? (isOpen ? '1000px' : '0px') : `${height}px`,
          transition: prefersReducedMotion
            ? 'none'
            : 'max-height 300ms cubic-bezier(0.19, 1, 0.22, 1)',
        }}
        role="region"
        aria-labelledby={headerId}
      >
        <div className="pb-4 pr-8 text-base text-[#A0A0A0] leading-relaxed">
          {content}
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

/**
 * Accordion component for FAQ-style expandable content.
 *
 * Features:
 * - Smooth expand/collapse animations
 * - Keyboard navigation (Enter/Space to toggle)
 * - Proper ARIA attributes for accessibility
 * - Respects prefers-reduced-motion
 * - Single or multiple items open mode
 *
 * @example
 * ```tsx
 * // Single item open mode (default)
 * <Accordion
 *   items={[
 *     { title: 'Question 1', content: 'Answer 1' },
 *     { title: 'Question 2', content: 'Answer 2' },
 *   ]}
 *   defaultOpenIndex={0}
 * />
 *
 * // Multiple items open mode
 * <Accordion
 *   items={[
 *     { title: 'Question 1', content: 'Answer 1' },
 *     { title: 'Question 2', content: 'Answer 2' },
 *   ]}
 *   allowMultiple
 * />
 * ```
 */
export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>(
  (
    {
      items,
      allowMultiple = false,
      defaultOpenIndex = 0,
      className = '',
    },
    ref
  ) => {
    const prefersReducedMotion = useReducedMotion();

    // State for tracking open items
    const [openIndices, setOpenIndices] = useState<Set<number>>(() => {
      if (allowMultiple) {
        return new Set<number>([]);
      }
      return new Set<number>([defaultOpenIndex]);
    });

    // Handle item toggle
    const handleToggle = (index: number) => {
      setOpenIndices((prev) => {
        const newSet = new Set(prev);

        if (allowMultiple) {
          // Toggle the clicked item
          if (newSet.has(index)) {
            newSet.delete(index);
          } else {
            newSet.add(index);
          }
        } else {
          // Single mode: close all, open clicked (unless already open)
          newSet.clear();
          if (!prev.has(index)) {
            newSet.add(index);
          }
        }

        return newSet;
      });
    };

    // Ensure items have unique IDs - type-safe mapping
    const itemsWithIds: AccordionItemProps[] = items.map((item, index) => ({
      ...item,
      id: (item as any).id || `accordion-item-${index}`,
    }));

    return (
      <div ref={ref} className={className}>
        {itemsWithIds.map((item, index) => (
          <AccordionItem
            key={item.id || index}
            {...item}
            isOpen={openIndices.has(index)}
            onToggle={() => handleToggle(index)}
            index={index}
            prefersReducedMotion={prefersReducedMotion}
          />
        ))}
      </div>
    );
  }
);

Accordion.displayName = 'Accordion';
