describe('#cancelClass', function () {
  it('changes the class', function () {
    // given
    Helper.create('#el');

    var raty = new Raty(document.querySelector('#el'), { cancelButton: true, cancelClass: 'custom-class' });

    // when
    raty.init();

    // then
    expect(raty.element.querySelector('.custom-class').alt).toEqual('x');
  });

  it('accepts data attribute', function () {
    // given
    Helper._append('div', { 'data-cancel-class': 'custom' });

    // when
    var raty = new Raty(document.querySelector('[data-cancel-class]')).init();

    // then
    expect(raty.opt.cancelClass).toEqual('custom');
  });
});
