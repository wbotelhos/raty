describe('#cancelOn', function() {
  beforeEach(function() {
    $.fn.raty.defaults.path = '../lib/images';

    this.el = Helper.create('#el');
  });

  afterEach(function() {
    Helper.clear();
  });

  it ('changes the icon', function() {
    // given
    this.el.raty({ cancel: true, cancelOn: 'star-half.png' });

    var cancel = this.el.children('.raty-cancel');

    // when
    cancel.trigger('mouseover');

    // then
    expect(cancel).toHaveAttr('src', '../lib/images/star-half.png');
  });
});
