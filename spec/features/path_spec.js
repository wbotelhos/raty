xdescribe('#path', function () {
  beforeEach(function () {
    this.el = Helper.create('#el');
  });

  it('changes the path', function () {
    // given
    var raty = new Raty('#el', { path: '../demo/images' });

    // when
    raty.init();

    // then
    var stars = raty.self.querySelectorAll('img');

    expect(stars[0].getAttribute('src')).toEqual('../demo/images/star-off.png');
    expect(stars[1].getAttribute('src')).toEqual('../demo/images/star-off.png');
    expect(stars[2].getAttribute('src')).toEqual('../demo/images/star-off.png');
    expect(stars[3].getAttribute('src')).toEqual('../demo/images/star-off.png');
    expect(stars[4].getAttribute('src')).toEqual('../demo/images/star-off.png');
  });

  it('accepts data attribute', function () {
    // given
    Helper._append('div', { 'data-path': 'custom' });

    var raty = new Raty('[data-path]');

    // when
    raty.init();

    // then
    expect(raty.opt.path).toEqual('custom/');
  });

  context('without slash on the final', function () {
    it('receives the slash', function () {
      // given
      var raty = new Raty('#el', { path: '../demo/images' });

      // when
      raty.init();

      // then
      expect(raty.opt.path).toEqual('../demo/images/');
    });
  });

  context('with slash on the final', function () {
    it('is keeped', function () {
      // given
      var raty = new Raty('#el', { path: '../demo/images/' });

      // when
      raty.init();

      // then
      expect(raty.opt.path).toEqual('../demo/images/');
    });
  });

  context('as null', function () {
    it('replace to an empty string', function () {
      // given
      var raty = new Raty('#el', { path: null });

      // when
      raty.init();

      // then
      var stars = raty.self.querySelectorAll('img');

      expect(stars[0].getAttribute('src')).toEqual('star-off.png');
      expect(stars[1].getAttribute('src')).toEqual('star-off.png');
      expect(stars[2].getAttribute('src')).toEqual('star-off.png');
      expect(stars[3].getAttribute('src')).toEqual('star-off.png');
      expect(stars[4].getAttribute('src')).toEqual('star-off.png');
    });
  });

  context('as undefined', function () {
    it('replace to an empty string', function () {
      // given
      var raty = new Raty('#el');

      // when
      raty.init();

      // then
      var stars = raty.self.querySelectorAll('img');

      expect(stars[0].getAttribute('src')).toEqual('star-off.png');
      expect(stars[1].getAttribute('src')).toEqual('star-off.png');
      expect(stars[2].getAttribute('src')).toEqual('star-off.png');
      expect(stars[3].getAttribute('src')).toEqual('star-off.png');
      expect(stars[4].getAttribute('src')).toEqual('star-off.png');
    });
  });

  context('with :cancel', function () {
    it('changes the path', function () {
      // given
      var raty = new Raty('#el', { cancelButton: true, path: '../demo/images' });

      // when
      raty.init();

      // then
      expect(raty.self.querySelector('.raty-cancel').getAttribute('src')).toEqual('../demo/images/cancel-off.png');
    });
  });

  context('with :iconRange', function () {
    it('changes the path', function () {
      // given
      var raty = new Raty('#el', { iconRange: [{ range: 1 }], path: '../demo/images' });

      // when
      raty.init();

      // then
      expect(raty.self.querySelector('img').getAttribute('src')).toEqual('../demo/images/star-off.png');
    });
  });
});
