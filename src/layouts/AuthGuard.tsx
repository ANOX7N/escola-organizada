import { Navigate, Outlet } from 'react-router-dom'
import { useAppStore } from '../hooks/useAppStore'
export function AuthGuard() { const { currentUser } = useAppStore(); return currentUser ? <Outlet /> : <Navigate to="/boas-vindas" replace /> }
export function PublicOnly() { const { currentUser } = useAppStore(); return currentUser ? <Navigate to="/" replace /> : <Outlet /> }
