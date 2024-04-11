/* eslint-disable react-hooks/rules-of-hooks */

'use client';

import { AnimatePresence, MotionValue, motion, useMotionValue, useTransform } from 'framer-motion';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const links = [
  {
    label: 'About',
    href: '#about',
  },
  {
    label: 'Projects',
    href: '#projects',
  },
  {
    label: 'Contact',
    href: '#contact',
  },
] as const;

interface NavItemProps {
  className?: string;
}

export const NavItem = ({ className }: NavItemProps) => {
  const [activeLabelOnScroll, setActiveLabelOnScroll] = useState<string | null>(null);

  const MotionLink = motion(Link);

  const mapRange = (
    inputLower: number,
    inputUpper: number,
    outputLower: number,
    outputUpper: number
  ) => {
    const INPUT_RANGE = inputUpper - inputLower;
    const OUTPUT_RANGE = outputUpper - outputLower;

    return (value: number) =>
      outputLower + (((value - inputLower) / INPUT_RANGE) * OUTPUT_RANGE || 0);
  };

  const setTransform = (
    item: HTMLElement & EventTarget,
    event: React.PointerEvent,
    x: MotionValue,
    y: MotionValue
  ) => {
    const bounds = item.getBoundingClientRect();
    const relativeX = event.clientX - bounds.left;
    const relativeY = event.clientY - bounds.top;
    const xRange = mapRange(0, bounds.width, -1, 1)(relativeX);
    const yRange = mapRange(0, bounds.height, -1, 1)(relativeY);
    x.set(xRange * 10);
    y.set(yRange * 10);
  };

  useEffect(() => {
    const handleScroll = () => {
      const heroElement = document.getElementById('hero'); // Assuming the ID of the hero section is 'hero'

      if (heroElement) {
        const heroRect = heroElement.getBoundingClientRect();
        const heroVisibleHeight =
          Math.min(heroRect.bottom, window.innerHeight) - Math.max(heroRect.top, 0);

        // If hero section is more than half visible, set it as active
        if (heroVisibleHeight > window.innerHeight / 2) {
          setActiveLabelOnScroll('hero');
          return;
        }
      }

      const visibleSections = links
        .map((link) => {
          const element = document.getElementById(link.label?.toLocaleLowerCase());
          if (element) {
            const rect = element.getBoundingClientRect();
            return {
              label: link.label?.toLocaleLowerCase(),
              visibleHeight: Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0),
            };
          }
          return null;
        })
        .filter(Boolean);

      // Find the section with the maximum visible height
      const largestSection = visibleSections.reduce((max, section: any) =>
        section.visibleHeight > (max?.visibleHeight || 0) ? section : max
      );

      setActiveLabelOnScroll(largestSection?.label || null);
    };

    // Initialize active label on scroll when the component mounts
    handleScroll();

    // Attach the scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Remove the scroll event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className='p-8'>
      <ul className={className}>
        <AnimatePresence>
          {links.map((link) => {
            const x = useMotionValue(0);
            const y = useMotionValue(0);
            const textX = useTransform(x, (latest) => latest * 0.5);
            const textY = useTransform(y, (latest) => latest * 0.5);
            return (
              <motion.li
                onPointerMove={(event) => {
                  const item = event.currentTarget;
                  setTransform(item, event, x, y);
                }}
                key={link.href}
                onPointerLeave={() => {
                  x.set(0);
                  y.set(0);
                }}
                style={{ x, y }}
              >
                <MotionLink
                  className={cn(
                    buttonVariants({
                      variant: 'icon',
                    }),
                    'ease-ou relative rounded-md px-2 py-2 text-sm font-medium transition-all duration-500',
                    activeLabelOnScroll === link.label?.toLocaleLowerCase() &&
                      'bg-muted-foreground/20 text-accent-foreground'
                  )}
                  href={link.href}
                >
                  <motion.span style={{ x: textX, y: textY }} className='relative z-10'>
                    {link.label}
                  </motion.span>
                  {activeLabelOnScroll === link.label?.toLocaleLowerCase() ? (
                    <motion.div
                      transition={{ type: 'spring' }}
                      layoutId='underline'
                      className='absolute bottom-0 left-0 h-full w-full rounded-md bg-lavender'
                    />
                  ) : null}
                </MotionLink>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </nav>
  );
};
