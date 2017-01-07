'use strict';
const FetchStock = require('fetch-stock');

module.exports = {
  //middleware for getting stock data
  getStock: (req,res,next) => {
    console.log('here');
  //  res.setHeader('content-type', 'application/json');
    FetchStock.getInfo(req.params.id, (err,result) =>{
      if (err) {
        res.send('Bad Symbol').status(400).end();
        next();
      }
      else {
        const data = JSON.parse(result);
        console.log(data);
        res.json(data[0]).status(200).end();
      }
    })
  }
}
