'use client';

import { routes } from './data';
import { Item, ItemSkeleton } from './item';
import { Toggle, ToggleSkeleton } from './toggle';
import { Wrapper } from './wrapper';

import { Hint } from '@/components/hint';
import { useSidebar } from '@/store/use-sidebar';

export const Sidebar = () => {
  const { collapsed } = useSidebar((state) => state);

  return (
    <Wrapper>
      <Toggle />
      <div className='space-y-4 pt-4 lg:pt-0'>
        {routes.map((item) => (
          <div key={item.href} className='flex items-center justify-center'>
            {collapsed ? (
              <Hint label={item.label} side='right'>
                <Item label={item.label} href={item.href} icon={item.icon} />
              </Hint>
            ) : (
              <Item label={item.label} href={item.href} icon={item.icon} />
            )}
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export const SidebarSkeleton = () => (
  <aside className='fixed left-0 z-50 flex h-full w-[70px] flex-col border-r bg-background lg:w-60'>
    <ToggleSkeleton />
    <ItemSkeleton />
  </aside>
);
