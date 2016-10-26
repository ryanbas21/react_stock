import react from 'react';
import ReactDOM from 'react-dom';
import Ticker from './Ticker.jsx';

const Stock = (props) => {
    return (
        <form onSubmit={props.buy}>
        <lablel>Buy Stock</lablel><input type="text" id="stockName" placeholder="Enter Symbol"/>
    </form>
);

}
module.exports = Stock;
