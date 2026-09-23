import { ArrowRight, CalendarCheck2, ListChecks } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../components/Button'

export function WelcomePage() {
  return <div className="flex min-h-[calc(100vh-3.5rem)] flex-col justify-between py-3 sm:min-h-[680px] animate-fade-in">
    <div><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-200"><ListChecks size={24} /></div><p className="mt-8 text-sm font-bold uppercase tracking-[.16em] text-brand-700">Escola Organizada</p><h1 className="mt-3 text-3xl font-extrabold leading-tight tracking-tight text-slate-900">Organize seus estudos com clareza.</h1><p className="mt-4 max-w-sm text-base leading-7 text-slate-500">Transforme atividades e projetos em um plano de ação que faz sentido para a sua rotina.</p></div>
    <div className="space-y-3"><div className="rounded-2xl border border-brand-100 bg-brand-50 p-4"><div className="flex items-center gap-3"><span className="rounded-xl bg-white p-2 text-brand-700"><CalendarCheck2 size={20} /></span><div><p className="text-sm font-bold text-slate-800">Prioridades que acompanham seus prazos</p><p className="mt-0.5 text-xs leading-5 text-slate-500">Sem dados prontos. Você começa do seu jeito.</p></div></div></div><Link to="/cadastro" className="block"><Button className="w-full">Criar minha conta <ArrowRight size={17} /></Button></Link><Link to="/login" className="block"><Button variant="secondary" className="w-full">Já tenho uma conta</Button></Link><p className="pt-1 text-center text-xs text-slate-400">Seus dados ficam salvos neste dispositivo.</p></div>
  </div>
}
