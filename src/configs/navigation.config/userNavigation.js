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
        icon: 'home',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [USER],
        subMenu: [
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
    
]

export default userConfig