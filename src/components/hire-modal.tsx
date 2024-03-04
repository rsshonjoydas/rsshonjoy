'use client';

import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';
import { useMediaQuery } from 'usehooks-ts';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

const ImgURL = 'https://res.cloudinary.com/rsshonjoydas/image/upload';

const items = [
  {
    href: 'https://www.upwork.com/freelancers/~0136a8e165da09935b',
    src: `${ImgURL}/v1705406871/market-place/upwork.png`,
    alt: 'upwork',
    size: 70,
  },
  {
    href: 'https://www.fiverr.com/rsshonjoydas',
    src: `${ImgURL}/v1705406870/market-place/fiverr.png`,
    alt: 'fiverr',
    size: 90,
  },
  {
    href: 'https://www.freelancer.com/u/rsshonjoydas',
    src: `${ImgURL}/v1705406872/market-place/freelancer.png`,
    alt: 'freelancer',
    size: 80,
  },
] as const;

const HireContent = () => (
  <div className='flex items-center justify-center gap-x-6'>
    {items.map((item) => (
      <Link key={item.alt} href={item.href} target='_blank'>
        <Image src={item.src} alt={item.alt} height={item.size} width={item.size} />
      </Link>
    ))}
  </div>
);

export function HireModal() {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant='outline'
            className='p-4 font-semibold text-foreground/80 dark:border-slate-700/70 md:p-6 md:text-lg'
          >
            Hire me
          </Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Hire me</DialogTitle>
            <DialogDescription>
              I&apos;m now available on this freelancing platform.
            </DialogDescription>
          </DialogHeader>
          <HireContent />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant='outline'
          className='p-4 font-semibold text-foreground/80 dark:border-slate-700/70 md:p-6 md:text-lg'
        >
          Hire me
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='text-left'>
          <DrawerTitle>Hire me</DrawerTitle>
          <DrawerDescription>
            I&apos;m now available on this freelancing platform.
          </DrawerDescription>
        </DrawerHeader>
        <HireContent />
        <DrawerFooter className='pt-2'>
          <DrawerClose asChild>
            <Button variant='outline'>Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
