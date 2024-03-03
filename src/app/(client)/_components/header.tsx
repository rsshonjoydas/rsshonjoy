'use client';

import { MobileSidebar } from './mobile-sidebar';
import { Navbar } from './navbar';

import { NavAction } from '@/components/nav-action';
import { useScrollTop } from '@/hooks/use-scroll-top';
import { cn } from '@/lib/utils';

export const Header = () => {
  const scrolled = useScrollTop();

  return (
    <header
      className={cn(
        'supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full bg-background/80 backdrop-blur',
        scrolled && 'border-b shadow-sm dark:border-slate-700/70'
      )}
    >
      <div className='container flex h-14 items-center justify-between bg-transparent p-4'>
        <div className='container mx-auto px-4 sm:px-6'>
          <div className='flex items-center justify-between md:justify-center lg:justify-end'>
            <MobileSidebar />
            <Navbar />
          </div>
        </div>
        <NavAction />
      </div>
    </header>
  );
};
