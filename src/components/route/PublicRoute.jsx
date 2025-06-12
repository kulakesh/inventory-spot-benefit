import { Navigate, Outlet } from 'react-router'
import appConfig from '@/configs/app.config'
import { useAuth } from '@/auth'

const { authenticatedEntryPath } = appConfig

const PublicRoute = () => {
    const { authenticated, user } = useAuth()

    return authenticated ? <Navigate to={authenticatedEntryPath[user.authority[0]]} /> : <Outlet />
}

export default PublicRoute
