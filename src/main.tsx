import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppStoreProvider } from './hooks/useAppStore'
import { AuthGuard, PublicOnly } from './layouts/AuthGuard'
import { AppShell } from './layouts/AppShell'
import { ActivitiesPage } from './pages/ActivitiesPage'
import { ActivityDetailsPage } from './pages/ActivityDetailsPage'
import { ActivityFormPage } from './pages/ActivityFormPage'
import { LoginPage, RegisterPage } from './pages/AuthPages'
import { CalendarPage } from './pages/CalendarPage'
import { DashboardPage } from './pages/DashboardPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProjectDetailsPage } from './pages/ProjectDetailsPage'
import { ProjectFormPage } from './pages/ProjectFormPage'
import { ProjectsPage } from './pages/ProjectsPage'
import { SettingsPage } from './pages/SettingsPage'
import { StatisticsPage } from './pages/StatisticsPage'
import { WelcomePage } from './pages/WelcomePage'
import './styles/index.css'

const router = createBrowserRouter([
  { element: <AppShell />, children: [
    { element: <PublicOnly />, children: [
      { path: '/boas-vindas', element: <WelcomePage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/cadastro', element: <RegisterPage /> },
    ] },
    { element: <AuthGuard />, children: [
      { path: '/', element: <DashboardPage /> },
      { path: '/atividades', element: <ActivitiesPage /> },
      { path: '/atividades/nova', element: <ActivityFormPage /> },
      { path: '/atividades/:id', element: <ActivityDetailsPage /> },
      { path: '/atividades/:id/editar', element: <ActivityFormPage /> },
      { path: '/calendario', element: <CalendarPage /> },
      { path: '/projetos', element: <ProjectsPage /> },
      { path: '/projetos/novo', element: <ProjectFormPage /> },
      { path: '/projetos/:id', element: <ProjectDetailsPage /> },
      { path: '/projetos/:id/editar', element: <ProjectFormPage /> },
      { path: '/estatisticas', element: <StatisticsPage /> },
      { path: '/configuracoes', element: <SettingsPage /> },
    ] },
    { path: '*', element: <NotFoundPage /> },
  ] },
])

createRoot(document.getElementById('root')!).render(<StrictMode><AppStoreProvider><RouterProvider router={router} /></AppStoreProvider></StrictMode>)
