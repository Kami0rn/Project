import React, { useState } from 'react';

import  styles  from './Payment.module.css'
import bank from '../../assets/payment/bank.png';
import debit from '../../assets/payment/debit.png';
import pod from '../../assets/payment/pod.png';
import walletIcon from '../../assets/payment/walletIcon.png';



function Payment() {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const handlePaymentMethodClick = (method : any) => {
    setSelectedPaymentMethod(method);
  };
  return (
    <>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@500&family=PT+Sans&display=swap');
      </style>
    

    <div className={styles.bgn}>
        
        <section id={styles.bg}>
          <div id={styles.pMethod}>
            <h1>
              Select payment method
            </h1>
            <hr />
            <div id={styles.gbtn}>
              <div id={styles.topbtn}>
              <button
                  className={`${styles.btn} ${selectedPaymentMethod === 'bank' ? styles.selected : ''}`}
                  id={styles.bank}
                  onClick={() => handlePaymentMethodClick('bank')}
                >
                  Credit / Debit Card
                  <img src={bank} alt="" />
                </button>
                <button
                  className={`${styles.btn} ${selectedPaymentMethod === 'debit' ? styles.selected : ''}`}
                  id={styles.debit}
                  onClick={() => handlePaymentMethodClick('debit')}
                >
                  Banktranfer
                  <img src={debit} alt="" />
                </button>
                <button
                  className={`${styles.btn} ${selectedPaymentMethod === 'pod' ? styles.selected : ''}`}
                  id={styles.pod}
                  onClick={() => handlePaymentMethodClick('pod')}
                >
                  Pay at delivery
                  <img src={pod} alt="" />
                </button>
                  <div>
                    
                  </div>
              </div>
                <div id={styles.lowbtn}>
                  <button  id={styles.soywallet}>
                  <div id={styles.banner}>SoyJu Wallets</div>
                  <div id={styles.w}>
                    <img src={walletIcon} alt="" />
                    <div>$948.55</div>
                  </div>
                  </button>
                </div>
                <div id={styles.pbtn}>
                  <button id={styles.paybtn}>
                    Pay
                  </button>
                </div>
            </div>
            
            </div>
          <div id={styles.detail}>
            <div id={styles.address}>
              <h1>
                Name-Address
              </h1>
              <hr />
              <h4>
              Jenny Wilson 
              </h4>
              <h4>
              3517 W. Gray St. Utica, Pennsylvania 57867
              </h4>
              
            </div>
            <div id={styles.bill}>
              <h1>
                Billing
              </h1>
              <hr />
              {/* <ul>
                {items.map((item, index) => (
                  <li key={index}>{item}</li>
                    ))} 
              </ul> */}
              <ul>
                <li>1 x Menu 1</li>
                <li>1 x Menu 3</li>
                <li>3 x Drink 1</li>
                <li>1 x Drink 1</li>
              </ul>
              <h2>
                Totals : $14.81
              </h2>
              
              

            </div>

          </div>
          <footer>

          </footer>
        </section>
        
    </div>
    
    
    </>
  )
}

export default Payment