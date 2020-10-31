describe('#_adjustedScore', function() {
  beforeEach(function() {
    this.el = Helper.create('#el');
  });

  context('when score is null', function() {
    it ('returns undefined', function() {
      // given
      var element  = this.el[0];
      var options  = {};
      var score    = null;
      var instance = new $.raty.Raty(element, options);

      // when
      var value = instance._adjustedScore(score);

      // then
      expect(value).toBeUndefined();
    });
  });

  context('when score is undefined', function() {
    it ('returns undefined', function() {
      // given
      var element  = this.el[0];
      var options  = {};
      var score    = undefined;
      var instance = new $.raty.Raty(element, options);

      // when
      var value = instance._adjustedScore(score);

      // then
      expect(value).toBeUndefined();
    });
  });

  context('when score is less than zero', function() {
    it ('returns the zero', function() {
      // given
      var element  = this.el[0];
      var options  = { number: 1 };
      var score    = -1;
      var instance = new $.raty.Raty(element, options);

      // when
      var value = instance._adjustedScore(score);

      // then
      expect(value).toEqual(0);
    });
  });

  context('when score is equal zero', function() {
    it ('returns the zero', function() {
      // given
      var element  = this.el[0];
      var options  = { number: 1 };
      var score    = 0;
      var instance = new $.raty.Raty(element, options);

      // when
      var value = instance._adjustedScore(score);

      // then
      expect(value).toEqual(0);
    });
  });

  context('when score is more than *number', function() {
    it ('returns the number', function() {
      // given
      var element  = this.el[0];
      var options  = { number: 1 };
      var score    = 2;
      var instance = new $.raty.Raty(element, options);

      // when
      var value = instance._adjustedScore(score);

      // then
      expect(value).toEqual(1);
    });
  });
});
