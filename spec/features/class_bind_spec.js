describe('class bind', function() {
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

  it ('creates the default markup', function() {
    // given
    var self = $('.element');

    // when
    self.raty();

    // then
    var stars  = self.eq(0).children('img');
    var score = self.eq(0).children('input');

    expect(stars.eq(0)).toHaveAttr('title', 'bad');
    expect(stars.eq(1)).toHaveAttr('title', 'poor');
    expect(stars.eq(2)).toHaveAttr('title', 'regular');
    expect(stars.eq(3)).toHaveAttr('title', 'good');
    expect(stars.eq(4)).toHaveAttr('title', 'gorgeous');
    expect(stars).toHaveAttr('src', '../lib/images/star-off.png');
    expect(score).toHaveAttr('type', 'hidden');
    expect(score).toHaveAttr('name', 'score');
    expect(score.val()).toEqual('');

    stars  = self.eq(1).children('img');
    score = self.eq(0).children('input');

    expect(stars.eq(0)).toHaveAttr('title', 'bad');
    expect(stars.eq(1)).toHaveAttr('title', 'poor');
    expect(stars.eq(2)).toHaveAttr('title', 'regular');
    expect(stars.eq(3)).toHaveAttr('title', 'good');
    expect(stars.eq(4)).toHaveAttr('title', 'gorgeous');
    expect(stars).toHaveAttr('src', '../lib/images/star-off.png');
    expect(score).toHaveAttr('type', 'hidden');
    expect(score).toHaveAttr('name', 'score');
    expect(score.val()).toEqual('');
  });
});
