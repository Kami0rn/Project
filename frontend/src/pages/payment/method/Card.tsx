import React from 'react'
import Detail from '../detail/Detail'
import styles from './Card.module.css'

function Card() {
  return (
    <>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@500&family=PT+Sans&display=swap');
        </style>
        <div className={styles.bgn}>
            <section id={styles.bg}>
                <div id={styles.pMethod}>
                    <h1>
                    Daebit / Credit Card
                    </h1>
                    <hr />
                    <div className={styles.fill}>
	                    <div className={styles.fisrCol}>
        	              <h4>First Name</h4>
                        <input type="text" placeholder='ชื่อ'/>
                        <h4>Last Name</h4>
                        <input type="text" placeholder='นามสกุล'/>
                        <h4>Card Number</h4>
                        <input type="number" placeholder='หมายเลขบัตร'/>
	                    </div>
	                    <div className={styles.lastCol}>
                        <h4>Zip Code</h4>
                        <input type="number" placeholder='รหัสไปรษณีย์'/>
                        <h4>Expiration Date</h4>
                        <input type="date" placeholder='วันหมดอายุ'/>
                        <input type="submit" />
                      
                        
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

export default Card