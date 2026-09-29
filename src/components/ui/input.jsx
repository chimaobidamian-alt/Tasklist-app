import { forwardRef } from 'react';
import { cn } from '../../lib';
export const Input = forwardRef(function Input({ className, ...props }, ref) { return <input ref={ref} className={cn('h-10 w-full rounded-lg border bg-white px-3 text-sm outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 dark:bg-slate-950 dark:focus:border-slate-600 dark:focus:ring-slate-800', className)} {...props}/>; });
Input.displayName = 'Input';
