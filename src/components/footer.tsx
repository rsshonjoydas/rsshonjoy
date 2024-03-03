import Link from 'next/link';

import { Logo } from '@/components/logo';
import { buttonVariants } from '@/components/ui/button';
import { cn, currentYear } from '@/lib/utils';

export const Footer = () => (
  <footer className='container mt-6'>
    <section className=' border-y p-3 shadow-sm dark:border-slate-700/70'>
      <div className='my-9 flex w-full flex-col items-center gap-7 md:flex-row'>
        <p className='flex-1 text-3xl font-extrabold text-foreground/80 max-md:text-center'>
          Have a project in mind? <br className='hidden sm:block' />
          Let&apos;s build something together!
        </p>
        <Link href='mailto:rsshonjoy@gmail.com' className='btn'>
          Contact
        </Link>
      </div>
    </section>
    <section className='z-50 mt-5 w-full items-center'>
      <div className='flex items-center justify-center'>
        <div className='hidden items-center md:flex'>
          <Logo href='/' />
        </div>
        <div className='flex w-full items-center justify-between gap-x-2 text-muted-foreground md:ml-auto md:justify-end'>
          <Link href='/privacy-policy' className={cn(buttonVariants({ variant: 'ghost' }))}>
            Privacy Policy
          </Link>
          <Link href='/terms-and-conditions' className={cn(buttonVariants({ variant: 'ghost' }))}>
            Terms & Conditions
          </Link>
        </div>
      </div>
      <div className='items-center justify-center space-y-2 py-3 text-center text-xs text-primary/60 sm:flex'>
        <p className='mt-1.5 pr-2'>
          Built & Designed by{' '}
          <Link href='mailto:rsshonjoy@gmail.com' className='blue-gradient_text'>
            @rsshonjoydas
          </Link>
        </p>
        <p>&copy; {currentYear} Store, Inc. All rights reserved.</p>
      </div>
    </section>
  </footer>
);
