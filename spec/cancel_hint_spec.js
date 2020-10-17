describe('#cancelHint', function() {
  beforeEach(function() {
    $.fn.raty.defaults.path = '../lib/images';
  });

  afterEach(function() {
    Helper.clear();
  });

  it ('changes the cancel hint', function() {
    // given
    var el = Helper.create('#el');

    // when
    el.raty({ cancel: true, cancelHint: 'double' });

    // then
    expect(el.children('.raty-cancel')).toHaveAttr('title', 'double');
  });

  it ('accepts data attribute', function() {
    // given
    var el = Helper._append('div', { 'data-cancel-hint': 'custom' });

    // when
    el.raty();

    // then
    expect(el[0].opt.cancelHint).toEqual('custom');
  });
});
