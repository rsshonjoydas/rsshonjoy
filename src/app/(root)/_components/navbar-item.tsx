/* eslint-disable no-unused-vars */
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/navigation';

import { useActiveSectionContext } from '@/context/active-section-context';
import { cn } from '@/lib/utils';

interface NavbarItemProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
  label?: string;
}

export const NavbarItem = ({
  href,
  onOpenChange,
  className,
  children,
  label,
  ...props
}: NavbarItemProps) => {
  const { activeSection, setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
  const router = useRouter();

  return (
    <Link
      className={cn('flex w-full px-3 py-3 transition-colors hover:text-foreground/80', {
        'text-foreground/60': activeSection === label,
      })}
      href={href}
      onClick={() => {
        setActiveSection(label);
        setTimeOfLastClick(Date.now());
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      {...props}
    >
      {children}
    </Link>
  );
};
