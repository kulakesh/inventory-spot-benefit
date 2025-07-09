import { useRef, useImperativeHandle, useState, useEffect } from 'react'
import AuthContext from './AuthContext'
import appConfig from '@/configs/app.config'
import { useSessionUser, useToken } from '@/store/authStore'
import { apiAdminCheck, apiAdminSignIn, apiAdminSignOut, apiUserCheck, apiUserSignIn, apiUserSignOut } from '@/services/AuthService'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import { useNavigate } from 'react-router'

const IsolatedNavigator = ({ ref }) => {
    const navigate = useNavigate()

    useImperativeHandle(ref, () => {
        return {
            navigate,
        }
    }, [navigate])

    return <></>
}

function AuthProvider({ children }) {
    const signedIn = useSessionUser((state) => state.session.signedIn)
    const user = useSessionUser((state) => state.user)
    const setUser = useSessionUser((state) => state.setUser)
    const setSessionSignedIn = useSessionUser(
        (state) => state.setSessionSignedIn,
    )
    const { token, setToken } = useToken()
    const  [tokenState, setTokenState] = useState(token)

    const authenticated = Boolean(tokenState && signedIn)

    const navigatorRef = useRef(null)

    const redirect = (authority) => {
        const search = window.location.search
        const params = new URLSearchParams(search)
        const redirectUrl = params.get(REDIRECT_URL_KEY)
        
        navigatorRef.current?.navigate(
            redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath[authority]
        )
    }

    const handleSignIn = (tokens, user) => {
        setToken(tokens.accessToken)
        setTokenState(tokens.accessToken)
        setSessionSignedIn(true)

        if (user) {
            setUser(user)
        }
    }

    const handleSignOut = () => {
        setToken('')
        setUser({})
        setSessionSignedIn(false)
    }

    const checkAuth = async () => {
        let resp = {}
        if(user){
            if(user?.authority[0] === ADMIN){
                resp = await apiAdminCheck()
            }else if(user?.authority[0] === USER){
                resp = await apiUserCheck()
            }
        }
        if (resp) {
            handleSignIn({ accessToken: token }, resp.user)
        }

    }
    useEffect(() => {
        if (token) {
            checkAuth()
        }
    }, [token])

    const signIn = async (values) => {
        try {
            let resp = {}
            if(values.authority === ADMIN){
                resp = await apiAdminSignIn(values)
            }else if(values.authority === USER){
                resp = await apiUserSignIn(values)   
            }
            if (resp?.token) {
                handleSignIn({ accessToken: resp.token }, resp.user)
                redirect(values.authority)
                return {
                    status: 'success',
                    message: '',
                }
            }
            return {
                status: 'failed',
                message: 'Unable to sign in',
            }
        } catch (errors) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString(),
            }
        }
    }

    const signOut = async (values) => {
        const signOutPath = {
            [ADMIN]: '/admin',
            [USER]: '/user/sign-in',
        }
        
        try {
            if(values.authority === ADMIN){
                await apiAdminSignOut()
            }else if(values.authority === USER){
                await apiUserSignOut()
            }
        } finally {
            handleSignOut()
            window.location.href = signOutPath[user.authority[0]]
            // navigatorRef.current?.navigate('/')
        }
    }

    return (
        <AuthContext.Provider
            value={{
                authenticated,
                user,
                signIn,
                signOut,
            }}
        >
            {children}
            <IsolatedNavigator ref={navigatorRef} />
        </AuthContext.Provider>
    )
}

export default AuthProvider
