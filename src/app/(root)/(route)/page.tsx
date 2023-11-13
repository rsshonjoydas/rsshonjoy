import { StarsCanvas } from '@/components/canvas/star-background';
import { ScrollButtonBottom } from '@/components/scroll-button-bottom';
import { ScrollButtonTop } from '@/components/scroll-button-top';
import { SocialMedia } from '@/components/social-media';
import About from '@/section/about';
import Contact from '@/section/contact';
import { Hero } from '@/section/hero';
import Works from '@/section/works';

export default function Home() {
  return (
    <main className='relative z-0'>
      <Hero />
      <SocialMedia />
      <ScrollButtonTop />
      <ScrollButtonBottom />
      <About />
      <Works />
      <div className='relative z-0'>
        <Contact />
        <StarsCanvas />
      </div>
    </main>
  );
}
