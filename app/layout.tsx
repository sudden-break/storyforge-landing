import type { Metadata } from 'next';
import { Space_Grotesk, DM_Sans } from 'next/font/google';
import './globals.css';

// SEO: metadataBase required for absolute URLs in OpenGraph, Twitter cards, and canonical
// NOTE: Place og-image.png (1200x630px) in /public folder
// NOTE: Place favicon.ico (and apple-touch-icon.png) in /public folder

// Space Grotesk for headlines - tight letter-spacing for modern look
const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

// DM Sans for body text - optimized for readability
const dmSans = DM_Sans({
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://storyforge.cloud'),
  title: 'StoryForge - Instagram Story Monitoring & AI Generation',
  description: 'Monitor Instagram Stories 24/7 and generate AI-powered content variations. Track competitors, save inspiring stories, and create unique content with our AI-powered tools. Free tier available.',
  keywords: [
    'Instagram story monitor',
    'Instagram story downloader',
    'Instagram story tracking',
    'AI content generation',
    'social media monitoring',
    'Instagram analytics',
    'competitor tracking',
    'content creation tools',
    'Instagram automation',
    'story saver',
  ],
  authors: [{ name: 'StoryForge', url: 'https://storyforge.cloud' }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'StoryForge - Instagram Story Monitoring & AI Generation',
    description: 'Monitor Instagram Stories 24/7 and generate AI-powered content variations. Track competitors, save inspiring stories, and create unique content.',
    url: 'https://storyforge.cloud',
    siteName: 'StoryForge',
    type: 'website',
    locale: 'en_US',
    // NOTE: Place og-image.png (1200x630px) in /public folder
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'StoryForge - Instagram Story Monitoring & AI Generation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StoryForge - Instagram Story Monitoring & AI Generation',
    description: 'Monitor Instagram Stories 24/7 and generate AI-powered content variations.',
    // NOTE: Place og-image.png (1200x630px) in /public folder
    images: ['/og-image.png'],
  },
  // NOTE: Place favicon.ico (32x32px) and apple-touch-icon.png (180x180px) in /public folder
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

// Viewport configuration (Next.js 16+ requires separate export)
export const viewport = {
  width: 'device-width' as const,
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${dmSans.variable}`}
      style={{ scrollBehavior: 'smooth', scrollPaddingTop: '80px' }}
    >
      <body className={dmSans.className}>{children}</body>
    </html>
  );
}
