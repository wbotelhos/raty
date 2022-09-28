describe('#_executeCallbacks', function () {
  beforeEach(function () {
    Helper.create('#el');
  });

  context('when options should compute, not evaluate at runtime, the return and it is a function', function () {
    xit('uses the given return', function () {
      // given
      var raty = new Raty('#el', {
        number: function () {
          return 36;
        },
      });

      // when
      raty._executeCallbacks();

      // then
      expect(raty.opt.number).toEqual(36);
    });

    context('whe there is not return', function () {
      xit('is undefined', function () {
        // given
        var raty = new Raty('#el', { number: function () {} });

        // when
        raty._executeCallbacks();

        // then
        expect(raty.opt.number).toBeUndefined();
      });
    });

    context('when options is not a function', function () {
      xit('keeps the given value', function () {
        // given
        var raty = new Raty('#el', { number: 16 });

        // when
        raty._executeCallbacks();

        // then
        expect(raty.opt.number).toEqual(16);
      });
    });
  });

  context('when options is not no allow list', function () {
    xit('keeps the given value', function () {
      // given

      var raty = new Raty('#el', { denied: 'default' });

      // when
      raty._executeCallbacks();

      // then
      expect(raty.opt.denied).toEqual('default');
    });
  });
});
