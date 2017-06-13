describe('increatePrice()', () => {
  var subject;

  beforeEach(() => {
    subject = require('../src/ex0-rogers.js').increatePrice;
  });

  describe('given an empty array', () => {
    it('returns an empty array', () => {
      expect(subject([])).toEqual([]);
    });
  });

  describe('given an array with prices', () => {
    it('increases prices', () => {
      expect(subject([{price: 10}, {price: 20}, {price: 30}])).toEqual([{price: 11}, {price: 22}, {price: 33}]);
    });
  });
});