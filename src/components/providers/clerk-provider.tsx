'use client';

import { ClerkProvider as ClerkAuthProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { useTheme } from 'next-themes';

import { siteConfig } from '@/lib/site';

const localization = {
  socialButtonsBlockButton: 'Sign In with {{provider|titleize}}',
  signUp: {
    start: {
      subtitle: '',
    },
    emailCode: {
      subtitle: 'to access {{applicationName}}',
    },
  },
  signIn: {
    start: {
      title: 'Admin Login',
      subtitle: '',
    },
    emailCode: {
      subtitle: 'to access {{applicationName}}',
    },
  },
};

export default function ClerkProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();

  const baseTheme: any = resolvedTheme === 'dark' && dark;
  const logoImageUrl = resolvedTheme === 'dark' ? './logo-dark.svg' : './logo.svg';

  return (
    <ClerkAuthProvider
      appearance={{
        baseTheme,
        layout: {
          socialButtonsPlacement: 'bottom',
          termsPageUrl: `${siteConfig.url}/terms`,
          helpPageUrl: `${siteConfig.url}/help`,
          logoImageUrl,
          privacyPageUrl: `${siteConfig.url}/privacy`,
        },
        elements: {
          formButtonPrimary: 'btn',
        },
      }}
      localization={localization}
    >
      {children}
    </ClerkAuthProvider>
  );
}
