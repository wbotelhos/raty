describe('#cancelHint', () => {
  it('changes the cancel hint', () => {
    // given
    Helper.create('#el');

    // when
    var raty = new Raty(document.querySelector('#el'), {
      cancelButton: true,
      cancelHint: 'double',
      path: '../src/images',
    }).init();

    // then
    expect(raty.element.querySelector('.raty-cancel').title).toEqual('double');
  });

  it('accepts data attribute', () => {
    // given
    Helper._append('div', { 'data-cancel-hint': 'custom' });

    // when
    var raty = new Raty(document.querySelector('[data-cancel-hint]'), { path: '../src/images' }).init();

    // then
    expect(raty.opt.cancelHint).toEqual('custom');
  });
});
