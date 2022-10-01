describe('#targetText', function () {
  beforeEach(function () {
    $('body').append('<div id="element"></div>').append('<div id="hint"></div>');
  });

  it('set target with none value', function () {
    // given
    var raty = new Raty(document.querySelector('#element'), { target: '#hint', targetText: 'none' });

    // when
    raty.init();

    // then
    expect($('#hint')[0].innerHTML).toEqual('none');
  });
});
