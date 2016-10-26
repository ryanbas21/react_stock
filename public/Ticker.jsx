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
      money: 50000,
    }
  }

  buyStock (e) {
    e.preventDefault();
    const stock = document.getElementById('stockName').value;
    document.getElementById('stockName').value = "";
    $.ajax({
      url: '/stock/' + stock.toUpperCase(),
      data: JSON.stringify({stock}),
      success: (data) =>{
        const newArr = this.state.stocks.slice(0);
        newArr.push({
          'BuySymbol' : data.t,
          'BuyPrice' : data.l_cur,
          'BuyTime' : data.lt
          });
          const money = parseInt(this.state.money) - parseInt(data.l_cur);
        this.setState( {stocks: newArr, money : money})
      },
      error : (error) => {
        console.log(error);
      }
    });
  }

  render () {
    return (
      <div>
      <h2>Current Money {this.state.money}</h2>
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
