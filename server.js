/*
 * DO NOT EDIT
 * any changes to this file will be ignored
 */
const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');

const env = require('./env');

const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());

// when we load your integration it will be equivalent to this
app.use('/integration-name', require('./routes'));

app.listen(env.port, () => console.log(`[express] app listening on http://localhost:${env.port}`));
