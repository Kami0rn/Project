import { FoodInterface } from "./Ifood";
import { StateInterface } from "./Istate";
import { CustomerInterface } from "./Icustomer";

export interface OrderInterface {
   
    ID?: number;   
    StateID?: number;
    State?: StateInterface;
    CustomerID?: number;
    Customer?: CustomerInterface;
    FoodID?: number;
    Food?: FoodInterface;
    StateName?: string; // Make sure the property name matches the API response

}