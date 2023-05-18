import React from 'react'
import { getToken, removeToken } from '../../helpers/tokens'
import { useNavigate } from 'react-router-dom'

export default function Sidebar() {
      const navigate = useNavigate();
    
      const handleLogout = () => {
        removeToken();
        navigate("/auth/signin", { replace: true });
      };

  return (
    <div className='sidebar'>
        <div className='sidebar-inner'>
            <div className='sidebar-top'>
                <img src='/images/quickinotes-logo-white.png' alt='Logo' />
            </div>
            <div className='sidebar-middle'>
                {getToken() ? 
                    <div className='sidebar-middle-item'>
                        <div className='sidebar-middle-item-user'>
                            <ul className="fa-ul">
                                <li><span className='fa-li'><i className="fa-solid fa-note-sticky"></i></span> <a href='/timeline'>Timeline</a></li>
                                <li><span className='fa-li'><i className="fa-solid fa-book"></i></span> <a href='/notebooks'>Notebooks</a></li>
                                <li><span className='fa-li'><i className="fa-solid fa-pen-ruler"></i></span> <a href='/timeline/drafts'>Drafts</a></li>
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
