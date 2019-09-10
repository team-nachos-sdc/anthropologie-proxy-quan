const express = require('express');
const proxy = require('http-proxy-middleware');

const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', express.static(path.join(__dirname, '../client/dist')));

const options = {
  target: 'http://localhost:3000/',
  router: {
    '/search': 'http://localhost:3001/',
    '/products': 'http://localhost:3002/',
    '/review': 'http://localhost:3003/',
  }
}

app.use('/', proxy(options));
app.listen(3000);
