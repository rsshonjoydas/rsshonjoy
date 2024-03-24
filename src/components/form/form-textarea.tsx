'use client';

import { KeyboardEventHandler, forwardRef } from 'react';
import { useFormStatus } from 'react-dom';
import TextareaAutosize from 'react-textarea-autosize';

import { FormErrors } from './form-errors';

import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

interface FormTextareaProps {
  id: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  errors?: Record<string, string[] | undefined>;
  className?: string;
  onBlur?: () => void;
  onClick?: () => void;
  onKeyDown?: KeyboardEventHandler<HTMLTextAreaElement> | undefined;
  defaultValue?: string;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  (
    {
      id,
      label,
      placeholder,
      required,
      disabled,
      errors,
      onBlur,
      onClick,
      onKeyDown,
      className,
      defaultValue,
    },
    ref
  ) => {
    const { pending } = useFormStatus();

    return (
      <div className='w-full space-y-2'>
        <div className='w-full space-y-1'>
          {label ? (
            <Label htmlFor={id} className='text-xs font-semibold text-neutral-700'>
              {label}
            </Label>
          ) : null}
          <TextareaAutosize
            onKeyDown={onKeyDown}
            onBlur={onBlur}
            onClick={onClick}
            ref={ref}
            required={required}
            placeholder={placeholder}
            name={id}
            id={id}
            disabled={pending || disabled}
            className={cn(
              'flex min-h-[80px] w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none ring-0 ring-offset-background placeholder:text-muted-foreground focus:ring-0 focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-ring focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
              className
            )}
            aria-describedby={`${id}-error`}
            defaultValue={defaultValue}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    );
  }
);

FormTextarea.displayName = 'FormTextarea';
