describe('#_adjustNumber', function () {
  beforeEach(function () {
    Helper.create('#el');
  });

  context('when :number is less than 1', function () {
    xit('receives 1', function () {
      // given

      var options = { number: 0 };
      var raty = new Raty('#el', options);

      // when
      raty._adjustNumber();

      // then
      expect(raty.opt.number).toEqual(1);
    });
  });

  context('when :number is more than :numberMax', function () {
    xit('returns the max', function () {
      // given

      var options = { number: 5, numberMax: 2 };
      var raty = new Raty('#el', options);

      // when
      raty._adjustNumber();

      // then
      expect(raty.opt.number).toEqual(2);
    });
  });
});
