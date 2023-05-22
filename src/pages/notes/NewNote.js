import React, { useRef } from 'react'
import { isAuthenticated } from '../../utils/Auth';
import { useNavigate } from 'react-router-dom'
import { http } from '../../helpers/http';
import { useAuthContext } from "../../context/AuthContext";
import { message, } from "antd";

// Layouts
import NotFound from '../messages/NotFound';
import AuthLayout from '../layouts/Layout'

// Tinymce
import { Editor } from '@tinymce/tinymce-react';

export default function NewNote() {
    const navigate = useNavigate();
    const { user } = useAuthContext();

    // TinyMCE
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    // Create new note
    async function createNote(e) {
        e.preventDefault();
        const note_name = e.target.note_name.value;
        const note_body = e.target.note_body.value;

        if (!note_name || !note_body) {
            message.error(`Please fill in all fields!`);
            return false;
        }

        const note = {
            data: {
                note_name: note_name,
                note_body: note_body,
                user: user.id
            }
        };

        const response = await http.post("/notes", note).then((response) => {
            message.success(`Note created successfully!`);
            navigate('/notes/v/' + response.data.data.id);
        }).catch((err) => {
            message.error(`Error creating note!`);
            console.log(err);
        });
    }

    // Authenticated?
    if (!isAuthenticated()) {
        return <NotFound />;
    }


    return (
        <AuthLayout pageMeta={{ title: 'New Note' }}>
            <form onSubmit={createNote} method='PUT'>
                <div className='page page-notes-head'>
                    <div className='page-notes-head-title container'>
                        <h1>Create new Note</h1>
                        <h1><input type="text" name="note_name" placeholder='Note Title' /></h1>
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
                                    <button type="submit" className="btn btn-round">Create Note</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </AuthLayout>
    )
}

