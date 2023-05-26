import React from 'react'
import { Helmet, HelmetProvider } from "react-helmet-async"

import { getToken } from '../../helpers/tokens'

// Import templates
import Header from '../templates/Header';
import Footer from '../templates/Footer';

// Import framer-motion
import { motion } from "framer-motion";

// Import .ENV vars
import { APP_TITLE, APP_DESCRIPTION, APP_KEYWORDS, APP_AUTHOR, APP_URL, APP_CHARSET, APP_VIEWPORT } from '../../config/const';
import Sidebar from '../templates/Sidebar';

const Layout = ({pageMeta, children}) => {
  return (
    <HelmetProvider>
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
        <div className='non-auth-website-main'>
        <motion.div className='website' initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }} >
              <Sidebar token={getToken()}/>

              <section className='website-inner'>
                  <Header pageMeta={pageMeta} token={getToken()}/>
                  {children}
                  <Footer url={ APP_URL }/>
              </section>

          </motion.div>
        </div>
    </HelmetProvider>
  )
}

export default Layout;