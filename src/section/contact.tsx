'use client';

/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { useState } from 'react';

import { EarthCanvas } from '@/components/canvas/earth';
import { SectionWrapper } from '@/hoc/section-wrapper';
import { useSectionInView } from '@/hooks/use-nav';
import { slideIn } from '@/lib/motion';
import { styles } from '@/styles';

const Contact = () => {
  const { ref } = useSectionInView('Contact');

  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = () => {};

  const handleSubmit = () => {};

  return (
    <div
      id='contact'
      ref={ref}
      className='container flex flex-col-reverse gap-10 overflow-hidden xl:mt-12 xl:flex-row'
    >
      <motion.div
        variants={slideIn('left', 'tween', 0.2, 1)}
        className='bg-black-100 flex-[0.75] rounded-2xl p-8'
      >
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        <form onSubmit={handleSubmit} className='mt-12 flex flex-col gap-8'>
          <label className='flex flex-col'>
            <span className='mb-4 font-medium text-white'>Your Name</span>
            <input
              type='text'
              name='name'
              value={form.name}
              onChange={handleChange}
              placeholder="What's your good name?"
              className='rounded-lg border-none bg-tertiary bg-tertiary/10 px-6 py-4 font-medium text-slate-400 outline-none placeholder:text-slate-400 hover:opacity-75 dark:bg-tertiary'
            />
          </label>
          <label className='flex flex-col'>
            <span className='mb-4 font-medium text-white'>Your email</span>
            <input
              type='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              placeholder="What's your web address?"
              className='rounded-lg border-none bg-tertiary/10 px-6 py-4 font-medium text-slate-400 outline-none placeholder:text-slate-400 hover:opacity-75 dark:bg-tertiary'
            />
          </label>
          <label className='flex flex-col'>
            <span className='mb-4 font-medium text-white'>Your Message</span>
            <textarea
              rows={7}
              name='message'
              value={form.message}
              onChange={handleChange}
              placeholder='What you want to say?'
              className='rounded-lg border-none bg-tertiary/10 px-6 py-4 font-medium text-slate-400 outline-none placeholder:text-slate-400 hover:opacity-75 dark:bg-tertiary'
            />
          </label>

          <button
            type='submit'
            className='w-fit rounded-xl bg-tertiary/10 px-8 py-3 font-bold text-foreground shadow-md shadow-primary outline-none hover:opacity-75 dark:bg-tertiary'
          >
            {loading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={slideIn('right', 'tween', 0.2, 1)}
        className='h-[350px] md:h-[550px] xl:h-auto xl:flex-1'
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, 'contact');
