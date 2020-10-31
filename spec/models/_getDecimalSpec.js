describe('#_getDecimal', function() {
  beforeEach(function() {
    this.el = Helper.create('#el');
  });

  context('when number is an integer', function() {
    var number = 0;

    it ('returns the first fraction', function() {
      // given
      var element  = this.el[0];
      var options  = {};
      var instance = new $.raty.Raty(element, options);

      // when
      var decimal = instance._getDecimal(number, 1);

      // then
      expect(decimal).toEqual(0);
    });
  });

  context('when number is a float', function() {
    context('with 1 fraction', function() {
      var number = 0.1;

      it ('returns the first fraction', function() {
        // given
        var element  = this.el[0];
        var options  = {};
        var instance = new $.raty.Raty(element, options);

        // when
        var decimal = instance._getDecimal(number, 1);

        // then
        expect(decimal).toEqual(1);
      });

      context('when has four 9 consecutives', function() {
        var number = 0.19999;

        it ('increments the first decimal', function() {
          // given
          var element  = this.el[0];
          var options  = {};
          var instance = new $.raty.Raty(element, options);

          // when
          var decimal = instance._getDecimal(number, 1);

          // then
          expect(decimal).toEqual(2);
        });
      });
    });

    context('with 2 fraction', function() {
      var number = 0.12;

      it ('returns the first fraction', function() {
        // given
        var element  = this.el[0];
        var options  = {};
        var instance = new $.raty.Raty(element, options);

        // when
        var decimal = instance._getDecimal(number, 2);

        // then
        expect(decimal).toEqual(12);
      });

      context('when has four 9 consecutives', function() {
        var number = 0.19999;

        it ('increments the first decimal', function() {
          // given
          var element  = this.el[0];
          var options  = {};
          var instance = new $.raty.Raty(element, options);

          // when
          var decimal = instance._getDecimal(number, 2);

          // then
          expect(decimal).toEqual(20);
        });
      });
    });
  });
});
