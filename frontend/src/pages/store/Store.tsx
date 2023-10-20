import React, { useState, useEffect } from "react";
import './Store.css';
import { Layout, Space,Modal, Button,Form , message,  Table, } from 'antd';
import { useNavigate , Link } from "react-router-dom";
import { CreateOrder } from "../../services/http/order/order";
import { GetState } from "../../services/http/order/order";
import { GetCustomers} from "../../services/http/customer/customer";
import { OrderInterface } from "../../interfaces/Iorder";
import { CheckOutlined } from "@ant-design/icons";
import { useCustomer } from '../context/context';
import {ShoppingCartOutlined } from "@ant-design/icons";
import { useOrderData } from '../context/OrderContext'; // Adjust the import path
import type { ColumnsType } from "antd/es/table";
import { FoodInterface } from "../../interfaces/Ifood";
import { GetFoods } from "../../services/http/food/food";
// const [open, setOpen] = useState(false);


  // const [messageApi, contextHolder] = message.useMessage();
  // const showModal = (val: OrdersInterface) => {
  //   setModalText(
  //     `คุณต้องการสั่งซื้อ "${val.FirstName}" หรือไม่ ?`
  //   );
  //   setDeleteId(val.ID);
  //   setOpen(true);
  // };

  // const handleOk = async () => {
  //   setConfirmLoading(true);
  //   let res = await DeleteUserByID(deleteId);
  //   if (res) {
  //     setOpen(false);
  //     messageApi.open({
  //       type: "success",
  //       content: "ลบข้อมูลสำเร็จ",
  //     });
  //     getUsers();
  //   } else {
  //     setOpen(false);
  //     messageApi.open({
  //       type: "error",
  //       content: "เกิดข้อผิดพลาด !",
  //     });
  //   }
  //   setConfirmLoading(false);
  // };

  // const handleCancel = () => {
  //   setOpen(false);
  // };


  // // Model
  // interface OrderDataType {
  
    // FoodID: number;
    // UserID: number;
    // StateID: number;
     
  
   
  // }
  
  // 
  // // const [confirmLoading, setConfirmLoading] = useState(false);
  // 
  // // const [createIdFood, setcreateIdFood] = useState<number>();
  // // const [createIdUser, setcreateIdUser] = useState<number>();
  // // const [IdUser,setIdUser] = useState();
  // 
  // // const[IdState,setIdState] = useState(1);



 
  // const OrderData : OrderDataType ={
  //   FoodID: 1,
  //   UserID: 1,
    
  //   };
  // const handleOk = async () => {
  //   setConfirmLoading(true);
  //   let res = await CreateOrder(OrderData);
  //   if (res) {
  //     setOpen(false);
  //     messageApi.open({
  //       type: "success",
  //       content: "สั่งซื้อสำเร็จ",
  //     });
  //   } else {
  //     setOpen(false);
  //     messageApi.open({
  //       type: "error",
  //       content: "เกิดข้อผิดพลาด !",
  //     });
  //   }
  //   setConfirmLoading(false);
  // };

  // const handleCancel = () => {
  //   setOpen(false);
  // };
  

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
const App: React.FC = () => {
  const orderContext = useOrderData(); // Get the context value
  const { storeOrderData } = orderContext as { storeOrderData: (data: TypeData) => void };

  const { customer } = useCustomer();
  const columns: ColumnsType<FoodInterface> = [

    {
    
    title: "ลำดับ",
    
    dataIndex: "ID",
    
    key: "id",
    
    },
    
    {
    
    title: "ชื่อ",
    
    dataIndex: "FoodName",
    
    key: "food_name",
    
    },
    
    {
    
    title: "ราคา",
    
    dataIndex: "FoodPrice",
    
    key: "food_price",
    
    },
    
    {
    
    title: "รายละเอียด",
    
    dataIndex: "Description",
    
    key: "description",
    
    },
  
    {
    
      title: "รูป",
      
      dataIndex: "Profile",
      
      key: "profile",
      render: (text, record, index) => (
        <img src={record.Profile} className="w3-left w3-circle w3-margin-right" width="50%" />
      )
      
      },{
        title: "สั่งซื้อ",
        dataIndex: "Manage",
        key: "manage",
        render: (text, record, index) => (
          <>
            <Button
              onClick={() => showModal(record)}
              style={{ marginLeft: 10 }}
              shape="circle"
              icon = {<ShoppingCartOutlined/>}
              size={"large"}
              danger
            />
          </>
        ),
      },
    
    ];
  const navigate = useNavigate();
  const [Foods, setFoods] = useState<FoodInterface[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const [open, setOpen] = useState(false);
  const [IdFood,setIdFood] =  useState<number>();
  const [modalText, setModalText] = useState<String>();
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [IdCustomer,setIdUser] = useState<number>(1);
  const[IdState,setIdState] = useState<number>(1);
  interface TypeData{
    FoodID?: number ;
    CustomerID?: number;
    StateID?: number;
  }
  const OrderData: TypeData ={
    FoodID: IdFood,
    CustomerID: customer ? customer.ID : 0,
    StateID: IdState
  }
  const showModal = (val: FoodInterface) => {
    setModalText(
      `คุณต้องการสั่งซื้อ "${val.FoodName}" หรือไม่ ?`
      
    );
    setIdFood(val.ID);
    setOpen(true);
    
  };
  const handleOk = async () => {
    setConfirmLoading(true);
    let res = await CreateOrder(OrderData); // Check this API call
    if (res) {
      setOpen(false);
      messageApi.open({
        type: "success",
        content: "สั่งซื้อสำเร็จ",
      });
      // Store OrderData in the context
      storeOrderData(OrderData);

      console.log('Updated OrderData:', OrderData);
      getFoods();
      navigate("/payment")
      
    } else {
      setOpen(false);
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาด !",
      });
    }
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    getFoods();
  }, []);



const getFoods = async () => {

let res = await GetFoods();

if (res) {

setFoods(res);

}

};


useEffect(() => {

  getFoods();

}, []);
  // const navigate = useNavigate();
  
  // setTimeout(function () {

  // navigate("/");

  // }, 2000);

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
            <Form  autoComplete="off">
              <div style={{ marginTop: 20 }}>
                  <Table rowKey="ID" columns={columns} dataSource={Foods} />
              </div>
              <Modal
       title="สั่งซื้ออาหาร"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
       </Modal> 
            </Form>
          </div>
        </Content>
      </Layout>
    </Space>
    </>
  );
};


export default App;