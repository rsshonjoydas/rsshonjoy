import { Metadata } from 'next';
import { Suspense } from 'react';

import { Navbar } from './_components/navbar';
import { Sidebar, SidebarSkeleton } from './_components/sidebar';
import { Container } from './_components/sidebar/container';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Navbar />
      <div className='flex h-[100dvh] pt-16'>
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar />
        </Suspense>
        <Container>{children}</Container>
      </div>
    </main>
  );
}
