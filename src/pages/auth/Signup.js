import React, { useState, useEffect } from 'react';
import { API_URL, APP_ENV } from "../../config/const";

// React Router
import { useNavigate } from 'react-router-dom';

// Antd
import { Alert, Button, Form, Input, message,Spin, Typography, } from "antd";

// Auth
import { useAuthContext } from "../../context/AuthContext";
import { setToken, getToken } from "../../helpers/tokens";
import { http } from "../../helpers/http";

// Auth Layout
import Layout from "../layouts/Layout";

const Signout = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    if (getToken() != null) {
      message.success(`You're already logged in!`);
      navigate("/timeline", { replace: true });
    }
  }, []);

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
  const handleSignUpApiCall = async (values) => {
    setIsLoading(true);

    try {
      const response = await http.post(`/auth/local/register`, values, { headers });
      const data = await response.data;

      if (APP_ENV === "development") {
        console.log(data);
      }

      if (data.error) {
        if(APP_ENV !== "production")
        {
          throw data?.error;
        }else{
          message.error('Error has occurred!');
        }   
      } else {
        // set the token
        setToken(data.jwt);

        // set the user
        setUser(data.user);

        message.success(`Welcome to Quickinotes, ${data.user.username}!`);
        setTimeout(() => window.location.href = "/notes", 3000);
      }
    } catch (error) {
      if (APP_ENV === "development") {
        console.log(error);
      }

      message.error("Invalid Email or Password!");
      setError("Invalid Email or Password!");
    } finally {
      setIsLoading(false);
    }
  };
  return (
      <Layout pageMeta={{title: 'Sign In', footer: true, header: true}}>
        <div className='sign-in-main'>
          <div className='sign-in-main-inner'>
            <div className='sign-in-main-header'>
              <div className='sign-in-main-header-inner'>
                <img src="/images/quickinotes-logo-black.png" alt="Logo" />
                <Typography.Title level={2}>Sign Up</Typography.Title>
                <Typography.Text>Sign up for a free account so you can save and access your notes from wherever!</Typography.Text>
              </div>
            </div>
            <div className='sign-in-main-body'>
              <Form name="basic" layout="vertical" onFinish={handleSignUpApiCall} autoComplete="off">
                  <Form.Item label="Name" name="name" rules={[{required: true, type: "string"}]}>
                      <Input placeholder="Name" />
                  </Form.Item>
                  
                  <Form.Item label="Username" name="username" rules={[{required: true, type: "string"}]}>
                      <Input placeholder="Username" />
                  </Form.Item>
                  
                  <Form.Item label="Email" name="email" rules={[{required: true, type: "email", name: "Email"}]}>
                      <Input placeholder="Email address" />
                  </Form.Item>

                  <Form.Item label="Password" name="password" rules={[{ required: true, name: "Password" }]}>
                      <Input.Password placeholder="Password" />
                  </Form.Item>

                  <Form.Item>
                      <Button type="primary" htmlType="submit" className="login_submit_btn">
                          Signup {isLoading && <Spin size="small" />}
                      </Button>
                  </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </Layout>
  )
}

export default Signout;