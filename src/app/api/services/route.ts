/* eslint-disable no-return-await */
import { auth } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';

import db from '@/lib/db';
import { UploadImage } from '@/lib/upload-image';

export const POST = async (req: NextRequest) => {
  const { userId } = auth();

  if (!userId) {
    // Return a Response object directly for unauthorized access
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  const formData = await req.formData();

  const image = formData.get('image') as File;
  const title = formData.get('title') as string; // Retrieve title from form data

  const data = await UploadImage(
    image,
    `${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_FOLDER}/services`
  );

  const imageData = data as { secure_url?: string; public_id?: string } | undefined;

  if (!imageData) {
    return NextResponse.json({ message: 'Image upload failed' }, { status: 500 });
  }

  const lastChapter = await db.services.findFirst({
    where: {
      userId,
    },
    orderBy: {
      position: 'desc',
    },
  });

  const newPosition = lastChapter?.position != null ? lastChapter.position + 1 : 1;

  try {
    const createdService = await db.services.create({
      data: {
        userId,
        imageUrl: imageData.secure_url,
        publicId: imageData.public_id,
        title,
        position: newPosition,
      },
    });

    return NextResponse.json(
      { message: 'Service Create successfully', service: createdService },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error creating service:', error);
    return new NextResponse('Failed to create service', { status: 500 });
  }
};

export const PUT = async (req: NextRequest) => {
  const { userId } = auth();

  if (!userId) {
    // Return a Response object directly for unauthorized access
    return new Response(JSON.stringify({ error: 'Unauthorized' }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  try {
    const { service } = await req.json();

    const updatePromises = service.map(
      async (item: any) =>
        await db.services.update({
          where: { id: item.id },
          data: { position: item.position }, // Ensure correct position update
        })
    );

    await Promise.all(updatePromises);
    // console.log('🚀 ~ PUT ~ updatedServices:', updatedServices);

    return NextResponse.json(
      { message: 'Service positions updated successfully' },
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse('Failed to update positions');
  }
};

export const GET = async () => {
  const images = await db.services.findMany();

  return NextResponse.json({ images, total: images.length }, { status: 200 });
};
