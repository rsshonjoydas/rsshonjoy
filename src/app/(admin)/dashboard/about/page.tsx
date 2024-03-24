import { CreateTitleBio } from './_components/create-title-bio';
import { UpdateTitleBio } from './_components/update-title-bio';

import db from '@/lib/db';

const AboutPage = async () => {
  const about = await db.about.findMany();

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
    </div>
  );
};

export default AboutPage;
