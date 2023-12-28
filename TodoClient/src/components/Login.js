import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography, Divider } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {

  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const onFinish = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/login', values)
      if (response.status == 200) {
        localStorage.setItem("token", response.data.token)
        window.location.href = "/home"
      } else {
        alert('Authentication Failed!!!')
      }
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <div className="h-screen w-screen flex justify-center items-center">

      <Form form={form} onFinish={onFinish} className="w-400 max-w-80 shadow-custom p-6 rounded-2xl my-0 mx-auto">

        <Typography.Title>Welcome Back!</Typography.Title>

        <Form.Item name="username" rules={[{ required: true, message: "Enter Username" }]} >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>

        <Form.Item name="password" rules={[{ required: true, message: "Enter Password" }]}>
          <Input prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button className='w-full' type="primary" htmlType="submit" loading={loading} style={{ color: 'black', fontWeight: 'bold', fontSize: '15px' }}>Login</Button>
        </Form.Item>

      </Form>
    </div>
  )
}

export default Login