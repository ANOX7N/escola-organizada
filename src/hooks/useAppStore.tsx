import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import type { Activity, AppData, AppSettings, SchoolProject, User } from '../types'
import { emptyData, storage } from '../services/storage'

type NewUser = Pick<User, 'name' | 'email' | 'password'>
type NewActivity = Omit<Activity, 'id' | 'ownerId' | 'createdAt' | 'updatedAt'>
type NewProject = Omit<SchoolProject, 'id' | 'ownerId' | 'createdAt' | 'updatedAt'>

interface AppStore {
  data: AppData
  currentUser: User | null
  activities: Activity[]
  projects: SchoolProject[]
  register(input: NewUser): { ok: boolean; error?: string }
  login(email: string, password: string): { ok: boolean; error?: string }
  logout(): void
  updateProfile(input: Pick<User, 'name' | 'email'>): { ok: boolean; error?: string }
  updateSettings(settings: Partial<AppSettings>): void
  addActivity(input: NewActivity): string
  updateActivity(id: string, input: NewActivity): void
  deleteActivity(id: string): void
  addProject(input: NewProject): string
  updateProject(id: string, input: NewProject): void
  deleteProject(id: string): void
  clearLocalData(): void
}

const AppContext = createContext<AppStore | null>(null)
const uid = () => crypto.randomUUID()

function addSubject(subjects: string[], subject: string): string[] {
  const cleaned = subject.trim()
  if (!cleaned || subjects.some((item) => item.toLocaleLowerCase() === cleaned.toLocaleLowerCase())) return subjects
  return [...subjects, cleaned].sort((a, b) => a.localeCompare(b, 'pt-BR'))
}

export function AppStoreProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<AppData>(() => storage.load())
  useEffect(() => { storage.save(data) }, [data])
  const currentUser = data.users.find((user) => user.id === data.currentUserId) ?? null
  const activities = useMemo(() => currentUser ? data.activities.filter((item) => item.ownerId === currentUser.id) : [], [data.activities, currentUser])
  const projects = useMemo(() => currentUser ? data.projects.filter((item) => item.ownerId === currentUser.id) : [], [data.projects, currentUser])

  const value = useMemo<AppStore>(() => ({
    data, currentUser, activities, projects,
    register(input) {
      const email = input.email.trim().toLowerCase()
      if (data.users.some((user) => user.email === email)) return { ok: false, error: 'Já existe uma conta com este e-mail.' }
      const user: User = { id: uid(), name: input.name.trim(), email, password: input.password, createdAt: new Date().toISOString() }
      setData((previous) => ({ ...previous, users: [...previous.users, user], currentUserId: user.id }))
      return { ok: true }
    },
    login(email, password) {
      const user = data.users.find((item) => item.email === email.trim().toLowerCase() && item.password === password)
      if (!user) return { ok: false, error: 'E-mail ou senha incorretos.' }
      setData((previous) => ({ ...previous, currentUserId: user.id }))
      return { ok: true }
    },
    logout() { setData((previous) => ({ ...previous, currentUserId: null })) },
    updateProfile(input) {
      if (!currentUser) return { ok: false }
      const email = input.email.trim().toLowerCase()
      if (data.users.some((user) => user.id !== currentUser.id && user.email === email)) return { ok: false, error: 'Este e-mail já está em uso.' }
      setData((previous) => ({ ...previous, users: previous.users.map((user) => user.id === currentUser.id ? { ...user, name: input.name.trim(), email } : user) }))
      return { ok: true }
    },
    updateSettings(settings) { setData((previous) => ({ ...previous, settings: { ...previous.settings, ...settings } })) },
    addActivity(input) {
      if (!currentUser) return ''
      const now = new Date().toISOString(); const item: Activity = { ...input, id: uid(), ownerId: currentUser.id, createdAt: now, updatedAt: now }
      setData((previous) => ({ ...previous, activities: [...previous.activities, item], subjects: addSubject(previous.subjects, item.subject) }))
      return item.id
    },
    updateActivity(id, input) {
      setData((previous) => ({ ...previous, activities: previous.activities.map((item) => item.id === id && item.ownerId === currentUser?.id ? { ...item, ...input, updatedAt: new Date().toISOString() } : item), subjects: addSubject(previous.subjects, input.subject) }))
    },
    deleteActivity(id) { setData((previous) => ({ ...previous, activities: previous.activities.filter((item) => !(item.id === id && item.ownerId === currentUser?.id)) })) },
    addProject(input) {
      if (!currentUser) return ''
      const now = new Date().toISOString(); const item: SchoolProject = { ...input, id: uid(), ownerId: currentUser.id, createdAt: now, updatedAt: now }
      setData((previous) => ({ ...previous, projects: [...previous.projects, item], subjects: addSubject(previous.subjects, item.subject) }))
      return item.id
    },
    updateProject(id, input) {
      setData((previous) => ({ ...previous, projects: previous.projects.map((item) => item.id === id && item.ownerId === currentUser?.id ? { ...item, ...input, updatedAt: new Date().toISOString() } : item), subjects: addSubject(previous.subjects, input.subject) }))
    },
    deleteProject(id) { setData((previous) => ({ ...previous, projects: previous.projects.filter((item) => !(item.id === id && item.ownerId === currentUser?.id)) })) },
    clearLocalData() { setData({ ...emptyData }) },
  }), [data, currentUser, activities, projects])

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useAppStore(): AppStore {
  const context = useContext(AppContext)
  if (!context) throw new Error('useAppStore deve ser usado dentro de AppStoreProvider')
  return context
}
