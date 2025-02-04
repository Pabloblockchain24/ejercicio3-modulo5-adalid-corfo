import { Navigate } from 'react-router-dom'
import { useAuth } from "../context/AuthContext"


const ProtectedRoute = ({children, allowedRules}) => {
    const {user} = useAuth();

    if (!user){
        return <Navigate to="/login" />
    }
    if(!allowedRules.includes(user.role)){
        return <Navigate to="/" />
    }
    
    return children
} 

export default ProtectedRoute