import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define a type for the data you want to store in the context
type OrderData = {
  // Define the properties of your order data here
};

const OrderContext = createContext<OrderData | null>(null);

export const useOrderData = () => {
  const context = useContext(OrderContext);
  if (context === null) {
    throw new Error('useOrderData must be used within an OrderDataProvider');
  }
  return context;
};

type OrderDataProviderProps = {
  children: ReactNode;
};

export const OrderDataProvider: React.FC<OrderDataProviderProps> = ({ children }) => {
  const [orderData, setOrderData] = useState<OrderData | null>(null);

  const storeOrderData = (data: OrderData) => {
    setOrderData(data);
  };

  return (
    <OrderContext.Provider value={{ orderData, storeOrderData }}>
      {children}
    </OrderContext.Provider>
  );
};
