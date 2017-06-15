const R = require('ramda');

const artistLens = R.lensProp('artist');
const nameLens = R.lensProp('name');
const artistNameLens = R.compose(artistLens, nameLens);

const setArtist = R.set(artistNameLens);

function addMetadata(metadata, album) {
  return R.over(artistLens, R.merge(metadata), album);
}

const getArtist = R.view(artistNameLens);

module.exports = {
  setArtist: setArtist,
  getArtist: getArtist,
  addMetadata: addMetadata
};
