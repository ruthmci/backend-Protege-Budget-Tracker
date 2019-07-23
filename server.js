const express = require('express');
const cors = require('cors');
const app = new express();

app.use(cors());
app.use(express.json());

const itemsRouter = require('./routes/items');
const protegesRouter = require('./routes/proteges');

app.use('/items', itemsRouter);
app.use('/proteges', protegesRouter);

module.exports = app