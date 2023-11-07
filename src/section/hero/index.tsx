'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { TypeAnimation } from 'react-type-animation';

import { AnimatedTextCharacter } from '@/components/animated-text-cherecter';
import { AnimatedTextWord } from '@/components/animated-text-word';
import { useSectionInView } from '@/hooks/use-nav';
import { fadeUpSpring } from '@/lib/motion';

import styles from './hero.module.css';

export const Hero = () => {
  const { ref } = useSectionInView('Home');

  return (
    <motion.div id='home' ref={ref} className='scroll-mt-14 overflow-hidden'>
      <section className='container mx-auto my-12 px-5'>
        <AnimatedTextCharacter
          className='z-50 -mb-8 mt-20 bg-gradient-to-r from-primary to-[#E6E6FA] bg-clip-text text-5xl font-bold leading-normal text-transparent lg:pb-8 lg:text-8xl'
          text="Hi! I'm Shonjoy"
        />
        <div className='flex flex-col items-center justify-between gap-4 py-10 md:flex-row'>
          {/* // ? Left Partial */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className='col-span-8 place-self-center justify-self-start text-center sm:text-left lg:-mt-10'
          >
            <h1 className='mb-4 text-4xl font-extrabold text-[#E6E6FA] sm:text-5xl md:text-4xl lg:-mt-12 lg:text-6xl lg:leading-normal xl:text-7xl'>
              <TypeAnimation
                sequence={[
                  'Web Developer',
                  1000,
                  'Mobile Developer',
                  1000,
                  'UI/UX Designer',
                  1000,
                  'Content Creator',
                  1000,
                ]}
                wrapper='span'
                speed={50}
                repeat={Infinity}
              />
            </h1>
            <div className='my-5 max-w-3xl leading-7 md:my-8 md:text-lg'>
              <AnimatedTextWord text='Highly motivated and very passionate Full Stack Developer with three years of experience in JavaScript, TypeScript, React js, Next js, SASS, Tailwind CSS, Prisma, Node js, Express js, MongoDB, Firebase, Redis, Docker and more.' />
            </div>
            <div>
              <motion.div variants={fadeUpSpring} initial='hidden' animate='visible'>
                <Link
                  href='/contact'
                  className='mr-4 inline-block w-full rounded-full bg-gradient-to-br from-primary to-[#E6E6FA] px-6 py-3 text-white hover:bg-slate-200 dark:text-black sm:w-fit'
                >
                  Hire Me
                </Link>
                <Link
                  href='#works'
                  className='mt-3 inline-block w-full rounded-full bg-gradient-to-br from-primary to-[#E6E6FA] px-1 py-1 text-white hover:bg-slate-800 sm:w-fit'
                >
                  <span className='block rounded-full bg-[#121212] px-5 py-2 hover:bg-slate-800'>
                    Check out my projects
                  </span>
                </Link>
              </motion.div>
            </div>
          </motion.div>
          {/* // ? Right Partial */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className='z-10 col-span-4 mt-4 place-self-center sm:mt-10 md:order-none md:mt-0 lg:mt-0 xl:-mt-14'
          >
            <div
              className={`${styles.box} h-[300px] w-[300px] bg-slate-400 dark:bg-slate-600 md:pt-20 lg:h-[400px] lg:w-[400px]`}
            >
              <div className={styles.content}>
                <Image src='/profile.png' height={400} width={400} alt='profile' />
                <h2>
                  RS Shonjoy
                  <br />
                  <span>Web Developer</span>
                </h2>
                <a href='#'>Hire me</a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};
