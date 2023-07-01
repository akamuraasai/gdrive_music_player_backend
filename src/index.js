const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const world = require('./charts/world');
const genreWorld = require('./charts/genreWorld');
const country = require('./charts/country');
const multiSearch = require('./search/multi');
const artistDetails = require('./artists/details');
const songDetails = require('./tracks/details');
const songRelated = require('./tracks/related');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

world(app);
genreWorld(app);
country(app);
multiSearch(app);
artistDetails(app);
songDetails(app);
songRelated(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
