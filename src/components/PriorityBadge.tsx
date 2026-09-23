import { getPriorityLevel } from '../utils/priority'

export function PriorityBadge({ score }: { score: number }) {
  const level = getPriorityLevel(score)
  const colors = { Baixa: 'bg-slate-100 text-slate-600', Média: 'bg-sky-50 text-sky-700', Alta: 'bg-amber-50 text-amber-700', 'Muito alta': 'bg-rose-50 text-rose-700' }
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ${colors[level]}`}>{level} · {score}</span>
}
