import React, { useEffect, useMemo, useState } from 'react'
import { isAuthenticated } from '../../utils/Auth';
import { useNavigate, useParams } from 'react-router-dom'
import { http } from '../../helpers/http';

// Auth
import { useAuthContext } from "../../context/AuthContext";
import AuthLayout from '../layouts/AuthLayout'

// Notes
import { routeToNoteEdit, bookmark, deleteNote } from '../../utils/Notes'

// Moment js
import moment from 'moment';

// Markdown
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'

import NotFound from '../messages/NotFound';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'

let didInit = false;

export default function ViewNote() {
  // Authentication
  const navigate = useNavigate()
  const { user } = useAuthContext();

  // Get note data
  const { id } = useParams();
  const [note, setNote] = useState({});

  // Get note data through API
  http.get("/notes/" + id + "?populate=*").then((response) => {
    if (response.status === 200) {
      setNote(response.data.data.attributes);
      didInit = true;
    }
  }).catch((err) => {
    navigate('/notes');
  });

  // Fix dates
  let created = moment(note.createdAt).format("MMM Do YYYY");
  let updated = moment(note.updatedAt).fromNow();

  var bookmarked = note?.bookmarked;
  var bookmarkClass = bookmarked ? "bookmark-active" : "";

  let author = note.user?.data.id;
  let currentUser = user?.id;

  let status = note?.draft ? "Draft" : "Published";

  // Check auth and ownership
  if (!isAuthenticated() || author != currentUser && !didInit) {
    //return <NotFound />;
    navigate('/auth/signin');
  }

  return (
    <AuthLayout pageMeta={{ title: 'View Note' }}>
      <div className='page page-notes-head'>
        <div className='page-notes-head-title container'>
          <h1>{note.note_name}</h1>
          <ul>
            <li>{created}</li>
            <li>Last updated {updated}</li>
            <li>{status}</li>
          </ul>
          <div className='page-notes-head-actions'>
            <a onClick={routeToNoteEdit(note.id)} className='btn btn-round' alt="Edit Note" href={`/notes/e/${id}`}>Edit</a>
            <a onClick={bookmark} data-id={id} data-status={bookmarked} className={`btn btn-round ${bookmarkClass}`}><FontAwesomeIcon icon={Icons.faStar} /></a>
            <a onClick={deleteNote} data-id={id} className='btn btn-round delete' href={`/notes/e/${id}`} alt="Delete Note"><FontAwesomeIcon icon={Icons.faTrash} /></a>
          </div>
        </div>
      </div>
      <div className='page-notes-view'>
        <div className='page-notes-view-inner container'>
          <div className='page-notes-view-note'>
            <div className='page-notes-view-note-title'>
              <ul>
              </ul>
            </div>
            <div className='page-notes-view-note-content'>
              <ReactMarkdown children={note.note_body} rehypePlugins={[rehypeRaw]} />
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  )
}
