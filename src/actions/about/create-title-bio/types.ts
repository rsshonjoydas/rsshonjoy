import { About } from '@prisma/client';
import { z } from 'zod';

import { CreateTitleBio } from './schema';

import { ActionState } from '@/lib/create-safe-action';

export type InputType = z.infer<typeof CreateTitleBio>;
export type ReturnType = ActionState<InputType, About>;
