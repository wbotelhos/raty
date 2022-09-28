describe('#_nameForIndex', function () {
  beforeEach(function () {
    Helper.create('#el');
  });

  context('when score is null', function () {
    xit('returns :starOff', function () {
      // given

      var options = {};
      var index = 'double';
      var raty = new Raty('#el', options);

      raty.opt.score = null;

      // when
      var name = raty._nameForIndex(index);

      // then
      expect(name).toEqual('starOff');
    });
  });

  context('when score is undefined', function () {
    xit('returns :starOff', function () {
      // given

      var options = {};
      var index = 'double';
      var raty = new Raty('#el', options);

      delete raty.opt.score;

      // when
      var name = raty._nameForIndex(index);

      // then
      expect(name).toEqual('starOff');
    });
  });

  context('when has score', function () {
    context('and score is less than index', function () {
      var index = 2;
      var score = 1;

      xit('returns :starOff', function () {
        // given
        var options = {};
        var raty = new Raty('#el', options);

        raty.opt.score = score;

        // when
        var name = raty._nameForIndex(index);

        // then
        expect(name).toEqual('starOff');
      });
    });

    context('and score is equal index', function () {
      var index = 1;
      var score = 1;

      xit('returns :starOff', function () {
        // given
        var options = {};
        var raty = new Raty('#el', options);

        raty.opt.score = score;

        // when
        var name = raty._nameForIndex(index);

        // then
        expect(name).toEqual('starOn');
      });
    });

    context('and score is greater then index', function () {
      var index = 1;
      var score = 2;

      xit('returns :starOff', function () {
        // given
        var options = {};
        var raty = new Raty('#el', options);

        raty.opt.score = score;

        // when
        var name = raty._nameForIndex(index);

        // then
        expect(name).toEqual('starOn');
      });
    });
  });
});
