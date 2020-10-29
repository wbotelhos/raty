describe('#cancelOn', function() {
  beforeEach(function() {
    $.raty.path = '../lib/images';
  });

  afterEach(function() {
    Helper.clear();
  });

  it ('changes the icon', function() {
    // given
    this.el = Helper.create('#el');

    this.el.raty({ cancelButton: true, cancelOn: 'star-half.png' });

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
    expect(this.el.data('raty').opt.cancelOn).toEqual('custom');
  });
});
