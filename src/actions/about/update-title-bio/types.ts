import { About } from '@prisma/client';
import { z } from 'zod';

import { UpdateTitleBio } from './schema';

import { ActionState } from '@/lib/create-safe-action';

export type InputType = z.infer<typeof UpdateTitleBio>;
export type ReturnType = ActionState<InputType, About>;
