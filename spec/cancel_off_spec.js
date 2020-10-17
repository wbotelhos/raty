describe('#cancelOff', function() {
  beforeEach(function() {
    $.fn.raty.defaults.path = '../lib/images';
  });

  afterEach(function() {
    Helper.clear();
  });

  it ('changes the icon', function() {
    // given
    this.el = Helper.create('#el');

    // when
    this.el.raty({ cancel: true, cancelOff: 'star-half.png' });

    // then
    var cancel = this.el.children('.raty-cancel');

    expect(cancel).toHaveAttr('src', '../lib/images/star-half.png');
  });

  it ('accepts data attribute', function() {
    // given
    this.el = Helper._append('div', { 'data-cancel-off': 'custom.png' });

    // when
    this.el.raty({ cancel: true });

    // then
    var cancel = this.el.children('.raty-cancel');

    expect(cancel).toHaveAttr('src', '../lib/images/custom.png');
  });
});
