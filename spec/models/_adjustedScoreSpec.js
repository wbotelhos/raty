describe('#_adjustedScore', function () {
  beforeEach(function () {
    this.el = Helper.create('#el');
  });

  context('when score is null', function () {
    xit('returns undefined', function () {
      // given
      var options = {};
      var score = null;
      var raty = new Raty('#el', options);

      // when
      var value = raty._adjustedScore(score);

      // then
      expect(value).toEqual(undefined);
    });
  });

  context('when score is undefined', function () {
    xit('returns undefined', function () {
      // given
      var options = {};
      var score = undefined;
      var raty = new Raty('#el', options);

      // when
      var value = raty._adjustedScore(score);

      // then
      expect(value).toEqual(undefined);
    });
  });

  context('when score is less than zero', function () {
    xit('returns the zero', function () {
      // given
      var options = { number: 1 };
      var score = -1;
      var raty = new Raty('#el', options);

      // when
      var value = raty._adjustedScore(score);

      // then
      expect(value).toEqual(0);
    });
  });

  context('when score is equal zero', function () {
    xit('returns the zero', function () {
      // given
      var options = { number: 1 };
      var score = 0;
      var raty = new Raty('#el', options);

      // when
      var value = raty._adjustedScore(score);

      // then
      expect(value).toEqual(0);
    });
  });

  context('when score is more than *number', function () {
    xit('returns the number', function () {
      // given
      var options = { number: 1 };
      var score = 2;
      var raty = new Raty('#el', options);

      // when
      var value = raty._adjustedScore(score);

      // then
      expect(value).toEqual(1);
    });
  });
});
