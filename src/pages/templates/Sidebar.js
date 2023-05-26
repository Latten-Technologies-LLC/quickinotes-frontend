import React from 'react'
import { getToken, removeToken } from '../../helpers/tokens'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from "../../context/AuthContext";

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'

export default function Sidebar() {
      const navigate = useNavigate();
 
      const { user } = useAuthContext();
    
      const handleLogout = () => {
        removeToken();
        navigate("/auth/signin", { replace: true });
      };

  return (
    <div className='sidebar'>
        <div className='sidebar-inner'>
            <div className='sidebar-top'>
                <h2><FontAwesomeIcon icon={Icons.faUser} /></h2>
                <h4>Hi, {user?.name}</h4>
            </div>
            <div className='sidebar-middle'>
                {getToken() ? 
                    <div className='sidebar-middle-item'>
                        <a className="btn" href='/notes/new'><FontAwesomeIcon icon={Icons.faPlus} /> New Note</a>
                        <div className='sidebar-middle-item-user'>
                            <ul className="fa-ul">
                                <li><span className='fa-li'><FontAwesomeIcon icon={Icons.faNoteSticky} /></span> <a href='/notes'>Notes</a></li>
                                <li><span className='fa-li'><FontAwesomeIcon icon={Icons.faBookBookmark} /></span> <a href='/notes/bookmarks'>Bookmarks</a></li>
                                <li><span className='fa-li'><FontAwesomeIcon icon={Icons.faPenRuler} /></span> <a href='/notes/drafts'>Drafts</a></li>
                            </ul>
                        </div>
                    </div>
                    : <div className='sidebar-bottom-item'>
                        <a href='/auth/signin'>Sign in</a>
                        <a href='/auth/signup'>Sign up</a>
                    </div>
                }
            </div>
            <div className='sidebar-bottom'>
                {getToken() ? 
                    <div className='sidebar-bottom-item'>
                        <div className='sidebar-bottom-item-user'>
                            <ul className="fa-ul">
                                <li><span className='fa-li'><FontAwesomeIcon icon={Icons.faGear} /></span> <a href='/settings'>Settings</a></li>
                            </ul>
                        </div>
                        <div className='sidebar-bottom-item-signout'>
                            <button onClick={handleLogout}>Sign out</button>
                        </div>
                    </div>
                    : <div className='sidebar-bottom-item'>
                        
                    </div>
                }
            </div>
        </div>
    </div>
  )
}
