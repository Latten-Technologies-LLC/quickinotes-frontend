import React from 'react'
import Helmet from "react-helmet"

import { getToken } from '../../helpers/tokens'

// Import .ENV vars
import { APP_TITLE, APP_DESCRIPTION, APP_KEYWORDS, APP_AUTHOR, APP_URL, APP_CHARSET, APP_VIEWPORT } from '../../config/const';

const AuthLayout = ({pageMeta, children}) => {
  return (
    <>
        <Helmet>
            <title>{ ` ${ pageMeta.title } - ${ APP_TITLE }  `}</title>

            <meta charset={ APP_CHARSET } />
            <meta name="description" content={ APP_DESCRIPTION } />
            <meta name="keywords" content={ APP_KEYWORDS} />
            <meta name="author" content={ APP_AUTHOR } />
            <meta name="viewport" content={ APP_VIEWPORT } />
            <link rel="icon" type="image/png" href="/images/quickinotes-logo-favicon.png" />
            <link rel="apple-touch-icon" sizes="180x180" href="/images/logo-lc-white-solid.png" />
            <script src="https://kit.fontawesome.com/0a79c5bf9a.js" crossorigin="anonymous"></script>
        </Helmet>
        <div className='website'>

            <section className='auth-website-inner'>
                {children}
            </section>

        </div>
    </>
  )
}

export default AuthLayout;