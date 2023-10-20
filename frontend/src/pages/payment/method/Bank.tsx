import React, { useState } from 'react';
import Detail from '../detail/Detail';
import styles from './Bank.module.css';

function Bank() {
  // Use state to manage form data
  const [bankName, setBankName] = useState('');
  const [bankAccount, setBankAccount] = useState('');
  const [bankHolderName, setBankHolderName] = useState('');

  // Function to handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault();
  
    // Create a data object with the form fields
    const data = {
      bankName,
      accountNumber: bankAccount, // Use accountNumber instead of bankAccount
      accountHolder: bankHolderName, // Use accountHolder instead of bankHolderName
    };
  
    // Send a POST request to your backend
    const response = await fetch('http://localhost:8081/banks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    // Check the response and handle it accordingly
    if (response.ok) {
      // Data was successfully stored in the backend
      console.log('Bank transfer data was successfully stored.');
    } else {
      // Handle errors
      console.error('Failed to store bank transfer data.');
    }
  };

  return (
    <>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@500&family=PT+Sans&display=swap');
      </style>
      <div className={styles.bgn}>
        <section id={styles.bg}>
          <div id={styles.pMethod}>
            <h1>Bank Transfer</h1>
            <hr />
            <div className={styles.fill}>
              <form onSubmit={handleSubmit}>
                <div className={styles.fisrCol}>
                  <h4>Bank Name</h4>
                  <input
                    type="text"
                    placeholder="ชื่อธนาคาร"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                  />
                  <h4>Bank Account</h4>
                  <input
                    type="text"
                    placeholder="เลขบัญชี"
                    value={bankAccount}
                    onChange={(e) => setBankAccount(e.target.value)}
                  />
                  <h4>Bank Holder Name</h4>
                  <input
                    type="text"
                    placeholder="ชื่อ"
                    value={bankHolderName}
                    onChange={(e) => setBankHolderName(e.target.value)}
                  />
                </div>
                <div className={styles.lastCol}>
                  <h4>Transaction</h4>
                  <input type="image" />
                  <input type="submit" />
                </div>
              </form>
            </div>
          </div>
          <div id={styles.detail}>
            <Detail />
          </div>
        </section>
      </div>
    </>
  );
}

export default Bank;
