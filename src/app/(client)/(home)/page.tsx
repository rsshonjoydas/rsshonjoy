import { ScrollButtonBottom } from './_components/scroll-button-bottom';
import { ScrollButtonTop } from './_components/scroll-button-top';
import { SocialMedia } from './_components/social-media';
import { AboutScreen } from './_screens/about';
import { Hero } from './_screens/hero';
import { Services } from './_screens/services';
import { Skills } from './_screens/skills';

import db from '@/lib/db';

export default async function Home() {
  const about = await db.about.findMany();

  return (
    <section>
      <Hero />
      <SocialMedia />
      <ScrollButtonTop />
      <ScrollButtonBottom />
      <AboutScreen data={about} />
      <Services />
      <Skills />
    </section>
  );
}
