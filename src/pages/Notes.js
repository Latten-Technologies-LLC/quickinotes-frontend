import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from "../context/AuthContext";
import { isAuthenticated } from '../utils/Auth';

// Layouts
import NotFound from './messages/NotFound';
import AuthLayout from './layouts/AuthLayout'

import { FetchNotes, Note } from '../utils/Notes'

// Page transitions
import { motion } from "framer-motion";
import { Square } from '../utils/Square';

// Square
import { SquareApi } from '../utils/Square';

// Display ad
import { DisplayAd } from '../utils/Ads';

export default function Notes() {
  const navigate = useNavigate()

  const { user } = useAuthContext();

  // Fetch all notes
  const notes = FetchNotes(user);

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  if (!isAuthenticated()) {
    //return <NotFound />;
    navigate('/auth/signin');
  }

  return (
    <AuthLayout pageMeta={{ title: 'Notes', footer: false, header: true }}>
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
          <motion.div className='page-timeline-all-notes' variants={container}
    initial="hidden"
    animate="visible" >
            <DisplayAd />
            {notes?.length > 0 ? 
              notes?.map((note, key) => (
                <Note key={key} note={note} />
              ))
            : 
              <div className='page-timeline-all-notes-empty'>
                <div className='page-timeline-all-notes-empty-inner'>
                  <h2>Nothing to see here</h2>
                  <p>When you create notes, they will show up here.</p>
                  <a className='btn btn-round' href="/notes/new">Create a note</a>
                </div>
              </div>
            }
          </motion.div>
        </div>
      </div>
    </AuthLayout>
  )
}
