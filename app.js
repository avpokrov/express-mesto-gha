const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const {PORT = 3000} = process.env;
const app = express();
console.log(PORT);
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

app.use('/users', require('./routes/users'));

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})

