import adminConfig from './adminNavigation'
import userConfig from './userNavigation'
import franchiseeConfig from './franchiseeNavigation'

const navigationConfig = [
    ...adminConfig,
    ...userConfig,
    ...franchiseeConfig
]

export default navigationConfig
