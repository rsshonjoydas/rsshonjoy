/* eslint-disable react/jsx-no-useless-fragment */

'use client';

import { motion } from 'framer-motion';
import { ChevronUp } from 'lucide-react';
import { useEffect, useState } from 'react';

import styles from './scroll-button-top.module.scss';

export const ScrollButtonTop = () => {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

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
    <>
      {showScrollToTop && (
        <div
          className='fixed bottom-5 right-5 z-50 ml-4 flex h-12 w-14 cursor-pointer items-center justify-center rounded border bg-background dark:border-slate-700/70'
          onClick={scrollToTop}
        >
          <motion.div
            className='relative size-full'
            transition={{ duration: 0.5, type: 'tween', ease: [0.76, 0, 0.24, 1] }}
          >
            <div className={styles.el}>
              <div
                className={`${styles.perspectiveText} flex size-full flex-col items-center justify-center`}
              >
                <span>
                  <ChevronUp className='size-6 opacity-75' />
                </span>
                <span>TOP</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};
