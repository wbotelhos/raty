describe('#cancelClass', () => {
  it('changes the class', () => {
    // given
    Helper.create('#el');

    var raty = new Raty(document.querySelector('#el'), { cancelButton: true, cancelClass: 'custom-class' });

    // when
    raty.init();

    // then
    expect(raty.element.querySelector('.custom-class').alt).toEqual('x');
  });

  it('accepts data attribute', () => {
    // given
    Helper._append('div', { 'data-cancel-class': 'custom' });

    // when
    var raty = new Raty(document.querySelector('[data-cancel-class]')).init();

    // then
    expect(raty.opt.cancelClass).toEqual('custom');
  });
});
