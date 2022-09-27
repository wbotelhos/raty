describe('markup', function () {
  beforeEach(function () {
    $.raty.path = '../lib/images';

    $('body').append('<div class="element"></div><div class="element"></div>');
  });

  afterEach(function () {
    $('.element').remove();
  });

  it('creates the default markup', function () {
    // given
    var self = $('.element');

    // when
    self.raty();

    // then
    var stars = self.eq(0).children('img');
    var score = self.eq(0).children('input');

    expect(stars.eq(0).title).toEqual('bad');
    expect(stars.eq(1).title).toEqual('poor');
    expect(stars.eq(2).title).toEqual('regular');
    expect(stars.eq(3).title).toEqual('good');
    expect(stars.eq(4).title).toEqual('gorgeous');
    expect(stars.src).toEqual('../lib/images/star-off.png');
    expect(score.type).toEqual('hidden');
    expect(score.name).toEqual('score');
    expect(score.val()).toEqual('');

    stars = self.eq(1).children('img');
    score = self.eq(0).children('input');

    expect(stars.eq(0).title).toEqual('bad');
    expect(stars.eq(1).title).toEqual('poor');
    expect(stars.eq(2).title).toEqual('regular');
    expect(stars.eq(3).title).toEqual('good');
    expect(stars.eq(4).title).toEqual('gorgeous');
    expect(stars.src).toEqual('../lib/images/star-off.png');
    expect(score.type).toEqual('hidden');
    expect(score.name).toEqual('score');
    expect(score.val()).toEqual('');
  });
});
