import Link from 'next/link';

import { Framer } from '@/components/framer';
import Icons from '@/components/icons';
import { ModeToggle } from '@/components/themes/mode-toggle';
import { buttonVariants } from '@/components/ui/button';
import { siteConfig } from '@/lib/site';
import { cn } from '@/lib/utils';

export const NavAction = () => (
  <nav className='flex flex-1 items-center justify-end space-x-1'>
    <Link href={siteConfig.links.github} target='_blank' rel='noreferrer'>
      <Framer>
        <div
          className={cn(
            buttonVariants({
              variant: 'icon',
              size: 'icon',
            })
          )}
        >
          <Icons.GitHub className='h-4 w-4' />
          <span className='sr-only'>GitHub</span>
        </div>
      </Framer>
    </Link>
    <Link href={siteConfig.links.twitter} target='_blank' rel='noreferrer'>
      <Framer>
        <div
          className={cn(
            buttonVariants({
              variant: 'icon',
              size: 'icon',
            })
          )}
        >
          <Icons.XTwitter className='h-4 w-4' />
          <span className='sr-only'>Twitter</span>
        </div>
      </Framer>
    </Link>
    <ModeToggle />
  </nav>
);
