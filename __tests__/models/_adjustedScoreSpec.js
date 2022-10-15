describe('#_adjustedScore', () => {
  beforeEach(() => {
    Helper.create('#el');
  });

  context('when score is null', function () {
    it('returns undefined', () => {
      // given
      var options = {};
      var score = null;
      var raty = new Raty(document.querySelector('#el'), options);

      // when
      var value = raty._adjustedScore(score);

      // then
      expect(value).toEqual(undefined);
    });
  });

  context('when score is undefined', function () {
    it('returns undefined', () => {
      // given
      var options = {};
      var score = undefined;
      var raty = new Raty(document.querySelector('#el'), options);

      // when
      var value = raty._adjustedScore(score);

      // then
      expect(value).toEqual(undefined);
    });
  });

  context('when score is less than zero', function () {
    it('returns the zero', () => {
      // given
      var options = { number: 1 };
      var score = -1;
      var raty = new Raty(document.querySelector('#el'), options);

      // when
      var value = raty._adjustedScore(score);

      // then
      expect(value).toEqual(0);
    });
  });

  context('when score is equal zero', function () {
    it('returns the zero', () => {
      // given
      var options = { number: 1 };
      var score = 0;
      var raty = new Raty(document.querySelector('#el'), options);

      // when
      var value = raty._adjustedScore(score);

      // then
      expect(value).toEqual(0);
    });
  });

  context('when score is more than *number', function () {
    it('returns the number', () => {
      // given
      var options = { number: 1 };
      var score = 2;
      var raty = new Raty(document.querySelector('#el'), options);

      // when
      var value = raty._adjustedScore(score);

      // then
      expect(value).toEqual(1);
    });
  });
});
