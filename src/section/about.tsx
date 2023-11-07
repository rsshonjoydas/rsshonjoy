/* eslint-disable @next/next/no-img-element */

'use client';

import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';

import { services } from '@/constants';
import { SectionWrapper } from '@/hoc/section-wrapper';
import { useSectionInView } from '@/hooks/use-nav';
import { fadeIn, textVariant } from '@/lib/motion';
import { styles } from '@/styles';

const ServiceCard = ({ index, title, icon }: any) => (
  <Tilt className='w-full xs:w-[250px]'>
    <motion.div
      variants={fadeIn('right', 'spring', index * 0.5, 0.75)}
      className='w-full rounded-[20px] bg-gradient-to-t from-primary to-lavender p-[1px] shadow-card'
    >
      <div className='flex min-h-[280px] flex-col items-center justify-evenly rounded-[20px] bg-tertiary px-12 py-5'>
        <img src={icon} alt='web-development' className='h-16 w-16 object-contain' />
        {/* <Image
          src={icon}
          height={16}
          width={16}
          alt='web-development'
          className='h-16 w-16 object-contain'
        /> */}
        <h3 className='text-center text-[20px] font-bold text-white'>{title}</h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  const { ref } = useSectionInView('About');

  return (
    <section id='about' ref={ref} className='container items-center px-5 py-10'>
      <motion.div variants={textVariant(0.5)}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn('', '', 0.1, 1)}
        className='mt-4 max-w-3xl text-[17px] leading-[30px] text-slate-400'
      >
        I&apos;m a skilled software developer with experience in TypeScript and JavaScript, and
        expertise in frameworks like React, Node.js, and Three.js. I&apos;m a quick learner and
        collaborate closely with clients to create efficient, scalable, and user-friendly solutions
        that solve real-world problems. Let&apos;s work together to bring your ideas to life!
      </motion.p>

      <div className='mt-20 flex flex-wrap justify-center gap-10'>
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </section>
  );
};

export default SectionWrapper(About, 'about');
