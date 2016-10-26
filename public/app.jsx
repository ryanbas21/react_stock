import React, {Component} from 'react';
import {render} from 'react-dom';
import Ticker from './Ticker.jsx';

class App extends Component {
    render () {
      return (
        <div>
           <Ticker />
        </div>
      )
    }
}


render(
  <App />,
  document.getElementById('app')
);
