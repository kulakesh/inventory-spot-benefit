
const appConfig = {
    // apiPrefix: 'https://spotbenefit.in/api',
    // apiPrefix: 'http://localhost:8000/api',
    apiPrefix: import.meta.env.VITE_APP_API_URL,
    authenticatedEntryPath: {admin:'/admin/dashboard', user:'/user/dashboard', franchisee:'/franchisee/dashboard'},
    unAuthenticatedEntryPath: '/user/sign-in',
    locale: 'en',
    accessTokenPersistStrategy: 'localStorage',
    enableMock: false,
    activeNavTranslation: false,
}

export default appConfig
