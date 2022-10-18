describe('#_between', () => {
  beforeEach(() => {
    Helper.create('#el');
  });

  context('when value is less than min', function () {
    var max = 2;
    var min = 1;
    var number = 0;

    it('returns the min', () => {
      // given

      var options = {};
      var raty = new Raty(document.querySelector('#el'), options);

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

    it('returns the min', () => {
      // given

      var options = {};
      var raty = new Raty(document.querySelector('#el'), options);

      // when
      var result = raty._between(number, min, max);

      // then
      expect(result).toEqual(2);
    });
  });
});
