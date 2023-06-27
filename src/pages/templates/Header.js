import React from 'react'

import { APP_TITLE } from '../../config/const';

// Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import * as Icons from '@fortawesome/free-solid-svg-icons'

export default function Header({pageMeta, noteMeta, token, style="auth"}) {
    // Sidebar Logic
    const [sidebar, setSidebar] = React.useState(false);

    const handleSidebar = () => {
        if(sidebar) {
            setSidebar(false);

            // Show sidebar
            document.querySelector('.sidebar').classList.remove('sidebar-active');
            document.querySelector('.header-menu-action-inner-button').classList.remove('header-menu-action-inner-button-active');
            
        }else{
            setSidebar(true);

            // Show sidebar
            document.querySelector('.sidebar').classList.add('sidebar-active');
            document.querySelector('.header-menu-action-inner-button').classList.add('header-menu-action-inner-button-active');
        }
    }
  
  return (
    <header className={`header ${!token ? "unlogged" : ""}`}>
        <div className='header-inner container'>
            <div className='header-row'>
                <div className='header-menu-action'>
                    <div className="header-menu-action-inner">
                        {token ?
                        <button onClick={handleSidebar} className='header-menu-action-inner-button'><FontAwesomeIcon icon={Icons.faBars} /></button>
                        : null}
                        <h2><a href="/">{APP_TITLE}</a></h2>
                    </div>
                </div>
                <div className='header-interactions'>
                    <div className="header-search col-lg-12">
                        {token ? 
                            <input type="text" placeholder="Search notes..." />
                        : 
                        <div className="header-links">
                            <ul>
                                <li><a className="btn btn-login" href="/auth/signin">Sign in</a></li>
                                <li><a className='btn' href="/auth/signup">Sign up</a></li>
                            </ul>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    </header>
  )
}
