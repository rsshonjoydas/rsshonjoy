import About from '@/section/about';
import { Hero } from '@/section/hero';
import Works from '@/section/works';

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Works />
    </main>
  );
}
