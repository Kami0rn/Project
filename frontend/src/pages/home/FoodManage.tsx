import React, { useState, useEffect } from "react";
import { Space, Table, Button, Col, Row, Divider, Modal, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { GetFoods } from "../../../src/services/http/food/food";
import { FoodInterface } from "../../interfaces/Ifood";
import { Link, useNavigate } from "react-router-dom";


const apiUrl = "http://localhost:8081";
async function DeleteFoodByID(id: Number | undefined) {
  const requestOptions = {
    method: "DELETE"
  };

  let res = await fetch(`${apiUrl}/foods/${id}`, requestOptions)
  
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
        
      } else {
        return false;
        
      }
    });
  console.log(requestOptions);
  console.log(res);
  return res;
}

async function GetFoodById(id: Number | undefined) {
  const requestOptions = {
    method: "GET"
  };

  let res = await fetch(`${apiUrl}/food/${id}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      if (res.data) {
        return res.data;
      } else {
        return false;
      }
    });

  return res;
}

// import './FoodManage.css';

function Foodmanage() {
  
  const columns: ColumnsType<FoodInterface> = [
    {
      title: "ลำดับ",
      dataIndex: "ID",
      key: "id",
    },
    {
      title: "ชื่ออาหาร",
      dataIndex: "FoodName",
      key: "FoodName",
    },
    {
      title:"รูปอาหาร",
      dataIndex:"Profile",
      key:"profile",
      render: (text,record,index) => (
        <img src={record.Profile} className="w3-left w3-circle w3-margin-right" width="25%"/>
      )
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
      title: "เบอร์โทร",
      dataIndex: "Phone",
      key: "phone",
    },
    {
      title: "จัดการ",
      dataIndex: "Manage",
      key: "manage",
      render: (text, record, index) => (
        <>
          <Button  onClick={() =>  navigate(`/food/edit/${record.ID}`)} shape="circle" icon={<EditOutlined />} size={"large"} />
          <Button
            onClick={() => showModal(record)}
            style={{ marginLeft: 10 }}
            shape="circle"
            icon={<DeleteOutlined />}
            size={"large"}
            danger
          />
        </>
      ),
    },
  ];

  const navigate = useNavigate();

    const [foods, setFoods] = useState<FoodInterface[]>([]);

  const [messageApi, contextHolder] = message.useMessage();

  // Model
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState<String>();
  const [deleteId, setDeleteId] = useState<Number>();

  const getFoods = async () => {
    let res = await GetFoods();
    if (res) {
      setFoods(res);
    }
  };

  const showModal = (val: FoodInterface) => {
    setModalText(
      `คุณต้องการลบข้อมูลรายการชื่อ : "${val.FoodName}" หรือไม่ ?`
    );
    setDeleteId(val.ID);
    setOpen(true);
  };
  const foodNames = foods.map(food => food.FoodName).join(", ");
  const foodWithID1 = foods.find(food => food.ID === 1);


  const handleOk = async () => {
    setConfirmLoading(true);
  
    let res = await DeleteFoodByID(deleteId);
    if (res) {
      setOpen(false);
      messageApi.open({
        type: "success",
        content: "ลบข้อมูลสำเร็จ",
        
      });
      await getFoods(); // Add the 'await' keyword here
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

  return (
    <>
      {contextHolder}
      <Row>
        <Col span={12}>
          <h2>จัดการข้อมูลสมาชิก</h2>
        </Col>
        <Col span={12} style={{ textAlign: "end", alignSelf: "center" }}>
          <Space>
            <Link to="/customer/create">
              <Button type="primary" icon={<PlusOutlined />}>
                สร้างข้อมูล
              </Button>
            </Link>
          </Space>
        </Col>
      </Row>
      <Divider />
      <div style={{ marginTop: 20 }}>
        
        <div>
        {/* {foodWithID1 ? (
        <div>
            <h1>{foodWithID1.Name}</h1>
            Render additional details for the user here
        </div>
        ) : (
        <p>Food with ID 1 not found</p>
        )}
      <Table rowKey="Profile" columns={columns} dataSource={users} /> */}
      <Table rowKey="ID" columns={columns} dataSource={foods} />
    </div>
        
      </div>
      <Modal
        title="ลบข้อมูล ?"
        open={open}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>


      
    </>
  );
}

export default Foodmanage;
