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
    {
        key: `${FRANCHISEE}:reports`,
        path: `${FRANCHISEE}/reports`,
        component: lazy(() => import('@/views/franchisee/Reports')),
        authority: [FRANCHISEE],
        meta: {
            pageBackgroundType: 'plain',
            pageContainerType: 'contained',
            header: {
                title: 'Reports',
            },
        },
    },
    {
        key: `${FRANCHISEE}:wallet-request-fund`,
        path: `${FRANCHISEE}/wallet/request/fund`,
        component: lazy(() => import('@/views/franchisee/RequestFund')),
        authority: [FRANCHISEE],
        meta: {
            pageBackgroundType: 'plain',
            pageContainerType: 'contained',
            header: {
                title: 'Request Fund',
            },
        },
    },
    {
        key: `${FRANCHISEE}:wallet-history`,
        path: `${FRANCHISEE}/wallet/history`,
        component: lazy(() => import('@/views/franchisee/WalletHistory')),
        authority: [FRANCHISEE],
        meta: {
            pageBackgroundType: 'plain',
            pageContainerType: 'contained',
            header: {
                title: 'Wallet History',
            },
        },
    },
    
]

export default franchiseeRoute
