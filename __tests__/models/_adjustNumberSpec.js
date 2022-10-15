describe('#_adjustNumber', () => {
  beforeEach(() => {
    Helper.create('#el');
  });

  context('when :number is less than 1', function () {
    it('receives 1', () => {
      // given

      var options = { number: 0 };
      var raty = new Raty(document.querySelector('#el'), options);

      // when
      raty._adjustNumber();

      // then
      expect(raty.opt.number).toEqual(1);
    });
  });

  context('when :number is more than :numberMax', function () {
    it('returns the max', () => {
      // given

      var options = { number: 5, numberMax: 2 };
      var raty = new Raty(document.querySelector('#el'), options);

      // when
      raty._adjustNumber();

      // then
      expect(raty.opt.number).toEqual(2);
    });
  });
});
