import { SiteHeader } from './_components/site-header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='relative flex flex-col min-h-screen'>
      <SiteHeader />
      <div className='w-full mx-auto px-8 flex-1'>{children}</div>
    </main>
  );
}
