import React from 'react'
import { useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({children}) => {
    const location = useLocation();
    const {isAuthenticated} = useSelector((state)=> state.auth);

    if(isAuthenticated === false) {
        return <Navigate to="/login" state={{from:location}}/>
    }

  return children
  
}

export default ProtectedRoute
