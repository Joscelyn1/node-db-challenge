const express = require('express');
// const db = require('./data/db.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`hello`);
});

const port = 4001;

server.listen(port, () => console.log(`server on ${port}`));
