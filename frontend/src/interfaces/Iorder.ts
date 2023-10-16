import { CustomerInterface } from "./Icustomer";
import { PaymentInterface } from "./Ipayment";

export interface OrderInterface {
  ID?: number;
  Image: string;

  TotalPrice?: number;

  Customer?: number;
  CustomerID?: CustomerInterface;

  Payment? : number;
  PaymentID?: PaymentInterface;



}
