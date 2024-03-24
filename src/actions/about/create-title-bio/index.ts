'use server';

import { auth } from '@clerk/nextjs';
import { revalidatePath } from 'next/cache';

import { CreateTitleBio } from './schema';
import { InputType, ReturnType } from './types';

import { createSafeAction } from '@/lib/create-safe-action';
import db from '@/lib/db';

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId } = auth();

  if (!userId) {
    return {
      error: 'Unauthorized',
    };
  }

  const { title, bio } = data;

  let info;

  try {
    info = await db.about.create({
      data: {
        title,
        bio,
      },
    });
  } catch (error) {
    return {
      error: 'Failed to create',
    };
  }

  revalidatePath('/dashboard/about');
  return { data: info };
};

export const createTitleBio = createSafeAction(CreateTitleBio, handler);
