import * as ToastPrimitive from '@radix-ui/react-toast';
import { X } from 'lucide-react';
import { cn } from '../../lib';
export const ToastProvider = ToastPrimitive.Provider;
export function ToastViewport(){ return <ToastPrimitive.Viewport className="fixed bottom-0 right-0 z-[100] flex w-full max-w-sm flex-col gap-2 p-4 outline-none"/> }
export function Toast({ className, ...props }){ return <ToastPrimitive.Root className={cn('flex items-start gap-3 rounded-xl border bg-white p-4 shadow-xl dark:bg-slate-900', className)} {...props}/> }
export const ToastTitle = ToastPrimitive.Title;
export const ToastDescription = ToastPrimitive.Description;
export function ToastClose(props){ return <ToastPrimitive.Close className="rounded-md p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800" {...props}><X size={16}/></ToastPrimitive.Close> }
export const ToastAction = ToastPrimitive.Action;
