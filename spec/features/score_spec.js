xdescribe('#score', function () {
  it('can be initialized on bind', function () {
    // given
    this.el = Helper.create('#el');

    var raty = new Raty('#el', { score: 1 });

    // when
    raty.init();

    // then
    expect(raty.self.querySelector('input').value).toEqual('1');
  });

  it('turns on stars', function () {
    // given
    this.el = Helper.create('#el');

    var raty = new Raty('#el', { score: 5 });

    // when
    raty.init();

    // then
    expect(Helper.extension(raty.self.querySelector('img').src)).toEqual('star-on.png');
  });

  it('accepts callback', function () {
    // given
    this.el = Helper.create('#el');

    var raty = new Raty('#el', {
      score: function () {
        return 1;
      },
    });

    // when
    raty.init();

    // then
    expect(raty.opt.score).toEqual(1);
  });

  it('accepts data attribute', function () {
    // given
    Helper._append('div', { 'data-score': 3 });

    // when
    var raty = new Raty('[data-score]');

    // then
    expect(raty.opt.score).toEqual(3);
  });

  context('with negative number', function () {
    it('does not set the score', function () {
      // given
      this.el = Helper.create('#el');

      var raty = new Raty('#el', { score: -1 });

      // when
      raty.init();

      // then
      expect(raty.self.querySelector('input').value).toEqual('');
    });
  });

  context('with :readOnly', function () {
    it('becomes readOnly too', function () {
      // given
      this.el = Helper.create('#el');

      var raty = new Raty('#el', { readOnly: true });

      // when
      raty.init();

      // then
      expect(raty.self.querySelector('input').readOnly).toEqual(true);
    });
  });

  context('with value greater then numbers', function () {
    it('receives the number of star as value', function () {
      // given
      this.el = Helper.create('#el');

      var raty = new Raty('#el', { score: 100 });

      // when
      raty.init();

      // then
      expect(raty.opt.score).toEqual(raty.opt.number);
    });
  });
});
