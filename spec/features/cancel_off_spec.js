describe('#cancelOff', function () {
  xit('changes the icon', function () {
    // given
    this.el = Helper.create('#el');

    // when
    var raty = new Raty('#el', { cancelButton: true, cancelOff: 'star-half.png', path: '../lib/images' }).init();

    // then
    var cancel = raty.self.querySelector('.raty-cancel');

    expect(Helper.extension(cancel.src)).toEqual('star-half.png');
  });

  xit('accepts data attribute', function () {
    // given
    Helper._append('div', { 'data-cancel-off': 'custom.png' });

    // when
    var raty = new Raty('#el', { cancelButton: true, path: '../lib/images' }).init();

    // then
    var cancel = raty.self.querySelector('.raty-cancel');

    expect(Helper.extension(cancel.src)).toEqual('custom.png');
  });
});
