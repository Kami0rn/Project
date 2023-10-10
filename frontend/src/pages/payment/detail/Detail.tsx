import React from 'react' ;
import Styler from './Detail.module.css'; // Check the path and capitalization


function Detail() {
  return (

    <>
        <div id={Styler.address}>
            <h1>
                Name-Address
            </h1>
            <hr />

        </div>
        <div id={Styler.bill}>
            <h1>
                Billing
            </h1>
            <hr />



        </div>
    </>
  )
}

export default Detail