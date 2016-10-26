import React from 'react';
import ReactDOM from 'react-dom';
import StockBar from './StockBar.jsx';


const StockBarContainer = props =>
  <tr>
    {props.stocks.map( (items,i) => Object.keys(items).map(item =>
      <StockBar key={Math.random() * 100000} stocks={items[item]}/>
    ))}
  </tr>

export default StockBarContainer;
