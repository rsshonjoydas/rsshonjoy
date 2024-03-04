'use client';

import { UserButton, useAuth } from '@clerk/nextjs';

import { ModeToggle } from '@/components/themes/mode-toggle';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';

export const Actions = () => {
  const { isLoaded } = useAuth();

  return (
    <div className='flex items-center justify-end gap-x-2 lg:ml-0'>
      <ModeToggle />

      <Separator orientation='vertical' className='mr-2 h-8' />

      {isLoaded ? (
        <div className='hover:opacity-75'>
          <UserButton
            afterSignOutUrl='/'
            appearance={{
              elements: {
                avatarBox: 'h-8 w-8',
              },
            }}
          />
        </div>
      ) : (
        <Skeleton className='h-8 w-8 rounded-full bg-foreground/10' />
      )}
    </div>
  );
};
