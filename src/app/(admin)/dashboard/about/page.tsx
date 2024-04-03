import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { CreateTitleBio } from './_components/create-title-bio';
import { ServiceSection } from './_components/service-section';
import { SkillsSection } from './_components/skill-section';
import { UpdateTitleBio } from './_components/update-title-bio';

import db from '@/lib/db';

const AboutPage = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect('/');
  }

  const about = await db.about.findMany();
  const service = await db.services.findMany({
    where: {
      userId,
    },
    orderBy: {
      position: 'asc',
    },
  });

  const skill = await db.skills.findMany({
    where: {
      userId,
    },
    orderBy: {
      position: 'asc',
    },
  });

  return (
    <div>
      <h3 className='subhead-text p-5 '>About Me</h3>
      {about.length > 0 ? (
        <>
          {about.map((item) => (
            <UpdateTitleBio key={item.id} data={item} />
          ))}
        </>
      ) : (
        <CreateTitleBio />
      )}

      <ServiceSection data={service} />
      <SkillsSection data={skill} />
    </div>
  );
};

export default AboutPage;
