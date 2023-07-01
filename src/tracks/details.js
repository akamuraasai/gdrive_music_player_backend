const songDetails = require('../../__mock__/v1/tracks/details.json');

module.exports = (app) => {
  app.get('/v1/tracks/details', (req, res) => {
    const { track_id } = req.query;

    return res.send(songDetails);
  });
};
