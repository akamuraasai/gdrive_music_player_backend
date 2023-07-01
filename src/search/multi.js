const search = require('../../__mock__/v1/search/multi.json');

module.exports = (app) => {
  app.get('/v1/search/multi', (req, res) => {
    const { searchTerm, search_type } = req.query;

    return res.send(search);
  });
};
