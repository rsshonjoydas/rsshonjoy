import { SiteFooter } from './_components/site-footer';
import { SiteHeader } from './_components/site-header';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='relative flex min-h-screen flex-col'>
      <SiteHeader />
      <div className='mx-auto w-full flex-1 px-8'>{children}</div>
      <SiteFooter />
    </main>
  );
}
