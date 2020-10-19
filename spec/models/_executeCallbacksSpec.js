describe('#_executeCallbacks', function() {
  beforeEach(function() {
    this.el = Helper.create('#el');
  });

  context('when options should compute, not evaluate at runtime, the return and it is a function', function() {
    it ('uses the given return', function() {
      // given
      var element  = this.el[0];
      var instance = new $.raty.Raty(element, { number: function() { return 36; } });

      // when
      instance._executeCallbacks();

      // then
      expect(instance.opt.number).toEqual(36);
    });

    context('whe there is not return', function() {
      it ('is undefined', function() {
        // given
        var element  = this.el[0];
        var instance = new $.raty.Raty(element, { number: function() {} });

        // when
        instance._executeCallbacks();

        // then
        expect(instance.opt.number).toBeUndefined();
      });
    });

    context('when options is not a function', function() {
      it ('keeps the given value', function() {
        // given
        var element  = this.el[0];
        var instance = new $.raty.Raty(element, { number: 16 });

        // when
        instance._executeCallbacks();

        // then
        expect(instance.opt.number).toEqual(16);
      });
    });
  });

  context('when options is not no allow list', function() {
    it ('keeps the given value', function() {
      // given
      var element  = this.el[0];
      var instance = new $.raty.Raty(element, { denied: 'default' });

      // when
      instance._executeCallbacks();

      // then
      expect(instance.opt.denied).toEqual('default');
    });
  });
});
