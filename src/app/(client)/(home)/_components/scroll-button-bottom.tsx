'use client';

import { MoveDown } from 'lucide-react';

import { Framer } from '@/components/framer';

export const ScrollButtonBottom = () => {
  const scrollToDown = () => {
    const nextComponent = document.getElementById('about'); // Replace with the actual ID of your next component
    if (nextComponent) {
      nextComponent.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button
      type='button'
      onClick={scrollToDown}
      className='group absolute left-5 z-40 -mt-40 text-slate-500 transition-opacity duration-300 hover:opacity-80 dark:text-slate-400'
    >
      <Framer>
        <span className='-mr-[124px] inline-block origin-bottom-left -rotate-90 transform text-sm font-bold uppercase tracking-wide'>
          Scroll Down
        </span>
        <MoveDown className='mr-1 mt-3 h-7 w-7 animate-bounce group-hover:mt-1 group-hover:animate-none' />
      </Framer>
    </button>
  );
};
