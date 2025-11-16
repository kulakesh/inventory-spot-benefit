import {ADMIN, USER} from '@/constants/roles.constant'

const appConfig = {
    // apiPrefix: 'https://spotbenefit.in/api',
    apiPrefix: 'http://127.0.0.1:8000/api',
    authenticatedEntryPath: {admin:'/admin/dashboard', user:'/user/dashboard'},
    unAuthenticatedEntryPath: '/user/sign-in',
    locale: 'en',
    accessTokenPersistStrategy: 'localStorage',
    enableMock: false,
    activeNavTranslation: false,
}

export default appConfig
