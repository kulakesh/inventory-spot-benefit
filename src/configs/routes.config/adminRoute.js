import { lazy } from 'react'
import { ADMIN, USER } from '@/constants/roles.constant'

const adminRoute = [
    {
        key: 'admin.dashboard', 
        path: 'admin/dashboard', 
        component: lazy(() => import('@/views/admin/Dashboard')),
        authority: [ADMIN],
        meta: {
            pageBackgroundType: 'plain',
            pageContainerType: 'contained',
            header: {
                title: 'Dashboard',
            },
        },
    },
    {
        key: 'admin.warehouse.master', 
        path: 'admin/warehouse/view',
        component: lazy(() => import('@/views/admin/Warehouse')),
        authority: [ADMIN],
        meta: {
            pageBackgroundType: 'plain',
            pageContainerType: 'contained',
            header: {
                title: 'Warehouse',
            },
        },
    },
    {
        key: 'admin.warehouse.sku', 
        path: 'admin/warehouse/sku',
        component: lazy(() => import('@/views/admin/Sku')),
        authority: [ADMIN],
        meta: {
            header: {
                title: 'Create SKU',
            },
            contained: true,
            footer: false,
        },
    },
    {
        key: 'admin.warehouse.skuList', 
        path: 'admin/warehouse/sku-list',
        component: lazy(() => import('@/views/admin/SkuList')),
        authority: [ADMIN],
        meta: {
            header: {
                title: 'SKUs',
            },
            contained: true,
            footer: false,
        },
    },
    {
        key: 'admin.warehouse.sku', 
        path: 'admin/warehouse/sku',
        component: lazy(() => import('@/views/admin/Sku')),
        authority: [ADMIN],
        meta: {
            header: {
                title: 'Create SKU',
            },
            contained: true,
            footer: false,
        },
    },
    {
        key: 'admin.warehouse.sku', 
        path: 'admin/warehouse/sku/:id',
        component: lazy(() => import('@/views/admin/Sku')),
        authority: [ADMIN],
        meta: {
            header: {
                title: 'Create SKU',
            },
            contained: true,
            footer: false,
        },
    },
]

export default adminRoute
