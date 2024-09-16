import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

function ProtectedRoutes() {

    const isLoggedin = window.localStorage.getItem("isLoggedin");
    return isLoggedin == "true" ? <Outlet/> : <Navigate to={'/login'}/>
}

export default ProtectedRoutes
