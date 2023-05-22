import React from 'react'

export default function Header({pageMeta, noteMeta, token}) {
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
    <header className='header'>
        <div className='header-inner container'>
            <div className='header-row row'>
                <div className='header-menu-action col-lg-6'>
                    <div className="header-menu-action-inner">
                        <button onClick={handleSidebar} className='header-menu-action-inner-button'><i className="fa-solid fa-bars"></i></button>
                        <h2><a href="/notes">Quickinotes</a></h2>
                    </div>
                </div>
                <div className='header-interactions col-lg-6'>
                    <div className="header-search col-lg-12">
                        <input type="text" placeholder="Search notes..." />
                    </div>
                </div>
            </div>
        </div>
    </header>
  )
}
