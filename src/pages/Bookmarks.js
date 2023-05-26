import React, { useEffect, useState } from 'react'
import { isAuthenticated } from '../utils/Auth';
import { useNavigate } from 'react-router-dom'

import { useAuthContext } from "../context/AuthContext";

import NotFound from './messages/NotFound';
import Layout from './layouts/Layout'

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
        <Layout pageMeta={{ title: 'Bookmarks' }}>
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
                        {bookmarks?.map((note, key) => (
                            <Note key={key} note={note} checkBookmarked='true' />
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}
