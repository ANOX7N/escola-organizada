import type { Activity, AlertItem, SchoolProject } from '../types'
import { calculatePriority, getDaysUntil } from './priority'
import { isOverdue } from './date'

export function getAlerts(activities: Activity[], projects: SchoolProject[]): AlertItem[] {
  const alerts: AlertItem[] = []
  const active = activities.filter((item) => item.status !== 'Concluída')
  const overdue = active.filter((item) => isOverdue(item.dueDate))
  if (overdue.length) alerts.push({ id: 'overdue', title: `${overdue.length} atividade${overdue.length > 1 ? 's' : ''} atrasada${overdue.length > 1 ? 's' : ''}`, description: 'Revise seus prazos e defina o próximo passo.', tone: 'danger', href: '/atividades' })
  const high = active.filter((item) => calculatePriority(item) >= 75)
  if (high.length) alerts.push({ id: 'high-priority', title: 'Prioridades muito altas', description: `${high.length} atividade${high.length > 1 ? 's exigem' : ' exige'} sua atenção agora.`, tone: 'warning', href: '/atividades' })
  const soon = active.filter((item) => { const days = getDaysUntil(item.dueDate); return days >= 0 && days <= 3 })
  if (soon.length >= 2) alerts.push({ id: 'soon', title: 'Prazos concentrados', description: 'Você possui várias atividades próximas do prazo.', tone: 'warning', href: '/calendario' })
  const projectsWithPendingSteps = projects.filter((project) => project.steps.length >= 3 && project.steps.some((step) => !step.completed))
  if (projectsWithPendingSteps.length) alerts.push({ id: 'project-steps', title: 'Etapas pendentes', description: `${projectsWithPendingSteps.length} projeto${projectsWithPendingSteps.length > 1 ? 's ainda possuem' : ' ainda possui'} etapas a concluir.`, tone: 'info', href: '/projetos' })
  if (active.length >= 8) alerts.push({ id: 'backlog', title: 'Tarefas acumuladas', description: 'Organize seu foco de hoje para reduzir a sobrecarga.', tone: 'info', href: '/' })
  return alerts
}
