const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

mongoose.set('strictQuery', false);

const {
  PORT = 3000,
  MONGO_URL = 'mongodb://localhost:27017/mestodb',
} = process.env;


const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '63b3f16946b08fac27b7fd9b'
  };

  next();
}); 

app.use(require('./router/index'));


async function connect() {
  await mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
  });
  console.log(`Connect db  ${MONGO_URL}`);

  await app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}
connect();
