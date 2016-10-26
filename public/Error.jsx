import React from 'react';
import ReactDOM from 'react-dom';



const Error = props => <div>{(!props.error) ?
  <div>You cannot buy that many shares or you have no money</div> :
  <div></div>}</div>




export default Error;
