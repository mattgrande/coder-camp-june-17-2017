describe('example: album', () => {
  const getAlbum = require('./example3.js').getAlbum;

  describe('setArtist()', () => {
    var subject;

    beforeEach(() => {
      subject = require('../src/ex3-album.js').setArtist;
    });

    describe('given a new artist name', () => {
      var originalAlbum;

      beforeEach(() => {
        originalAlbum = getAlbum();

        subject = subject('Destiny\'s Child', originalAlbum);
      });

      it('sets the new artist name on the returned value', () => {
        expect(subject.artist.name).toBe('Destiny\'s Child');
      });

      it('carries forward the original properties', () => {
        delete subject.artist;
        delete originalAlbum.artist;
        expect(subject).toEqual(originalAlbum);
      });

      it('does not mutate the original, passed artist', () => {
        expect(originalAlbum.artist.name).toBe('Beyoncé');
      });
    });
  });

  describe('getArtist()', () => {
    var subject;

    beforeEach(() => {
      subject = require('../src/ex3-album.js').getArtist;
    });

    it(`returns the artist's name`, () => {
      expect(subject(getAlbum())).toBe('Beyoncé');
    });
  });

  describe('addMetadata()', () => {
    var originalAlbum,
      fn;

    beforeEach(() => {
      fn = require('../src/ex3-album.js').addMetadata;
    });

    beforeEach(() => {
      originalAlbum = getAlbum();

      subject = fn({ foo: 'bar', spaz: 'eggs' }, originalAlbum);
    });

    it('keeps the original artist info', () => {
      expect(subject.artist.name).toBe('Beyoncé');
    });

    it('associates the new data into the original artist object', () => {
      expect(subject.artist.foo).toBe('bar');
      expect(subject.artist.spaz).toBe('eggs');
    });

    it('carries forward the original properties on the root album object', () => {
      delete subject.artist;
      delete originalAlbum.artist;
      expect(subject).toEqual(originalAlbum);
    });

    it('does not mutate the original, passed album', () => {
      expect(originalAlbum.artist.name).toBe('Beyoncé');
    });

    describe('when even more metadata is attached', () => {
      var firstResult;
      beforeEach(() => {
        firstResult = subject;
        subject = fn({ a: 'b', c: 'd' }, subject);
      });

      it('does not modify the first result', () => {
        expect(firstResult.artist.a).not.toBeDefined();
      });

      it('keeps the original keys', () => {
        expect(firstResult.artist.name).toBe('Beyoncé');
      });

      it('keeps the metadata keys added on the first call', () => {
        expect(firstResult.artist.foo).toBe('bar');
      });

      it('associates the new data into the album info object', () => {
        expect(subject.artist.a).toBe('b');
        expect(subject.artist.c).toBe('d');
      });
    });
  });
});