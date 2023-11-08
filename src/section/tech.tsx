'use client';

import { BallCanvas } from '@/components/canvas/ball';
import { technologies } from '@/constants';
import { SectionWrapper } from '@/hoc/section-wrapper';
import { useSectionInView } from '@/hooks/use-nav';

const Tech = () => {
  const { ref } = useSectionInView('Skills');

  return (
    <div
      id='skills'
      ref={ref}
      className='container flex flex-row flex-wrap justify-center gap-10 py-10 pb-12'
    >
      {technologies.map((technology) => (
        <div className='h-28 w-28' key={technology.name}>
          <BallCanvas icon={technology.icon} />
        </div>
      ))}
    </div>
  );
};

export default SectionWrapper(Tech, '');
