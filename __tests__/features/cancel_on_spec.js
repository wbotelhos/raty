describe('#cancelOn', () => {
  it('changes the icon', () => {
    // given
    Helper.create('#el');

    var raty = new Raty(document.querySelector('#el'), { cancelButton: true, cancelOn: 'star-half.png' }).init();
    var cancel = raty.element.querySelector('.raty-cancel');

    // when
    Helper.trigger(cancel, 'mouseover');

    // then
    expect(Helper.extension(cancel.src)).toEqual('star-half.png');
  });

  it('accepts data attribute', () => {
    // given
    Helper._append('div', { 'data-cancel-on': 'custom' });

    // when
    var raty = new Raty(document.querySelector('[data-cancel-on]')).init();

    // then
    expect(raty.opt.cancelOn).toEqual('custom');
  });
});
