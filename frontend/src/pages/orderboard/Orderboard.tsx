import { useState, useEffect } from "react";
import { OrderInterface } from "../../interfaces/Iorder";
import { DeleteOrderByID, GetOrders, GetOrdersDetail, UpdateOrder } from "../../services/http/order/order";
import { message, Col, Divider, Modal, Row, Button } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import { CheckOutlined, EllipsisOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { GetCustomerById } from "../../services/http/customer/customer"; // Import the function
import { GetFoodById } from "../../services/http/food/food";

function Orders() {
  const columns: ColumnsType<OrderInterface> = [
    {
      title: "ลำดับ",
      dataIndex: "ID",
      key: "id",
    },
    {
      title: "ผู้สั่งซื้อ",
      dataIndex: "CustomerUsername",
      key: "stateid",
    },
    // {
    //   title: "ที่อยู่จัดส่ง",
    //   dataIndex: "Address",
    //   key: "address",
    // },
    {
      title: "อาหาร",
      dataIndex: "FoodName",
      key: "foodname",
    },
    {
      title: "ราคา",
      dataIndex: "FoodPrice", // Access FoodPrice through the Food property
      key: "foodprice",
    },
    {
      title: "สถานะ",
      dataIndex: ["State", "StateName"],
      key: "stateid",
    },
    
    {
      title: "จัดการ",
      dataIndex: "Manage",
      key: "manage",
      render: (text, record, index) => (
        <>
          <Button
            onClick={() => showModal(record)}
            style={{ marginLeft: 10 }}
            shape="circle"
            icon={<CheckOutlined />}
            size="large"
          />
        </>
      ),
    },
  ];

  

  const navigate = useNavigate();

  const [orders, setOrders] = useState<OrderInterface[]>([]);

  const [order, setOrder] = useState<number>();

  const [messageApi, contextHolder] = message.useMessage();

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState<String>();
  const [state, setState] = useState<number>(2);
  const [CustomerID, setCustomerID] = useState<number>();
  const [FoodId, setFoodId] = useState<number>();
  
  interface TypeData {
    ID?: number;
    CustomerID?: number;
    FoodID?: number;
    StateID?: number;
  }

  const OrderData: TypeData = {
    ID: order,
    CustomerID: CustomerID,
    FoodID: FoodId,
    StateID: state

  }

  const getOrders = async () => {
    try {
      let res = await GetOrders();
  
      if (res) {
        const ordersWithStateName = await Promise.all(
          res.map(async (order: OrderInterface) => {
            // Fetch the customer data based on CustomerID
            const customerResponse = await GetCustomerById(order.CustomerID);
            const foodResponse = await GetFoodById(order.FoodID);
  
            console.log('Food Response:', foodResponse);
  
            return {
              ...order,
              StateName: order.StateName,
              CustomerUsername: customerResponse?.UserName,
              FoodName: foodResponse?.FoodName,
              FoodPrice: foodResponse?.FoodPrice,
            };
          })
        );
  
        console.log('Orders:', ordersWithStateName);
  
        setOrders(ordersWithStateName);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  
  

  const showModal = (val: OrderInterface) => {
    setModalText(`ต้องการรับออร์เดอร์ "${val.ID}" หรือไม่`);
    setOrder(val.ID);
    setCustomerID(val.CustomerID);
    setFoodId(val.FoodID);
    setOpen(true);
  };

  

  const handleOk = async () => {
    setConfirmLoading(true);
    let res = await UpdateOrder(OrderData);
    if (res) {
      setOpen(false);
      messageApi.open({
        type: "success",
        content: "รับออร์เดอร์สำเร็จ",
      });
      getOrders();
    } else {
      setOpen(false);
      messageApi.open({
        type: "error",
        content: "เกิดข้อผิดพลาด",
      });
    }
    setConfirmLoading(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <>
      {contextHolder}
      <Row className="body">
        <Col span={12}>
          <h2>SoyJuu's Order</h2>
        </Col>
        <Col span={12} style={{ textAlign: "end", alignSelf: "center" }}></Col>
      </Row>
      <Divider />
      <div style={{ marginTop: 20 }}>
        <Table rowKey="ID" columns={columns} dataSource={orders} />
      </div>
      <Modal
        title="รับออร์เดอร์ ?"
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

export default Orders;
