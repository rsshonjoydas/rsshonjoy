import { auth } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';

import db from '@/lib/db';
import { DeleteImage, UpdateImage } from '@/lib/upload-image'; // Import the UpdateImage function

export const DELETE = async (req: NextRequest, ctx: { params: { id: string } }) => {
  const { userId } = auth();

  if (!userId) {
    return {
      error: 'Unauthorized',
    };
  }

  const imagePublicId = ctx.params.id;

  const deleteImage = await DeleteImage(imagePublicId);
  await db.services.deleteMany({
    where: {
      publicId: imagePublicId,
    },
  });

  return NextResponse.json({ message: deleteImage }, { status: 200 });
};

export const PUT = async (req: NextRequest, ctx: { params: { id: string } }) => {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const imageId = ctx.params.id;

  try {
    const formData = await req.formData();
    const image = formData.get('image') as File;
    const title = formData.get('title') as string;

    // Update title if provided
    if (title) {
      await db.services.updateMany({
        where: {
          publicId: imageId,
        },
        data: {
          title,
        },
      });
    }

    // Update image if provided
    if (image) {
      const data = await UpdateImage(image, imageId);
      await db.services.updateMany({
        where: {
          publicId: imageId,
        },
        data: {
          imageUrl: data.secure_url,
          publicId: data.public_id,
        },
      });
    }

    return NextResponse.json({ message: 'Update successful' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
};
