import React from 'react'
import { APP_TITLE, APP_AUTHOR } from '../../config/const';

export default function Footer() {
  return (
    <div className='footer container-fluid'>
      <div className='footer-inner container'>
        <p>&copy; 2023. {APP_TITLE} / A {APP_AUTHOR} App</p>
      </div>
    </div>
  )
}
