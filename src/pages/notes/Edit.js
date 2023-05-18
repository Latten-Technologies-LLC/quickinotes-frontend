import React, { useEffect, useState, useRef } from 'react'
import { getToken } from '../../helpers/tokens'
import { Navigate, redirect, useNavigate, useParams } from 'react-router-dom'
import { http } from '../../helpers/http';

import { useAuthContext } from "../../context/AuthContext";

import Layout from '../layouts/Layout'

import FetchNotes, { Note } from '../../helpers/Notes'

// Moment js
import moment from 'moment';

// Markdown
import ReactMarkdown from 'react-markdown';

import { Editor } from '@tinymce/tinymce-react';

export default function EditNote() {
  const [authenticated, setAuthenticated] = useState(false)
  const navigate = useNavigate()

  // TinyMCE
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const { user, isLoading, setUser } = useAuthContext();

  useEffect(() => {
    if (getToken()) {
      setAuthenticated(true)
    }
  }, [])

  // Get note data
  const { id } = useParams();
  const [note , setNote] = useState({});

  useEffect(() => {
    const getNote = async () => {
        const noteFromServer = await http.get("http://localhost:1337/api/notes/" + id).then((response) => 
        { 
            setNote(response.data.data.attributes);
        }).catch((err) => {
            navigate('/notes');
        });  
    }

    getNote();
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

        const noteFromServer = await http.put("http://localhost:1337/api/notes/" + id, noteData).then((response) =>
        {
            navigate('/notes/v/' + id);
        }).catch((err) => {
            console.log(err);
        });
    }

  // Fix dates
  let created = moment(note.createdAt).fromNow();
  let updated = moment(note.updatedAt).fromNow();

  let action = "http://localhost:1337/api/notes/" + id;

  return (
      <Layout pageMeta={{title: 'View Note'}}>
        <div className='page-notes-view'>
            <div className='page-notes-view-inner container-fluid'>
              <div className='page-notes-view-note'>
                <form onSubmit={editNote} method='PUT'>
                    <div className='page-notes-view-note-title'>
                        <h2><input type="text" name="note_name" value={note.note_name} /></h2>
                        <ul>
                            <li><i className="fa-solid fa-clock"></i> Created {created}</li>
                            <li><i className="fa-solid fa-pen"></i> Updated {updated}</li>
                        </ul>
                    </div>
                    <div className='page-notes-view-note-content'>
                        <Editor
                            apiKey="5pwiuoduxtz2fuazw1kk7xpcal9ytfkla457ygji53oozf3f"
                            onInit={(evt, editor) => editorRef.current = editor}
                            initialValue={note.note_body}
                            textareaName="note_body"
                            init={{
                            height: 500,
                            menubar: true,
                            forced_root_block: '',
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar: 'undo redo | formatselect | format ' +
                            'bold italic backcolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                            }}
                        />
                    </div>
                    <div className='page-notes-view-note-actions'>
                        <button type='submit' className='btn btn-primary'>Save Changes</button>
                        <button type='button' className='btn btn-danger'>Delete</button>
                    </div>
                </form>
              </div>
            </div>
        </div>
      </Layout>
  )
}

