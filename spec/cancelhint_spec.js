describe('#cancelHint', function() {
  beforeEach(function() {
    $.fn.raty.defaults.path = '../lib/images';

    this.el = Helper.create('#el');
  });

  afterEach(function() {
    Helper.clear();
  });

  it ('changes the cancel hint', function() {
    // given

    // when
    this.el.raty({ cancel: true, cancelHint: 'double' });

    // then
    expect(this.el.children('.raty-cancel')).toHaveAttr('title', 'double');
  });
});
