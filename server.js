import express from 'express';
import mongoose from 'mongoose';

// import Data from './data.js';
import Videos from './dbModel.js';

// config env
import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });

// app config
const app = express();
const port = 9000;

// middlewares
app.use(express.json());
app.use((req, res, next) => {
  // Dont do this in production
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
});

// Routes
app.get('/', (req, res) => {
  res.status(200).send('hello');
});
app.get('/v1/videos', (req, res) => {
  Videos.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post('/v1/videos', (req, res) => {
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
const url = `mongodb+srv://admin:${process.env['PASSWORD']}${process.env['URL_ENDING']}`;
mongoose.connect(url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

// listener
app.listen(port, () => console.log('server is running on port' + port));
