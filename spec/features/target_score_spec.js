describe('#targetScore', function () {
  beforeEach(function () {
    $('body').append('<div id="element"></div>');

    this.scoreField = $('<input id="score" type="text" />').appendTo('body');
  });

  afterEach(function () {
    $('#element').remove();
    $('#hint').remove();

    this.scoreField.remove();
  });

  it('avoids the creation of default score field', function () {
    // given
    var raty = new Raty(document.querySelector('#element'), { targetScore: '#score' });

    // when
    raty.init();

    // then
    expect(raty.element.querySelector('input')).toEqual(null);
  });

  it('changes the place where score will be setted', function () {
    // given
    var raty = new Raty(document.querySelector('#element'), { targetScore: '#score' }).init();
    var star = raty.element.querySelector('img');

    // when
    Helper.trigger(star, 'click');

    // then
    expect(document.querySelector('#score').value).toEqual('1');
  });
});
