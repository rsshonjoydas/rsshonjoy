/* eslint-disable no-unused-vars */

'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Services } from '@prisma/client';
import { Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useCallback, useState } from 'react';
import { Accept, useDropzone } from 'react-dropzone';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';

import Icons from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  title: z.string().min(3, { message: 'Title must be at least 1 character long' }), // Define custom error message
  image: z.string().min(1, { message: 'Please select an image' }).nullable(),
});

type SubmitHandler<T> = (data: T) => void;

export interface FormImageUploadValues {
  image: File | null;
  title: string;
}

export interface FormImageUploadProps {
  data?: Services | null;
  handleSubmit: SubmitHandler<FormImageUploadValues>;
  buttonText: string;
}

export const FormImageUpload = ({ data, handleSubmit, buttonText }: FormImageUploadProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(data?.title || '');
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(data?.imageUrl || null);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: data?.title || '',
      image: data?.imageUrl || '',
    },
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setPreview(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*' as unknown as Accept,
    maxFiles: 1,
    onDrop,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
      form.setValue('image', URL.createObjectURL(file));
    }
  };

  const handleDelete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
    setPreview(null);
  };

  const handleSubmitForm = async () => {
    setLoading(true);
    try {
      await handleSubmit({ image, title });
      router.refresh();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmitForm)} className='mx-auto w-3/4 py-6'>
        <div className='mx-auto max-w-md'>
          <div
            {...getRootProps({ className: 'dropzone' })}
            className='mb-3 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
          >
            <FormField
              control={form.control}
              name='image'
              render={() => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...getInputProps()}
                      id='dropzone-file'
                      onChange={handleChange}
                      type='file'
                      disabled={loading}
                      className='hidden'
                    />
                  </FormControl>
                  <FormMessage /> {/* Pass the name of the field to FormMessage */}
                </FormItem>
              )}
            />
            <div className='dark:hover:bg-bray-800 relative flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700/30 dark:hover:border-gray-500/50 dark:hover:bg-gray-600/30'>
              {preview && (
                <>
                  <Image
                    src={preview}
                    layout='fill'
                    style={{ objectFit: 'contain', objectPosition: 'center' }}
                    alt={data?.title || ''}
                    className={`${loading && 'cursor-not-allowed opacity-75'} h-full w-full object-contain`}
                  />
                  <div className='absolute right-2 top-2'>
                    <button
                      type='button'
                      onClick={handleDelete}
                      disabled={loading}
                      aria-label='delete image'
                      className={`${loading && 'cursor-not-allowed opacity-75'}`}
                    >
                      <Trash2 className='size-5 text-rose-700/90 focus:outline-none' />
                    </button>
                  </div>
                </>
              )}
              {!preview && (
                <div className='text-center'>
                  <Icons.Upload className='mx-auto mb-4 h-12 w-12 text-gray-500 dark:text-gray-400' />
                  <p className='text-sm font-semibold text-gray-500 dark:text-gray-400'>
                    Click to upload
                  </p>
                  <p className='text-xs text-gray-500 dark:text-gray-400'>or drag and drop</p>
                  <p className='text-xs text-gray-500 dark:text-gray-400'>
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
              )}
            </div>
          </div>
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Input
                    type='text'
                    placeholder='Enter title'
                    disabled={loading}
                    className='w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none dark:border-gray-600'
                    {...field} // Spread the field object here
                    onChange={(e) => {
                      field.onChange(e); // Ensure that onChange is called from the field object
                      setTitle(e.target.value); // Update the local state if needed
                    }}
                  />
                </FormControl>
                <FormMessage /> {/* Pass the name of the field to FormMessage */}
              </FormItem>
            )}
          />
        </div>
        <Button type='submit' disabled={loading} className='mt-3'>
          {buttonText}
        </Button>
      </form>
    </Form>
  );
};
