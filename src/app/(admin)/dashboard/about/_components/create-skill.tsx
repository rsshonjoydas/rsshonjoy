'use client';

import axios from 'axios';
import { Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useMediaQuery } from 'usehooks-ts';

import { FormImageUpload, FormImageUploadValues } from '@/components/form/form-image-upload';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

interface CreateSkillProps {
  fetchData: () => Promise<void>;
}

export const CreateSkill = ({ fetchData }: CreateSkillProps) => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const handleSubmit = async ({ image, title }: FormImageUploadValues) => {
    try {
      if (!image) {
        return;
      }

      const formData = new FormData();
      formData.append('image', image);
      formData.append('title', title);

      await axios.post('/api/skills', formData);
      toast.success('Skill create successfully');

      await fetchData();

      // Close the Drawer or Dialog after successful form submission
      setOpen(false);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      {isDesktop ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Plus className='size-14 cursor-pointer' />
          </DialogTrigger>
          <DialogContent className='focus:outline-none focus:ring-0 focus:ring-offset-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle>Create Skill</DialogTitle>
              <DialogDescription>Create skill card</DialogDescription>
            </DialogHeader>
            <FormImageUpload handleSubmit={handleSubmit} buttonText='Create' />
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Plus className='size-14 cursor-pointer' />
          </DrawerTrigger>
          <DrawerContent className='focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'>
            <DrawerHeader className='text-left'>
              <DrawerTitle>Create Skill</DrawerTitle>
              <DrawerDescription>Create skill card</DrawerDescription>
            </DrawerHeader>
            <FormImageUpload handleSubmit={handleSubmit} buttonText='Create' />
            <DrawerFooter className='pt-2'>
              <DrawerClose asChild>
                <Button variant='outline'>Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
};
