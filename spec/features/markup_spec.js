describe('markup', function () {
  beforeEach(function () {
    $('body').append('<div class="element"></div><div class="element"></div>');
  });

  afterEach(function () {
    $('.element').remove();
  });

  xit('creates the default markup', function () {
    // given / when
    var raty = new Raty('.element').init();

    // then
    var stars = raty.self[0].children('img');
    var score = raty.self[0].children('input');

    expect(stars[0].title).toEqual('bad');
    expect(stars[1].title).toEqual('poor');
    expect(stars[2].title).toEqual('regular');
    expect(stars[3].title).toEqual('good');
    expect(stars[4].title).toEqual('gorgeous');
    expect(Helper.extension(stars.src)).toEqual('star-off.png');
    expect(score.type).toEqual('hidden');
    expect(score.name).toEqual('score');
    expect(score.value).toEqual('');

    stars = raty.self[1].children('img');
    score = raty.self[0].children('input');

    expect(stars[0].title).toEqual('bad');
    expect(stars[1].title).toEqual('poor');
    expect(stars[2].title).toEqual('regular');
    expect(stars[3].title).toEqual('good');
    expect(stars[4].title).toEqual('gorgeous');
    expect(Helper.extension(stars.src)).toEqual('star-off.png');
    expect(score.type).toEqual('hidden');
    expect(score.name).toEqual('score');
    expect(score.value).toEqual('');
  });
});
