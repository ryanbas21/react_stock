import React, {Component} from 'react';
import {render} from 'react-dom';
import axios from 'axios'
import StockContainer from './stock.container'
class Ticker extends Component {
    constructor(props) {
        super(props)
        this.state = {
            symbols: {},
            money: 50000,
            error: true
        }
        this.purchase = this.purchase.bind(this);
    }

    purchase() {
        axios
        .get('/stock/' + this.stock.value).then( (response) =>  {
            const newState = Object.assign({}, this.state)
            if (newState.symbols[this.stock.value] !== undefined) {
                newState.symbols[this.stock.value].shares += +this.shares.value;
                newState.symbols[this.stock.value].value += +this.shares.value * response.data.l_cur
            }
            else {
                newState.symbols[this.stock.value] = {
                    symbol: this.stock.value,
                    shares: +this.shares.value
                };
                newState.symbols[this.stock.value].value = +this.shares.value * +response.data.l_cur
            }
            newState.money -= +this.shares.value * +response.data.l_cur;
            this.shares.value = '';
            this.stock.value = '';
            this.setState(newState);
        })
        .catch( err => err )
    }


    render() {
        return (
    <div>
        <form type='submit' method='get' onSubmit={(e) => e.preventDefault()}>
            <label> Search Stock </label> <input ref= { input => this.stock = input } type='text' />
            <label> Buy Shares </label> <input ref = { input => this.shares = input } type='text' />
            <button type='submit' onClick={this.purchase}>Buy</button>
        </form>
        <StockContainer stocks={this.state.symbols} className='stock-container'/>
    </div>
    )
    }
}
module.exports = Ticker;
