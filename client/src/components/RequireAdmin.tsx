import { JSX } from "@emotion/react/jsx-runtime"
import { useAuth } from "../context/AuthContext"
import { Navigate } from "react-router-dom"

const RequireAdmin = ({children}: {children : JSX.Element}) => {
    const {user} = useAuth()
    if(!user) return <Navigate to='/login'/>
    if(user.role !== 'admin') return <Navigate to='/unauthorized'/>
  return children;
}

export default RequireAdmin