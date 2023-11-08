import { StarsCanvas } from '@/components/canvas/star-background';
import About from '@/section/about';
import Contact from '@/section/contact';
import { Hero } from '@/section/hero';
import Tech from '@/section/tech';
import Works from '@/section/works';

export default function Home() {
  return (
    <main className='relative z-0'>
      <Hero />
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
