const express = require('express');
const path = require('path');
const axios = require('axios');
const url = require('url');

async function api(req, res) {
  try {
      console.log(process.env.API_URL, req.url);
    const response = await axios({
      method: req.method,
      url: url.resolve(process.env.API_URL, req.url),
      data: req.body,
    });
    res.send(response.data);
  } catch (e) {
    console.error(e);
    res.status(e.response.status).send('');
  }
}

async function frontend(req, res) {
    res.sendFile(path.join(__dirname+'/build/index.html'));
}

const app = express();
app.use('/static', express.static(path.join(__dirname, '/build/static')));
app.use('/api', api);
app.get('/*', frontend);
module.exports = app;