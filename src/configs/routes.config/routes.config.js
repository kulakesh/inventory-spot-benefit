import authRoute from './authRoute'
import adminRoute from './adminRoute'
import userRoute from './userRoute'
import otherRoute from './otherRoute'
import franchiseeRoute from './franchiseeRoute'

export const publicRoutes = [...authRoute]

export const protectedRoutes = [
    ...adminRoute,
    ...userRoute,
    ...franchiseeRoute,
    ...otherRoute,
    
]
