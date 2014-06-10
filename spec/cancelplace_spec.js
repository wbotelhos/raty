describe('#cancelPlace', function() {
  beforeEach(function() {
    $.fn.raty.defaults.path = '../lib/images';

    this.el = Helper.create('#el');
  });

  afterEach(function() {
    Helper.clear();
  });

  context('when left', function() {
    it ('is prepended', function() {
      // given

      // when
      this.el.raty({ cancel: true, cancelPlace: 'left' });

      // then
      expect(this.el.children('img:first')).toHaveClass('raty-cancel');
    });
  });

  context('when left', function() {
    it ('is appended', function() {
      // given

      // when
      this.el.raty({ cancel: true, cancelPlace: 'right' });

      // then
      expect(this.el.children('img:last')).toHaveClass('raty-cancel');
    });
  });
});
