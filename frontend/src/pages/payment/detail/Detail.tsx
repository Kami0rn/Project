import React, { useEffect, useState } from 'react';
import Styler from './Detail.module.css';
import { GetCustomers } from "../../../services/http/customer/customer";
import { CustomerInterface } from "../../../interfaces/Icustomer";
import type { ColumnsType } from "antd/es/table";
import { useCustomer } from '../../context/context';
import { GetOrdersByCustomerID , GetFoodByFoodID } from '../../../services/http/order/order';
import { OrderInterface } from '../../../interfaces/Iorder'; // Adjust the import path

function Detail() {
  const { customer } = useCustomer();
  const [orders, setOrders] = useState<OrderInterface[]>([]);

  // Function to fetch orders based on customerID
  const fetchOrders = async (customerID : any) => {
    try {
      const orders = await GetOrdersByCustomerID(customerID);
      setOrders(orders);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]);
    }
  }
  useEffect(() => {
    if (customer && customer.ID !== undefined) {
      const customerID = customer.ID;
      fetchOrders(customerID); // Fetch orders when the customer is available
    }
  }, [customer]);

  async function GetFoodNameByFoodID(foodID : any) {
    try {
      const food = await GetFoodByFoodID(foodID);
      return food ? food.FoodName : 'N/A';
    } catch (error) {
      console.error('Error fetching food details:', error);
      return 'N/A';
    }
  }
  

  return (
    <>
      <div id={Styler.address}>
  <h1>Name-Address</h1>
  {customer && (
    <>
      <h4>{customer.FirstName || 'Guest'} {customer.LastName || ''}</h4>
      <h5>{customer.Address || ''}</h5>
    </>
  )}
  <hr />
</div>
{/* <div id={Styler.bill}>
  <h1>Billing</h1>
  <hr />
</div> */}
<div id={Styler.orders}>
  <h1>Orders</h1>
  <ul>
    {customer &&
      orders
        .filter((order) => order.CustomerID === customer.ID)
        .map((order) => (
          <li key={order.ID}>
            {/* <p>Order ID: {order.ID}</p> */}
            <p>State: {order.State ? order.State.StateName : 'N/A'}</p>
            <p>Food ID: {order.FoodID}</p>
            <p>Customer ID: {order.CustomerID}</p>
            <hr />
          </li>
        ))}
  </ul>
</div>

    </>
  );
}

export default Detail;
