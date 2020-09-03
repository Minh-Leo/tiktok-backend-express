import express from 'express';
import mongoose from 'mongoose';

import Data from './data.js';
import Videos from './dbModel.js';

// app config
const app = express();
const port = 9000;

// Routes
app.get('/', (req, res) => {
  res.status(200).send('hello');
});
app.get('/v1/get', (req, res) => res.status(200).send(Data));
app.post('/v1/post', (req, res) => {
  const dbVideos = req.body;
  Videos.create(dbVideos, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// DB config
const url =
  'mongodb+srv://admin:aquarius.@cluster0.wssnx.mongodb.net/tiktok?retryWrites=true&w=majority';
mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// listener
app.listen(port, () => console.log('server is running on port' + port));
