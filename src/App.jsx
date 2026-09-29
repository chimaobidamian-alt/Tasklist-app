import * as React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { CheckCircle2, ClipboardList, Moon, Sun, Sparkles } from 'lucide-react';
import { Button } from './components/ui/button';
import { Toast, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from './components/ui/toast';
import TaskComposer from './components/TaskComposer';
import TaskItem from './components/TaskItem';
import Filters from './components/Filters';
import ConfirmDelete from './components/ConfirmDelete';
import { PRIORITIES, STORAGE_KEY, THEME_KEY, priorityRank, uid } from './lib';

const emptyFilters={search:'',status:'all',category:'all',priority:'all'};
function loadTasks(){try{return JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]')}catch{return []}}
function sortTasks(a,b){ if(a.completed!==b.completed)return Number(a.completed)-Number(b.completed); if(a.dueDate&&b.dueDate&&a.dueDate!==b.dueDate)return a.dueDate.localeCompare(b.dueDate); if(a.dueDate!==b.dueDate)return a.dueDate? -1:1; const p=priorityRank(a.priority)-priorityRank(b.priority); return p||((a.position??0)-(b.position??0)); }

export default function App(){
 const [tasks,setTasks]=useState(loadTasks); const [filters,setFilters]=useState(emptyFilters); const [theme,setTheme]=useState(()=>localStorage.getItem(THEME_KEY)||'light'); const [deleteTask,setDeleteTask]=useState(null); const [toast,setToast]=useState(null);
 useEffect(()=>localStorage.setItem(STORAGE_KEY,JSON.stringify(tasks)),[tasks]);
 useEffect(()=>{document.documentElement.classList.toggle('dark',theme==='dark');localStorage.setItem(THEME_KEY,theme)},[theme]);
 const notify=(title,description)=>setToast({id:Date.now(),title,description});
 const addTask=(data)=>setTasks(prev=>[...prev,{id:uid(),...data,completed:false,createdAt:Date.now(),position:prev.length},]);
 const update=(id,patch)=>setTasks(prev=>prev.map(t=>t.id===id?{...t,...patch}:t));
 const toggle=(id)=>{const task=tasks.find(t=>t.id===id); update(id,{completed:!task.completed}); if(!task.completed)notify('Task completed','Nice work — one less thing to do.');};
 const remove=()=>{if(!deleteTask)return; setTasks(prev=>prev.filter(t=>t.id!==deleteTask.id)); notify('Task deleted','The task was removed from your list.');setDeleteTask(null)};
 const reorder=(fromId,toId)=>setTasks(prev=>{const arr=[...prev],from=arr.findIndex(t=>t.id===fromId),to=arr.findIndex(t=>t.id===toId); if(from<0||to<0)return prev;const [moved]=arr.splice(from,1);arr.splice(to,0,moved);return arr.map((t,i)=>({...t,position:i}))});
 const filtered=useMemo(()=>tasks.filter(t=>{const q=filters.search.trim().toLowerCase();return(!q||t.title.toLowerCase().includes(q))&&(filters.status==='all'||(filters.status==='completed'?t.completed:!t.completed))&&(filters.category==='all'||t.category===filters.category)&&(filters.priority==='all'||t.priority===filters.priority)}).sort(sortTasks),[tasks,filters]);
 const completed=tasks.filter(t=>t.completed).length, progress=tasks.length?Math.round(completed/tasks.length*100):0;
 useEffect(()=>{const onKey=e=>{if(e.key==='/'&&document.activeElement?.tagName!=='INPUT'){e.preventDefault();document.querySelector('input[placeholder="Search tasks..."]')?.focus()}};window.addEventListener('keydown',onKey);return()=>window.removeEventListener('keydown',onKey)},[]);
 return <ToastProvider swipeDirection="right"><div className="min-h-screen"><header className="sticky top-0 z-30 border-b bg-white/85 backdrop-blur dark:bg-slate-950/85"><div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6"><div className="flex items-center gap-2"><div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-950 text-white dark:bg-white dark:text-slate-950"><ClipboardList size={18}/></div><span className="text-lg font-bold tracking-tight">TaskList</span></div><Button variant="ghost" size="icon" onClick={()=>setTheme(theme==='dark'?'light':'dark')} aria-label="Toggle theme">{theme==='dark'?<Sun size={18}/>:<Moon size={18}/>}</Button></div></header>
 <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10"><section className="mb-7"><div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-400"><Sparkles size={13}/>Focus mode</div><h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Your tasks</h1><p className="mt-2 text-sm text-slate-500">Capture what matters. Finish what you start.</p></div><div className="min-w-[180px] rounded-xl border bg-white p-3 dark:bg-slate-900"><div className="mb-2 flex justify-between text-xs font-medium"><span>Progress</span><span>{completed}/{tasks.length}</span></div><div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800"><div className="h-full rounded-full bg-slate-900 transition-all dark:bg-white" style={{width:`${progress}%`}}/></div></div></div><TaskComposer onAdd={addTask}/></section>
 <section><Filters filters={filters} setFilters={setFilters}/><div className="mt-5 flex items-center justify-between"><p className="text-xs font-medium text-slate-400">{filtered.length} {filtered.length===1?'task':'tasks'} shown</p>{tasks.length>0&&<p className="hidden text-xs text-slate-400 sm:block">Sorted by due date, then priority</p>}</div>
 {filtered.length?<MotionList tasks={filtered} onToggle={toggle} onEdit={update} onDelete={setDeleteTask} onReorder={reorder}/>:<EmptyState hasTasks={tasks.length>0}/>}</section></main></div>
 <ConfirmDelete task={deleteTask} onConfirm={remove} onCancel={()=>setDeleteTask(null)}/>{toast&&<Toast key={toast.id} duration={2800} onOpenChange={v=>!v&&setToast(null)}><CheckCircle2 size={18} className="mt-0.5 text-emerald-500"/><div className="flex-1"><ToastTitle className="text-sm font-semibold">{toast.title}</ToastTitle><ToastDescription className="mt-1 text-xs text-slate-500">{toast.description}</ToastDescription></div><ToastClose/></Toast>}<ToastViewport/></ToastProvider>
}
function MotionList({tasks,onToggle,onEdit,onDelete,onReorder}){return <div className="mt-3 space-y-2"><AnimatePresence initial={false}>{tasks.map(t=><TaskItem key={t.id} task={t} onToggle={onToggle} onEdit={onEdit} onDelete={onDelete} onReorder={onReorder}/>)}</AnimatePresence></div>}
function EmptyState({hasTasks}){return <div className="mt-5 flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed bg-white/60 px-6 text-center dark:bg-slate-900/50"><div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800"><ClipboardList size={26} className="text-slate-400"/></div><h2 className="font-semibold">{hasTasks?'No matching tasks':'Your task list is empty'}</h2><p className="mt-2 max-w-sm text-sm text-slate-500">{hasTasks?'Try changing your search or filters.':'Add your first task above and keep your day organized without the clutter.'}</p></div>}
