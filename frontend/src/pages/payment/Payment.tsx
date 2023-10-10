import React, { useState } from 'react';
import styles from './Payment.module.css';
import bank from '../../assets/payment/bank.png';
import debit from '../../assets/payment/debit.png';
import pod from '../../assets/payment/pod.png';
import walletIcon from '../../assets/payment/walletIcon.png';

function Payment() {
  // Initialize selectedPaymentMethod state with a default value of null
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);

  // Function to handle payment method selection
  const handlePaymentMethodClick = (method: string) => {
    if (selectedPaymentMethod === method) {
      // If the same method is clicked again, deselect it by setting selectedPaymentMethod to null
      setSelectedPaymentMethod(null);
    } else {
      // Set the selected payment method
      setSelectedPaymentMethod(method);
    }
  };

  // Check if a payment method is selected
  const isPaymentSelected = selectedPaymentMethod !== null;

  return (
    <>
    
      {/* ... (your other JSX) */}
      <div id={styles.gbtn}>
        <div id={styles.topbtn}>
          {/* Credit / Debit Card button */}
          <button
            className={`${styles.btn} ${selectedPaymentMethod === 'bank' ? styles.selected : ''}`}
            id={styles.bank}
            onClick={() => handlePaymentMethodClick('bank')}
          >
            Credit / Debit Card
            <img src={bank} alt="" />
          </button>
          {/* Banktransfer button */}
          <button
            className={`${styles.btn} ${selectedPaymentMethod === 'debit' ? styles.selected : ''}`}
            id={styles.debit}
            onClick={() => handlePaymentMethodClick('debit')}
          >
            Banktransfer
            <img src={debit} alt="" />
          </button>
          {/* Pay at delivery button */}
          <button
            className={`${styles.btn} ${selectedPaymentMethod === 'pod' ? styles.selected : ''}`}
            id={styles.pod}
            onClick={() => handlePaymentMethodClick('pod')}
          >
            Pay at delivery
            <img src={pod} alt="" />
          </button>
          <div></div>
        </div>
        {/* ... (rest of your JSX) */}
      </div>
      <div id={styles.pbtn}>
        {/* Pay button (disabled if no payment method is selected) */}
        <button
          id={styles.paybtn}
          disabled={!isPaymentSelected}
          onClick={() => {
            if (isPaymentSelected) {
              // Proceed to the next step (add your logic here)
              console.log('Payment method selected:', selectedPaymentMethod);
            }
          }}
        >
          Pay
        </button>
      </div>
      {/* ... (rest of your JSX) */}
    </>
  );
}

export default Payment;
