import * as React from 'react';
import { cn } from '@/lib/utils';

/** Renders a consistently styled form input. */
function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return <input type={type} data-slot="input" className={cn('h-12 w-full rounded-md border border-[#d8ded5] bg-white px-4 text-sm text-[#263c33] outline-none transition-colors placeholder:text-[#a3aba1] focus-visible:border-[#789364] focus-visible:ring-2 focus-visible:ring-[#789364]/20', className)} {...props} />;
}
export { Input };
