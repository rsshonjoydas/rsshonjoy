import Image from 'next/image';

interface LogoProps {
  className?: string;
}

const myLoader = ({ src, width, quality }: any) =>
  `https://res.cloudinary.com/dmgbtukr2/image/upload/v1642085457/avatar/${src}?w=${width}&q=${
    quality || 75
  }`;

export const Logo = ({ className }: LogoProps) => (
  <div className={className}>
    <Image
      loader={myLoader}
      height={40}
      width={40}
      className='rounded-md cursor-pointer'
      src='rs_xedovq.jpg'
      alt='logo'
      blurDataURL='rs_xedovq.jpg'
      placeholder='blur'
      loading='lazy'
    />
  </div>
);
