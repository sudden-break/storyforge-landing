'use client';

import React from 'react';
import { Container } from './ui/Container';
import { SectionHeader } from './ui/SectionHeader';
import { Accordion } from './ui/Accordion';
import { useInView } from '@/lib/motion';
import content from '@/data/content';

// ============================================================================
// FAQ Section Component
// ============================================================================

/**
 * FAQ section with accordion-style expandable questions.
 *
 * Features:
 * - id="faq" for anchor navigation
 * - First question open by default (defaultOpenIndex={0})
 * - All FAQ questions from content.ts
 * - Smooth expand/collapse animations
 * - Keyboard accessible
 * - Respects reduced motion preference
 *
 * FAQ Questions (from content.ts):
 * - What is StoryForge?
 * - Is my Instagram account safe?
 * - How does the AI generation work?
 * - What payment methods are accepted?
 * - Can I cancel anytime?
 * - Which plan is right for me?
 * - What happens after I cancel?
 * - How does Story Monitoring work?
 */
export default function FAQ() {
  const faqContent = content.faq;
  const { ref: sectionRef, isInView } = useInView({ threshold: 0.1 });

  // Map FAQ items from content to Accordion items format
  const accordionItems = faqContent.items.map((item) => ({
    id: item.id,
    title: item.question,
    content: item.answer,
  }));

  return (
    <section
      id="faq"
      ref={sectionRef as React.RefObject<HTMLElement>}
      className={[
        'relative',
        'py-20',
        'md:py-32',
        'overflow-hidden',
      ].join(' ')}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0D0D0D] to-transparent -z-10" />

      <Container size="lg" padding="md">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <SectionHeader
            title={faqContent.title}
            subtitle={faqContent.subtitle}
            size="lg"
            align="center"
          />
        </div>

        {/* FAQ Accordion */}
        {/* First question open by default with defaultOpenIndex={0} */}
        <div className="max-w-3xl mx-auto">
          <Accordion
            items={accordionItems}
            defaultOpenIndex={0}
            allowMultiple={false}
          />
        </div>
      </Container>
    </section>
  );
}
