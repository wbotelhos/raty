describe('#_getDecimal', () => {
  beforeEach(() => {
    Helper.create('#el');
  });

  context('when number is an integer', function () {
    var number = 0;

    it('returns the first fraction', () => {
      // given

      var options = {};
      var raty = new Raty(document.querySelector('#el'), options);

      // when
      var decimal = raty._getDecimal(number, 1);

      // then
      expect(decimal).toEqual(0);
    });
  });

  context('when number is a float', function () {
    context('with 1 fraction', function () {
      var number = 0.1;

      it('returns the first fraction', () => {
        // given
        var options = {};
        var raty = new Raty(document.querySelector('#el'), options);

        // when
        var decimal = raty._getDecimal(number, 1);

        // then
        expect(decimal).toEqual(1);
      });

      context('when has four 9 consecutives', function () {
        var number = 0.19999;

        it('increments the first decimal', () => {
          // given
          var options = {};
          var raty = new Raty(document.querySelector('#el'), options);

          // when
          var decimal = raty._getDecimal(number, 1);

          // then
          expect(decimal).toEqual(2);
        });
      });
    });

    context('with 2 fraction', function () {
      var number = 0.12;

      it('returns the first fraction', () => {
        // given
        var options = {};
        var raty = new Raty(document.querySelector('#el'), options);

        // when
        var decimal = raty._getDecimal(number, 2);

        // then
        expect(decimal).toEqual(12);
      });

      context('when has four 9 consecutives', function () {
        var number = 0.19999;

        it('increments the first decimal', () => {
          // given
          var options = {};
          var raty = new Raty(document.querySelector('#el'), options);

          // when
          var decimal = raty._getDecimal(number, 2);

          // then
          expect(decimal).toEqual(20);
        });
      });
    });
  });
});
