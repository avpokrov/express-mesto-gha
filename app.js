const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

mongoose.set('strictQuery', false);

const {
  PORT = 3000,
  MONGO_URL = 'mongodb://localhost:27017/mestodb',
} = process.env;

const app = express();

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
