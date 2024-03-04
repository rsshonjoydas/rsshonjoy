'use client';

import { ShieldAlert } from 'lucide-react';
import Link from 'next/link';
import TypewriterComponent from 'typewriter-effect';

import { HireModal } from '@/components/hire-modal';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const AdminPage = () => (
  <section className='-mt-12 flex min-h-[100dvh] flex-col items-center justify-center'>
    <div className='flex flex-col items-center justify-center space-y-5 text-center font-bold'>
      <div className='mb-4 flex items-center rounded-full border bg-amber-100 p-2 text-sm uppercase text-amber-700 shadow-sm'>
        <ShieldAlert className='mr-2 h-6 w-6' />
        Only for Admin
      </div>
      <div className='space-y-5 text-4xl font-extrabold sm:text-5xl md:text-6xl lg:text-7xl'>
        <h1 className='head-text'>
          Hello, I&apos;m{' '}
          <span className='blue-gradient_text font-semibold drop-shadow'> Shonjoy</span>
          👋
        </h1>
        <div className='blue-text-gradient bg-clip-text py-1.5 text-transparent opacity-75'>
          <TypewriterComponent
            options={{
              strings: ['Web/App Developer.', 'UI/UX Designer.', 'Content Creator.'],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <p className='xs:max-w-xl xs:text-lg mx-auto mt-4 max-w-xs text-center text-sm font-light text-zinc-400 sm:max-w-2xl sm:text-xl'>
        Creating an{' '}
        <strong className='truncate rounded-md bg-secondary p-1'>&quot;Only for Admin&quot;</strong>{' '}
        web page typically involves implementing authentication and authorization mechanisms to
        ensure that only authorized administrators can access the content.
      </p>
      <div className='space-x-3'>
        <HireModal />
        <Link href='/' className={cn(buttonVariants(), 'btn p-4 font-semibold md:p-6 md:text-lg')}>
          Portfolio
        </Link>
      </div>
    </div>
  </section>
);

export default AdminPage;
