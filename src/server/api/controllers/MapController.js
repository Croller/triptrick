// https://github.com/mapbox/node-mbtiles

const MBTiles = require('@mapbox/mbtiles');

const tilesCountries = () => new Promise((resolve, reject) => {
  const mb = new MBTiles(`${__dirname.split('api')[0]}mbtiles/countries.mbtiles?mode=ro`, (err, mbtiles) => {
    if (err) return reject(err);
    return resolve(mbtiles);
  });
});

const MapController = () => {
  const mbtiles = (req, res) => {
    tilesCountries()
      .then((data) => {
        data.getTile(req.param('z'), req.param('x'), req.param('y'), (err, tile, headers) => {
          // console.log(tile);
          res.set(headers);
          res.send(tile);
        });
      })
      .catch(err => res.json(err));
  };

  const test = () => {
    console.log('test');
  };

  return {
    mbtiles,
    test,
  };
};

export default MapController;
