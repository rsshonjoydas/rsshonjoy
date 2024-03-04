'use client';

import { useIsClient } from 'usehooks-ts';

import { ItemSkeleton } from './item';
import { ToggleSkeleton } from './toggle';

import { cn } from '@/lib/utils';
import { useSidebar } from '@/store/use-sidebar';

interface WrapperProps {
  children: React.ReactNode;
}

export const Wrapper = ({ children }: WrapperProps) => {
  const isClient = useIsClient();
  const { collapsed } = useSidebar((state) => state);

  if (!isClient) {
    return (
      <aside className='fixed left-0 z-50 flex h-full w-[70px] flex-col border-r bg-secondary/80 lg:w-60'>
        <ToggleSkeleton />
        <ItemSkeleton />
      </aside>
    );
  }

  return (
    <aside
      className={cn(
        'fixed left-0 z-50 flex h-full w-60 flex-col border-r bg-secondary/50 shadow-sm backdrop-blur dark:border-4',
        collapsed && 'w-[70px]'
      )}
    >
      {children}
    </aside>
  );
};
