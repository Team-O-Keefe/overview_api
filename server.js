const express = require('express');
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));

app.set('port', process.env.PORT || 8888);
app.listen(() => {
  console.log(app.get('port'));
});