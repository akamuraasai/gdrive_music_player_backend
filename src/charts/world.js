const world = require('../../__mock__/v1/charts/world.json');
const listFiles = require('../config/gdrive');

const musicItem = ({ id, title, subtitle, uri, image }) => ({
  layout: "5",
  type: "MUSIC",
  key: id,
  title,
  subtitle,
  images: {
    background: image,
    coverart: image,
    coverarthq: image,
  },
  artists: [
    {
      alias: "jain",
      id: "42",
      adamid: "334329603"
    }
  ],
  hub: {
    actions: [
      {},
      { uri },
    ],
  },
});


module.exports = (app) => {
  app.get('/v1/charts/world', async (req, res) => {
    const files = await listFiles();
    const items = files.map(({ name, webContentLink, appProperties, id }) => musicItem({
      id,
      title: name,
      subtitle: appProperties?.artist || 'Unknown',
      uri: webContentLink,
      image: appProperties?.thumbnail || 'https://www.wmhbradio.org/wp-content/uploads/2016/07/music-placeholder.png',
    }));
    return res.send([...items, ...world]);
  });
};
