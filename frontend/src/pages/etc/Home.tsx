import React from 'react'
import styles from './Home.module.css'
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className={styles.bgHome}>home
      <div className={styles.Buton}>
        <Link to='/'><button>router</button></Link>
        <Link to='/payment' ><button>payment</button></Link>
        <Link to='/register' ><button>register</button></Link>
        <Link to='/login' ><button>login</button></Link>
        <Link to='/home' ><button>home</button></Link>
        <Link to='/food/add' ><button>AddFood</button></Link>
        <Link to='/rider/register' ><button>RiderRegister</button></Link>
        <Link to='/rider' ><button>RiderSuccess</button></Link>
        <Link to='/order' ><button>Order</button></Link>
        <Link to='/orders'  ><button>Orderboard</button></Link>
       
      </div>  

    </div>  
    
  )
}

export default Home