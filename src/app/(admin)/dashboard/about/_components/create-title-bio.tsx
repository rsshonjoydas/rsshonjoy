'use client';

import { ElementRef, useRef } from 'react';
import { toast } from 'sonner';

import { createTitleBio } from '@/actions/about/create-title-bio';
import { FormSubmit } from '@/components/form/form-submit';
import { FormTextarea } from '@/components/form/form-textarea';
import { useAction } from '@/hooks/use-action';

export const CreateTitleBio = () => {
  const textareaRef = useRef<ElementRef<'textarea'>>(null);

  const { execute, fieldErrors } = useAction(createTitleBio, {
    onSuccess: () => {
      toast.success('Info added.');
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const onSubmit = (formData: FormData) => {
    const title = formData.get('title') as string;
    const bio = formData.get('bio') as string;

    execute({ title, bio });
  };

  return (
    <form action={onSubmit} className='gap-x-2 space-y-3 p-3 px-2 pt-2'>
      <div className='flex flex-col'>
        <FormTextarea
          id='title'
          label='Create Title'
          placeholder='Add title...'
          errors={fieldErrors}
          ref={textareaRef}
          className='bg-gray-100 dark:bg-gray-600/20'
        />
        <FormTextarea
          id='bio'
          label='Create Bio'
          placeholder='Add a more detailed description...'
          errors={fieldErrors}
          ref={textareaRef}
          className='bg-gray-100 dark:bg-gray-600/20'
        />
      </div>
      <FormSubmit>Save</FormSubmit>
    </form>
  );
};
