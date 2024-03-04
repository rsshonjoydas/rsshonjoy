'use client';

import { SearchIcon, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import qs from 'query-string';
import { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export const Search = () => {
  const router = useRouter();
  const [value, setValue] = useState('');

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!value) return;

    const url = qs.stringifyUrl(
      {
        url: '/dashboard',
        query: { search: value },
      },
      { skipEmptyString: true }
    );

    router.push(url);
  };

  const onClear = () => {
    setValue('');
  };

  return (
    <form onSubmit={onSubmit} className='relative ml-2 flex w-full items-center px-3 lg:w-[400px]'>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder='Search'
        className='-mr-12 focus-visible:ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 dark:border-slate-700/60'
      />
      {value && (
        <button type='button' aria-label='Clear Button' className='-ml-11 p-3 hover:cursor-pointer'>
          <X className='h-5 w-5 text-muted-foreground hover:opacity-80' onClick={onClear} />
        </button>
      )}
      <Separator orientation='vertical' className='h-8' />
      <button
        type='submit'
        aria-label='Search Button'
        className='p-3 hover:cursor-pointer hover:opacity-80'
      >
        <SearchIcon className='h-5 w-5 text-muted-foreground' />
      </button>
    </form>
  );
};
