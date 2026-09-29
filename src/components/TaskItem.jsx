import { useEffect, useRef, useState } from 'react';
import { CalendarDays, Check, GripVertical, Pencil, Trash2, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { CATEGORIES, PRIORITIES, formatDueDate, isOverdue, cn } from '../lib';

export default function TaskItem({ task, onToggle, onEdit, onDelete, onReorder }) {
  const [editing,setEditing]=useState(false); const [value,setValue]=useState(task.title); const inputRef=useRef(null);
  useEffect(()=>{ if(editing) inputRef.current?.focus(); },[editing]);
  useEffect(()=>setValue(task.title),[task.title]);
  const save=()=>{const v=value.trim(); if(v) onEdit(task.id,{title:v}); else setValue(task.title); setEditing(false)};
  const key=(e)=>{if(e.key==='Enter')save(); if(e.key==='Escape'){setValue(task.title);setEditing(false)}};
  return <motion.div layout initial={{opacity:0,y:-8}} animate={{opacity:1,y:0}} exit={{opacity:0,height:0,marginBottom:0,overflow:'hidden'}} transition={{duration:.18}} className={cn('group flex items-start gap-2 rounded-xl border bg-white p-3 shadow-sm dark:bg-slate-900', task.completed && 'opacity-70')}>
    <button draggable onDragStart={e=>e.dataTransfer.setData('text/plain',task.id)} onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault(); const from=e.dataTransfer.getData('text/plain'); if(from&&from!==task.id)onReorder(from,task.id)}} className="mt-1 cursor-grab touch-none p-1 text-slate-300 hover:text-slate-500 dark:text-slate-600" aria-label="Drag to reorder"><GripVertical size={16}/></button>
    <button onClick={()=>onToggle(task.id)} className={cn('mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition',task.completed?'border-slate-900 bg-slate-900 text-white dark:border-white dark:bg-white dark:text-slate-950':'border-slate-300 hover:border-slate-500')} aria-label={task.completed?'Mark active':'Mark completed'}>{task.completed&&<Check size={12}/>}</button>
    <div className="min-w-0 flex-1">
      {editing?<Input ref={inputRef} value={value} onChange={e=>setValue(e.target.value)} onKeyDown={key} onBlur={save} className="h-8"/>:<button onClick={()=>setEditing(true)} className={cn('block max-w-full text-left text-sm font-medium',task.completed&&'text-slate-400 line-through')}>{task.title}</button>}
      <div className="mt-2 flex flex-wrap items-center gap-1.5 text-xs">
        <span className={cn('rounded-full px-2 py-1 font-medium',CATEGORIES[task.category]?.chip)}><span className={cn('mr-1 inline-block h-1.5 w-1.5 rounded-full',CATEGORIES[task.category]?.dot)}/>{task.category}</span>
        <span className={cn('rounded-full px-2 py-1 font-medium',PRIORITIES[task.priority]?.chip)}>{task.priority}</span>
        {task.dueDate&&<span className={cn('inline-flex items-center gap-1 rounded-full px-2 py-1',isOverdue(task)?'bg-red-50 text-red-700 dark:bg-red-950/60 dark:text-red-300':'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300')}><CalendarDays size={12}/>{isOverdue(task)?'Overdue · ':''}{formatDueDate(task.dueDate)}</span>}
      </div>
    </div>
    <div className="flex shrink-0 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
      {!editing&&<Button variant="ghost" size="icon" onClick={()=>setEditing(true)} aria-label="Edit task"><Pencil size={16}/></Button>}
      <Button variant="ghost" size="icon" onClick={()=>onDelete(task)} aria-label="Delete task"><Trash2 size={16}/></Button>
    </div>
  </motion.div>
}
