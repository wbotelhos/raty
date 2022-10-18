describe('#_setPath', () => {
  beforeEach(() => {
    Helper.create('#el');
  });

  context('when path is null', function () {
    it('sets to an empty string', () => {
      // given

      var options = {};
      var raty = new Raty(document.querySelector('#el'), options);

      raty.opt.path = null;

      // when
      raty._setPath();

      // then
      expect(raty.opt.path).toEqual('');
    });
  });

  context('when path is undefined', function () {
    it('sets to an empty string', () => {
      // given

      var options = {};
      var raty = new Raty(document.querySelector('#el'), options);

      delete raty.opt.path;

      // when
      raty._setPath();

      // then
      expect(raty.opt.path).toEqual('');
    });
  });

  context('when path is defined', function () {
    context('with a slash at end', function () {
      it('keeps the same value', () => {
        // given
        var options = {};
        var raty = new Raty(document.querySelector('#el'), options);

        raty.opt.path = 'path/';

        // when
        raty._setPath();

        // then
        expect(raty.opt.path).toEqual('path/');
      });
    });

    context('without a slash at end', function () {
      it('appends a slash', () => {
        // given
        var options = {};
        var raty = new Raty(document.querySelector('#el'), options);

        raty.opt.path = 'path/';

        // when
        raty._setPath();

        // then
        expect(raty.opt.path).toEqual('path/');
      });
    });
  });
});
