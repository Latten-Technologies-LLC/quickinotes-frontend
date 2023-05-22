import React from 'react'
import { getToken, removeToken } from '../../helpers/tokens'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from "../../context/AuthContext";

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
                <h2><i className="fa-regular fa-user"></i></h2>
                <h4>Hi, {user?.name}</h4>
            </div>
            <div className='sidebar-middle'>
                {getToken() ? 
                    <div className='sidebar-middle-item'>
                        <div className='sidebar-middle-item-user'>
                            <ul className="fa-ul">
                                <li><span className='fa-li'><i className="fa-solid fa-bars-staggered"></i></span> <a href='/notes'>Timeline</a></li>
                                <li><span className='fa-li'><i className="fa-solid fa-book"></i></span> <a href='/notebooks'>Notebooks</a></li>
                                <li><span className='fa-li'><i className="fa-solid fa-note-sticky"></i></span> <a href='/notes/bookmarks'>Notes</a></li>
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
                                <li><span className='fa-li'><i className="fa-solid fa-gear"></i></span> <a href='/settings'>Settings</a></li>
                            </ul>
                        </div>
                        <div className='sidebar-bottom-item-signout'>
                            <button onClick={handleLogout}>Sign out</button>
                        </div>
                    </div>
                    : <div className='sidebar-bottom-item'>
                        <a href='/auth/signin'>Sign in</a>
                        <a href='/auth/signup'>Sign up</a>
                    </div>
                }
            </div>
        </div>
    </div>
  )
}
