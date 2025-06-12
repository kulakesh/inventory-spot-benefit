import {ADMIN, USER} from '@/constants/roles.constant'

const appConfig = {
    apiPrefix: '/api',
    authenticatedEntryPath: {admin:'/admin/dashboard', user:'/user/dashboard'},
    unAuthenticatedEntryPath: '/user/sign-in',
    locale: 'en',
    accessTokenPersistStrategy: 'localStorage',
    enableMock: false,
    activeNavTranslation: false,
}

export default appConfig
