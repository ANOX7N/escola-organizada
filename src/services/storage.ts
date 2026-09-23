import type { AppData } from '../types'

export interface StorageService {
  load(): AppData
  save(data: AppData): void
  clear(): void
}

const STORAGE_KEY = 'escola-organizada:v1'
export const emptyData: AppData = {
  users: [], currentUserId: null, activities: [], projects: [], subjects: [], settings: { notificationsEnabled: true, compactMode: false },
}

class LocalStorageService implements StorageService {
  load(): AppData {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (!raw) return { ...emptyData }
      const saved = JSON.parse(raw) as Partial<AppData>
      return { ...emptyData, ...saved, settings: { ...emptyData.settings, ...saved.settings }, users: saved.users ?? [], activities: saved.activities ?? [], projects: saved.projects ?? [], subjects: saved.subjects ?? [] }
    } catch { return { ...emptyData } }
  }
  save(data: AppData): void { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)) }
  clear(): void { localStorage.removeItem(STORAGE_KEY) }
}

export const storage: StorageService = new LocalStorageService()
