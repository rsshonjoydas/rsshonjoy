'use client';

import { Services } from '@prisma/client';
import axios from 'axios';
import { MoreVertical, Pencil } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useMediaQuery } from 'usehooks-ts';

import { DeleteConfirmation } from '@/components/delete-confirmation';
import { FormImageUpload, FormImageUploadValues } from '@/components/form/form-image-upload';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';

interface ServiceActionProps {
  data: Services;
  fetchData: () => Promise<void>;
}

export const ServiceAction = ({ data, fetchData }: ServiceActionProps) => {
  const [loading, setLoading] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const { publicId } = data;

  const handleDelete = async () => {
    setLoading(true);
    try {
      if (!publicId) {
        throw new Error('No publicId provided');
      }

      await axios.delete(`/api/services/${encodeURIComponent(publicId)}`);
      toast.success('Service deleted');

      await fetchData();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async ({ image, title }: FormImageUploadValues) => {
    try {
      const formData = new FormData();

      // Check if titleText is provided and append to formData
      if (title) {
        formData.append('title', title);
      }

      // Check if image is provided and append to formData
      if (image) {
        formData.append('image', image);
      }

      // Check if neither title nor image is provided
      if (!title && !image) {
        toast.error('No title or image provided');
      }

      if (!publicId) {
        throw new Error('No publicId provided');
      }

      const response = await axios.put(`/api/services/${encodeURIComponent(publicId)}`, formData);

      if (response.status === 200) {
        if (title) {
          toast.success('Title updated successfully');
        }

        if (image) {
          toast.success('Image updated successfully');
        }

        await fetchData();

        // Close the Drawer or Dialog and Popover after successful form submission
        setOpen(false);
        setOpenPopover(false);
      } else {
        toast.error('Failed to update');
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <Popover open={openPopover} onOpenChange={setOpenPopover}>
      <PopoverTrigger asChild>
        <Button variant='ghost' className='h-auto w-auto p-2'>
          <MoreVertical className='size-5' />
        </Button>
      </PopoverTrigger>
      <PopoverContent side='bottom' align='start' className='w-40 px-0 pb-3 pt-3'>
        {isDesktop ? (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                variant='ghost'
                disabled={loading}
                className='h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
              >
                <Pencil className='-ml-3 mr-2 size-5' />
                Update
              </Button>
            </DialogTrigger>
            <DialogContent className='sm:max-w-[425px]'>
              <DialogHeader>
                <DialogTitle>Update Service</DialogTitle>
              </DialogHeader>
              <FormImageUpload data={data} handleSubmit={handleUpdate} buttonText='Save Change' />
            </DialogContent>
          </Dialog>
        ) : (
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <Button
                variant='ghost'
                disabled={loading}
                className='h-auto w-full justify-start rounded-none p-2 px-5 text-sm font-normal focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'
              >
                <Pencil className='-ml-3 mr-2 size-5' />
                Update
              </Button>
            </DrawerTrigger>
            <DrawerContent className='focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0'>
              <DrawerHeader className='text-left'>
                <DrawerTitle>Update Service</DrawerTitle>
              </DrawerHeader>
              <FormImageUpload data={data} handleSubmit={handleUpdate} buttonText='Save Change' />
            </DrawerContent>
          </Drawer>
        )}
        <Separator />
        <DeleteConfirmation onDelete={() => handleDelete()} loading={loading} />
      </PopoverContent>
    </Popover>
  );
};
