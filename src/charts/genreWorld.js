const genreWorld = require('../../__mock__/v1/charts/genre_world.json');

module.exports = (app) => {
  app.get('/v1/charts/genre-world', (req, res) => {
    const { genre_code } = req.query;

    return res.send(genreWorld);
  });
};
