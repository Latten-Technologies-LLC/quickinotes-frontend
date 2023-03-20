import React from 'react'

export default function Header({pageMeta, noteMeta, token}) {
  
  return (
    <header className='header'>
        <div className='header-inner container-fluid'>
            <div className='header-row row'>
                <div className='header-page col-lg-8'>
                    <h1>{pageMeta.title}</h1>
                </div>
                <div className='header-interactions col-lg-4'>
                    <div className="header-search col-lg-12">
                        <input type="text" placeholder="Search notes..." />
                    </div>
                </div>
            </div>
        </div>
    </header>
  )
}
