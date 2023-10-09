import React from 'react'
import styles from './Home.module.css'
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className={styles.bgHome}>home
      <div className={styles.Buton}>
        <Link to='/'><button>home</button></Link>
        <Link to='/payment' ><button>payment</button></Link>
        
      </div>  

    </div>  
    
  )
}

export default Home