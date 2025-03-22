import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../utils/Auth';
import { useNavigate } from 'react-router-dom'

import { useAuthContext } from "../context/AuthContext";

import NotFound from './messages/NotFound';
import AuthLayout from './layouts/AuthLayout'

import { FetchBookmarkedNotes, Note } from '../utils/Notes'

export default function Bookmarks() {
    const navigate = useNavigate()

    const { user } = useAuthContext();

    // Get bookmarks
    const bookmarks = FetchBookmarkedNotes(user);

    if (!isAuthenticated()) {
        return <NotFound />;
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
                    <div className='page-timeline-all-notes'>
                        {bookmarks?.length > 0 ? 
                            bookmarks?.map((note, key) => (
                                <Note key={key} note={note} checkBookmarked='true' />
                            )) :
                            <div className='page-timeline-all-notes-empty'>
                                <div className='page-timeline-all-notes-empty-inner'>
                                <h2>Nothing to see here</h2>
                                <p>When you bookmark notes, they will show up here.</p>
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
