  import React, { useState } from 'react';
  import styles from './Payment.module.css';
  import bank from '../../assets/payment/bank.png';
  import debit from '../../assets/payment/debit.png';
  import pod from '../../assets/payment/pod.png';
  import walletIcon from '../../assets/payment/walletIcon.png';
  import Detail from './detail/Detail';
 import { Router,Link } from 'react-router-dom';

  



  function Payment() {
   
  

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
                  
      
                      {/* ... (your other JSX) */}
                      <div id={styles.gbtn}>
                        <div id={styles.topbtn}>
                          {/* Credit / Debit Card button */}
                          <Link to='/payment/bank' ><button
                            className={styles.btn} id={styles.bank}>
                            BankTranfer
                            <img src={bank} alt="" />
                          </button></Link>



                          
                          {/* Banktransfer button */}
                          <Link to='/payment/card' ><button
                            className={styles.btn} id={styles.debit}
                          >
                            Credit / Debit Card
                            <img src={debit} alt="" />
                          </button></Link>
                          {/* Pay at delivery button */}
                          <Link to='/payment/pad' ><button
                            className={styles.btn} id={styles.pod}
                          >
                            Pay at delivery
                            <img src={pod} alt="" />
                          </button></Link>
                          <div></div>
                        </div>
                        {/* ... (rest of your JSX) */}
                      </div>
                      <div id={styles.lowbtn}>
                        {/* Soywallet button */}
                        <Link to='/payment/wallet' ><button  className={styles.btn} id={styles.soywallet}
                       >
                          <img src={walletIcon} alt="" />
                          <div id={styles.soywallettxt}>
                            <h3>Soywallet</h3>
                            <p>Balance: ฿0.00</p>
                          </div>
                        </button></Link>


                      </div>


                      <div id={styles.pbtn}>
                        {/* Pay button (disabled if no payment method is selected) */}


                        {/* <button
  className={styles.btn} id={styles.paybtn}
>
  Pay
</button> */}
                      </div>
                      </div>
                    <div id={styles.detail}>
                      <Detail />
                      
                    </div>
            <footer>

            </footer>
          </section>
          </div>
        {/* ... (rest of your JSX) */}
      </>
    );
  }

  export default Payment;
