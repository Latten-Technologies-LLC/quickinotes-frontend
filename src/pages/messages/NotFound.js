import React, { useEffect, useState } from 'react'
import { getToken } from '../../helpers/tokens'
import { useNavigate } from 'react-router-dom'

import { useAuthContext } from "../../context/AuthContext";

import Layout from '../layouts/Layout'
import AuthLayout from '../layouts/AuthLayout';

export default function NotFound() {
  const [authenticated, setAuthenticated] = useState(false)
  const navigate = useNavigate()

  const { user, isLoading, setUser } = useAuthContext();

  useEffect(() => {
    if (getToken()) {
      setAuthenticated(true)
    }
  }, [])

  if(!authenticated) {
    <Layout pageMeta={{title: '404 Not Found'}}>
        <div className='page page-404'>
            <div className='page-404-inner container'>
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
                <a href="/" className='btn btn-primary btn-lg'>Go to homepage</a>
            </div>
        </div>
    </Layout>
  } else{
    return (
      <AuthLayout pageMeta={{title: '404 Not Found'}}>
        <div className='page page-404'>
            <div className='page-404-inner container'>
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <p>The page you are looking for might have been removed had its name changed or is temporarily unavailable.</p>
                <a href="/" className='btn btn-primary btn-lg'>Go to homepage</a>
            </div>
        </div>
      </AuthLayout>
    )
  }
}
