export function formatDate(date: string, options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short' }): string {
  return new Intl.DateTimeFormat('pt-BR', options).format(new Date(`${date}T12:00:00`))
}

export function formatMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes} min`
  const hours = Math.floor(minutes / 60)
  const remaining = minutes % 60
  return remaining ? `${hours}h ${remaining}min` : `${hours}h`
}

export function toInputDate(value?: string): string {
  return value ?? new Date().toISOString().slice(0, 10)
}

export function isOverdue(date: string): boolean {
  const today = new Date().toISOString().slice(0, 10)
  return date < today
}
