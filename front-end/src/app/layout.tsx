import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';

import './globals.css';
import { Providers } from './providers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'AI Website Studio | Professional Landing Pages with AI',
  description:
    'Transform your ideas into stunning, professional landing pages using advanced AI. Generate complete HTML with modern design and optimized code in seconds.',
  keywords:
    'AI website generator, landing page creator, web design AI, automated web development, professional website design',
  authors: [{ name: 'AI Website Studio Team' }],
  openGraph: {
    title: 'AI Website Studio - Professional Landing Pages',
    description: 'Create beautiful, conversion-optimized landing pages with AI',
    type: 'website',
  },
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground selection:bg-primary/20 font-sans`}
      >
        <Providers>
          <div className='min-h-screen flex flex-col'>{children}</div>
        </Providers>
        <div id='portal-root' />
      </body>
    </html>
  );
}
