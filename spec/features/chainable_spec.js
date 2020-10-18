describe('chainable', function() {
  beforeEach(function() {
    $.raty.path = '../lib/images';

    $('body').append('<div class="element"></div><div class="element"></div>');
  });

  afterEach(function() {
    $('.element').remove();
  });

  it('is chainable', function() {
    // given
    var self = $('.element');

    // when
    var els = self.raty();

    // then
    expect(els.eq(0)[0]).toBe(self.eq(0)[0]);
    expect(els.eq(1)[0]).toBe(self.eq(1)[0]);
  });
});
