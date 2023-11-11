'use client';

import { MoveDown } from 'lucide-react';

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
      className='absolute z-50 -mr-40 -mt-40 text-slate-500 transition-opacity duration-300  hover:opacity-80 dark:text-slate-400'
    >
      <span className='-mr-[124px] inline-block origin-bottom-left -rotate-90 transform text-sm font-bold uppercase tracking-wide'>
        Scroll Down
      </span>
      <MoveDown className='mt-3 h-7 w-7 animate-bounce' />
    </button>
  );
};
