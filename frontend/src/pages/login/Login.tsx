import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { GetCustomerByHash } from "../../services/http/customer/customer";
import { CustomerInterface } from "../../interfaces/Icustomer";
import styles from './Login.module.css'
import BG from '../../assets/etc/BG.jpg';
import raw from '../../assets/etc/raw.jpg';

const arrayBufferToHex = (arrayBuffer : any) => {
  const view = new DataView(arrayBuffer); // Corrected line
  let hex = '';
  for (let i = 0; i < view.byteLength; i += 1) {
    const value = view.getUint8(i);
    hex += value.toString(16).padStart(2, '0');
  }
  return hex;
};

const sha256 = async (message : any) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return arrayBufferToHex(hashBuffer);
};

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (value: CustomerInterface) => {
    const concatenatedString = `${value.UserName}${value.Password}`;
    const hashedPassword = await sha256(concatenatedString);
    
    console.log(value)
    try {
      const customer = await GetCustomerByHash(hashedPassword);
  
      if (customer) {
        message.success('Login successful');
        console.log(customer)
        navigate('/home');
      } else {
        message.error('Invalid username or password');
      }
    } catch (error) {
      console.error(error);
    }
  };
  const onFinish = async (values: CustomerInterface) => {
    setLoading(true);
    handleLogin(values);
    setLoading(false);
    console.log('Received values of form: ', values);
  };

  return (
    <div className={styles.loginContainer}>
      <img src={BG} alt="bg" className={styles.bg} />
      
      <Form
        name="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        className={styles.formContainer}
      >
        
        <Form.Item
          name="UserName"
          rules={[{ required: true, message: 'Please enter your username' }]
          }
        >
          <Input prefix={<UserOutlined />} placeholder="Username" />
        </Form.Item>

        <Form.Item
          name="Password"
          rules={[{ required: true, message: 'Please enter your password' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            block
          >
            Log In
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
