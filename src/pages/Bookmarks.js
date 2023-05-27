import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../utils/Auth';
import { useNavigate } from 'react-router-dom'

import { useAuthContext } from "../context/AuthContext";

import NotFound from './messages/NotFound';
import AuthLayout from './layouts/AuthLayout'

import { FetchBookmarkedNotes, Note } from '../utils/Notes'

// Page transitions
import { motion } from "framer-motion";

export default function Bookmarks() {
    const navigate = useNavigate()

    const { user } = useAuthContext();

    // Get bookmarks
    const bookmarks = FetchBookmarkedNotes(user);

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
        <AuthLayout pageMeta={{ title: 'Bookmarks', footer: false, header: true }}>
            <div className='page-timeline'>
                <div className='page-timeline-inner container'>
                    <div className='page-timeline-header'>
                        <h2>My <br />Bookmarks</h2>
                        <div className="page-timeline-header-actions">
                            <ul>
                                <li><a className='btn btn-round' href="/notes">All</a></li>
                                <li><a className='btn btn-round btn-active ' href="/notes/bookmarks">Bookmarks<span>({bookmarks?.length})</span></a></li>
                                <li><a className='btn btn-round' href="/notes/drafts">Drafts</a></li>
                            </ul>
                        </div>
                    </div>
                    <motion.div className='page-timeline-all-notes' variants={container}
                        initial="hidden"
                        animate="visible">
                        {bookmarks?.length > 0 ?
                            bookmarks?.map((note, key) => (
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
