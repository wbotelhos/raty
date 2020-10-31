describe('#_setPath', function() {
  beforeEach(function() {
    this.el = Helper.create('#el');
  });

  context('when path is null', function() {
    it ('sets to an empty string', function() {
      // given
      var element  = this.el[0];
      var options  = {};
      var instance = new $.raty.Raty(element, options);

      instance.opt.path = null;

      // when
      instance._setPath();

      // then
      expect(instance.opt.path).toEqual('');
    });
  });

  context('when path is undefined', function() {
    it ('sets to an empty string', function() {
      // given
      var element  = this.el[0];
      var options  = {};
      var instance = new $.raty.Raty(element, options);

      delete instance.opt.path;

      // when
      instance._setPath();

      // then
      expect(instance.opt.path).toEqual('');
    });
  });

  context('when path is defined', function() {
    context('with a slash at end', function() {
      it ('keeps the same value', function() {
        // given
        var element  = this.el[0];
        var options  = {};
        var instance = new $.raty.Raty(element, options);

        instance.opt.path = 'path/';

        // when
        instance._setPath();

        // then
        expect(instance.opt.path).toEqual('path/');
      });
    });

    context('without a slash at end', function() {
      it ('appends a slash', function() {
        // given
        var element  = this.el[0];
        var options  = {};
        var instance = new $.raty.Raty(element, options);

        instance.opt.path = 'path/';

        // when
        instance._setPath();

        // then
        expect(instance.opt.path).toEqual('path/');
      });
    });
  });
});
