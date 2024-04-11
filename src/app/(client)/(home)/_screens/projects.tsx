/* eslint-disable react/no-array-index-key */
/* eslint-disable no-shadow */

'use client';

import { motion } from 'framer-motion';
import gsap from 'gsap';
import { MoveRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { MutableRefObject, useEffect, useRef, useState } from 'react';

import styles from './projects.module.scss';

import { RoundedButton } from '@/components/rounded-button';
import { projects } from '@/constants/projects';

const scaleAnimation = {
  initial: { scale: 0, x: '-50%', y: '-50%' },
  enter: {
    scale: 1,
    x: '-50%',
    y: '-50%',
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    scale: 0,
    x: '-50%',
    y: '-50%',
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
  },
};

export const Projects = () => {
  const [modal, setModal] = useState({ active: false, index: 0 });
  const { active, index } = modal;
  const modalContainer = useRef(null);
  const cursor = useRef(null);
  const cursorLabel = useRef(null);

  const xMoveContainer: MutableRefObject<any> = useRef(null);
  const yMoveContainer: MutableRefObject<any> = useRef(null);
  const xMoveCursor: MutableRefObject<any> = useRef(null);
  const yMoveCursor: MutableRefObject<any> = useRef(null);
  const xMoveCursorLabel: MutableRefObject<any> = useRef(null);
  const yMoveCursorLabel: MutableRefObject<any> = useRef(null);

  useEffect(() => {
    // Move Container
    xMoveContainer.current = gsap.quickTo(modalContainer.current, 'left', {
      duration: 0.8,
      ease: 'power3',
    });
    yMoveContainer.current = gsap.quickTo(modalContainer.current, 'top', {
      duration: 0.8,
      ease: 'power3',
    });
    // Move cursor
    xMoveCursor.current = gsap.quickTo(cursor.current, 'left', { duration: 0.5, ease: 'power3' });
    yMoveCursor.current = gsap.quickTo(cursor.current, 'top', { duration: 0.5, ease: 'power3' });
    // Move cursor label
    xMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, 'left', {
      duration: 0.45,
      ease: 'power3',
    });
    yMoveCursorLabel.current = gsap.quickTo(cursorLabel.current, 'top', {
      duration: 0.45,
      ease: 'power3',
    });
  }, []);

  const moveItems = (x: number, y: number) => {
    xMoveContainer.current(x);
    yMoveContainer.current(y);
    xMoveCursor.current(x);
    yMoveCursor.current(y);
    xMoveCursorLabel.current(x);
    yMoveCursorLabel.current(y);
  };

  const manageModal = (active: any, index: any, x: any, y: any) => {
    moveItems(x, y);
    setModal({ active, index });
  };

  return (
    <main
      onMouseMove={(e) => {
        moveItems(e.clientX, e.clientY);
      }}
      id='projects'
      className='container px-5 py-16'
    >
      <h1 className='head-text'>
        My <span className='blue-gradient_text font-semibold drop-shadow'>Projects</span>
      </h1>
      <div className='my-20 flex flex-wrap gap-16 lg:items-center lg:justify-center'>
        {projects.map((project, index) => (
          <div>
            <div
              onMouseEnter={(e) => {
                manageModal(true, index, e.clientX, e.clientY);
              }}
              onMouseLeave={(e) => {
                manageModal(false, index, e.clientX, e.clientY);
              }}
              className={`${styles.project} w-full lg:w-[385px]`}
            >
              <div className='w-full' key={project.title}>
                <div className='block-container h-12 w-12'>
                  <div className={`btn-back rounded-xl ${project.theme}`} />
                  <div className='btn-front flex items-center justify-center rounded-xl'>
                    <Image
                      height={200}
                      width={200}
                      src={project.iconUrl}
                      alt='threads'
                      className='h-1/2 w-1/2 object-contain'
                    />
                  </div>
                </div>
                <div className='mt-5 flex flex-col'>
                  <h4 className='font-poppins text-2xl font-semibold'>{project.title}</h4>
                  <p className='mt-2 text-slate-500'>{project.description}</p>
                </div>
              </div>
            </div>
            <div className='font-poppins mt-5 flex items-center gap-2'>
              <Link
                href={project.link}
                target='_blank'
                rel='noopener noreferrer'
                className='flex items-center justify-center gap-1 font-semibold text-blue-600 transition duration-300 hover:translate-x-3 hover:transform'
              >
                Live Link
                <MoveRight className='size-6' />
              </Link>
            </div>
          </div>
        ))}
      </div>

      <RoundedButton
        // backgroundColor='#BF94E4'
        className='mx-auto flex w-52 items-center justify-center'
      >
        <p>More work</p>
      </RoundedButton>

      <motion.div
        ref={modalContainer}
        variants={scaleAnimation}
        initial='initial'
        animate={active ? 'enter' : 'closed'}
        className={styles.modalContainer}
      >
        <div style={{ top: `${index * -100}%` }} className={styles.modalSlider}>
          {projects.map((project, index) => (
            <div
              className={styles.modal}
              style={{ backgroundColor: project.color }}
              key={`modal_${index}`}
            >
              <Image src={project.thumbnail} width={300} height={0} alt='image' />
            </div>
          ))}
        </div>
      </motion.div>
      <motion.div
        ref={cursor}
        className={styles.cursor}
        variants={scaleAnimation}
        initial='initial'
        animate={active ? 'enter' : 'closed'}
      />
      <motion.div
        ref={cursorLabel}
        className={styles.cursorLabel}
        variants={scaleAnimation}
        initial='initial'
        animate={active ? 'enter' : 'closed'}
      >
        View
      </motion.div>
    </main>
  );
};
