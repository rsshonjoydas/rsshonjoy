import { z } from 'zod';

export const UpdateTitleBio = z.object({
  title: z.optional(
    z
      .string({
        required_error: 'Title is required',
        invalid_type_error: 'Title is required',
      })
      .min(3, {
        message: 'Title is too short',
      })
  ),
  bio: z.optional(
    z
      .string({
        required_error: 'Bio is required',
        invalid_type_error: 'Bio is required',
      })
      .min(50, {
        message: 'Bio is too short',
      })
  ),
  id: z.string(),
});
