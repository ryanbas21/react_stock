'use strict';
const FetchStock = require('fetch-stock');

module.exports = {
  //middleware for getting stock data
  getStock: (req,res,next) => {
    console.log('here');
  //  res.setHeader('content-type', 'application/json');
    FetchStock.getInfo(req.params.id, (err,result) =>{
      if (err) {
        res.send('Bad Symbol');
        next();
      }
      else {
        const data = JSON.parse(result);
        console.log(data);
        res.send(data[0]);
        next();
      }
    })
  }
}
