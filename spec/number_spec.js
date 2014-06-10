describe('#number', function() {
  beforeEach(function() {
    $.fn.raty.defaults.path = '../lib/images';

    this.el = Helper.create('#el');
  });

  afterEach(function() {
    Helper.clear();
  });

  it ('changes the number of stars', function() {
    // given

    // when
    this.el.raty({ number: 1 });

    // then
    expect(this.el.children('img').length).toEqual(1);
  });

  it ('accepts number as string', function() {
    // given

    // when
    this.el.raty({ number: '1' });

    // then
    expect(this.el.children('img').length).toEqual(1);
  });

  it ('accepts callback', function() {
    // given

    // when
    this.el.raty({ number: function() { return 1; } });

    // then
    expect(this.el[0].opt.number).toEqual(1);
  });
});
