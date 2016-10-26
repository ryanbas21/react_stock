const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const http = require('http');
const StockFetcher = require('fetch-stock');
const {getStock} = require('./controller.js');
const PORT = 3000;
const path = require('path');
const serveStatic = require('serve-static');
const app = express();
 app.use(serveStatic(__dirname +"/public"))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use('/public', express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'public')));
//app.get('/stock', (req,res) => console.log('test'));
app.get('/', (req,res) => res.sendFile('index.html', {root : __dirname + '/../public/'}));
app.get('/stock/:id', getStock);










//listen on port 3000;
app.listen(PORT, 'localhost',() => console.log('app started on ' + PORT));
