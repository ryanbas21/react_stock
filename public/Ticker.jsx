import React, {Component} from 'react';
import {render} from 'react-dom';
import Stock from './Stock';
import $ from 'jquery';
import StockBarContainer from './StockBarContainer.jsx';
import Error from './Error';


class Ticker extends Component {
    constructor(props) {
        super(props)
        this.buyStock = this.buyStock.bind(this);
        this.state = {
            symbols: {},
            stocks: [],
            money: 50000,
            shares: 0,
            error: true
        }
    }
    getCall(){

    }
    //run on form submit
    buyStock(e) {
        e.preventDefault();
        //get values of form fields
        const stock = document.getElementById('stockName').value;
        document.getElementById('stockName').value = "";
        const shares = parseInt(document.getElementById('shares').value);
        document.getElementById('shares').value = "";


        //make ajax call
        $.ajax({
            url: '/stock/' + stock.toUpperCase(),
            data: JSON.stringify({stock}),
            success: (data) => {
                //don't mutate state
                const newArr = this.state.stocks.slice(0);
                const symObject = Object.assign({},this.state.symbols);
                console.log(symObject);
                //store data from AJAX
                const stockData = {
                    'BuySymbol': data.t,
                    'BuyShares': shares,
                    'BuyPrice': data.l_cur,
                    'TotalPrice': shares * data.l_cur,
                    'BuyTime': data.lt
                };
                newArr.push(stockData);
                console.log(newArr);

                //storing symbols/checking if it exists
                let sym = data.t;
                if (symObject[sym]) {
                //find symbol in current object and add shares to it.
                Object.keys(symObject).forEach( (item) => {
                    console.log(this.state.stocks);
                        for (let i = 0; i < newArr.length; i += 1) {
                            if (newArr[i]['BuySymbol'] === sym){
                                stockData['BuySymbol'] = data.t,
                                stockData['BuyShares'] = parseInt(newArr[i]['BuyShares']) + stockData['BuyShares'];
                                stockData['BuyPrice'] = Math.floor((parseInt(newArr[i]['BuyPrice']) + parseInt(stockData['BuyPrice']))/2);
                                stockData['TotalPrice'] = parseInt(stockData['BuyPrice']) + parseInt(newArr[i]['BuyPrice']);
                                stockData['BuyTime'] = data.lt;
                                break;
                            }
                        }
                        newArr.pop();
                        newArr.pop();
                        newArr.push(stockData);

                });
            }
            if (!symObject[sym]) symObject[sym] = sym
                console.log(stockData,'first');
                //update money
                const money = parseInt(this.state.money) - stockData.TotalPrice;


                //check for error or set new state
                (money < 0) ?
                this.setState({error : false}) :
                this.setState({symbols: symObject, stocks: newArr, money: money, shares: stockData['BuyShares'], error: true})
            },

            //fix error clause
            error: (error) => {
                console.log(error);
            }
        });
    }

    render() {
        return (
            <div>
                <h2>Current Money {this.state.money}</h2>
                {this.state.error === true}
                <Error error={this.state.error}/>
                <form onSubmit={this.buyStock}>
                    <input type="text" id="stockName" placeholder="Enter Symbol" name='stockName' />
                    <input type="number" id="shares" placeholder="enter number of shares" name='shares' />
                    <input type="submit" value="submit" />
                </form>
                <table>
                    <StockBarContainer stocks={this.state.stocks}/>
                </table>
            </div>
        )
    }
}
module.exports = Ticker;
