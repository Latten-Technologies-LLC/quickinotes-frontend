import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from "../context/AuthContext";
import { isAuthenticated } from '../utils/Auth';

// Layouts
import NotFound from './messages/NotFound';
import AuthLayout from './layouts/AuthLayout'

import { FetchDraftNotes, Note } from '../utils/Notes'

// Page transitions
import { motion } from "framer-motion";

export default function Drafts() {
  const navigate = useNavigate()

  const { user } = useAuthContext();

  // Fetch all drafts
  var drafts = FetchDraftNotes();

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
          <motion.div className='page-timeline-all-notes' variants={container}
    initial="hidden"
    animate="visible">
            {drafts?.map((note, key) => (
              <Note key={key} note={note} />
            ))}
          </motion.div>
        </div>
      </div>
    </AuthLayout>
  )
}
