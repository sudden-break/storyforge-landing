'use client';

import Link from 'next/link';
import { Container } from './ui/Container';

// ============================================================================
// Footer Component
// ============================================================================

/**
 * Professional multi-column footer with product links, legal pages,
 * and contact information.
 *
 * Features:
 * - Logo with gradient branding
 * - Multi-column responsive layout
 * - Product navigation (Features, Pricing, FAQ)
 * - Legal links (Privacy, Terms)
 * - Contact email
 * - Copyright notice
 */
export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#1A1A1A] bg-[#0A0A0A]">
      {/* Main Footer Content */}
      <div className="py-16 px-4">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Column */}
            <div className="lg:col-span-1">
              <Link href="/" className="inline-block mb-4">
                <span className="text-2xl font-bold font-display">
                  StoryForge
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#8134AF]">
                    .cloud
                  </span>
                </span>
              </Link>
              <p className="text-[#A0A0A0] text-sm leading-relaxed mb-6">
                Instagram Story Monitoring & AI Generation
              </p>
              <p className="text-[#666666] text-sm">
                Never miss a story again.
              </p>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="text-white font-semibold mb-4 font-display">
                Product
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#features"
                    className="text-[#A0A0A0] text-sm hover:text-white transition-colors duration-200"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#pricing"
                    className="text-[#A0A0A0] text-sm hover:text-white transition-colors duration-200"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="#faq"
                    className="text-[#A0A0A0] text-sm hover:text-white transition-colors duration-200"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-white font-semibold mb-4 font-display">
                Legal
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/privacy"
                    className="text-[#A0A0A0] text-sm hover:text-white transition-colors duration-200"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-[#A0A0A0] text-sm hover:text-white transition-colors duration-200"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-semibold mb-4 font-display">
                Contact
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:support@storyforge.cloud"
                    className="text-[#A0A0A0] text-sm hover:text-white transition-colors duration-200"
                  >
                    support@storyforge.cloud
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#1A1A1A]">
        <Container>
          <div className="py-6 px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-[#666666] text-sm">
              © {currentYear} StoryForge.cloud. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="https://app.storyforge.cloud"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#666666] text-sm hover:text-white transition-colors duration-200"
              >
                App
              </a>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
