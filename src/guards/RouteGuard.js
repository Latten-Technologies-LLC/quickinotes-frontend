import React from 'react'
import { Route, Navigate } from 'react-router-dom'

import { AUTH_TOKEN } from '../config/const'

export const RouteGuard = ({element: Component, ...rest}) => {
    const hasToken = () =>{
        return localStorage.getItem(AUTH_TOKEN) ? true : false;
    }

  return (
    <Route {...rest} element={hasToken() ? <Component /> : <Navigate to="/auth/signin" />} />
  )
}
