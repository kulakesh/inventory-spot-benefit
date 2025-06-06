import ApiService from './ApiService'
import endpointConfig from '@/configs/endpoint.config'

export async function apiAdminCheck() {
    return ApiService.fetchDataWithAxios({
        url: '/admin-check',
        method: 'get'
    })
}

export async function apiAdminSignIn(data) {
    return ApiService.fetchDataWithAxios({
        url: '/admin-sign-in',
        method: 'post',
        data,
    })
}

export async function apiAdminSignOut() {
    return ApiService.fetchDataWithAxios({
        url: '/admin-sign-out',
        method: 'post',
    })
}

export async function apiUserCheck() {
    return ApiService.fetchDataWithAxios({
        url: '/user-check',
        method: 'get'
    })
}
export async function apiUserSignIn(data) {
    return ApiService.fetchDataWithAxios({
        url: '/user-sign-in',
        method: 'post',
        data,
    })
}

export async function apiUserSignOut() {
    return ApiService.fetchDataWithAxios({
        url: '/user-sign-out',
        method: 'post',
    })
}

export async function apiForgotPassword(data) {
    return ApiService.fetchDataWithAxios({
        url: endpointConfig.forgotPassword,
        method: 'post',
        data,
    })
}

export async function apiResetPassword(data) {
    return ApiService.fetchDataWithAxios({
        url: endpointConfig.resetPassword,
        method: 'post',
        data,
    })
}
