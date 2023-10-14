import React from "react";
import "./Register.css";
import { Layout, Space,App as sss, Button,Form , message,  Input, } from 'antd';
// import { useNavigate } from "react-router-dom";
import { CreateUser } from "../../services/http/register/register";
import { CustomerInterface } from "../../interfaces/Icustomer";

//ตกเเต่งส่วนหัว
const { Header, Content } = Layout;
const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  justifyContent: "center",
  color: 'white',
  height: 60,
  paddingInline: 40,
  lineHeight: '25px',
  display: "flex",
  backgroundColor: 'brown',
};
//ตกเเต่งส่วนตัว
const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 650,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: 'rgb(255, 232, 201)',
};
//ที่เขียนเเบบนี้ไม่รู้เหมือนกันก็อปantมา
const Register: React.FC = () => {
  // const navigate = useNavigate();
  //สร้างข้อความเเจ้งเตือน
  const [messageApi, contextHolder] = message.useMessage();
  //ส่วนนี้เป็นการนำค่าไปใส่ตาราง
  const onFinish = async (values: CustomerInterface) => {
  let res = await CreateUser(values);
  //
  //กำหนดว่าจะให้เเจ้งเตือนอะไร
  if (res.status) {
    messageApi.open({
      type: "success",
      content: "บันทึกข้อมูลสำเร็จ",
  });

  // setTimeout(function () {

  // navigate("/");

  // }, 2000);

  } else {

    console.log(res);

  }
  //

};
  return (
    <>
      {/* //เกี่ยวกับข้อความเเจ้งเตือน */}
      {contextHolder}
      {/*  */}
      <Space direction="vertical" style={{ width: '100%' }} size={[0, 48]}>
      <Layout>  
        {/* ส่วนหัว */}
        <Header style={headerStyle}>
          <h2>Soyju</h2>
        </Header>    
        {/* ส่วนตัว  */}
        <Content style={contentStyle}>

          <div className='form'>
            {/* ใช้ฟอร์มจากant */}
            <Form onFinish={onFinish} autoComplete="off">
              <Form.Item >
                <h2>Register</h2>
              </Form.Item>
              {/* ส่วนนี้เป็นกล่องinput ชื่อname=ต้องตรงกับinterfacesที่เราต้องการใส่เข้าไป */}
              
              <Form.Item label="UserName" name="UserName"rules={[{required: true,message: "กรุณากรอก UserName!",},]}>
                <Input placeholder='UserName'></Input>
              </Form.Item>
              <Form.Item label="FirstName"name="FirstName"rules={[{required: true,message: "กรุณากรอกชื่อ !",},]}>
                <Input placeholder='FristName'></Input>
              </Form.Item>
              <Form.Item label="LastName" name="LastName"rules={[{required: true,message: "กรุณากรอก LastName!",},]}>
                <Input placeholder='LastName'></Input>
              </Form.Item>
              <Form.Item label="password" name="Password"rules={[{required: true,message: "กรุณากรอก password!",},]}>
                <Input placeholder='password'></Input>
              </Form.Item>
              <Form.Item label="address" name="Address"rules={[{required: true,message: "กรุณากรอก address!",},]}>
                <Input placeholder='address'></Input>
              </Form.Item>
              <Form.Item label="email" name="Email"rules={[{type: "email",message: "รูปแบบอีเมลไม่ถูกต้อง !",},{required: true,message: "กรุณากรอก email!",},]}>
                <Input placeholder='email'></Input>
              </Form.Item>
              <Form.Item label="phone" name="Phone"rules={[{required: true,message: "กรุณากรอก phone!",},]}>
                <Input placeholder='phone'></Input>
              </Form.Item>
              {/* อันนี้ปุ่มเฉยๆไม่มีไร */}
              <Form.Item>
                <Button style={{backgroundColor: 'brown'}} block type='primary' htmlType='submit'>Submit</Button>
              </Form.Item>
            </Form>
          </div>
        </Content>
      </Layout>
    </Space>
    </>
  );
};


export default Register;