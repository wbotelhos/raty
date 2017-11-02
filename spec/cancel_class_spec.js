describe('#cancelClass', function() {
  afterEach(function() {
    Helper.clear();
  });

  it ('changes the class', function() {
    // given
    this.el = Helper.create('#el');

    // when
    this.el.raty({ cancel: true, cancelClass: 'custom-class' });

    // then
    expect(this.el.find('.custom-class').attr('alt')).toEqual('x');
  });

  it ('accepts data attribute', function() {
    // given
    this.el = Helper._append('div', { 'data-cancel-class': 'custom' });

    // when
    this.el.raty();

    // then
    expect(this.el[0].opt.cancelClass).toEqual('custom');
  });
});
