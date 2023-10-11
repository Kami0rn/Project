import React from 'react'
import Detail from '../detail/Detail'
import styles from './PAD.module.css'

function PAD() {
  return (
    <>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@500&family=PT+Sans&display=swap');
        </style>
        <div className={styles.bgn}>
            <section id={styles.bg}>
                <div id={styles.pMethod}>
                    <h1>
                    Pay At Delivery
                    </h1>
                    <hr />
                  
                    <div className={styles.fill}>
	<div className={styles.fisrCol}>
        	<h4>BankName</h4>
                <input type="text" placeholder='ชื่อธนาคาร'/>
                <h4>BankAcount</h4>
                <input type="text" placeholder='เลขบัญชี'/>
                <h4>BankeHolderName</h4>
                <input type="text" placeholder='ชื่อ'/>
	</div>
	<div className={styles.lastCol}>
                        <h4>Time</h4>
                        <input type="time" placeholder='เวลาที่ทําธุรกรรม'/>
                        <h4>Redeem</h4>
                        <input type="text" placeholder='คูปอง'/>
                        <h4>Transaction</h4>
                        <input type="image">

                        </input>
	</div>
                        
</div>
              



                </div>




                <div id={styles.detail}>
                    <Detail />
                      
                </div>
            </section>
        </div>
    </>
  )
}

export default PAD