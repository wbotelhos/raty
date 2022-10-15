describe('#cancelOff', () => {
  it('changes the icon', () => {
    // given
    Helper.create('#el');

    var raty = new Raty(document.querySelector('#el'), {
      cancelButton: true,
      cancelOff: 'star-half.png',
      path: '../src/images',
    });

    // when
    raty.init();

    // then
    var cancel = raty.element.querySelector('.raty-cancel');

    expect(Helper.extension(cancel.src)).toEqual('star-half.png');
  });

  it('accepts data attribute', () => {
    // given
    Helper._append('div', { 'data-cancel-off': 'custom.png' });

    var raty = new Raty(document.querySelector('[data-cancel-off]'), { cancelButton: true, path: '../src/images' });

    // when
    raty.init();

    // then
    var cancel = raty.element.querySelector('.raty-cancel');

    expect(Helper.extension(cancel.src)).toEqual('custom.png');
  });
});
