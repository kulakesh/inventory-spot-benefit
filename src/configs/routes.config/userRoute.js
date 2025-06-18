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
    {
        key: `${USER}:purchase-order:create`,
        path: `${USER}/purchase-order/create`,
        component: lazy(() => import('@/views/user/PurchaseOrder')),
        authority: [USER],
        meta: {
            pageBackgroundType: 'plain',
            pageContainerType: 'contained',
            header: {
                title: 'Purchase Order',
            },
        },
    },
    {
        key: `${USER}:sales:list`,
        path: `${USER}/sales/list`,
        component: lazy(() => import('@/views/user/Sales/SalesList')),
        authority: [USER],
        meta: {
            pageBackgroundType: 'plain',
            pageContainerType: 'contained',
            header: {
                title: 'Sales List',
            },
        },
    },
    {
        key: `${USER}:sales:create`,
        path: `${USER}/sales/create`,
        component: lazy(() => import('@/views/user/Sales')),
        authority: [USER],
        meta: {
            pageBackgroundType: 'plain',
            pageContainerType: 'contained',
            header: {
                title: 'Sales Create',
            },
        },
    },
    {
        key: `${USER}:signInAdmin`,
        path: `${USER}/invoice`,
        component: lazy(() => import('@/views/user/Invoice')),
        authority: [USER],
        meta: {
            layout: 'blank',
            footer: false,
            pageContainerType: 'gutterless',
            pageBackgroundType: 'plain',
        },
    },
    
]

export default userRoute
