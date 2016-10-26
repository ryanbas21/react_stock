import React, { Component } from 'react';
import {render} from 'react-dom';
import Stock from './Stock';
import $ from 'jquery';
import StockBarContainer from './StockBarContainer.jsx';

class Ticker extends Component {
  constructor (props) {
    super(props)
    this.buyStock = this.buyStock.bind(this);
    this.state = {
      stocks: [],
      money: 50000
    }
  }

  buyStock (e) {
    e.preventDefault();
    const stock = document.getElementById('stockName').value;
    document.getElementById('stockName').value = "";
    console.log(stock);
    $.ajax({
      url: '/stock/' + stock.toUpperCase(),
      data: JSON.stringify({stock}),
      // errror : (err) =>
      success: (data) =>{
        console.log(data);
        //copy out this.state.stocks
        const newArr = this.state.stocks.slice(0);
        //push new object to copied aray
        newArr.push({
          'BuySymbol' : data.t,
          'BuyPrice' : data.l_cur,
          'BuyTime' : data.lt
          });
          console.log(this);
        this.setState( {stocks: newArr})
      },
      error : (error) => {
        console.log(error);
      }
    });
  }

  render () {
    return (
      <div>
      <form onSubmit={this.buyStock}>
        <input type="text" id="stockName" placeholder="Enter Symbol"/>
      </form>
      <table>
          <th>Symbol</th><th>Price</th><th>Time</th>
          <tr><StockBarContainer stocks={this.state.stocks}/></tr>
      </table>
      </div>
    )
  }
}
module.exports = Ticker;
