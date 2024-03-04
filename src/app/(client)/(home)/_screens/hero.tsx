'use client';

/* eslint-disable react/no-array-index-key */
import gsap from 'gsap';
import dynamic from 'next/dynamic';
import { Sriracha } from 'next/font/google';
import Link from 'next/link';
import { useEffect } from 'react';
import TypewriterComponent from 'typewriter-effect';

import { ProgrammerDogLoader } from '../_components/programmer-dog';

import { HireModal } from '@/components/hire-modal';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const sriracha = Sriracha({
  subsets: ['latin'],
  weight: '400',
});

const LazyProgrammerDog = dynamic(() => import('../_components/programmer-dog'), {
  ssr: false,
  loading: () => <ProgrammerDogLoader />,
});

export const Hero = () => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      // create as many GSAP animations and/or ScrollTriggers here as you want...
      gsap
        .timeline()
        .fromTo(
          '.name-animation',
          { x: -100, opacity: 0, rotate: -10 },
          {
            x: 0,
            opacity: 1,
            rotate: 0,

            ease: 'elastic.out(1,0.3)',
            duration: 1,
            transformOrigin: 'left top',
            stagger: { each: 0.1, from: 'random' },
          }
        )
        .fromTo(
          '.job-title',
          {
            y: 20,
            opacity: 0,
            scale: 1.2,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scale: 1,
            ease: 'elastic.out(1,0.3)',
          }
        );
    });
    return () => ctx.revert(); // cleanup!
  }, []);

  const renderLetters = (name: string, key: string) => {
    if (!name) return null;

    return name.split('').map((letter, index) => (
      <span
        key={index}
        className={`name-animation name-animation-${key}-index inline-block opacity-0`}
      >
        {letter}
      </span>
    ));
  };

  return (
    <div
      id='hero'
      className='flex max-h-[100dvh] min-h-[100dvh] scroll-mt-14 items-center justify-center overflow-hidden py-3'
    >
      <div className='container grid grid-cols-1 items-center md:grid-cols-2'>
        <div className='-m-48'>
          <LazyProgrammerDog />
        </div>

        <div className='col-start-1 -mt-20 md:row-start-1 md:mt-0' data-speed='.2'>
          <h1
            className='mb-8 text-[clamp(2rem,16vmin,16rem)] font-extrabold leading-none tracking-tighter md:text-[clamp(2rem,10vmin,10rem)] lg:text-[clamp(2rem,12vmin,12rem)] xl:text-[clamp(2rem,16vmin,16rem)]'
            aria-label='Shonjoy Das'
          >
            <span className='block text-slate-300'>{renderLetters('Shonjoy', 'first')}</span>
            <span className='block text-slate-500'>{renderLetters('Das', 'last')}</span>
          </h1>
          <div
            className={cn(
              'blue-text-gradient bg-clip-text py-1.5 text-2xl text-transparent opacity-75 sm:text-3xl md:text-5xl',
              sriracha.className
            )}
          >
            <TypewriterComponent
              options={{
                strings: ['Web/App Developer.', 'UI/UX Designer.', 'Content Creator.'],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
          <div className='job-title mt-12 space-x-3 bg-clip-text text-2xl font-bold text-transparent opacity-0 md:ml-6 md:text-4xl'>
            <HireModal />
            <Link
              href='/projects'
              className={cn(buttonVariants(), 'btn p-4 font-semibold md:p-6 md:text-lg')}
            >
              Projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
