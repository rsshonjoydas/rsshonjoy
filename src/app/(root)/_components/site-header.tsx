import Link from 'next/link';

import { Icons } from '@/components/icons';
import { ModeToggle } from '@/components/mode-toggle';
import { ThemeCustomizer } from '@/components/theme-customizer';
import { ThemeWrapper } from '@/components/theme-wrapper';
import { buttonVariants } from '@/components/ui/button';
import { links } from '@/config/navbar';
import { siteConfig } from '@/config/site';
import { cn } from '@/lib/utils';
import { MainNav } from './main-nav';
import { MobileNav } from './mobile-nav';

export function SiteHeader() {
  return (
    <header className='supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur'>
      <div className='container flex h-14 items-center'>
        <MainNav routes={links} />
        <MobileNav routes={links} />
        <div className='flex flex-1 items-center justify-end space-x-2 md:justify-end'>
          <nav className='flex items-center'>
            <Link href={siteConfig.links.github} target='_blank' rel='noreferrer'>
              <div
                className={cn(
                  buttonVariants({
                    variant: 'ghost',
                  }),
                  'w-9 px-0'
                )}
              >
                <Icons.GitHub className='h-4 w-4' />
                <span className='sr-only'>GitHub</span>
              </div>
            </Link>
            <Link href={siteConfig.links.twitter} target='_blank' rel='noreferrer'>
              <div
                className={cn(
                  buttonVariants({
                    variant: 'ghost',
                  }),
                  'w-9 px-0'
                )}
              >
                <Icons.XTwitter className='h-4 w-4 fill-current' />
                <span className='sr-only'>Twitter</span>
              </div>
            </Link>
            <ModeToggle />
          </nav>
        </div>

        <div>
          <ThemeWrapper className='relative flex flex-col items-start md:flex-row md:items-center'>
            <div className='px-4'>
              <ThemeCustomizer />
            </div>
          </ThemeWrapper>
        </div>
      </div>
    </header>
  );
}
