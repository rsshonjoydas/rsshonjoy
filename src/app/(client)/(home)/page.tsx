import { ScrollButtonBottom } from './_components/scroll-button-bottom';
import { ScrollButtonTop } from './_components/scroll-button-top';
import { SocialMedia } from './_components/social-media';
import { Hero } from './_screens/hero';

export default function Home() {
  return (
    <section>
      <Hero />
      <SocialMedia />
      <ScrollButtonTop />
      <ScrollButtonBottom />
    </section>
  );
}
