import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
export function cn(...inputs) { return twMerge(clsx(inputs)); }

export const CATEGORIES = {
  Work: { dot: 'bg-blue-500', chip: 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300', border: 'border-blue-200 dark:border-blue-900' },
  Personal: { dot: 'bg-violet-500', chip: 'bg-violet-50 text-violet-700 dark:bg-violet-950/60 dark:text-violet-300', border: 'border-violet-200 dark:border-violet-900' },
  Urgent: { dot: 'bg-rose-500', chip: 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300', border: 'border-rose-200 dark:border-rose-900' }
};
export const PRIORITIES = {
  High: { rank: 0, chip: 'bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300' },
  Medium: { rank: 1, chip: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300' },
  Low: { rank: 2, chip: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300' }
};
export const STORAGE_KEY = 'tasklist.tasks.v1';
export const THEME_KEY = 'tasklist.theme.v1';
export const uid = () => crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
export const todayISO = () => new Date().toISOString().slice(0,10);
export const formatDueDate = (value) => {
  if (!value) return 'No due date';
  return new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(`${value}T00:00:00`));
};
export const isOverdue = (task) => Boolean(task.dueDate && !task.completed && task.dueDate < todayISO());
export const priorityRank = (priority) => PRIORITIES[priority]?.rank ?? 3;
