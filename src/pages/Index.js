import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

import { API_URL } from "../config/const";
import { Alert, Button, Card, Col, Form, Input, message, Row, Spin, Typography, } from "antd";

import { getToken } from "../helpers/tokens";

import Layout from './layouts/Layout';

export default function Index() {

  return (
      <Layout pageMeta={{title: "Home", header: false, footer: true}}>
        <div className='sign-in-main'>
          <div className='sign-in-main-inner'>
            <div className='sign-in-main-header'>
              <div className='sign-in-main-header-inner'>
                <img src="/images/quickinotes-logo-black.png" alt="Logo" />
                <Typography.Title level={2}>Welcome to Jotlin</Typography.Title>
                <Typography.Text>A simple and free to use note taking app with all your favorite features</Typography.Text>
              </div>
            </div>
            <div className='sign-in-main-body'>
              <div className='sign-in-main-body-inner show-btns'>
                <a href="/auth/signup" className="btn btn-primary">Signup</a>
                <a href="/auth/signin" className="btn btn-primary unset">Login</a>
              </div>
            </div>
          </div>
        </div>
      </Layout>
  )
}
