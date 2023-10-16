import React, { useState, useEffect } from "react";
import { Space, Table, Button, Col, Row, Divider, Modal, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import { GetFoods, DeleteFoodByID } from "../../../src/services/http/food/food";
import { FoodInterface } from "../../interfaces/Ifood";
import { Link, useNavigate } from "react-router-dom";

import './FoodManage.css';

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
    
    
  /* The commented code block is defining two columns in the table for displaying the first name and
  last name of each user. However, these columns are currently commented out and not being used in
  the table. */
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
          <Button  onClick={() =>  navigate(`/customer/edit/${record.ID}`)} shape="circle" icon={<EditOutlined />} size={"large"} />
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

    const [users, setUsers] = useState<FoodInterface[]>([]);

  const [messageApi, contextHolder] = message.useMessage();

  // Model
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState<String>();
  const [deleteId, setDeleteId] = useState<Number>();

  const getFoods = async () => {
    let res = await GetFoods();
    if (res) {
      setUsers(res);
    }
  };

  const showModal = (val: FoodInterface) => {
    setModalText(
      `คุณต้องการลบข้อมูลผู้ใช้ "${val.Name} ${val.Price}" หรือไม่ ?`
    );
    setDeleteId(val.ID);
    setOpen(true);
  };
  const foodNames = users.map(user => user.Name).join(", ");
  const foodWithID1 = users.find(user => user.ID === 1);


  const handleOk = async () => {
    setConfirmLoading(true);
    try {
      let res = await DeleteFoodByID(deleteId);
      if (res.status === 204) {
        // The 204 status indicates success; no content is expected.
        setOpen(false);
        messageApi.open({
          type: "success",
          content: "ลบข้อมูลสำเร็จ",
        });
        getFoods();
      } else {
        setOpen(false);
        messageApi.open({
          type: "error",
          content: "เกิดข้อผิดพลาด !",
        });
      }
    } catch (error) {
      console.error("Error deleting food:", error);
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาดในการลบข้อมูล",
      });
    } finally {
      setConfirmLoading(false);
    }
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
        {foodWithID1 ? (
        <div>
            <h1>{foodWithID1.Name}</h1>
            {/* Render additional details for the user here */}
        </div>
        ) : (
        <p>Food with ID 1 not found</p>
        )}
      <Table rowKey="Profile" columns={columns} dataSource={users} />
    </div>
        {/* <Table rowKey="ID" columns={columns} dataSource={users} /> */}
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
