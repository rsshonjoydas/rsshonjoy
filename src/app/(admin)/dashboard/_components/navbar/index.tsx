'use client';

import { Actions } from './actions';
import { Search } from './search';

import { Logo } from '@/components/logo';

export const Navbar = () => (
  <nav className='supports-backdrop-blur:bg-background/60 fixed top-0 z-50 flex h-16 w-full items-center justify-between bg-secondary/50 px-2 shadow-sm backdrop-blur dark:border-b-2 lg:px-4'>
    <Logo href='/dashboard' />
    <Search />
    <Actions />
  </nav>
);
