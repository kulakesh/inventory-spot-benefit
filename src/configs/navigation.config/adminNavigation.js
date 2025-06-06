import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE,
} from '@/constants/navigation.constant'
import { ADMIN } from '@/constants/roles.constant'

const adminConfig = [
    {
        key: 'admin.dashboard', 
        path: 'admin/dashboard', 
        title: 'Home',
        translateKey: 'nav.home',
        icon: 'home',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [ADMIN],
        subMenu: [],
    },
    {
        key: 'admin.warehouse', 
        path: '',
        title: 'Warehouse',
        translateKey: 'nav.collapseMenu.collapseMenu',
        icon: 'warehouse',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [ADMIN],
        subMenu: [
            {
                key: 'admin.warehouse.master', 
                path: 'admin/warehouse/view', 
                title: 'View',
                translateKey: 'nav.collapseMenu.item1',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN],
                subMenu: [],
            },
            {
                key: 'admin.warehouse.sku', 
                path: 'admin/warehouse/sku', 
                title: 'SKU',
                translateKey: 'nav.collapseMenu.item1',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN],
                subMenu: [],
            },
            {
                key: 'admin.warehouse.skuList', 
                path: 'admin/warehouse/sku-list',
                title: 'SKUs',
                translateKey: 'nav.collapseMenu.item1',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [ADMIN],
                subMenu: [],
            },
        ],
    },
]

export default adminConfig