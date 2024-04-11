/* eslint-disable consistent-return */

'use client';

import gsap from 'gsap';
import React, { useEffect, useRef } from 'react';

interface MagneticProps {
  children: React.ReactElement;
}

export const Magnetic: React.FC<MagneticProps> = ({ children }) => {
  const magnetic = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!magnetic.current) return;

    const element = magnetic.current;
    const xTo = gsap.to(element, { x: 0, duration: 1, ease: 'elastic.out(1, 0.3)' });
    const yTo = gsap.to(element, { y: 0, duration: 1, ease: 'elastic.out(1, 0.3)' });

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { height, width, left, top } = element.getBoundingClientRect();
      const x = clientX - (left + width / 2);
      const y = clientY - (top + height / 2);
      xTo.vars.x = x * 0.35;
      yTo.vars.y = y * 0.35;
    };

    const onMouseLeave = () => {
      xTo.vars.x = 0;
      yTo.vars.y = 0;
    };

    element.addEventListener('mousemove', onMouseMove);
    element.addEventListener('mouseleave', onMouseLeave);

    return () => {
      element.removeEventListener('mousemove', onMouseMove);
      element.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return React.cloneElement(children, { ref: magnetic });
};
