import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from "../context/AuthContext";
import { isAuthenticated } from '../utils/Auth';

// Layouts
import NotFound from './messages/NotFound';
import AuthLayout from './layouts/Layout'

import { FetchNotes, Note } from '../utils/Notes'

export default function Notes() {
  const navigate = useNavigate()
  const { user } = useAuthContext();

  // Fetch all notes
  const notes = FetchNotes(user);

  if (!isAuthenticated()) {
    return <NotFound />;
  }

  return (
    <AuthLayout pageMeta={{ title: 'Notes' }}>
      <div className='page-timeline'>
        <div className='page-timeline-inner container'>
          <div className='page-timeline-header'>
            <h2>My <br />Notes</h2>
            <div className="page-timeline-header-actions">
              <ul>
                <li><a className='btn btn-round btn-active' href="/notes">All<span>({notes?.length})</span></a></li>
                <li><a className='btn btn-round' href="/notes/bookmarks">Bookmarks</a></li>
                <li><a className='btn btn-round' href="/notes/drafts">Drafts</a></li>
              </ul>
            </div>
          </div>
          <div className='page-timeline-all-notes'>
            {notes?.map((note, key) => (
              <Note key={key} note={note} />
            ))}
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}
