import React, { useEffect, useState } from 'react'
import { getToken } from '../../helpers/tokens'
import {useNavigate } from 'react-router-dom'

import { useAuthContext } from "../../context/AuthContext";

import Layout from '../layouts/Layout'
import AuthLayout from '../layouts/AuthLayout';

export default function Error500() {
  const [authenticated, setAuthenticated] = useState(false)
  const navigate = useNavigate()

  const { user, isLoading, setUser } = useAuthContext();

  useEffect(() => {
    if (getToken()) {
      setAuthenticated(true)
    }
  }, [])

  if(!authenticated) {
    <Layout pageMeta={{title: '505 Error Occurred'}}>
        <div className='page page-404'>
            <div className='page-404-inner container'>
                <h1>505</h1>
                <h2>Error has Occurred</h2>
                <p>An error occurred, please try again!</p>
                <a href="/" className='btn btn-primary btn-lg'>Go to homepage</a>
            </div>
        </div>
    </Layout>
  } else{
    return (
      <AuthLayout pageMeta={{title: '505 Error Occurred'}}>
        <div className='page page-404'>
            <div className='page-404-inner container'>
                <h1>505</h1>
                <h2>Error has Occurred</h2>
                <p>An error occurred, please try again!</p>
                <a href="/" className='btn btn-primary btn-lg'>Go to homepage</a>
            </div>
        </div>
      </AuthLayout>
    )
  }
}
