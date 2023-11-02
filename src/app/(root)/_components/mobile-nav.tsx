/* eslint-disable no-unused-vars */

'use client';

import { LinkProps } from 'next/link';
import * as React from 'react';

import { Icons } from '@/components/icons';
import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { siteConfig } from '@/config/site';

import { NavbarItem } from './navbar-item';

interface NavbarItemProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

export function MobileNav({ routes }: any) {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant='ghost'
          className='mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden'
        >
          <Icons.Menu className='stroke-foreground h-5 w-5' />
          <span className='sr-only'>Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side='left' className='pr-0'>
        <NavbarItem href='/' className='flex items-center' onOpenChange={setOpen}>
          <Logo className='-ml-4 -mt-4' />
          <span className='font-bold ml-2 -mt-2'>{siteConfig.name}</span>
        </NavbarItem>
        {routes?.length && (
          <span>
            {routes?.map((route: any) => (
              <NavbarItem
                href={route.href}
                key={route.href}
                label={route.label}
                className='flex flex-col space-y-2'
                onOpenChange={setOpen}
              >
                <span className='font-bold ml-8'>{route.label}</span>
              </NavbarItem>
            ))}
          </span>
        )}
      </SheetContent>
    </Sheet>
  );
}
