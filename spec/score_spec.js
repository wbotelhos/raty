describe('#score', function() {
  beforeEach(function() {
    $.fn.raty.defaults.path = '../lib/images';

    this.el = Helper.create('#el');
  });

  afterEach(function() {
    Helper.clear();
  });

  it ('can be initialized on bind', function() {
    // given

    // when
    this.el.raty({ score: 1 });

    // then
    expect(this.el.children('input')).toHaveValue('1');
  });

  it ('turns on stars', function() {
    // given

    // when
    this.el.raty({ score: 5 });

    // then
    expect(this.el.children('img')).toHaveAttr('src', '../lib/images/star-on.png');
  });

  it ('accepts callback', function() {
    // given

    // when
    this.el.raty({ score: function() { return 1; } });

    // then
    expect(this.el[0].opt.score).toEqual(1);
  });

  context('with negative number', function() {
    it ('does not set the score', function() {
      // given

      // when
      this.el.raty({ score: -1 });

      // then
      expect(this.el.children('input')).toHaveValue('');
    });
  });

  context('with :readOnly', function() {
    it ('becomes readOnly too', function() {
      // given

      // when
      this.el.raty({ readOnly: true });

      // then
      expect(this.el.children('input')).toHaveAttr('readonly', 'readonly');
    });
  });

  context('with value greater then numbers', function() {
    it ('receives the number of star as value', function() {
      // given

      // when
      this.el.raty({ score: 100 });

      // then
      expect(this.el[0].opt.score).toEqual(this.el[0].opt.number);
    });
  });
});
