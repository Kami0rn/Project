import { FoodInterface } from "./Ifood";
import { StateInterface } from "./Istate";
import { CustomerInterface } from "./Icustomer";

export interface OrderInterface {
   
    ID?: number;   
    StateID?: number;
    State?: StateInterface;
    UserID?: number;
    User?: CustomerInterface;
    FoodID?: number;
    Food?: FoodInterface;
}