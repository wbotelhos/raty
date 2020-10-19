describe('#_nameForIndex', function() {
  beforeEach(function() {
    this.el = Helper.create('#el');
  });

  context('when score is null', function() {
    it ('returns :starOff', function() {
      // given
      var element  = this.el[0];
      var options  = {};
      var index    = 'double';
      var instance = new $.raty.Raty(element, options);

      instance.opt.score = null;

      // when
      var name = instance._nameForIndex(index);

      // then
      expect(name).toEqual('starOff');
    });
  });

  context('when score is undefined', function() {
    it ('returns :starOff', function() {
      // given
      var element  = this.el[0];
      var options  = {};
      var index    = 'double';
      var instance = new $.raty.Raty(element, options);

      delete instance.opt.score;

      // when
      var name = instance._nameForIndex(index);

      // then
      expect(name).toEqual('starOff');
    });
  });

  context('when has score', function() {
    context('and score is less than index', function() {
      var index = 2;
      var score = 1;

      it ('returns :starOff', function() {
        // given
        var element  = this.el[0];
        var options  = {};
        var instance = new $.raty.Raty(element, options);

        instance.opt.score = score;

        // when
        var name = instance._nameForIndex(index);

        // then
        expect(name).toEqual('starOff');
      });
    });

    context('and score is equal index', function() {
      var index = 1;
      var score = 1;

      it ('returns :starOff', function() {
        // given
        var element  = this.el[0];
        var options  = {};
        var instance = new $.raty.Raty(element, options);

        instance.opt.score = score;

        // when
        var name = instance._nameForIndex(index);

        // then
        expect(name).toEqual('starOn');
      });
    });

    context('and score is greater then index', function() {
      var index = 1;
      var score = 2;

      it ('returns :starOff', function() {
        // given
        var element  = this.el[0];
        var options  = {};
        var instance = new $.raty.Raty(element, options);

        instance.opt.score = score;

        // when
        var name = instance._nameForIndex(index);

        // then
        expect(name).toEqual('starOn');
      });
    });
  });
});
