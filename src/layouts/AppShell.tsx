import { CalendarDays, ClipboardList, FolderKanban, House, UserRound } from 'lucide-react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { useAppStore } from '../hooks/useAppStore'

const navigation = [
  { to: '/', label: 'Início', icon: House, exact: true },
  { to: '/atividades', label: 'Atividades', icon: ClipboardList },
  { to: '/calendario', label: 'Calendário', icon: CalendarDays },
  { to: '/projetos', label: 'Projetos', icon: FolderKanban },
  { to: '/configuracoes', label: 'Perfil', icon: UserRound },
]

export function AppShell() {
  const { currentUser } = useAppStore()
  const location = useLocation()
  const showNavigation = !['/login', '/cadastro', '/boas-vindas'].includes(location.pathname)
  return <main className="min-h-screen sm:flex sm:items-center sm:justify-center sm:p-7">
    <section className="relative min-h-screen w-full overflow-hidden bg-white sm:min-h-0 sm:h-[min(820px,calc(100vh-56px))] sm:max-w-[430px] sm:rounded-[2.75rem] sm:border-[9px] sm:border-slate-900 sm:shadow-phone">
      <div className="pointer-events-none absolute left-1/2 top-0 z-30 hidden h-6 w-28 -translate-x-1/2 rounded-b-2xl bg-slate-900 sm:block" />
      <div className={`phone-scroll h-screen overflow-y-auto px-5 pt-7 sm:h-full sm:pt-10 ${showNavigation ? 'pb-24' : 'pb-7'}`}><Outlet /></div>
      {showNavigation && <nav aria-label="Navegação principal" className="absolute bottom-0 left-0 right-0 z-20 border-t border-slate-100 bg-white/95 px-2 pb-[max(.5rem,env(safe-area-inset-bottom))] pt-2 backdrop-blur">
        <div className="flex justify-around">{navigation.map(({ to, label, icon: Icon, exact }) => <NavLink key={to} end={exact} to={to} className={({ isActive }) => `flex min-w-[60px] flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-[10px] font-bold transition ${isActive ? 'text-brand-700' : 'text-slate-400 hover:text-slate-600'}`}><Icon size={20} strokeWidth={2} /><span>{label}</span></NavLink>)}</div>
      </nav>}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-7 bg-gradient-to-t from-slate-900/5 sm:block" />
    </section>
    <aside className="ml-12 hidden max-w-xs lg:block"><p className="text-sm font-bold uppercase tracking-[.18em] text-brand-700">Escola Organizada</p><h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-800">Um plano de ação para os seus estudos.</h2><p className="mt-4 text-sm leading-6 text-slate-500">Organize prazos, priorize o que importa e acompanhe seus projetos em um só lugar.</p></aside>
  </main>
}
