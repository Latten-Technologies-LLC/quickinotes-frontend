import React from 'react'

import { Typography } from 'antd'

import Layout from '../layouts/Layout'

const About = () => {
  return (
    <Layout pageMeta={{title: 'Sign In', footer: true, header: true}}>
        <div className='sign-in-main'>
          <div className='sign-in-main-inner'>
            <div className='sign-in-main-header'>
              <div className='sign-in-main-header-inner'>
                <img src="/images/quickinotes-logo-black.png" alt="Logo" />
                <Typography.Title level={2}>About Us</Typography.Title>
                <Typography.Text>Who we are & what we do!</Typography.Text>
              </div>
            </div>
            <div className='sign-in-main-body'>
              <Typography.Text>Jotlin is a free to use note taking app that makes it easy and simple for busy people like yourself to take notes and bookmark things that mean a lot to you!</Typography.Text>
            </div>
          </div>
        </div>
      </Layout>
  )
}

export default About