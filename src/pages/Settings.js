import React, { useState, useEffect } from 'react';
import { API_URL, APP_ENV } from "../config/const";
import Layout from './layouts/Layout';

// React router
import { useNavigate } from "react-router-dom";

// Antd
import { Alert, Button, Card, Col, Form, Input, message, Row, Spin, Typography, } from "antd";

// Auth
import { useAuthContext } from "../context/AuthContext";
import { http } from "../helpers/http";
import { getToken } from "../helpers/tokens";

export default function Settings() {
  const headers = { Authorization: `Bearer ${getToken()}` };
  const [loading, setLoading] = useState(false);
  const { user, isLoading, setUser } = useAuthContext();

  /**
   * Handle Profile Update API Call
   * ----
   * This function will make a call to the API to update the user profile.
   * 
   * @param {*} data 
   */
  const handleProfileUpdateApiCall = async (data) => {
    setLoading(true);

    try {
      // Make call to API
      const responseData = await http.put(`/users/${user.id}`, data, { headers });

      if(APP_ENV === 'development') {
        console.log('responseData: ');
        console.log(responseData);
      }

      setUser(responseData.data);
      message.success("Data saved successfully!");
    } catch (error) {
      if(APP_ENV === 'development') {
        console.log(error);
      }
      message.error("Error While Updating the Profile!");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <Spin size="large" />;
  }

  return (
      <AuthLayout pageMeta={{title: "Settings", footer: false, header: true}}>
          <div className='page-settings'>
            <div className='page-settings-inner container-fluid'>
                <div className='page-settings-row'>
                <Form layout="vertical"
                    initialValues={{
                      username: user?.username,
                      email: user?.email,
                      name: user?.name,
                    }}
                    onFinish={handleProfileUpdateApiCall}
                  >                    
                  <Form.Item label="Name" name="name"
                      rules={[
                        {
                          required: true,
                          message: "Name is required!",
                          type: "text",
                        },
                      ]}
                    >
                    <Input placeholder="Email" />
                  </Form.Item>                     
                  <Form.Item label="Username" name="username"
                      rules={[
                        {
                          required: true,
                          message: "Username is required!",
                          type: "text",
                        },
                      ]}
                    >
                    <Input placeholder="Email" />
                  </Form.Item>                     
                  <Form.Item label="Email" name="email"
                      rules={[
                        {
                          required: true,
                          message: "Email is required!",
                          type: "email",
                        },
                      ]}
                    >
                    <Input placeholder="Email" />
                  </Form.Item>                    
                  <input type='submit' value='Update Profile' className='btn btn-primary' />
                  </Form>
                </div>
            </div>
          </div>
      </Layout>
  )
}