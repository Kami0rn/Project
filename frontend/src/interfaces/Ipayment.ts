export interface PaymentInterface {
    ID: number;
    IsPaid: boolean; //Default: false
    Method: string; //Select: Cash, CreditCard, DebitCard, PayPal, Other
    CustomerID: number; //PreLoad
    
}