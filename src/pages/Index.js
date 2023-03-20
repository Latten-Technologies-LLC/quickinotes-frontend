import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

import { API_URL } from "../config/const";
import { Alert, Button, Card, Col, Form, Input, message, Row, Spin, Typography, } from "antd";

import { getToken } from "../helpers/tokens";

import Layout from './layouts/Layout';

export default function Index() {

  return (
      <Layout pageMeta={{title: "Home"}}>
          
      </Layout>
  )
}
