import React, { useEffect, useState } from 'react'
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

let didInit = false;

export default function ViewNote() {
  // Authentication
  const navigate = useNavigate()
  const { user, isLoading, setUser } = useAuthContext();

  // Get note data
  const { id } = useParams();
  const [note, setNote] = useState({});

console.log(id);

  // Get note data through API
  useEffect(() => {
    if(!didInit) {
      http.get("http://localhost:1337/api/notes/" + id + "?populate=*").then((response) => 
      {
        if(response.status === 200)
        {
          setNote(response.data.data.attributes);
          didInit = true;
        }
      }).catch((err) => {
        console.log(err);
        //navigate('/notes');
      });
    }
  }, [id]);

  // Fix dates
  let created = moment(note.createdAt).format("MMM Do YYYY");
  let updated = moment(note.updatedAt).fromNow();

  var bookmarked = note?.bookmarked;
  var bookmarkClass = bookmarked ? "bookmark-active" : "";

  let author = note.user?.data.id;
  let currentUser = user?.id;

  // Check auth and ownership
  if (!isAuthenticated() || author != currentUser) {
    return <NotFound />;
  }

  return (
    <AuthLayout pageMeta={{ title: 'View Note' }}>
      <div className='page page-notes-head'>
        <div className='page-notes-head-title container'>
          <h1>{note.note_name}</h1>
          <ul>
            <li>{created}</li>
            <li>Last updated {updated}</li>
            <li>4 min read</li>
          </ul>
          <div className='page-notes-head-actions'>
            <a onClick={routeToNoteEdit(note.id)} className='btn btn-round' alt="Edit Note" href={`/notes/e/${id}`}>Edit</a>
            <a onClick={bookmark} data-id={id} data-status={bookmarked} className={`btn btn-round ${bookmarkClass}`}><i className="fa-solid fa-star"></i></a>
            <a onClick={deleteNote} data-id={id} className='btn btn-round delete' href={`/notes/e/${id}`} alt="Delete Note"><i className="fa-solid fa-trash"></i></a>
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
