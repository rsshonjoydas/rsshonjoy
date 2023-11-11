import Link from 'next/link';

import { ActionTooltip } from '@/components/action-tooltip';
import { socialMedia } from '@/constants';

export const SocialMedia = () => (
  <button type='button' className='duration-30 absolute right-5 z-50 -mt-72 transition-opacity'>
    {socialMedia.map((item) => (
      <ActionTooltip
        side='left'
        align='center'
        label={item.name}
        className='mr-2 bg-foreground text-background'
      >
        <Link
          key={item.name}
          href={item.url}
          target='_blank'
          className={`${item.color} rounded-primary group flex h-12 w-12 items-center justify-center overflow-hidden bg-background transition-all hover:rounded-[16px]`}
        >
          <item.icon className='h-6 w-6 text-primary/75 transition group-hover:text-white' />
        </Link>
      </ActionTooltip>
    ))}
  </button>
);
