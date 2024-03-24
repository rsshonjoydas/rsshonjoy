'use client';

import { About } from '@prisma/client';
import { motion } from 'framer-motion';
import { Fragment } from 'react';

import { fadeIn, textVariant } from '@/lib/motion';

interface AboutProps {
  data: About[];
}

export const AboutScreen = async ({ data }: AboutProps) => (
  <section id='about' className='container items-center px-5 py-16'>
    <div className='my-6 flex items-center justify-center'>
      <h2 className='relative flex items-center justify-center text-4xl font-bold uppercase text-foreground/70 sm:text-6xl'>
        About <span className='text-lavender'>me</span>
        <span className='duration-400 absolute left-1/2 top-1/2 z-[-1] -translate-x-1/2 -translate-y-1/2 text-6xl font-extrabold opacity-15 transition-all ease-in-out sm:text-8xl'>
          my&nbsp;stats
        </span>
      </h2>
    </div>
    {data.map((item) => (
      <Fragment key={item.id}>
        <motion.div variants={textVariant(0.5)}>
          <p className='mt-12 text-sm uppercase tracking-wider'>Introduction</p>
          <h1 className='text-3xl font-semibold sm:text-5xl sm:leading-snug'>
            Hello, I&apos;m{' '}
            <span className='blue-gradient_text font-semibold drop-shadow'> Shonjoy</span>
            👋
          </h1>
          <div className='mt-5 flex flex-col gap-3 text-slate-500'>
            <p>{item.title}</p>
          </div>
        </motion.div>

        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className='mt-4 max-w-3xl text-[17px] leading-[30px] text-slate-400'
        >
          {item.bio}
        </motion.p>
      </Fragment>
    ))}
  </section>
);
