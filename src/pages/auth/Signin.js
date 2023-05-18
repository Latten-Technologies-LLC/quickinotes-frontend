import React, { useState, useEffect } from 'react';
import { API_URL, APP_ENV } from "../../config/const";

// React Router
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';

// Antd
import { Alert, Button, Card, Col, Form, Input, message, Row, Spin, Typography, } from "antd";

// Auth
import { useAuthContext } from "../../context/AuthContext";
import { setToken, getToken } from "../../helpers/tokens";
import { http } from "../../helpers/http";

// Auth Layout
import AuthLayout from "../layouts/AuthLayout";

const Signin = () => {
  const navigate = useNavigate();

  const { setUser } = useAuthContext();
  const headers = { "Content-Type": "application/json", };
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  /**
   * Handle Sign In API Call
   * ----
   * This function will make a call to the API to sign in the user.
   * 
   * @param {*} values 
   */
  const handleSignInApiCall = async (values) => {
    setIsLoading(true);
    try {
      const value = {
        identifier: values.email,
        password: values.password,
      };
      const response = await fetch(`${API_URL}/auth/local`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(value),
      });

      const data = await response.json();
      if (data?.error) {
        throw data?.error;
      } else {
        // set the token
        setToken(data.jwt);

        // set the user
        setUser(data.user);

        message.success(`Welcome back ${data.user.username}!`);

        navigate("/timeline", { replace: true });
      }
    } catch (error) {
      console.error(error);
      setError(error?.message ?? "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };
  return (
      <AuthLayout pageMeta={{title: 'Sign In'}}>
        <div className='sign-in-main'>
          <div className='sign-in-main-inner'>
            <div className='sign-in-main-header'>
              <div className='sign-in-main-header-inner'>
                <img src="/images/quickinotes-logo-black.png" alt="Logo" />
                <Typography.Title level={2}>Sign in</Typography.Title>
                <Typography.Text>Sign in to your account</Typography.Text>
              </div>
            </div>
            <div className='sign-in-main-body'>
              <Form name="basic" layout="vertical" onFinish={handleSignInApiCall} autoComplete="off">
                  <Form.Item
                      label="Email"
                      name="email"
                      rules={[
                          {
                              required: true,
                              type: "email",
                              name: "Email",
                          },
                      ]}
                  >
                      <Input placeholder="Email address" />
                  </Form.Item>

                  <Form.Item label="Password" name="password" rules={[{ required: true, name: "password" }]}>
                      <Input.Password placeholder="Password" />
                  </Form.Item>

                  <Form.Item>
                      <Button type="primary" htmlType="submit" className="login_submit_btn">
                          Login {isLoading && <Spin size="small" />}
                      </Button>
                  </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </AuthLayout>
  )
}

export default Signin;