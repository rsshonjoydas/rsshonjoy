'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Tilt } from 'react-tilt';

import { fadeIn } from '@/lib/motion';

const ServiceImage = ({ imageUrl, blurDataUrl, title, index }: any) => (
  <Tilt className='mx-0 flex w-[220px] items-center justify-center'>
    <motion.div
      variants={fadeIn('right', 'spring', index * 0.5, 0.75)}
      className='w-full rounded-[20px] bg-gradient-to-t from-lavender to-blue-400 p-[1px] shadow-card'
    >
      <div className='flex min-h-[280px] flex-col items-center justify-evenly rounded-[20px] bg-background/70 p-5 dark:bg-tertiary'>
        <Image
          src={imageUrl}
          height={16}
          width={16}
          layout='responsive'
          style={{ objectFit: 'contain', objectPosition: 'center' }}
          alt='web-development'
          className='h-16 w-16 object-contain'
          placeholder='blur'
          blurDataURL={blurDataUrl}
        />
        <h3 className='text-center text-lg font-bold text-foreground/60'>{title}</h3>
      </div>
    </motion.div>
  </Tilt>
);

export default ServiceImage;
