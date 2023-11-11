import { StarsCanvas } from '@/components/canvas/star-background';
import { ScrollButtonBottom } from '@/components/scroll-button-bottom';
import { ScrollButtonTop } from '@/components/scroll-button-top';
import About from '@/section/about';
import Contact from '@/section/contact';
import { Hero } from '@/section/hero';
import Tech from '@/section/tech';
import Works from '@/section/works';

export default function Home() {
  return (
    <main className='relative z-0'>
      <Hero />
      <ScrollButtonTop />
      <ScrollButtonBottom />
      <About />
      <Tech />
      <Works />
      <div className='relative z-0'>
        <Contact />
        <StarsCanvas />
      </div>
    </main>
  );
}
