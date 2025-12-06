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
        key: `${USER}:purchase-order:list`,
        path: `${USER}/purchase-order/list`,
        component: lazy(() => import('@/views/user/PurchaseOrder/OrderList')),
        authority: [USER],
        meta: {
            pageBackgroundType: 'plain',
            pageContainerType: 'contained',
            header: {
                title: 'Purchase Order List',
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
        key: `${USER}:myshopee-order:list`,
        path: `${USER}/myshopee-order/list`,
        component: lazy(() => import('@/views/user/MyshopeeOrderList')),
        authority: [USER],
        meta: {
            pageBackgroundType: 'plain',
            pageContainerType: 'contained',
            header: {
                title: 'Myshopee Orders',
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
        key: `${USER}:invoice`,
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
    {
        key: `${USER}:invoice2`,
        path: `${USER}/invoice2`,
        component: lazy(() => import('@/views/user/Invoice2')),
        authority: [USER],
        meta: {
            layout: 'blank',
            footer: false,
            pageContainerType: 'gutterless',
            pageBackgroundType: 'plain',
        },
    },
    {
        key: `${USER}:reports`,
        path: `${USER}/reports`,
        component: lazy(() => import('@/views/user/Reports')),
        authority: [USER],
        meta: {
            pageBackgroundType: 'plain',
            pageContainerType: 'contained',
            header: {
                title: 'Reports',
            },
        },
    },
    
]

export default userRoute
