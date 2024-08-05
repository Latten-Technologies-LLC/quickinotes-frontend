import React from 'react'
import { Helmet, HelmetProvider } from "react-helmet-async"

import { getToken } from '../../helpers/tokens'

// Import templates
import Header from '../templates/Header';
import Footer from '../templates/Footer';
import Sidebar from '../templates/Sidebar';

// Import .ENV vars
import { APP_ENV, APP_TITLE, APP_DESCRIPTION, APP_KEYWORDS, APP_AUTHOR, APP_URL, APP_CHARSET, APP_VIEWPORT } from '../../config/const';

// Import framer-motion
import { motion } from "framer-motion";

const AuthLayout = ({pageMeta, children}) => {
  return (
    <HelmetProvider>
        <Helmet>
            <title>{ ` ${ pageMeta.title } - ${ APP_TITLE }  `}</title>
            {APP_ENV === "development" ? <meta name="robots" content="noindex, nofollow" /> : null}
            {APP_ENV === "development" ? <meta name="googlebot" content="noindex, nofollow" /> : null}
            {APP_ENV === "development" ? <meta name="bingbot" content="noindex, nofollow" /> : null}
            {APP_ENV !== "development" ? <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2085234864180580"
     crossorigin="anonymous"></script> : null}
            <meta charset={ APP_CHARSET } />
            <meta name="description" content={ APP_DESCRIPTION } />
            <meta name="keywords" content={ APP_KEYWORDS} />
            <meta name="author" content={ APP_AUTHOR } />
            <meta name="viewport" content={ APP_VIEWPORT } />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />
            <link rel="apple-touch-icon" sizes="180x180" href="/images/logo-lc-white-solid.png" />
            <script src="https://kit.fontawesome.com/0a79c5bf9a.js" crossorigin="anonymous"></script>
        </Helmet>
        <div className='website'>
            <Sidebar token={getToken()}/>

            <section className='auth-website-inner'>
                  {pageMeta.header ? 
                    <Header pageMeta={pageMeta} token={getToken()}/>
                  : null}
                  
                  {children}

                  {pageMeta.footer ?
                    <Footer url={ APP_URL }/>
                  : null}
            </section>

        </div>
    </HelmetProvider>
  )
}

export default AuthLayout;