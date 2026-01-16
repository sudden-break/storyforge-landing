import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'StoryForge.cloud - Instagram Story Monitoring',
  description: 'Instagram Story Monitoring neu definiert. Launch bald.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
