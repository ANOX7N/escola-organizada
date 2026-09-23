import { X } from 'lucide-react'
import type { ReactNode } from 'react'

export function Modal({ title, children, onClose }: { title: string; children: ReactNode; onClose: () => void }) {
  return <div role="dialog" aria-modal="true" className="absolute inset-0 z-50 flex items-end bg-slate-950/25 p-3 backdrop-blur-[1px] animate-fade-in">
    <div className="max-h-[85%] w-full overflow-y-auto rounded-2xl bg-white p-5 shadow-xl animate-slide-up"><div className="mb-5 flex items-center justify-between"><h2 className="text-lg font-bold text-slate-800">{title}</h2><button aria-label="Fechar" onClick={onClose} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><X size={19} /></button></div>{children}</div>
  </div>
}
