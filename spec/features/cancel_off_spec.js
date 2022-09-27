describe('#cancelOff', function () {
  it('changes the icon', function () {
    // given
    Helper.create('#el');

    // when
    var raty = new Raty('#el', { cancelButton: true, cancelOff: 'star-half.png', path: '../lib/images' }).init();

    // then
    debugger;
    var cancel = raty.self.querySelector('.raty-cancel');

    expect(cancel.src).toEqual('../lib/images/star-half.png');
  });

  xit('accepts data attribute', function () {
    // given
    Helper._append('div', { 'data-cancel-off': 'custom.png' });

    // when
    var raty = new Raty('#el', { cancelButton: true, path: '../lib/images' }).init();

    // then
    var cancel = raty.self.querySelector('.raty-cancel');

    expect(cancel.src).toEqual('../lib/images/custom.png');
  });
});
