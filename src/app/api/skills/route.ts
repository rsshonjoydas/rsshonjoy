/* eslint-disable no-return-await */
import { auth } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';

import db from '@/lib/db';
import { UploadImage } from '@/lib/upload-image';

export const POST = async (req: NextRequest) => {
  const { userId } = auth();

  if (!userId) {
    return {
      error: 'Unauthorized',
    };
  }

  const formData = await req.formData();

  const image = formData.get('image') as File;
  const title = formData.get('title') as string; // Retrieve title from form data

  const data = await UploadImage(
    image,
    `${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_FOLDER}/skills`
  );

  const imageData = data as { secure_url?: string; public_id?: string } | undefined;

  if (!imageData) {
    return NextResponse.json({ message: 'Image upload failed' }, { status: 500 });
  }

  const lastSkill = await db.services.findFirst({
    where: {
      userId,
    },
    orderBy: {
      position: 'desc',
    },
  });

  const newPosition = lastSkill?.position != null ? lastSkill.position + 1 : 1;

  try {
    const createdSkill = await db.skills.create({
      data: {
        userId,
        imageUrl: imageData.secure_url,
        publicId: imageData.public_id,
        title,
        position: newPosition,
      },
    });

    return NextResponse.json(
      { message: 'Skill Create successfully', skill: createdSkill },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error creating skill:', error);
    return new NextResponse('Failed to create skill', { status: 500 });
  }
};

export const PUT = async (req: NextRequest) => {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const { skill } = await req.json();

    const updatePromises = skill.map(
      async (item: any) =>
        await db.skills.update({
          where: { id: item.id },
          data: { position: item.position }, // Ensure correct position update
        })
    );

    await Promise.all(updatePromises);

    return NextResponse.json({ message: 'Skill positions updated successfully' }, { status: 200 });
  } catch (error) {
    return new NextResponse('Failed to update positions');
  }
};

export const GET = async () => {
  const images = await db.skills.findMany();

  return NextResponse.json({ images, total: images.length }, { status: 200 });
};
