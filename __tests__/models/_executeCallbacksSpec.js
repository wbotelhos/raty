describe('#_executeCallbacks', () => {
  beforeEach(() => {
    Helper.create('#el');
  });

  context('when options should compute, not evaluate at runtime, the return and it is a function', function () {
    it('uses the given return', () => {
      // given
      var raty = new Raty(document.querySelector('#el'), {
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
      it('is undefined', () => {
        // given
        var raty = new Raty(document.querySelector('#el'), { number: function () {} });

        // when
        raty._executeCallbacks();

        // then
        expect(raty.opt.number).toEqual(undefined);
      });
    });

    context('when options is not a function', function () {
      it('keeps the given value', () => {
        // given
        var raty = new Raty(document.querySelector('#el'), { number: 16 });

        // when
        raty._executeCallbacks();

        // then
        expect(raty.opt.number).toEqual(16);
      });
    });
  });

  context('when options is not no allow list', function () {
    it('keeps the given value', () => {
      // given

      var raty = new Raty(document.querySelector('#el'), { denied: 'default' });

      // when
      raty._executeCallbacks();

      // then
      expect(raty.opt.denied).toEqual('default');
    });
  });
});
