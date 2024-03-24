'use client';

import { About } from '@prisma/client';
import { ElementRef, useRef, useState } from 'react';
import { toast } from 'sonner';
import { useEventListener, useOnClickOutside } from 'usehooks-ts';

import { updateTitleBio } from '@/actions/about/update-title-bio';
import { FormSubmit } from '@/components/form/form-submit';
import { FormTextarea } from '@/components/form/form-textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useAction } from '@/hooks/use-action';

interface UpdateBioProps {
  data: About;
}

export const UpdateTitleBio = ({ data }: UpdateBioProps) => {
  const [title, setTitle] = useState(data.title);
  const [bio, setBio] = useState(data.bio);
  const [isEditing, setIsEditing] = useState(false);

  const formRef = useRef<ElementRef<'form'>>(null);
  const titleRef = useRef<ElementRef<'textarea'>>(null);
  const bioRef = useRef<ElementRef<'textarea'>>(null);

  const enabledTitleEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      titleRef.current?.focus();
      titleRef.current?.select();
    });
  };

  const enabledBioEditing = () => {
    setIsEditing(true);
    setTimeout(() => {
      bioRef.current?.focus();
      bioRef.current?.select();
    });
  };

  const disabledEditing = () => {
    setIsEditing(false);
  };

  const { execute } = useAction(updateTitleBio, {
    onSuccess: (newData) => {
      toast.success('Update Successfully');
      setTitle(newData.title);
      setBio(newData.bio);
      disabledEditing();
    },
    onError: (error) => {
      toast.error(error);
    },
  });

  const handleSubmit = (formData: FormData) => {
    const newTitle = formData.get('title') as string;
    const newBio = formData.get('bio') as string;
    const id = formData.get('id') as string;

    if (newTitle === title && newBio === bio) {
      return disabledEditing();
    }

    return execute({
      title: newTitle,
      bio: newBio,
      id,
    });
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      formRef.current?.requestSubmit();
    }
  };

  useEventListener('keydown', onKeyDown);
  useOnClickOutside(formRef, disabledEditing);

  return (
    <div className='items-start justify-between gap-x-2 px-2 pt-2 text-sm font-semibold'>
      {isEditing ? (
        <form ref={formRef} action={handleSubmit} className='w-full flex-1'>
          <input hidden id='id' name='id' value={data.id} />
          <Label>Title</Label>
          <FormTextarea
            ref={titleRef}
            id='title'
            placeholder='Enter title'
            defaultValue={title || undefined}
            className='my-2 min-h-[78px] w-full border-transparent bg-gray-100 bg-transparent px-3.5 py-3 text-sm font-medium transition hover:border-input focus:border-input dark:bg-gray-600/20'
          />
          <Label>Bio</Label>
          <FormTextarea
            ref={bioRef}
            id='bio'
            placeholder='Enter bio'
            defaultValue={bio || undefined}
            className='my-2 mt-4 min-h-[78px] w-full border-transparent bg-gray-100 bg-transparent px-3.5 py-3 text-sm font-medium transition hover:border-input focus:border-input dark:bg-gray-600/20'
          />
          <div className='mt-3 flex items-center gap-x-2'>
            <FormSubmit>Save</FormSubmit>
            <Button variant='ghost' size='sm' type='submit' onClick={disabledEditing}>
              Cancel
            </Button>
          </div>
        </form>
      ) : (
        <>
          <Label>Title</Label>
          <div
            onClick={enabledTitleEditing}
            role='button'
            tabIndex={0}
            className='my-2 min-h-[78px] rounded-md bg-gray-100 px-3.5 py-3 text-sm font-medium dark:bg-gray-600/20'
          >
            {title || 'Add title'}
          </div>
          <Label>Bio</Label>
          <div
            onClick={enabledBioEditing}
            role='button'
            tabIndex={0}
            className='my-2 min-h-[78px] rounded-md bg-gray-100 px-3.5 py-3 text-sm font-medium dark:bg-gray-600/20'
          >
            {bio || 'Add a more detailed description...'}
          </div>
        </>
      )}
    </div>
  );
};
