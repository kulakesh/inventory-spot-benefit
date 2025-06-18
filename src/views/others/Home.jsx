import React, { useEffect } from 'react'
import { useAuth } from '@/auth'
import { ADMIN, USER } from '@/constants/roles.constant'
import { useNavigate } from 'react-router'

const Home = () => {
    const {user, signOut} = useAuth();
    const navigate = useNavigate()
    const signOutPath = {
        [ADMIN]: '/admin/dashboard',
        [USER]: '/user/dashboard',
    }

    useEffect(() => {
        if(user.authority[0]){
            navigate(signOutPath[user.authority[0]])
        }else{
            signOut()
        }
    }, []);

    return (
        <div>
            <h1>Home</h1>
            <p>Welcome to the home page!</p>
        </div>
    )
}

export default Home
