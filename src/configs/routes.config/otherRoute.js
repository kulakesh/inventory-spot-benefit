import { lazy } from 'react'
import { ADMIN, USER } from '@/constants/roles.constant'

const otherRoute = [
    {
        key: 'accessDenied',
        path: `/access-denied`,
        component: lazy(() => import('@/views/others/AccessDenied')),
        authority: [ADMIN, USER],
        meta: {
            pageBackgroundType: 'plain',
            pageContainerType: 'contained',
        },
    },
    {
        key: 'home',
        path: `/home`,
        component: lazy(() => import('@/views/others/Home')),
        authority: [ADMIN, USER],
    }
]

export default otherRoute
