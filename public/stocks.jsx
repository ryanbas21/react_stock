import React from 'react';


const Stocks = props =>
  <div className='stock'>
      {console.log('rendering stock', props)}
      <div> {props.item.symbol}</div>
      <div>{props.item.value}</div>
      <div>{props.item.shares}</div>
  </div>

  export default Stocks;
