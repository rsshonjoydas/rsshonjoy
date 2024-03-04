import { Metadata } from 'next';

import { Navbar } from './_components/navbar';

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main>
      <Navbar />
      <div className='flex h-[100dvh] pt-16'>{children}</div>
    </main>
  );
}
