export type SiteConfig = {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  links: {
    twitter: string;
    github: string;
    facebook: string;
    instagram: string;
    linkedin: string;
  };
};

export const siteConfig: SiteConfig = {
  name: 'RS Shonjoy',
  description:
    'An open source application built using the new router, server components and everything new in Next.js 13.',
  url: `${process.env.NEXT_PUBLIC_APP_URL}`,
  ogImage: 'https://redolence.com/og.jpg',
  links: {
    facebook: 'https://www.facebook.com/rsshonjoydas',
    twitter: 'https://twitter.com/rsshonjoydas',
    instagram: 'https://www.instagram.com/rsshonjoydas',
    linkedin: 'https://www.linkedin.com/in/rsshonjoydas',
    github: 'https://github.com/rsshonjoydas',
  },
};
