describe('#targetScore', () => {
  let testContext;

  beforeEach(() => {
    testContext = {};
  });

  beforeEach(() => {
    $('body').append('<div id="element"></div>');

    testContext.scoreField = $('<input id="score" type="text" />').appendTo('body');
  });

  afterEach(() => {
    $('#element').remove();
    $('#hint').remove();

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
