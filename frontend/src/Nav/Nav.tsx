import React from 'react'
import styles from './Nav.module.css'
import { Link } from "react-router-dom";
import { useState } from 'react'


function Nav() {
    // const [ fix,setFix ] = useState(false)
    // function setFixed(){
    //   if (window.scrollY >= 392) {
    //     setFix(true)
    //   }else{
    //     setFix(false)
    //   }
    // }
    // window.addEventListener("scroll",setFixed)
  return (
    <nav id='navbar'>
        <div >
          <Link to='/' id={styles.burger} >
            <img  src="/NavImage/burger.png" alt="" />
          </Link>
        </div>
      
        <div id={styles.walletNprofile}>
            <div id={styles.wallet}>
                <Link to='/' id={styles.wallbox} >
                    <h1 id={styles.box} >$1000</h1>
                    <img src="/NavImage/walletIcon.png" id={styles.box} />
                </Link>
            </div >
            <div id={styles.profile}>
                <a href='#' >Jenny Wilson</a>
                <img src="/NavImage/Vector.png" />
            </div>
        </div>
    </nav>
  )
}

export default Nav