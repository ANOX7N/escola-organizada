import type { Activity, PriorityLevel } from '../types'

export const PRIORITY_RANGES: ReadonlyArray<{ label: PriorityLevel; min: number; max: number }> = [
  { label: 'Baixa', min: 0, max: 24 },
  { label: 'Média', min: 25, max: 49 },
  { label: 'Alta', min: 50, max: 74 },
  { label: 'Muito alta', min: 75, max: 100 },
]

export function getDaysUntil(date: string, now = new Date()): number {
  const target = new Date(`${date}T23:59:59`)
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate())
  return Math.ceil((target.getTime() - today.getTime()) / 86_400_000)
}

/** Deterministic 0–100 score. Completed activities always leave the active priority queue. */
export function calculatePriority(activity: Pick<Activity, 'dueDate' | 'difficulty' | 'importance' | 'estimatedMinutes' | 'status'>): number {
  if (activity.status === 'Concluída') return 0
  const days = getDaysUntil(activity.dueDate)
  const deadlineScore = days < 0 ? 42 : days === 0 ? 38 : days <= 2 ? 32 : days <= 5 ? 24 : days <= 10 ? 14 : 6
  const difficultyScore = activity.difficulty * 5
  const importanceScore = activity.importance * 5
  const timeScore = activity.estimatedMinutes >= 240 ? 10 : activity.estimatedMinutes >= 120 ? 7 : activity.estimatedMinutes >= 60 ? 4 : 2
  const statusScore = activity.status === 'Em andamento' ? 3 : activity.status === 'Atrasada' ? 8 : 0
  return Math.min(100, deadlineScore + difficultyScore + importanceScore + timeScore + statusScore)
}

export function getPriorityLevel(score: number): PriorityLevel {
  return PRIORITY_RANGES.find((range) => score >= range.min && score <= range.max)?.label ?? 'Baixa'
}

export function getPriorityExplanation(activity: Pick<Activity, 'dueDate' | 'difficulty' | 'importance' | 'estimatedMinutes' | 'status'>): string {
  if (activity.status === 'Concluída') return 'Esta atividade já foi concluída.'
  const days = getDaysUntil(activity.dueDate)
  const factors: string[] = []
  if (days < 0) factors.push('o prazo já passou')
  else if (days <= 2) factors.push('o prazo está muito próximo')
  else if (days <= 5) factors.push('o prazo está próximo')
  if (activity.importance >= 4) factors.push('ela tem alta importância')
  if (activity.difficulty >= 4) factors.push('exige bastante esforço')
  if (activity.estimatedMinutes >= 120) factors.push('demanda bastante tempo')
  const level = getPriorityLevel(calculatePriority(activity)).toLowerCase()
  return factors.length ? `Prioridade ${level} porque ${factors.join(' e ')}.` : `Prioridade ${level} considerando prazo, importância e esforço necessário.`
}
