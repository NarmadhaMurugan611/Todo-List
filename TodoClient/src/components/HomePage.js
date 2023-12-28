import React from 'react';
import { Layout, Menu, Row, Col, Typography } from 'antd';
import {  HomeOutlined,   LoginOutlined,UserOutlined  } from '@ant-design/icons';
import {Link} from 'react-router-dom';
import './HomePage.css'

function HomePage() {
    const { Header, Content, Footer } = Layout;
    const { Title, Paragraph } = Typography;
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Header>
                <Menu theme="dark" mode="horizontal" style={{ float: 'right' }}>
                    <Menu.Item key="home" icon={<HomeOutlined />}>
                        <Link to='/' >Home</Link>
                    </Menu.Item>
                    <Menu.Item key="register" icon={<UserOutlined />}>
                        <Link to='/register' >Register</Link>
                    </Menu.Item>
                    <Menu.Item key="login" icon={<LoginOutlined />}>
                        <Link to='/login' >Login</Link>
                    </Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '50px' }}>
                <Row gutter={16}>
                    <Col span={12}>
                        <img 
                            src="https://webstockreview.net/images/engineer-clipart-software-developer-13.png"
                            alt=""
                            style={{ maxWidth: '75%' }}
                        />
                    </Col>
                    <Col span={12} className='msg'>
                        <Title level={2} className='title'>Welcome to Your Task Management site</Title>
                        <Paragraph className='title1'>
                            Organize your tasks efficiently and stay productive.
                        </Paragraph>
                    </Col>
                </Row>
            </Content>
            <Footer style={{ textAlign: 'center', fontSize: '17px' }}>
                Created on ©{new Date().getFullYear()} by the user
            </Footer>
        </Layout>
    );
}
export default HomePage;