/* eslint-disable react/no-unknown-property */

'use client';

import emailjs from '@emailjs/browser';
import { zodResolver } from '@hookform/resolvers/zod';
import { Canvas } from '@react-three/fiber';
import { Suspense, useState } from 'react';
import { useForm } from 'react-hook-form';
import TextareaAutosize from 'react-textarea-autosize';
import { toast } from 'sonner';
import { z } from 'zod';

import AnimatedContent from '@/components/animated-content';
import { Loader } from '@/components/loader';
import { Fox } from '@/components/modals/fox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  name: z.string().min(3, { message: 'Name must be at least 3 character long' }), // Define custom error message
  email: z
    .string()
    .min(1, { message: 'This field has to be filled.' })
    .email('This is not a valid email.'),
  message: z.string().min(3, { message: 'Message must be at least 3 character long' }), // Define custom error message
});

export const Contact = () => {
  const [loading, setLoading] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState('idle');

  const handleFocus = () => setCurrentAnimation('walk');
  const handleBlur = () => setCurrentAnimation('idle');

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const { reset } = form;

  const handleSubmit = (e: z.infer<typeof formSchema>) => {
    setLoading(true);
    setCurrentAnimation('hit');

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? '',
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? '',
        {
          from_name: e.name,
          to_name: 'RS Shonjoy',
          from_email: e.email,
          to_email: 'rsshonjoydas@gmail.com',
          message: e.message,
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? ''
      )
      .then(
        () => {
          setLoading(false);
          toast.success('Thank you for your message 😃');
          reset();
        },
        (error) => {
          setLoading(false);
          toast.error("I didn't receive your message 😢");
          console.error(error);
          setCurrentAnimation('idle');
        }
      );
  };

  return (
    <section id='contact' className='container relative flex flex-col lg:flex-row'>
      <div className='flex min-w-[50%] flex-1 flex-col'>
        <AnimatedContent>
          <h1 className='head-text'>
            Get in <span className='blue-gradient_text font-semibold drop-shadow'>Touch</span>
          </h1>
        </AnimatedContent>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className='mt-14 flex w-full flex-col gap-7'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Shonjoy'
                      onFocus={handleFocus}
                      {...field}
                      onBlur={handleBlur}
                      className='dark:border-gray-700'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='rsshonjoy@gmail.com'
                      onFocus={handleFocus}
                      {...field}
                      onBlur={handleBlur}
                      className='dark:border-gray-700'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />{' '}
            <FormField
              control={form.control}
              name='message'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <TextareaAutosize
                      placeholder='Message Shonjoy...'
                      disabled={loading}
                      className='flex min-h-[80px] w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none ring-0 ring-offset-background placeholder:text-muted-foreground focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700'
                      onFocus={handleFocus}
                      {...field}
                      onBlur={handleBlur}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <button
              type='submit'
              disabled={loading}
              className='btn'
              onFocus={handleFocus}
              onBlur={handleBlur}
            >
              {loading ? 'Sending...' : 'Submit'}
            </button>
          </form>
        </Form>
      </div>

      <div className='h-[350px] w-full md:h-[550px] lg:h-auto lg:w-1/2'>
        <Canvas
          camera={{
            position: [0, 0, 5],
            fov: 75,
            near: 0.1,
            far: 1000,
          }}
        >
          <directionalLight position={[0, 0, 1]} intensity={2.5} />
          <ambientLight intensity={1} />
          <pointLight position={[5, 10, 0]} intensity={2} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} />

          <Suspense fallback={<Loader />}>
            <Fox
              currentAnimation={currentAnimation}
              position={[0.5, 0.35, 0]}
              rotation={[12.629, -0.6, 0]}
              scale={[0.5, 0.5, 0.5]}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};
