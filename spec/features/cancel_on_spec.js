xdescribe('#cancelOn', function () {
  it('changes the icon', function () {
    // given
    this.el = Helper.create('#el');

    var raty = new Raty('#el', { cancelButton: true, cancelOn: 'star-half.png' }).init();
    var cancel = raty.self.querySelector('.raty-cancel');

    // when
    Helper.trigger(cancel, 'mouseover');

    // then
    expect(cancel.src.split('/').slice(-1)).toEqual(['star-half.png']);
  });

  it('accepts data attribute', function () {
    // given
    Helper._append('div', { 'data-cancel-on': 'custom' });

    // when
    var raty = new Raty('[data-cancel-on]').init();

    // then
    expect(raty.opt.cancelOn).toEqual('custom');
  });
});
