describe('#path', function() {
  beforeEach(function() {
    $.fn.raty.defaults.path = '../lib/images';

    this.el = Helper.create('#el');
  });

  afterEach(function() {
    Helper.clear();
  });

  it ('changes the path', function() {
    // given

    // when
    this.el.raty({ path: '../demo/images' });

    // then
    expect(this.el.children('img')).toHaveAttr('src', '../demo/images/star-off.png');
  });

  it ('accepts data attribute', function() {
    // given
    var el = Helper._append('div', { 'data-path': 'custom' });

    // when
    el.raty();

    // then
    expect(el[0].opt.path).toEqual('custom/');
  });

  context('without slash on the final', function() {
    it ('receives the slash', function() {
      // given

      // when
      this.el.raty({ path: '../demo/images' });

      // then
      expect(this.el[0].opt.path).toEqual('../demo/images/');
    });
  });

  context('with slash on the final', function() {
    it ('is keeped', function() {
      // given

      // when
      this.el.raty({ path: '../demo/images/' });

      // then
      expect(this.el[0].opt.path).toEqual('../demo/images/');
    });
  });

  context('as null', function() {
    it ('replace to an empty string', function() {
      // given

      // when
      this.el.raty({ path: null });

      // then
      expect(this.el.children('img')).toHaveAttr('src', 'star-off.png');
    });
  });

  context('as undefined', function() {
    beforeEach(function() {
      $.fn.raty.defaults.path = undefined;
    });

    it ('replace to an empty string', function() {
      // given

      // when
      this.el.raty();

      // then
      expect(this.el.children('img')).toHaveAttr('src', 'star-off.png');
    });
  });

  context('with :cancel', function() {
    it ('changes the path', function() {
      // given

      // when
      this.el.raty({ cancel: true, path: '../demo/images' });

      // then
      expect(this.el.children('.raty-cancel')).toHaveAttr('src', '../demo/images/cancel-off.png');
    });
  });

  context('with :iconRange', function() {
    it ('changes the path', function() {
      // given

      // when
      this.el.raty({ iconRange: [{ range: 1 }], path: '../demo/images' });

      // then
      expect(this.el.children('img')).toHaveAttr('src', '../demo/images/star-off.png');
    });
  });
});
