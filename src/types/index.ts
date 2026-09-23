export type ActivityType = 'Trabalho' | 'Prova' | 'Atividade' | 'Apresentação' | 'Projeto' | 'Outro'
export type ActivityStatus = 'Não iniciada' | 'Em andamento' | 'Concluída' | 'Atrasada'
export type PriorityLevel = 'Baixa' | 'Média' | 'Alta' | 'Muito alta'
export type Difficulty = 1 | 2 | 3 | 4 | 5
export type Importance = 1 | 2 | 3 | 4 | 5

export interface User {
  id: string
  name: string
  email: string
  password: string
  createdAt: string
}

export interface Activity {
  id: string
  ownerId: string
  name: string
  subject: string
  description: string
  type: ActivityType
  dueDate: string
  difficulty: Difficulty
  importance: Importance
  estimatedMinutes: number
  status: ActivityStatus
  notes: string
  createdAt: string
  updatedAt: string
}

export interface ProjectStep {
  id: string
  title: string
  completed: boolean
  order: number
}

export type MemberTaskStatus = 'Pendente' | 'Em andamento' | 'Concluída'

export interface ProjectMember {
  id: string
  name: string
  assignedTask: string
  status: MemberTaskStatus
}

export interface SchoolProject {
  id: string
  ownerId: string
  name: string
  subject: string
  description: string
  dueDate: string
  difficulty: Difficulty
  importance: Importance
  steps: ProjectStep[]
  members: ProjectMember[]
  createdAt: string
  updatedAt: string
}

export interface AppSettings {
  notificationsEnabled: boolean
  compactMode: boolean
}

export interface AppData {
  users: User[]
  currentUserId: string | null
  activities: Activity[]
  projects: SchoolProject[]
  subjects: string[]
  settings: AppSettings
}

export interface AlertItem {
  id: string
  title: string
  description: string
  tone: 'danger' | 'warning' | 'info'
  href?: string
}
