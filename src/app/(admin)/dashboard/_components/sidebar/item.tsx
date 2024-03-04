/* eslint-disable react/no-array-index-key */

'use client';

import { LucideIcon } from 'lucide-react';
import { Route } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { routes } from './data';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useSidebar } from '@/store/use-sidebar';

interface ItemProps {
  href: Route | URL;
  label: string;
  icon: LucideIcon; // Assuming the icon is an SVG component
}

export const Item: React.FC<ItemProps> = ({ href, label, icon: Icon }) => {
  const pathname = usePathname();
  const { collapsed } = useSidebar((state) => state);

  return (
    <Button
      asChild
      variant='icon'
      className={cn(
        'h-12 w-full text-muted-foreground hover:bg-primary/10 hover:text-primary',
        collapsed ? 'justify-center px-3' : 'mx-2 justify-start',
        pathname === href && 'bg-primary/10 text-primary'
      )}
      key={label}
    >
      <Link href={href}>
        <div className={cn('flex w-full items-center gap-x-4')}>
          {Icon && <Icon />}
          {!collapsed && <p className='truncate text-lg'>{label}</p>}
        </div>
      </Link>
    </Button>
  );
};

export const ItemSkeleton = () => (
  <ul className='px-2'>
    {[...Array(routes.length)].map((_, i) => (
      <li className='flex items-center gap-x-4 px-3 py-2' key={i}>
        <Skeleton className='min-h-[32px] min-w-[32px] rounded-full bg-foreground/5' />
        <div className='flex-1'>
          <Skeleton className='h-6 bg-foreground/5' />
        </div>
      </li>
    ))}
  </ul>
);
