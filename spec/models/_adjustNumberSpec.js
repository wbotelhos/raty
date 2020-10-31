describe('#_adjustNumber', function() {
  beforeEach(function() {
    this.el = Helper.create('#el');
  });

  context('when :number is less than 1', function() {
    it ('receives 1', function() {
      // given
      var element  = this.el[0];
      var options  = { number: 0 };
      var instance = new $.raty.Raty(element, options);

      // when
      instance._adjustNumber();

      // then
      expect(instance.opt.number).toEqual(1);
    });
  });

  context('when :number is more than :numberMax', function() {
    it ('returns the max', function() {
      // given
      var element  = this.el[0];
      var options  = { number: 5, numberMax: 2 };
      var instance = new $.raty.Raty(element, options);

      // when
      instance._adjustNumber();

      // then
      expect(instance.opt.number).toEqual(2);
    });
  });
});
