import React,{useEffect} from 'react' ;
import Styler from './Detail.module.css'; // Check the path and capitalization
import { GetCustomerById, GetCustomers } from "../../../services/http/index";
import { CustomerInterface } from "../../../interfaces/Icustomer";
import { PaymentInterface } from "../../../interfaces/Ipayment";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";


function Detail() {
    const columns: ColumnsType<CustomerInterface> = [
        {
          title: "ลำดับ",
          dataIndex: "ID",
          key: "id",
        },
        {
          title: "ชื่อ",
          dataIndex: "FirstName",
          key: "firstname",
        },
        {
          title: "นามสกุุล",
          dataIndex: "LastName",
          key: "lastname",
        },
        {
          title: "ชื่อสมาชิก",
          dataIndex: "UserName",
          key: "gender",
        },
        {
            title: "รหัสผ่าน",
            dataIndex: "Password",
            key: "password",
        },
        {
            title: "ที่อยู่",
            dataIndex: "Address",
            key: "address",
        },
        {
          title: "อีเมล",
          dataIndex: "Email",
          key: "email",
        },
        {
          title: "เบอร์โทร",
          dataIndex: "Phone",
          key: "phone",
        },
        {
            title: "เพศ",
            dataIndex: "Gender" ,
            key : "gender"
        }
        
      ];
      const [customers, setCustomers] = useState<CustomerInterface[]>([]);
      const [open, setOpen] = useState(false);
      const [confirmLoading, setConfirmLoading] = useState(false);
      const getCustomer = async () => {
        let res = await GetCustomers();
        if (res) {
            setCustomers(res);
        }
      };
const firstNames = customers.map(user => user.FirstName).join(", ");
const address = customers.map(user => user.Address).join(", ");
const lastname = customers.map(user => user.LastName).join(", ");

const userWithID1 = customers.find(user => user.ID === 1);
useEffect(() => {
    getCustomer();
  }, []);


  return (


    <>
        <div id={Styler.address}>
            <h1>
                Name-Address
               
       <h4>{firstNames}  {lastname}</h4>
       <h5>{address}</h5>
            </h1>
            <hr />

        </div>
        <div id={Styler.bill}>
            <h1>
                Billing
            </h1>
            <hr />



        </div>
    </>
  )
}

export default Detail