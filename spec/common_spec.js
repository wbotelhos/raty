describe('common', function() {
  beforeEach(function() {
    $.fn.raty.defaults.path = '../lib/images';

    this.el = Helper.create('#el');
  });

  afterEach(function() {
    Helper.clear();
  });

  it ('is chainable', function() {
    // given
    // when
    var ref = this.el.raty();

    // then
    expect(ref).toBe(this.el);
  });

  context('on click without mouseover', function() {
    it ('changes the stars to on', function() {
      // given
      var self  = this.el.raty(),
          stars = self.children('img');

      // when
      stars.last().trigger('click');

      // then
      expect(stars).toHaveAttr('src', '../lib/images/star-on.png');
    });
  });
});
