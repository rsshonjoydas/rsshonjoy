'use client';

import Link from 'next/link';

import { Logo } from '@/components/logo';
import { siteConfig } from '@/config/site';
import { NavbarItem } from './navbar-item';

export function MainNav({ routes }: any) {
  return (
    <div className='hidden mr-4 md:flex'>
      <Link href='/' className='flex items-center justify-center mr-6 space-x-2'>
        <Logo />
        <span className='hidden lg:flex font-bold'>{siteConfig.name}</span>
      </Link>
      {routes?.length && (
        <nav className='flex items-center text-sm font-medium'>
          {routes?.map((route: any) => (
            <NavbarItem
              href={route.href}
              key={route.href}
              label={route.label}
              className='flex items-center gap-x-2 py-4'
            >
              <span className='font-bold'>{route.label}</span>
            </NavbarItem>
          ))}
        </nav>
      )}
    </div>
  );
}
