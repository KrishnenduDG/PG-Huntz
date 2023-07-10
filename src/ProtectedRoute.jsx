import React from 'react'

import { useContext } from 'react';
import { authContext } from './context/AuthContext';
import {Navigate, redirect } from 'react-router-dom';


const ProtectedRoute = ({children}) => {
    // Fetching the authContext
    const {user} = useContext(authContext);

    // If Authenticated, then just go with the normal flow else just redirect to Home Page
    if(user) return children
    else return <Navigate to="/" />;
}

export default ProtectedRoute