import Image from 'next/image';

import styles from './skills.module.scss';

import db from '@/lib/db';

export const Skills = async () => {
  const skills = await db.skills.findMany({
    orderBy: {
      position: 'asc',
    },
  });

  return (
    <div className='mt-10 flex flex-col px-5 py-10'>
      <h3 className='subhead-text'>My Skills</h3>
      <div className='ml-5 mt-16 flex flex-wrap gap-12'>
        {skills.map((skill) => (
          <div className={`${styles.blockContainer} h-20 w-20`} key={skill.title}>
            <div className={`${styles.btnBlack} rounded-xl shadow-light dark:shadow-dark`} />
            <div className={`${styles.btnFront} flex items-center justify-center rounded-xl`}>
              <Image
                src={skill.imageUrl || ''}
                alt={skill.title || ''}
                fill
                className='h-1/2 w-1/2 object-contain p-3'
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
