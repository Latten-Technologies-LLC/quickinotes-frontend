import React, { useEffect, useState } from 'react'
import { getToken } from '../helpers/tokens'
import { Navigate, useNavigate } from 'react-router-dom'

import { useAuthContext } from "../context/AuthContext";

import Layout from './layouts/Layout'

import FetchNotes, { Note } from '../helpers/Notes'

export default function Timeline() {
  const [authenticated, setAuthenticated] = useState(false)
  const navigate = useNavigate()

  const { user, isLoading, setUser } = useAuthContext();

  useEffect(() => {
    if (getToken()) {
      setAuthenticated(true)
    }
  }, [])

  const notes = FetchNotes(user);
  console.log(notes);

  if(!authenticated) {
    return (<div>Not authenticated</div>);
  } else{
    return (
      <Layout pageMeta={{title: 'Timeline'}}>
        <div className='page-timeline'>
            <div className='page-timeline-inner container-fluid'>
              <div className='page-timeline-all-notes'>
                {notes?.map((note, key) => (
                  <Note key={key} note={note} />
                ))}
              </div>
            </div>
        </div>
      </Layout>
    )
  }
}
