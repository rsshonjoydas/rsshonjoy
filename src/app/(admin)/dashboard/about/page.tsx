import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

import { CreateTitleBio } from './_components/create-title-bio';
import { ServiceSection } from './_components/service-section';
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

  return (
    <div>
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
    </div>
  );
};

export default AboutPage;
