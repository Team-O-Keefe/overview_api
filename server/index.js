const express = require('express');
const morgan = require('morgan');
const router = require('./router.js');
const app = express();

app.use(morgan('dev'));
const PORT = 2323;
app.listen(PORT, () => {
  console.log('hi')
});