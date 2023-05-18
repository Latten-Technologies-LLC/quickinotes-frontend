import React, { useEffect, useState } from 'react'
import { getToken } from '../../helpers/tokens'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import { http } from '../../helpers/http';

import { useAuthContext } from "../../context/AuthContext";

import Layout from '../layouts/Layout'

import FetchNotes, { Note } from '../../helpers/Notes'

// Moment js
import moment from 'moment';

// Markdown
import ReactMarkdown from 'react-markdown';

export default function ViewNote() {
  const [authenticated, setAuthenticated] = useState(false)
  const navigate = useNavigate()

  const { user, isLoading, setUser } = useAuthContext();

  useEffect(() => {
    if (getToken()) {
      setAuthenticated(true)
    }
  }, [])

  // Get note data
  const { id } = useParams();
  const [note , setNote] = useState({});

  useEffect(() => {
    const getNote = async () => {
        const noteFromServer = await http.get("http://localhost:1337/api/notes/" + id).then((response) => 
        { 
            setNote(response.data.data.attributes);
        }).catch((err) => {
            navigate('/notes');
        });  
    }

    getNote();
  }, [id]);

  // Fix dates
  let created = moment(note.createdAt).fromNow();
  let updated = moment(note.updatedAt).fromNow();

  return (
      <Layout pageMeta={{title: 'View Note'}}>
        <div className='page-notes-view'>
            <div className='page-notes-view-inner container-fluid'>
              <div className='page-notes-view-note'>
                <div className='page-notes-view-note-title'>
                  <h2>{note.note_name}</h2>
                  <ul>
                    <li><i className="fa-solid fa-clock"></i> Created {created}</li>
                    <li><i className="fa-solid fa-pen"></i> Updated {updated}</li>
                  </ul>
                </div>
                <div className='page-notes-view-note-content'>
                  <ReactMarkdown>{note.note_body}</ReactMarkdown>
                </div>
              </div>
            </div>
        </div>
      </Layout>
  )
}
