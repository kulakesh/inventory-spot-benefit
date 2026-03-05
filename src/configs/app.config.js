
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
    pageSizeOption : [
        { value: 10, label: '10 / page' },
        { value: 20, label: '20 / page' },
        { value: 30, label: '30 / page' },
        { value: 40, label: '40 / page' },
        { value: 50, label: '50 / page' },
    ],
}

export default appConfig
