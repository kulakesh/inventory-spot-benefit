import { useAuth } from '@/auth'
import { ADMIN, USER } from '@/constants/roles.constant'

const Home = () => {
    const {user, signOut} = useAuth();
    
    if(user.authority[0] === ADMIN){
        window.location.href = '/admin/dashboard'
    } else if(user.authority[0] === USER){     
        window.location.href = '/user/dashboard'
    }else{
        signOut()
    }
    return (
        <div>
            <h1>Home</h1>
            <p>Welcome to the home page!</p>
        </div>
    )
}

export default Home
