/* eslint-disable no-shadow */

import ServiceImage from '../_components/service-image';

import getImageInfo from '@/lib/blur-data-url';
import db from '@/lib/db';

export const Services = async () => {
  const item = await db.services.findMany({
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
    <div className='flex flex-wrap justify-center gap-10'>
      {blurDataUrls.map((item, index) => (
        <ServiceImage
          key={item.src}
          imageUrl={item.src}
          blurDataUrl={item.blurDataUrl}
          title={item.title}
          index={index}
        />
      ))}
    </div>
  );
};
