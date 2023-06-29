import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'

const Tabbar = () => {

    // Show create note modal
    const handleCreateNote = () => {
        // Redirect to create note page
        window.location.href = '/notes/new';
    }

  return (
    <div className='tabbar-main'>
        <div className='tabbar-inner container'>
            <div className='tabbar-row'>
                <button onClick={handleCreateNote} className='tabbar-button tabbar-button-active btn'><FontAwesomeIcon icon={Icons.faPen} /> Create new note</button>
            </div>
        </div>
    </div>
  )
}

export default Tabbar;