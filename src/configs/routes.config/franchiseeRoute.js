import { lazy } from 'react'
import { FRANCHISEE } from '@/constants/roles.constant'

const franchiseeRoute = [
    {
        key: `${FRANCHISEE}:dashboard`,
        path: `${FRANCHISEE}/dashboard`,
        component: lazy(() => import('@/views/franchisee/Dashboard')),
        authority: [FRANCHISEE],
        meta: {
            pageBackgroundType: 'plain',
            pageContainerType: 'contained',
            header: {
                title: 'Dashboard Franchisee',
            },
        },
    },
    {
        key: `${FRANCHISEE}:purchase-order:list`,
        path: `${FRANCHISEE}/purchase-order/list`,
        component: lazy(() => import('@/views/franchisee/PurchaseOrder/OrderList')),
        authority: [FRANCHISEE],
        meta: {
            pageBackgroundType: 'plain',
            pageContainerType: 'contained',
            header: {
                title: 'Purchase Order List',
            },
        },
    },
    {
        key: `${FRANCHISEE}:purchase-order:create`,
        path: `${FRANCHISEE}/purchase-order/create`,
        component: lazy(() => import('@/views/franchisee/PurchaseOrder')),
        authority: [FRANCHISEE],
        meta: {
            pageBackgroundType: 'plain',
            pageContainerType: 'contained',
            header: {
                title: 'Purchase Order',
            },
        },
    },
    {
        key: `${FRANCHISEE}:myshopee-orders`,
        path: `${FRANCHISEE}/myshopee-orders`,
        component: lazy(() => import('@/views/franchisee/OrderListMyshopee')),
        authority: [FRANCHISEE],
        meta: {
            pageBackgroundType: 'plain',
            pageContainerType: 'contained',
            header: {
                title: 'Myshopee Orders',
            },
        },
    },
    {
        key: `${FRANCHISEE}:sales:list`,
        path: `${FRANCHISEE}/sales/list`,
        component: lazy(() => import('@/views/franchisee/SalesList')),
        authority: [FRANCHISEE],
        meta: {
            pageBackgroundType: 'plain',
            pageContainerType: 'contained',
            header: {
                title: 'Myshpee Order History',
            },
        },
    },
    
]

export default franchiseeRoute
