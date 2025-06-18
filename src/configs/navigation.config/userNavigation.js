import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE,
} from '@/constants/navigation.constant'
import { USER } from '@/constants/roles.constant'

const userConfig = [
    {
        key: `${USER}:dashboard`, 
        path: `${USER}/dashboard`, 
        title: 'Home',
        translateKey: 'nav.home',
        icon: 'home',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [USER],
        subMenu: [],
    },
    {
        key: `${USER}:purchase-order`, 
        path: '', 
        title: 'Purchase Order',
        translateKey: 'nav.home',
        icon: 'purchaseorder',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [USER],
        subMenu: [
            {
                key: `${USER}:purchase-order:list`,
                path: `${USER}/purchase-order/list`,
                title: 'List',
                translateKey: 'nav.collapseMenu.item1',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [USER],
                subMenu: [],
            },
            {
                key: `${USER}:purchase-order:create`,
                path: `${USER}/purchase-order/create`,
                title: 'Create',
                translateKey: 'nav.collapseMenu.item1',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [USER],
                subMenu: [],
            },
        ],
    },
    {
        key: `${USER}:sales`, 
        path: '', 
        title: 'Sales',
        translateKey: 'nav.home',
        icon: 'cart',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [USER],
        subMenu: [
            {
                key: `${USER}:sales:list`,
                path: `${USER}/sales/list`,
                title: 'List',
                translateKey: 'nav.collapseMenu.item1',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [USER],
                subMenu: [],
            },
            {
                key: `${USER}:sales:create`,
                path: `${USER}/sales/create`,
                title: 'Create',
                translateKey: 'nav.collapseMenu.item1',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [USER],
                subMenu: [],
            },
            {
                key: `${USER}:signInAdmin`,
                path: `${USER}/invoice`,
                title: 'Invoice',
                translateKey: 'nav.collapseMenu.item1',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [USER],
                subMenu: [],
            },
        ],
    },
    
]

export default userConfig