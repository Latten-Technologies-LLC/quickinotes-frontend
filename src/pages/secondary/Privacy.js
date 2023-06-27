import React from 'react'

import { Typography } from 'antd'

import Layout from '../layouts/Layout'
import { APP_TITLE } from '../../config/const'

const About = () => {
  return (
    <Layout pageMeta={{title: 'Sign In', footer: true, header: true}}>
        <div className='sign-in-main'>
          <div className='sign-in-main-inner'>
            <div className='sign-in-main-header'>
              <div className='sign-in-main-header-inner'>
                <img src="/images/quickinotes-logo-black.png" alt="Logo" />
                <Typography.Title level={2}>Privacy Policy</Typography.Title>
                <Typography.Text>How do we protect your data?</Typography.Text>
              </div>
            </div>
            <div className='sign-in-main-body'>
              <Typography.Text>Here at {APP_TITLE} we do not share nor do we sell your information. Also all of your notes and information are encrypted and are not accessable by us at all</Typography.Text>
            </div>
          </div>
        </div>
      </Layout>
  )
}

export default About