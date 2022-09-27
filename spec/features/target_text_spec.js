describe('#targetText', function () {
  beforeEach(function () {
    $('body').append('<div id="element"></div>');
    $('body').append('<div id="hint"></div>');
  });

  afterEach(function () {
    $('#element').remove();
    $('#hint').remove();
  });

  it('set target with none value', function () {
    // given
    var raty = new Raty('#element', { target: '#hint', targetText: 'none' });

    // when
    raty.init();

    // then
    expect($('#hint')).toHaveHtml('none');
  });
});
