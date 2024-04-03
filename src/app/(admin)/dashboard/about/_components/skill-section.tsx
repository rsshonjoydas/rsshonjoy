/* eslint-disable no-shadow */

'use client';

import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd';
import { Skills } from '@prisma/client';
import axios from 'axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { CreateSkill } from './create-skill';
import { SkillAction } from './skill-action';

interface SkillsSectionProps {
  data: Skills[];
}

export const SkillsSection = ({ data }: SkillsSectionProps) => {
  const [isMounted, setIsMounted] = useState(false);
  const [skills, setSkills] = useState<Skills[]>(data);

  const fetchData = async () => {
    try {
      const { data } = await axios.get('/api/skills');
      setSkills(data.images);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const onRecord = async (updateData: { id: string; position: number }[]) => {
    try {
      await axios.put('/api/skills', {
        skill: updateData,
      });

      toast.success('Skill reordered');
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

    const items = Array.from(skills);
    const [reorderedItems] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItems);

    const startIndex = Math.min(source.index, destination.index);
    const endIndex = Math.max(source.index, destination.index);

    const updatedSkills = items.slice(startIndex, endIndex + 1);

    setSkills(items);

    const bulkUpdateData = updatedSkills.map((chapter) => ({
      id: chapter.id,
      position: items.findIndex((item) => item.id === chapter.id),
    }));

    onRecord(bulkUpdateData);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setSkills(skills);
  }, [skills]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className='py-10'>
      <h3 className='subhead-text -mb-12 p-5 '>My Skills</h3>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId='skills' type='list' direction='horizontal'>
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className='flex flex-wrap justify-center'
            >
              {skills.map((skill, index) => (
                <Draggable key={skill.id} draggableId={skill.id} index={index}>
                  {(provided) => (
                    <div
                      className='relative mx-0 mr-6 mt-16 flex flex-wrap items-center justify-center'
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <div
                        {...provided.dragHandleProps}
                        className='size-36 rounded-[20px] p-[1px] shadow-card'
                      >
                        <div className='flex h-full w-full flex-col items-center justify-evenly rounded-xl bg-gray-200/80 p-5 dark:bg-gray-600/60'>
                          <div className='absolute right-1 top-1 z-50'>
                            <SkillAction data={skill} fetchData={fetchData} />
                          </div>
                          <Image
                            src={skill.imageUrl || ''}
                            alt={skill.title || 'Skill Image'}
                            fill
                            className='h-1/2 w-1/2 object-contain p-5'
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              <div className='mt-16 flex flex-wrap'>
                <div className='relative size-36 transition duration-200'>
                  <div className='flex h-full w-full items-center justify-center rounded-xl bg-gray-200/80 dark:bg-gray-600/60'>
                    <CreateSkill fetchData={fetchData} />
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
