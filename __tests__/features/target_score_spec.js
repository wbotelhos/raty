describe('#targetScore', () => {
  let testContext;

  beforeEach(() => {
    testContext = {};
  });

  beforeEach(() => {
    var element = document.createElement('div');
    element.id = 'element';

    const body = document.querySelector(`body`);

    body.appendChild(element);

    var score = document.createElement('input');
    score.type = 'text';
    score.id = 'score';

    body.appendChild(score);

    testContext.scoreField = score;
  });

  afterEach(() => {
    document.querySelector('#element').remove();

    testContext.scoreField.remove();
  });

  it('avoids the creation of default score field', () => {
    // given
    var raty = new Raty(document.querySelector('#element'), { targetScore: '#score' });

    // when
    raty.init();

    // then
    expect(raty.element.querySelector('input')).toEqual(null);
  });

  it('changes the place where score will be setted', () => {
    // given
    var raty = new Raty(document.querySelector('#element'), { targetScore: '#score' }).init();
    var star = raty.element.querySelector('img');

    // when
    Helper.trigger(star, 'click');

    // then
    expect(document.querySelector('#score').value).toEqual('1');
  });
});
