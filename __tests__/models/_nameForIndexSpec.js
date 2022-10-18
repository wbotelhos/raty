describe('#_nameForIndex', () => {
  beforeEach(() => {
    Helper.create('#el');
  });

  context('when score is null', function () {
    it('returns :starOff', () => {
      // given

      var options = {};
      var index = 'double';
      var raty = new Raty(document.querySelector('#el'), options);

      raty.opt.score = null;

      // when
      var name = raty._nameForIndex(index);

      // then
      expect(name).toEqual('starOff');
    });
  });

  context('when score is undefined', function () {
    it('returns :starOff', () => {
      // given

      var options = {};
      var index = 'double';
      var raty = new Raty(document.querySelector('#el'), options);

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

      it('returns :starOff', () => {
        // given
        var options = {};
        var raty = new Raty(document.querySelector('#el'), options);

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

      it('returns :starOff', () => {
        // given
        var options = {};
        var raty = new Raty(document.querySelector('#el'), options);

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

      it('returns :starOff', () => {
        // given
        var options = {};
        var raty = new Raty(document.querySelector('#el'), options);

        raty.opt.score = score;

        // when
        var name = raty._nameForIndex(index);

        // then
        expect(name).toEqual('starOn');
      });
    });
  });
});
