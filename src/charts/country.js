const country = require('../../__mock__/v1/charts/country.json');

module.exports = (app) => {
  app.get('/v1/charts/country', (req, res) => {
    const { country_code } = req.query;

    return res.send(country);
  });
};
