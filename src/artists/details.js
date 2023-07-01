const artistDetails = require('../../__mock__/v2/artists/details.json');

module.exports = (app) => {
  app.get('/v2/artists/details', (req, res) => {
    const { artist_id } = req.query;

    return res.send(artistDetails);
  });
};
