import React, { useEffect, useState } from 'react'
import { getToken } from '../helpers/tokens'
import { Navigate, useNavigate } from 'react-router-dom'

import Layout from './layouts/Layout'

export default function Timeline() {
  const [authenticated, setAuthenticated] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (getToken()) {
      setAuthenticated(true)
    }
  }, [])

  if(!authenticated) {
    return (<div>Not authenticated</div>);
  } else{
    return (
      <Layout pageMeta={{title: 'Timeline'}}>
        <div className='page-timeline'>
            <div className='page-timeline-inner container-fluid'>
                <div className='page-timeline-row row'>
                  <div className='left-column col-lg-3'>

                  </div>
                  <div className='right-column col-lg-9'>

                  </div>
                </div>
            </div>
        </div>
      </Layout>
    )
  }
}
