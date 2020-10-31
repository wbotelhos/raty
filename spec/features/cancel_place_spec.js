describe('#cancelPlace', function() {
  beforeEach(function() {
    $.raty.path = '../lib/images';

    this.el = Helper.create('#el');
  });

  afterEach(function() {
    Helper.clear();
  });

  it ('accepts data attribute', function() {
    // given
    this.el = Helper._append('div', { 'data-cancel-place': 'custom' });

    // when
    this.el.raty();

    // then
    expect(this.el.data('raty').opt.cancelPlace).toEqual('custom');
  });

  context('when left', function() {
    it ('is prepended', function() {
      // given

      // when
      this.el.raty({ cancelButton: true, cancelPlace: 'left' });

      // then
      expect(this.el.children('img:first')).toHaveClass('raty-cancel');
    });
  });

  context('when left', function() {
    it ('is appended', function() {
      // given

      // when
      this.el.raty({ cancelButton: true, cancelPlace: 'right' });

      // then
      expect(this.el.children('img:last')).toHaveClass('raty-cancel');
    });
  });
});
