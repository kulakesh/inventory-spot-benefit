import authRoute from './authRoute'
import adminRoute from './adminRoute'
import userRoute from './userRoute'
import otherRoute from './otherRoute'

export const publicRoutes = [...authRoute]

export const protectedRoutes = [
    ...adminRoute,
    ...userRoute,
    ...otherRoute,
    
]
