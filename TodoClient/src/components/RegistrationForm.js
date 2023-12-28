import React, { useState } from 'react';
import { FacebookOutlined, GoogleOutlined, LockOutlined, TwitterOutlined, UserOutlined ,MailOutlined,UsergroupAddOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography, Divider } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegistrationForm() {

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const onFinish = (values) => {
    setLoading(true);

    axios.post('http://localhost:5000/register', values)
      .then((response) => {
        setLoading(false);
        console.log('Registration successful:', response.data);
        alert("Success")
      })
      .catch((error) => {
        setLoading(false);
        console.error('Registration error:', error);
        alert("Failed")
      });
  };


  return (
    <div className="h-screen w-screen flex justify-center items-center">

      <Form form={form} onFinish={onFinish} className='w-400 max-w-80 shadow-custom p-6 rounded-2xl my-0 mx-auto'>
        <Typography.Title level={3}>Registration</Typography.Title>
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder='Username' />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password" />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('The two passwords do not match!');
              },
            }),
          ]}
        >
          <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder='Confirm Password' />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Invalid email format' },
          ]}
        >
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder='Email' />
        </Form.Item>
        <Form.Item
          name="department"
          rules={[{ required: true, message: 'Please input your department!' }]}
        >
          <Input prefix={<UsergroupAddOutlined className="site-form-item-icon" />} placeholder='Department' />
        </Form.Item>
        <Form.Item>
          <Button className='w-full text-black' type="primary" htmlType="submit" loading={loading}>
            Register
          </Button>
        </Form.Item>

        <Button className='w-half text-black' type="primary" htmlType="submit" loading={loading}
             onClick={() => navigate('/login')} style={{marginLeft:'140px'}}>
            Login
          </Button>

      </Form>

    </div>
  )
}

export default RegistrationForm