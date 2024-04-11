'use client';

import gsap from 'gsap';
import React, { useEffect, useRef, useState } from 'react';

import { Magnetic } from './magnetic';
import styles from './rounded-button.module.scss';

interface RoundedButtonProps {
  children: React.ReactNode;
  className?: string;
  backgroundColor?: string;
}

export const RoundedButton: React.FC<RoundedButtonProps> = ({
  children,
  className,
  backgroundColor = '#455CE9',
  ...attributes
}) => {
  const circle = useRef<HTMLDivElement | null>(null);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const timeoutId = useRef<number | null>(null); // Use number instead of NodeJS.Timeout
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    timeline.current = gsap.timeline({ paused: true });
    timeline.current
      .to(circle.current, { top: '-25%', width: '150%', duration: 0.4, ease: 'power3.in' }, 'enter')
      .to(circle.current, { top: '-150%', width: '125%', duration: 0.25 }, 'exit');
  }, []);

  const manageMouseEnter: React.MouseEventHandler<HTMLDivElement> = () => {
    if (timeoutId.current) clearTimeout(timeoutId.current);
    setIsHovered(true);
    timeline.current?.tweenFromTo('enter', 'exit');
  };

  const manageMouseLeave: React.MouseEventHandler<HTMLDivElement> = () => {
    timeoutId.current = window.setTimeout(() => {
      // Use window.setTimeout
      setIsHovered(false);
      timeline.current?.play();
    }, 300) as unknown as number; // Cast setTimeout return type to number
  };

  return (
    <Magnetic>
      <div
        className={`${styles.roundedButton} ${className}`}
        style={{ overflow: 'hidden' }}
        onMouseEnter={manageMouseEnter}
        onMouseLeave={manageMouseLeave}
        {...attributes}
      >
        {children}
        <div
          ref={circle}
          style={{ backgroundColor }}
          className={`${styles.circle} ${isHovered ? styles.hovered : ''}`}
        />
      </div>
    </Magnetic>
  );
};
