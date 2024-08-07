import React, { useEffect, useState, useRef } from 'react'
import { isAuthenticated } from '../../utils/Auth';
import { useNavigate, useParams } from 'react-router-dom'
import { http } from '../../helpers/http';

import { useAuthContext } from "../../context/AuthContext";

// Layouts
import NotFound from '../messages/NotFound';
import AuthLayout from '../layouts/AuthLayout'

// Moment js
import moment from 'moment';

// Tinymce
import { Editor } from '@tinymce/tinymce-react';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'

export default function EditNote() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true);

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
    http.get("/notes/" + id + "?populate=*").then((response) => 
    {
      if(response.status === 200)
      {
        setNote(response.data.data.attributes);
        setLoading(false);
      }
    }).catch((err) => {
      navigate('/notes');
    });
  }, []);

  // Edit note
  const editNote = async (e) => {
    e.preventDefault();

    const note_name = e.target.note_name.value;
    const note_body = e.target.note_body.value;

    const noteData = {
      data: {
        note_name,
        note_body,
        draft: false
      }
    }

    const response = await http.put("/notes/" + id, noteData);

    if(response.status === 200)
    {
      navigate('/notes/v/' + id);
    }else{
      alert("Something went wrong");
    }
  }

  // Fix dates
  let created = moment(note.createdAt).format("MMM Do YYYY");
  let updated = moment(note.updatedAt).fromNow();

  let author = note.user?.data.id;
  let currentUser = user?.id;

  // Authenticated?
  if (!isAuthenticated() || author != currentUser && loading) {
    return <NotFound />;
  }

  return (
    <AuthLayout pageMeta={{ title: 'Edit Note', footer: false, header: true }}>
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

