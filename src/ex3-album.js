function setArtist(artistName, album) {
  var newAlbum = shallowClone(album);
  var newArtist = shallowClone(album.artist);

  newArtist.name = artistName;

  newAlbum.artist = newArtist;

  return newAlbum;
}

function addMetadata(metadata, album) {
  var newAlbum = shallowClone(album);
  var newArtist = shallowClone(newAlbum.artist);

  newAlbum.artist = newArtist;

  for (var metadataKey in metadata) {
    newAlbum.artist[metadataKey] = metadata[metadataKey];
  }

  return newAlbum;
}

function getArtist(album) {
  return album.artist.name;
}

function shallowClone(album) {
  var result = {};

  for (var someKey in album) {
    result[someKey] = album[someKey];
  }

  return result;
}

module.exports = {
  setArtist: setArtist,
  getArtist: getArtist,
  addMetadata: addMetadata
};
