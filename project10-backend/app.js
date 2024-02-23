import fs from 'node:fs/promises';

import bodyParser from 'body-parser';
import express from 'express';

const app = express();

app.use(express.static('images'));
app.use(bodyParser.json());

// CORS

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // allow all domains
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  next();
});

app.get('/places', async (req, res) => {
  const fileContent = await fs.readFile('./data/places.json');

  const placesData = JSON.parse(fileContent);

  // var time = 2000;
  // var stop = new Date().getTime();
  // while(new Date().getTime() < stop + time) {
  //     ;
  // }

  //res.status(500).json();
  res.status(200).json({ places: placesData });
});

app.get('/user-places', async (req, res) => {

  let places = [];
  try {
    const fileContent = await fs.readFile('./data/user-places.json');
    places = JSON.parse(fileContent);
  } catch {
    
  }

  res.status(200).json({ places });
});

app.put('/user-places', async (req, res) => {
  const places = req.body;

  await fs.writeFile('./data/user-places.json', JSON.stringify(places));

  res.status(200).json({ message: 'User places updated!' });
});

// 404
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  res.status(404).json({ message: '404 - Not Found' });
});

app.listen(3000);
