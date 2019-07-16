const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = new express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const cloudinary = require('./config/cloudinary')

app.post('/upload', upload.single('file'), (req, res) => {
  const { buffer } = req.file
  uploadFile(buffer)
  .then(resp => res.send(resp))
  .catch(err => res.status(500).send(err))
})

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const itemsRouter = require('./routes/items');
const protegesRouter = require('./routes/proteges');

app.use('/items', itemsRouter);
app.use('/proteges', protegesRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
