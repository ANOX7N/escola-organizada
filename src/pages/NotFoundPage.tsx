import { Compass } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../components/Button'
export function NotFoundPage() { return <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center text-center animate-fade-in"><span className="rounded-2xl bg-brand-50 p-4 text-brand-700"><Compass size={26} /></span><h1 className="mt-5 text-xl font-extrabold text-slate-900">Página não encontrada</h1><p className="mt-2 text-sm text-slate-500">Este caminho não faz parte do seu espaço.</p><Link className="mt-6" to="/"><Button>Voltar ao início</Button></Link></div> }
