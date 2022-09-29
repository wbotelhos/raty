describe('#cancelOff', function () {
  it('changes the icon', function () {
    // given
    this.el = Helper.create('#el');

    var raty = new Raty('#el', { cancelButton: true, cancelOff: 'star-half.png', path: '../lib/images' });

    // when
    raty.init();

    // then
    var cancel = raty.self.querySelector('.raty-cancel');

    expect(Helper.extension(cancel.src)).toEqual('star-half.png');
  });

  it('accepts data attribute', function () {
    // given
    Helper._append('div', { 'data-cancel-off': 'custom.png' });

    var raty = new Raty('[data-cancel-off]', { cancelButton: true, path: '../lib/images' });

    // when
    raty.init();

    // then
    var cancel = raty.self.querySelector('.raty-cancel');

    expect(Helper.extension(cancel.src)).toEqual('custom.png');
  });
});
