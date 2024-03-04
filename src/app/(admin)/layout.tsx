import ClerkProvider from '@/components/providers/clerk-provider';

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
