import {
    NAV_ITEM_TYPE_TITLE,
    NAV_ITEM_TYPE_ITEM,
    NAV_ITEM_TYPE_COLLAPSE,
} from '@/constants/navigation.constant'
import { FRANCHISEE } from '@/constants/roles.constant'
// icons are in "navigation-icon.config.jsx"
const franchiseeConfig = [
    {
        key: `${FRANCHISEE}:dashboard`, 
        path: `${FRANCHISEE}/dashboard`, 
        title: 'Home',
        translateKey: 'nav.home',
        icon: 'home',
        type: NAV_ITEM_TYPE_ITEM,
        authority: [FRANCHISEE],
        subMenu: [],
    },
    {
        key: `${FRANCHISEE}:purchase-order`, 
        path: '', 
        title: 'Purchase Order',
        translateKey: 'nav.home',
        icon: 'purchaseorder',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [FRANCHISEE],
        subMenu: [
            {
                key: `${FRANCHISEE}:purchase-order:create`,
                path: `${FRANCHISEE}/purchase-order/create`,
                title: 'Create',
                translateKey: 'nav.collapseMenu.item1',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [FRANCHISEE],
                subMenu: [],
            },
            {
                key: `${FRANCHISEE}:purchase-order:list`,
                path: `${FRANCHISEE}/purchase-order/list`,
                title: 'History',
                translateKey: 'nav.collapseMenu.item1',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [FRANCHISEE],
                subMenu: [],
            },
        ],
    },
    {
        key: `${FRANCHISEE}:sales`, 
        path: '', 
        title: 'Sales',
        translateKey: 'nav.home',
        icon: 'cart',
        type: NAV_ITEM_TYPE_COLLAPSE,
        authority: [FRANCHISEE],
        subMenu: [
            {
                key: `${FRANCHISEE}:myshopee-orders`,
                path: `${FRANCHISEE}/myshopee-orders`,
                title: 'Myshopee Orders',
                translateKey: 'nav.collapseMenu.item1',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [FRANCHISEE],
                subMenu: [],
            },
            {
                key: `${FRANCHISEE}:sales:list`,
                path: `${FRANCHISEE}/sales/list`,
                title: 'History',
                translateKey: 'nav.collapseMenu.item1',
                icon: '',
                type: NAV_ITEM_TYPE_ITEM,
                authority: [FRANCHISEE],
                subMenu: [],
            },
        ],
    },
    

]

export default franchiseeConfig