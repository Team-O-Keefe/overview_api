const express = require('express');
const morgan = require('morgan');
const router = require('./router');

const app = express();

app.use(morgan('dev'));
app.use('/api/', router);
const PORT = 2323;
app.listen(PORT);
