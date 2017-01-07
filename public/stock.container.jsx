import React from 'react'
import Stocks from './stocks'

const StockContainer = props =>
        <div className='stock'>
         {Object.keys(props.stocks).map( i => <Stocks item={props.stocks[i]} key={i} className='stock'/> )}
        </div>

export default StockContainer;
