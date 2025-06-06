import { lazy } from 'react'
import { ADMIN, USER } from '@/constants/roles.constant'

const userRoute = [
    {
        key: `${USER}:dashboard`,
        path: `${USER}/dashboard`,
        component: lazy(() => import('@/views/user/Dashboard')),
        authority: [USER],
        meta: {
            pageBackgroundType: 'plain',
            pageContainerType: 'contained',
            header: {
                title: 'Dashboard User',
            },
        },
    },
    
]

export default userRoute
