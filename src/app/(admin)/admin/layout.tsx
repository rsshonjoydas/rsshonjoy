import { Metadata } from 'next';

import { Header } from './_components/header';

import { Footer } from '@/components/footer';

export const metadata: Metadata = {
  title: 'Admin',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='relative flex min-h-[100dvh] flex-col'>
      <Header />
      <div className='container mx-auto w-full flex-1 px-8'>{children}</div>
      <Footer />
    </main>
  );
}
