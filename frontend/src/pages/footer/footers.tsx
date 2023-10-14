import React from 'react'
import styles from './footer.module.css'
function footers() {
  return (
    <div className={styles.footerBG}>
      <div className={styles.firstCol}>
        <h2>ContactUs</h2>
      </div>
      <div className={styles.fsecondCol}>
        <h2>Address</h2>
        <p>123/456 หมู่บ้านเกษตรกร</p>
        <p>ต.บ้านเกาะ อ.เมือง</p>
        <p>จ.เชียงใหม่ 50000</p>
        
        
      </div>

    </div>
  )
}

export default footers