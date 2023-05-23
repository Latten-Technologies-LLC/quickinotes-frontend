import React, { useEffect, useState, useRef } from 'react'
import { isAuthenticated } from '../../utils/Auth';
import { useNavigate, useParams } from 'react-router-dom'
import { http } from '../../helpers/http';

import { useAuthContext } from "../../context/AuthContext";

// Layouts
import NotFound from '../messages/NotFound';
import AuthLayout from '../layouts/Layout'

// Moment js
import moment from 'moment';

// Tinymce
import { Editor } from '@tinymce/tinymce-react';

let didInit = false;

export default function EditNote() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);

  if(loading)
  {
    // Blur the page
    document.body.style.filter = "blur(15px)";
  }else{
    // Unblur the page
    document.body.style.filter = "none";
  }

  // TinyMCE
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const { user } = useAuthContext();

  // Get note data
  const { id } = useParams();
  const [note, setNote] = useState({});

  // Get note data through API
  useEffect(() => {
    if(!didInit) {
      http.get("/notes/" + id + "?populate=*").then((response) => 
      {
        if(response.status === 200)
        {
          setNote(response.data.data.attributes);
          didInit = true;
          setLoading(false);
        }
      }).catch((err) => {
        navigate('/notes');
      });
    }
  }, [id]);

  // Edit note
  const editNote = async (e) => {
    e.preventDefault();

    const note_name = e.target.note_name.value;
    const note_body = e.target.note_body.value;

    const noteData = {
      data: {
        note_name,
        note_body
      }
    }
  }

  // Fix dates
  let created = moment(note.createdAt).format("MMM Do YYYY");
  let updated = moment(note.updatedAt).fromNow();

  let author = note.user?.data.id;
  let currentUser = user?.id;

  // Authenticated?
  if (!isAuthenticated() || author != currentUser) {
    return <NotFound />;
  }

  return (
    <AuthLayout pageMeta={{ title: 'View Note' }}>
      <form onSubmit={editNote} method='PUT'>
        <div className='page page-notes-head'>
          <div className='page-notes-head-title container'>
            <h1>Edit Note</h1>
            <h1><input type="text" name="note_name" defaultValue={note.note_name} /></h1>
            <ul>
              <li>{created}</li>
              <li>Last updated {updated}</li>
            </ul>
            <div className='page-notes-head-actions'>

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
                <Editor
                  apiKey="5pwiuoduxtz2fuazw1kk7xpcal9ytfkla457ygji53oozf3f"
                  plugins=''
                  tinymceScriptSrc="/tinymce/tinymce.min.js"
                  onInit={(evt, editor) => editorRef.current = editor}
                  initialValue={note.note_body}
                  textareaName="note_body"
                  init={{
                    height: 400,
                    menubar: true,
                    toolbar: 'undo redo | formatselect | format ' +
                      'bold italic backcolor | alignleft aligncenter ' +
                      'alignright alignjustify | bullist numlist outdent indent | ' +
                      'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                  }}
                />
                <div className='page-notes-view-note-content-actions'>
                  <input type="submit" className="btn btn-round" value="Save" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </AuthLayout>
  )
}

