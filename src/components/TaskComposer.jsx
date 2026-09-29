import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { CATEGORIES, PRIORITIES } from '../lib';

export default function TaskComposer({ onAdd }) {
  const [title,setTitle]=useState(''); const [category,setCategory]=useState('Work'); const [priority,setPriority]=useState('Medium'); const [dueDate,setDueDate]=useState('');
  const submit=(e)=>{e.preventDefault(); const value=title.trim(); if(!value)return; onAdd({title:value,category,priority,dueDate}); setTitle(''); setDueDate('');};
  return <form onSubmit={submit} className="rounded-2xl border bg-white p-3 shadow-soft dark:bg-slate-900">
    <div className="flex gap-2"><Input autoFocus value={title} onChange={e=>setTitle(e.target.value)} placeholder="What needs to be done?" aria-label="New task title"/><Button type="submit" size="icon" aria-label="Add task"><Plus size={18}/></Button></div>
    <div className="mt-3 flex flex-wrap gap-2">
      <select value={category} onChange={e=>setCategory(e.target.value)} className="h-9 rounded-lg border bg-transparent px-2 text-xs font-medium outline-none">{Object.keys(CATEGORIES).map(x=><option key={x}>{x}</option>)}</select>
      <select value={priority} onChange={e=>setPriority(e.target.value)} className="h-9 rounded-lg border bg-transparent px-2 text-xs font-medium outline-none">{Object.keys(PRIORITIES).map(x=><option key={x}>{x}</option>)}</select>
      <input type="date" value={dueDate} onChange={e=>setDueDate(e.target.value)} className="h-9 rounded-lg border bg-transparent px-2 text-xs outline-none" aria-label="Due date"/>
      <span className="ml-auto hidden self-center text-xs text-slate-400 sm:block">Press Enter to add</span>
    </div>
  </form>
}
