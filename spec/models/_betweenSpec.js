describe('#_between', function () {
  beforeEach(function () {
    this.el = Helper.create('#el');
  });

  context('when value is less than min', function () {
    var max = 2;
    var min = 1;
    var number = 0;

    xit('returns the min', function () {
      // given

      var options = {};
      var raty = new Raty('#el', options);

      // when
      var result = raty._between(number, min, max);

      // then
      expect(result).toEqual(1);
    });
  });

  context('when value is more than max', function () {
    var max = 2;
    var min = 1;
    var number = 3;

    xit('returns the min', function () {
      // given

      var options = {};
      var raty = new Raty('#el', options);

      // when
      var result = raty._between(number, min, max);

      // then
      expect(result).toEqual(2);
    });
  });
});
