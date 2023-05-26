import React, {useState} from 'react';
import { APP_ENV } from "../config/const";

// Layouts
import NotFound from './messages/NotFound';
import AuthLayout from './layouts/AuthLayout'

import { isAuthenticated } from '../utils/Auth';

// Antd
import { Form, Input, message } from "antd";

// Auth
import { useAuthContext } from "../context/AuthContext";
import { http } from "../helpers/http";

export default function Settings() {
  const { user, setUser } = useAuthContext();

  const [username, setUsername] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);
  const [name, setName] = useState(user?.name);

  /**
   * Handle Profile Update API Call
   * ----
   * This function will make a call to the API to update the user profile.
   * 
   * @param {*} data 
   */
  const handleProfileUpdateApiCall = async (data) => {

    try {
      // Make call to API
      const responseData = await http.put(`/users/${user.id}`, data);

      setUser(responseData.data);
      message.success("Data saved successfully!");
    } catch (error) {
      if(APP_ENV === 'development') {
        console.log(error);
      }
      message.error("Error While Updating the Profile!");
    } 
  };

  console.log(username, email, name);

  if (!isAuthenticated()) {
    return <NotFound />;
  }

  return (
      <AuthLayout pageMeta={{title: "Settings"}}>
          <div className='page-settings'>
            <div className='page-settings-inner container'>
                <h1>Settings</h1>
                <div className='page-settings-row'>
                <Form layout="vertical"
                    initialValues={{
                      username: username,
                      email: email,
                      name: name,
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
                    <Input placeholder="Name" />
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
                    <Input placeholder="Username" />
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
      </AuthLayout>
  )
}