'use client';

import { SignInButton, useAuth } from '@clerk/nextjs';

import { Logo } from '@/components/logo';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

export const Navbar = () => {
  const { isLoaded } = useAuth();

  return (
    <div className='flex items-center justify-between'>
      <Logo href='/' />

      {isLoaded ? (
        <Button className='btn'>
          <SignInButton mode='modal'>Sign In</SignInButton>
        </Button>
      ) : (
        <Skeleton className='h-10 w-20' />
      )}
    </div>
  );
};
