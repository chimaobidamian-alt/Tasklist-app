import { cn } from '../../lib';
export function Button({ className, variant='default', size='default', ...props }) {
  const variants = { default:'bg-slate-950 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200', ghost:'hover:bg-slate-100 dark:hover:bg-slate-800', outline:'border bg-white hover:bg-slate-50 dark:bg-slate-950 dark:hover:bg-slate-900', destructive:'bg-red-600 text-white hover:bg-red-700' };
  const sizes = { default:'h-10 px-4', sm:'h-8 px-3 text-sm', icon:'h-9 w-9' };
  return <button className={cn('inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50', variants[variant], sizes[size], className)} {...props}/>;
}
