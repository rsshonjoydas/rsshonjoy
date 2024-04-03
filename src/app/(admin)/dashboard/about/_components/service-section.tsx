/* eslint-disable no-shadow */

'use client';

import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd';
import { Services } from '@prisma/client';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { CreateService } from './create-service';
import { ServiceAction } from './service-action';

interface ServiceSectionProps {
  data: Services[];
}

export const ServiceSection = ({ data }: ServiceSectionProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [services, setServices] = useState<Services[]>(data);

  const fetchData = async () => {
    try {
      const { data } = await axios.get('/api/services');
      setServices(data.images);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const onRecord = async (updateData: { id: string; position: number }[]) => {
    try {
      await axios.put('/api/services', {
        service: updateData,
      });

      toast.success('Services reordered');
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    // ? if dropped in the same position
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const items = Array.from(services);
    const [reorderedItems] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItems);

    const startIndex = Math.min(source.index, destination.index);
    const endIndex = Math.max(source.index, destination.index);

    const updatedServices = items.slice(startIndex, endIndex + 1);

    setServices(items);

    const bulkUpdateData = updatedServices.map((chapter) => ({
      id: chapter.id,
      position: items.findIndex((item) => item.id === chapter.id),
    }));

    onRecord(bulkUpdateData);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setServices(services);
  }, [services]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className='py-10'>
      <h3 className='subhead-text p-5'>Services</h3>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='services' type='list' direction='horizontal'>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className='mt-3 flex flex-wrap justify-center gap-10'
            >
              {services.map((service, index) => (
                <Draggable key={service.id} draggableId={service.id} index={index}>
                  {(provided) => (
                    <div
                      className='relative mx-0 flex w-[220px] items-center justify-center'
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <div
                        {...provided.dragHandleProps}
                        className='h-full w-full rounded-[20px] bg-gradient-to-t from-lavender to-blue-400 p-[1px] shadow-card'
                      >
                        <div className='flex min-h-[280px] flex-col items-center justify-evenly rounded-[20px] bg-background/70 p-5 dark:bg-tertiary'>
                          <div className='absolute right-2 top-2'>
                            <ServiceAction data={service} fetchData={fetchData} />
                          </div>
                          <Image
                            src={service.imageUrl || ''}
                            height={16}
                            width={16}
                            sizes='100vw'
                            layout='responsive'
                            style={{ objectFit: 'contain', objectPosition: 'center' }}
                            alt={service.title || 'Service Image'}
                            className='size-16 object-contain'
                          />
                          <h3 className='text-center text-lg font-bold text-foreground/60'>
                            {service.title}
                          </h3>
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <div className='mx-0 flex w-[220px] items-center justify-center'>
                <div className='w-full rounded-[20px] bg-gradient-to-t from-lavender to-blue-400 p-[1px] shadow-card'>
                  <div className='flex min-h-[280px] flex-col items-center justify-evenly rounded-[20px] bg-background/70 px-12 py-5 dark:bg-tertiary'>
                    <CreateService fetchData={fetchData} />
                  </div>
                </div>
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
