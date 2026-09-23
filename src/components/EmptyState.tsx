import type { LucideIcon } from 'lucide-react'
import { Button } from './Button'

export function EmptyState({ icon: Icon, title, description, actionLabel, onAction }: { icon: LucideIcon; title: string; description: string; actionLabel?: string; onAction?: () => void }) {
  return <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-6 py-10 text-center animate-fade-in">
    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-700"><Icon size={22} strokeWidth={1.8} /></div>
    <h3 className="text-base font-bold text-slate-800">{title}</h3>
    <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-slate-500">{description}</p>
    {actionLabel && onAction && <Button className="mt-5" onClick={onAction}>{actionLabel}</Button>}
  </div>
}
