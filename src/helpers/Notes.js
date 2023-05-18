import React from 'react'

import { useAuthContext } from "../context/AuthContext";

export default function FetchNotes() {
    const { user } = useAuthContext();
    
    return user?.notes;
}

export function Note({note})
{
    return (
        <div className='note' key={note.id}>
            <div className='note-header'>
                <h2>{note.note_name}</h2>
            </div>
            <div className='note-body'>
                <p>{note.note_body}</p>
                <div className='note-body-tags'>
                    
                </div>
                <div className='note-body-actions'>
                    <a href={`/notes/v/${note.id}`}>View</a>
                    <a href={`/notes/e/${note.id}`}>Edit</a>
                </div>
            </div>
        </div>
    )
}