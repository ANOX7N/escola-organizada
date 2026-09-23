import { ChevronLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import type { ReactNode } from 'react'

export function PageHeader({ title, subtitle, action, back = false }: { title: string; subtitle?: string; action?: ReactNode; back?: boolean }) {
  const navigate = useNavigate()
  return <header className="mb-6 flex items-start justify-between gap-3"><div className="flex min-w-0 items-start gap-2">{back && <button aria-label="Voltar" onClick={() => navigate(-1)} className="mt-0.5 rounded-lg p-1.5 text-slate-600 hover:bg-slate-100"><ChevronLeft size={22} /></button>}<div><h1 className="text-xl font-bold tracking-tight text-slate-900">{title}</h1>{subtitle && <p className="mt-1 text-sm leading-5 text-slate-500">{subtitle}</p>}</div></div>{action}</header>
}
