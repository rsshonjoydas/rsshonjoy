import { Facebook, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';

import { ActionTooltip } from '@/components/action-tooltip';
import { Framer } from '@/components/framer';
import Icons from '@/components/icons';
import { siteConfig } from '@/lib/site';

const socialMedia = [
  {
    name: 'Facebook',
    url: siteConfig.links.facebook,
    icon: Facebook,
    color: 'hover:bg-[#3b5998]',
  },
  {
    name: 'Twitter',
    url: siteConfig.links.twitter,
    icon: Icons.XTwitter,
    color: 'hover:bg-[#00acee]',
  },
  {
    name: 'Linkedin',
    url: siteConfig.links.linkedin,
    icon: Linkedin,
    color: 'hover:bg-[#0072b1]',
  },
  {
    name: 'Instagram',
    url: siteConfig.links.instagram,
    icon: Instagram,
    color: 'hover:bg-[#E1306C]',
  },
];

export const SocialMedia = () => (
  <button
    type='button'
    className='duration-30 absolute right-5 z-40 -mt-[350px] transition-opacity'
  >
    {socialMedia.map((item) => (
      <Framer key={item.name}>
        <ActionTooltip
          side='left'
          align='center'
          label={item.name}
          className='mr-2 bg-foreground/90 text-background'
        >
          <Link
            key={item.name}
            href={item.url}
            target='_blank'
            className={`${item.color} rounded-primary group my-4 flex h-12 w-12 items-center justify-center overflow-hidden rounded-md bg-background transition-all hover:rounded-2xl`}
          >
            <item.icon className='h-6 w-6 text-primary/75 transition group-hover:text-white' />
          </Link>
        </ActionTooltip>
      </Framer>
    ))}
  </button>
);
