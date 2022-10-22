describe('markup', () => {
  beforeEach(() => {
    var element = document.createElement('div');
    element.dataset.raty = undefined;
    var element1 = element.cloneNode();
    document.querySelector(`body`).appendChild(element);
    document.querySelector(`body`).appendChild(element1);
  });

  it('creates the default markup', () => {
    // given / when
    var ratys = [];

    document.querySelectorAll('[data-raty]').forEach(function (element) {
      ratys.push(new Raty(element).init());
    });

    // then
    var starsOne = ratys[0].element.querySelectorAll('img');

    expect(starsOne[0].title).toEqual('bad');
    expect(starsOne[1].title).toEqual('poor');
    expect(starsOne[2].title).toEqual('regular');
    expect(starsOne[3].title).toEqual('good');
    expect(starsOne[4].title).toEqual('gorgeous');

    expect(Helper.extension(starsOne[0].getAttribute('src'))).toEqual('star-off.png');
    expect(Helper.extension(starsOne[1].getAttribute('src'))).toEqual('star-off.png');
    expect(Helper.extension(starsOne[2].getAttribute('src'))).toEqual('star-off.png');
    expect(Helper.extension(starsOne[3].getAttribute('src'))).toEqual('star-off.png');
    expect(Helper.extension(starsOne[4].getAttribute('src'))).toEqual('star-off.png');

    var scoreOne = ratys[0].element.querySelector('input');

    expect(scoreOne.type).toEqual('hidden');
    expect(scoreOne.name).toEqual('score');
    expect(scoreOne.value).toEqual('');

    var starsOne = ratys[1].element.querySelectorAll('img');

    expect(starsOne[0].title).toEqual('bad');
    expect(starsOne[1].title).toEqual('poor');
    expect(starsOne[2].title).toEqual('regular');
    expect(starsOne[3].title).toEqual('good');
    expect(starsOne[4].title).toEqual('gorgeous');

    expect(Helper.extension(starsOne[0].getAttribute('src'))).toEqual('star-off.png');
    expect(Helper.extension(starsOne[1].getAttribute('src'))).toEqual('star-off.png');
    expect(Helper.extension(starsOne[2].getAttribute('src'))).toEqual('star-off.png');
    expect(Helper.extension(starsOne[3].getAttribute('src'))).toEqual('star-off.png');
    expect(Helper.extension(starsOne[4].getAttribute('src'))).toEqual('star-off.png');

    var scoreOne = ratys[0].element.querySelector('input');

    expect(scoreOne.type).toEqual('hidden');
    expect(scoreOne.name).toEqual('score');
    expect(scoreOne.value).toEqual('');
  });
});
