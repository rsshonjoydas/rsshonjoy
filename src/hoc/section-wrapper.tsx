import { staggerContainer } from '@/lib/motion';
import { motion } from 'framer-motion';

export const SectionWrapper = (Component: any, idName: any) =>
  function HOC() {
    return (
      <motion.section
        variants={staggerContainer(0.1, 0.2)}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true, amount: 0.25 }}
        className='relative z-0 mx-auto'
      >
        <span className='hash-span' id={idName}>
          &nbsp;
        </span>

        <Component />
      </motion.section>
    );
  };
