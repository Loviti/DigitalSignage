import { createBrowserRouter } from 'react-router'
import { authRoutes } from './modules/auth/authRoutes'
import { AuthProvider } from './modules/auth/providers/AuthProvider'
import { userRoutes } from './modules/user/userRoutes'
import { PrivateRouteMiddleware } from './modules/auth/middlewares/PrivateRouteMiddleware'
import { GuestRouteMiddleware } from './modules/auth/middlewares/GuestRouteMiddleware'
import { workspaceRoutes } from './modules/workspace/workspaceRoutes'

const guestRoutes = {
    element: <GuestRouteMiddleware />,
    children: [
        authRoutes
    ]
}

const privateRoutes = {
    element: <PrivateRouteMiddleware />,
    children: [
        userRoutes,
        workspaceRoutes
    ]
}

export const routes = [
    {
        element: <AuthProvider />,
        children: [
            guestRoutes,
            privateRoutes
        ]
    }
]

export const router = createBrowserRouter(routes)