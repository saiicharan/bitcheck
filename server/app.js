const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const _ = require('lodash');
const superagent = require('superagent');

const port = 4001;
const index = require('./routes/index');

const app = express();
app.use(index);

const server = http.createServer(app);
const io = socketIo(server);

io.on("connection", socket => {
  console.log("New client connected"), setInterval(
    () => getApiAndEmit(socket), 120000);
})

const getApiAndEmit = socket => {
  superagent.get('https://koinex.in/api/ticker')
  .end((err, res) => {
    if (err) { return console.error(err); }
    let btcPrice = _.get(JSON.parse(res.text), ['prices', 'BTC'], 0)
    socket.emit("bitcoin", btcPrice);
  });
};

server.listen(port, () => console.log(`Listening on port ${port}`));