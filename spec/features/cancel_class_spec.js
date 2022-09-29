describe('#cancelClass', function () {
  xit('changes the class', function () {
    // given
    this.el = Helper.create('#el');

    // when
    var raty = new Raty('#el', { cancelButton: true, cancelClass: 'custom-class' }).init();

    // then
    expect(raty.self.querySelector('.custom-class').alt).toEqual('x');
  });

  xit('accepts data attribute', function () {
    // given
    Helper._append('div', { 'data-cancel-class': 'custom' });

    // when
    var raty = new Raty('[data-cancel-class]').init();

    // then
    expect(raty.opt.cancelClass).toEqual('custom');
  });
});
