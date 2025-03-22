import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from "../context/AuthContext";
import { isAuthenticated } from '../utils/Auth';

// Layouts
import NotFound from './messages/NotFound';
import AuthLayout from './layouts/Layout'

import { FetchDraftNotes, Note } from '../utils/Notes'

export default function Drafts() {
  const navigate = useNavigate()

  const { user } = useAuthContext();

  // Fetch all drafts
  var drafts = FetchDraftNotes();

  if (!isAuthenticated()) {
    return <NotFound />;
  }

  return (
    <AuthLayout pageMeta={{ title: 'Drafts', footer: false, header: true }}>
      <div className='page-timeline'>
        <div className='page-timeline-inner container'>
          <div className='page-timeline-header'>
            <h2>My <br />Drafts</h2>
            <div className="page-timeline-header-actions">
              <ul>
                <li><a className='btn btn-round' href="/notes">All</a></li>
                <li><a className='btn btn-round' href="/notes/bookmarks">Bookmarks</a></li>
                <li><a className='btn btn-round btn-active' href="/notes/drafts">Drafts<span>({drafts?.length})</span></a></li>
              </ul>
            </div>
          </div>
          <div className='page-timeline-all-notes'>
            {drafts?.length > 0 ? 
              drafts?.map((note, key) => (
                <Note key={key} note={note} />
              )) :
              <div className='page-timeline-all-notes-empty'>
                <div className='page-timeline-all-notes-empty-inner'>
                  <h2>Nothing to see here</h2>
                  <p>When you save drafts, they will show up here.</p>
                  <a className='btn btn-round' href="/notes">View all notes</a>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}
