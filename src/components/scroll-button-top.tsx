'use client';

import { ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';

export const ScrollButtonTop = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [hovered, setHovered] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setShowScrollToTop(true);
    } else {
      setShowScrollToTop(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <span>
      {showScrollToTop && (
        <button
          type='button'
          className={`fixed bottom-5 right-5 z-50 ml-4 h-12 w-14 transform rounded border font-bold transition duration-300 hover:scale-105 ${
            hovered ? 'text-primary' : ''
          }`}
          onClick={scrollToTop}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <span className='flex items-center justify-center'>
            {hovered ? 'Top' : <ChevronUp className='h-7 w-7 text-foreground/50' />}
          </span>
        </button>
      )}
    </span>
  );
};
