import { lazy } from 'react'

const authRoute = [
    {
        key: 'signInAdmin',
        path: `/admin`,
        component: lazy(() => import('@/views/auth/SignIn/SignInAdmin')),
        authority: [],
    },
    {
        key: 'signInAdminSecond',
        path: `/admin/`,
        component: lazy(() => import('@/views/auth/SignIn/SignInAdmin')),
        authority: [],
    },
    {
        key: 'signInUser',
        path: `/user/sign-in`,
        component: lazy(() => import('@/views/auth/SignIn/SignInUser')),
        authority: [],
    },
    {
        key: 'signInFranchisee',
        path: `/franchisee`,
        component: lazy(() => import('@/views/auth/SignIn/SignInFranchisee')),
        authority: [],
    },
    {
        key: 'signInFranchisee',
        path: `/franchisee/`,
        component: lazy(() => import('@/views/auth/SignIn/SignInFranchisee')),
        authority: [],
    },
    {
        key: 'signUp',
        path: `/sign-up`,
        component: lazy(() => import('@/views/auth/SignUp')),
        authority: [],
    },
    {
        key: 'forgotPassword',
        path: `/forgot-password`,
        component: lazy(() => import('@/views/auth/ForgotPassword')),
        authority: [],
    },
    {
        key: 'resetPassword',
        path: `/reset-password`,
        component: lazy(() => import('@/views/auth/ResetPassword')),
        authority: [],
    },
]

export default authRoute
