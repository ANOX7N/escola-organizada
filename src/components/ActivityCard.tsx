import { Check, ChevronRight, Clock3, CalendarDays } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Activity } from '../types'
import { formatDate, formatMinutes, isOverdue } from '../utils/date'
import { calculatePriority } from '../utils/priority'
import { PriorityBadge } from './PriorityBadge'

export function ActivityCard({ activity, onComplete }: { activity: Activity; onComplete?: (activity: Activity) => void }) {
  const score = calculatePriority(activity)
  const completed = activity.status === 'Concluída'
  const overdue = !completed && isOverdue(activity.dueDate)
  return <article className={`group rounded-2xl border bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${completed ? 'border-slate-100 opacity-70' : overdue ? 'border-rose-100' : 'border-slate-100'}`}>
    <div className="flex gap-3">
      <button onClick={() => onComplete?.(activity)} disabled={completed} aria-label={completed ? 'Atividade concluída' : 'Marcar como concluída'} className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition ${completed ? 'border-brand-600 bg-brand-600 text-white' : 'border-slate-300 text-transparent hover:border-brand-500 hover:text-brand-500'}`}><Check size={14} /></button>
      <Link to={`/atividades/${activity.id}`} className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2"><div className="min-w-0"><p className={`truncate text-sm font-bold text-slate-800 ${completed ? 'line-through' : ''}`}>{activity.name}</p><p className="mt-0.5 truncate text-xs text-slate-500">{activity.subject || 'Sem matéria'} · {activity.type}</p></div><ChevronRight className="shrink-0 text-slate-300" size={18} /></div>
        <div className="mt-3 flex flex-wrap items-center gap-2"><PriorityBadge score={score} /><span className={`inline-flex items-center gap-1 text-xs font-medium ${overdue ? 'text-rose-600' : 'text-slate-500'}`}><CalendarDays size={13} />{overdue ? 'Atrasada · ' : ''}{formatDate(activity.dueDate)}</span><span className="inline-flex items-center gap-1 text-xs text-slate-500"><Clock3 size={13} />{formatMinutes(activity.estimatedMinutes)}</span></div>
      </Link>
    </div>
  </article>
}
