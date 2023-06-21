import React, { useEffect, useState } from 'react';
import { logout } from '../Auth/auth.service';
import { Navigate } from 'react-router-dom';

export default function LogOut() {
    const [redirect, setRedirect] = useState(false);


    useEffect(() => {   
        logout();
        setRedirect(true);
    }, []);
  
    return redirect ? <Navigate to={'/login'}/> : null;

}