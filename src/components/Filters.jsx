import { Search, SlidersHorizontal, X } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { CATEGORIES, PRIORITIES } from '../lib';
export default function Filters({filters,setFilters}){
 const set=(k,v)=>setFilters(x=>({...x,[k]:v})); const active=Object.values(filters).some(v=>v&&v!=='all');
 return <div className="space-y-3"><div className="relative"><Search size={17} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><Input value={filters.search} onChange={e=>set('search',e.target.value)} placeholder="Search tasks..." className="pl-9"/><kbd className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded border bg-slate-50 px-1.5 py-0.5 text-[10px] text-slate-400 sm:block dark:bg-slate-800">/</kbd></div>
 <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none"><div className="flex rounded-lg border bg-white p-1 dark:bg-slate-900">{[['all','All'],['active','Active'],['completed','Completed']].map(([v,l])=><button key={v} onClick={()=>set('status',v)} className={`rounded-md px-3 py-1.5 text-xs font-medium ${filters.status===v?'bg-slate-950 text-white dark:bg-white dark:text-slate-950':'text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>{l}</button>)}</div>
 <select value={filters.category} onChange={e=>set('category',e.target.value)} className="h-9 rounded-lg border bg-white px-3 text-xs font-medium dark:bg-slate-900"><option value="all">All categories</option>{Object.keys(CATEGORIES).map(x=><option key={x}>{x}</option>)}</select>
 <select value={filters.priority} onChange={e=>set('priority',e.target.value)} className="h-9 rounded-lg border bg-white px-3 text-xs font-medium dark:bg-slate-900"><option value="all">All priorities</option>{Object.keys(PRIORITIES).map(x=><option key={x}>{x}</option>)}</select>
 {active&&<Button variant="ghost" size="sm" onClick={()=>setFilters({search:'',status:'all',category:'all',priority:'all'})}><X size={14} className="mr-1"/>Clear</Button>}</div></div>
}
