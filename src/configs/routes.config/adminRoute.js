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
        key: 'admin.sku.list', 
        path: 'admin/sku/list',
        component: lazy(() => import('@/views/admin/SkuList')),
        authority: [ADMIN],
        meta: {
            header: {
                title: 'SKU List',
            },
            contained: true,
            footer: false,
        },
    },
    {
        key: 'admin.sku.create', 
        path: 'admin/sku/create',
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
        key: 'admin.sku.edit', 
        path: 'admin/sku/edit/:id',
        component: lazy(() => import('@/views/admin/Sku')),
        authority: [ADMIN],
        meta: {
            header: {
                title: 'Edit SKU',
            },
            contained: true,
            footer: false,
        },
    },
]

export default adminRoute
