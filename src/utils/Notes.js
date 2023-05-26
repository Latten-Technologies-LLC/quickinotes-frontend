/**
 * Notes.js
 * Type: Utility
 * Description: Helper functions for notes
 * 
 */
import React from 'react'

import { useAuthContext } from "../context/AuthContext";
import moment from 'moment';

import { http } from '../helpers/http';

import { message, } from "antd";

/**
 * FetchNotes
 * Type: GET
 * Desc: Fetches all notes
 * 
 * @returns Notes in an Object
 * @returns Notes sorted by date
*/
export function FetchNotes() {
    const { user } = useAuthContext();

    return user?.notes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

/**
 * FetchDraftNotes
 * Type: GET
 * Desc: Fetches all notes that are drafts
 * 
 * @returns Notes that are drafts in an Object
 * @returns Notes sorted by date
 */
export function FetchDraftNotes() {
    const { user } = useAuthContext();

    var draftNotes = user?.notes.filter(function (note) {
        console.log(note);
        return note.draft == true;
    });

    return draftNotes;
}

/**
 * fetchBookmarkedNotes
 * Type: GET
 * Desc: Fetches all notes that are bookmarked
 * 
 * @returns Notes that are bookmarked in an Object
 */
export function FetchBookmarkedNotes() {
    const { user } = useAuthContext();

    // Sort notes by bookmarked
    var bookmarkedNotes = user?.notes.filter(function (note) {
        console.log(note);
        return note.bookmarked == true;
    });
    return bookmarkedNotes;
}

/**
 *deleteNote
* Type: DELETE
* Desc: Deletes a note
* 
 * @param {*} e 
 */
export const deleteNote = (e) => {
    e.preventDefault();

    if (e.currentTarget.dataset.id !== undefined) {
        const deleteNote = async () => {
            if (e.currentTarget.dataset.id) {
                const noteId = e.currentTarget.dataset.id;

                const noteFromServer = await http.delete("/notes/" + noteId).then((response) => {
                    message.success("Note deleted");
                    window.location.reload();
                }).catch((err) => {
                    message.error("Error deleting note");
                    console.log(err);
                });
            }
        }

        deleteNote();
    }
}

/**
 * Bookmark note
 * Type: PUT
 * Desc: Bookmarks a note
 * 
 * @param {Event Var} e 
 */
export const bookmark = (e) => {
    e.preventDefault();

    if (e.currentTarget.dataset.id !== undefined) {
        const makeBookmark = async () => {
            if (e.currentTarget.dataset.id) {
                const thisBookmarked = e.currentTarget.dataset.bookmarked;
                const noteId = e.currentTarget.dataset.id;

                var set;
                var msg;

                if (thisBookmarked === "false") {
                    set = true;
                    e.currentTarget.dataset.bookmarked = "true";
                    e.currentTarget.classList.add("bookmark-active");
                } else {
                    set = false;
                    e.currentTarget.dataset.bookmarked = "false";
                    e.currentTarget.classList.remove("bookmark-active");
                }

                const noteData = {
                    data: {
                        "bookmarked": set,
                    }
                }

                const noteFromServer = await http.put("/notes/" + noteId, noteData).then((response) => {
                    console.log(response.data.data);
                }).catch((err) => {
                    console.log(err);
                });
            }
        }

        makeBookmark();
    }
    console.log(e.currentTarget.dataset.id);
}

/**
 * routeToNoteView
 * Type: GET
 * Desc: Routes to note view
 * 
 * @param {*} id 
 * @returns 
 */
export const routeToNoteView = (id) => (e) => {
    e.preventDefault();
    if (id) {
        window.location.href = `/notes/v/${id}`;
    }
}

/**
 * routeToNoteEdit
 * Type: GET
 * Desc: Routes to note edit
 * 
 * @param {*} id 
 * @returns 
 */
export const routeToNoteEdit = (id) => (e) => {
    if (id) {
        e.preventDefault();
        window.location.href = `/notes/e/${id}`;
    } else {
        console.log("No ID");
    }
}

/**
 * Note
 * Type: Component
 * Desc: Note component
 * 
 * @param {*} param0 
 * @returns 
 */
export function Note({ note, checkBookmarked }) {
    var body = note.note_body;
    var tags = note.note_tags;
    var name = note.note_name;
    var id = note.id;
    var bookmarked = note.bookmarked;

    var bookmarkClass = bookmarked ? "bookmark-active" : "";

    // Change body to HTML
    if (body.length > 150) {
        body = body.substring(0, 150) + '...';
    }

    // Strip body of HTML
    body = body.replace(/(<([^>]+)>)/gi, "");

    // Dates
    let created = moment(note.createdAt).format("MMM Do YYYY");
    let updated = moment(note.updatedAt).fromNow();

    return (
        <div className='note' key={note.id}>
            <div className='note-header'>
                <h6>{note.note_name}</h6>
                <p>{created} - {note.draft == true ? "Draft" : "Saved"}</p>
            </div>
            <div className='note-body'>
                <p>{body}</p>
                <div className='note-body-tags'>

                </div>
                <div className='note-body-actions'>
                    <div className='note-body-actions-btns'>
                        <a onClick={routeToNoteView} className='btn btn-round' href={`/notes/v/${id}`} alt="View Note">View</a>
                        <a onClick={bookmark} data-id={id} data-status={bookmarked} className={`btn btn-round ${bookmarkClass}`} title="View Note" alt="View Note"><i className="fa-solid fa-star"></i></a>
                        <a onClick={routeToNoteEdit} className='btn btn-round' href={`/notes/e/${id}`} alt="Edit Note"><i className="fa-solid fa-pen"></i></a>
                    </div>
                </div>
            </div>
        </div>
    )
}
