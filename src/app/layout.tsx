import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import * as React from 'react';

import { siteConfig } from '@/config/site';
import ActiveSectionContextProvider from '@/context/active-section-context';
import { absoluteUrl, cn } from '@/lib/utils';

import { ThemeProvider } from './_components/providers';
import { TailwindIndicator } from './_components/tailwind-indicator';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(`${siteConfig.url}`),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: ['Next.js', 'React', 'Tailwind CSS', 'Server Components', 'Radix UI'],
  authors: [
    {
      name: siteConfig.name,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.name,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: absoluteUrl('/og.jpg'),
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [`${siteConfig.url}/og.jpg`],
    creator: '@rsshonjoydas',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: `${siteConfig.url}/site.webmanifest`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body
        suppressHydrationWarning
        className={cn('min-h-screen bg-background font-sans antialiased', inter.className)}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <ActiveSectionContextProvider>
            {children}
            <TailwindIndicator />
          </ActiveSectionContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
