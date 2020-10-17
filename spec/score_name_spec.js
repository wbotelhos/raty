describe('#scoreName', function() {
  beforeEach(function() {
    $.fn.raty.defaults.path = '../lib/images';
  });

  afterEach(function() {
    Helper.clear();
  });

  it ('changes the score field name', function() {
    // given
    this.el = Helper.create('#el');

    // when
    this.el.raty({ scoreName: 'double' });

    // then
    expect(this.el.children('input')).toHaveAttr('name', 'double');
  });

  it ('accepts callback', function() {
    // given
    this.el = Helper.create('#el');

    // when
    this.el.raty({ scoreName: function() { return 'double'; } });

    // then
    expect(this.el[0].opt.scoreName).toEqual('double');
  });
});
