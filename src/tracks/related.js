const songRelated = require('../../__mock__/v1/tracks/related.json');

module.exports = (app) => {
  app.get('/v1/tracks/related', (req, res) => {
    const { track_id } = req.query;

    return res.send(songRelated);
  });
};
