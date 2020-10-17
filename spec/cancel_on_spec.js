describe('#cancelOn', function() {
  beforeEach(function() {
    $.fn.raty.defaults.path = '../lib/images';
  });

  afterEach(function() {
    Helper.clear();
  });

  it ('changes the icon', function() {
    // given
    this.el = Helper.create('#el');

    this.el.raty({ cancel: true, cancelOn: 'star-half.png' });

    var cancel = this.el.children('.raty-cancel');

    // when
    cancel.trigger('mouseover');

    // then
    expect(cancel).toHaveAttr('src', '../lib/images/star-half.png');
  });

  it ('accepts data attribute', function() {
    // given
    this.el = Helper._append('div', { 'data-cancel-on': 'custom' });

    // when
    this.el.raty();

    // then
    expect(this.el[0].opt.cancelOn).toEqual('custom');
  });
});
