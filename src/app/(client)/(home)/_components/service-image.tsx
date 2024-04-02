/* eslint-disable no-shadow */
// PlaiceholderMultipleDynamicBlur.js
import { auth } from '@clerk/nextjs';
import Image from 'next/image';
import { redirect } from 'next/navigation';

import getImageInfo from '@/lib/blur-data-url';
import db from '@/lib/db';

export const PlaiceholderMultipleDynamicBlur = async () => {
  const { userId } = auth();

  if (!userId) {
    return redirect('/');
  }

  const item = await db.services.findMany({
    where: {
      userId,
    },
    orderBy: {
      position: 'asc',
    },
  });

  // Fetch data for all items in the items array
  const blurDataUrls = await Promise.all(
    item.map(async (item: any) => {
      const imageInfo = await getImageInfo(item.imageUrl); // Fetch image info using your getImageInfo function
      return {
        src: item.imageUrl,
        blurDataUrl: imageInfo?.base64,
        title: item.title,
      };
    })
  );

  return (
    <div className='mt-20 flex flex-wrap justify-center gap-10'>
      {blurDataUrls.map((item: any) => (
        <div className='relative mx-0 flex w-[220px] items-center justify-center'>
          <div className='h-full w-full rounded-[20px] bg-gradient-to-t from-lavender to-blue-400 p-[1px] shadow-card'>
            <div className='flex min-h-[280px] flex-col items-center justify-evenly rounded-[20px] bg-background/70 px-12 py-5 dark:bg-tertiary'>
              <Image
                key={item.src} // Add a unique key for each Image component
                src={item.src}
                height={16}
                width={16}
                sizes='100vw'
                layout='responsive'
                style={{ objectFit: 'contain', objectPosition: 'center' }}
                alt={item.title}
                className='size-16 object-contain'
                placeholder='blur'
                blurDataURL={item.blurDataUrl}
                priority
              />
              <div className='h-7 w-full border-transparent px-2.5 py-1 text-sm font-medium'>
                {item.title}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
