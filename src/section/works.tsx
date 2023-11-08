/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-array-index-key */
/* eslint-disable camelcase */

'use client';

import { projects } from '@/constants';
import { SectionWrapper } from '@/hoc/section-wrapper';
import { useSectionInView } from '@/hooks/use-nav';
import { fadeIn, textVariant } from '@/lib/motion';
import { styles } from '@/styles';
import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';

const ProjectCard = ({ index, name, description, tags, image, source_code_link }: any) => (
  <motion.div variants={fadeIn('up', 'spring', index * 0.5, 0.75)}>
    <Tilt
      options={{
        max: 45,
        scale: 1,
        speed: 450,
      }}
      className='w-full rounded-2xl bg-tertiary/10 p-5 dark:bg-tertiary sm:w-[360px]'
    >
      <div className='relative h-[230px] w-full'>
        <img src={image} alt='project_image' className='h-full w-full rounded-2xl object-cover' />

        <div className='card-img_hover absolute inset-0 m-3 flex justify-end'>
          <div
            onClick={() => window.open(source_code_link, '_blank')}
            className='black-gradient flex h-10 w-10 cursor-pointer items-center justify-center rounded-full'
          >
            <img src='/github.png' alt='source code' className='h-1/2 w-1/2 object-contain' />
          </div>
        </div>
      </div>

      <div className='text-slate-4 mt-5'>
        <h3 className='font-bold00 text-[24px]'>{name}</h3>
        <p className='mt-2 text-[14px] text-slate-400'>{description}</p>
      </div>

      <div className='mt-4 flex flex-wrap gap-2'>
        {tags.map((tag: any) => (
          <p key={`${name}-${tag.name}`} className={`text-sm ${tag.color}`}>
            #{tag.name}
          </p>
        ))}
      </div>
    </Tilt>
  </motion.div>
);

const Works = () => {
  const { ref } = useSectionInView('Projects');

  return (
    <section
      id='projects'
      ref={ref}
      className='container my-10 scroll-mt-14 items-center overflow-hidden px-5'
    >
      <motion.div variants={textVariant(0)}>
        <p className={`${styles.sectionSubText} `}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className='flex w-full'>
        <motion.p
          variants={fadeIn('', '', 0.1, 1)}
          className='mt-3 max-w-3xl text-[17px] leading-[30px] text-slate-400'
        >
          Following projects showcases my skills and experience through real-world examples of my
          work. Each project is briefly described with links to code repositories and live demos in
          it. It reflects my ability to solve complex problems, work with different technologies,
          and manage projects effectively.
        </motion.p>
      </div>

      <div className='mt-20 flex flex-wrap justify-center gap-7'>
        {projects.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </section>
  );
};

export default SectionWrapper(Works, 'works');
