describe('#cancelHint', function() {
  beforeEach(function() {
    $.raty.path = '../lib/images';
  });

  afterEach(function() {
    Helper.clear();
  });

  it ('changes the cancel hint', function() {
    // given
    var el = Helper.create('#el');

    // when
    el.raty({ cancelButton: true, cancelHint: 'double' });

    // then
    expect(el.children('.raty-cancel')).toHaveAttr('title', 'double');
  });

  it ('accepts data attribute', function() {
    // given
    var el = Helper._append('div', { 'data-cancel-hint': 'custom' });

    // when
    el.raty();

    // then
    expect(el.data('raty').opt.cancelHint).toEqual('custom');
  });
});
