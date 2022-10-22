describe('#targetText', () => {
  beforeEach(() => {
    var element = document.createElement('div');
    element.id = 'element';
    var hint = document.createElement('div');
    hint.id = 'hint';
    document.querySelector(`body`).appendChild(element);
    document.querySelector(`body`).appendChild(hint);
  });

  it('set target with none value', () => {
    // given
    var raty = new Raty(document.querySelector('#element'), { target: '#hint', targetText: 'none' });

    // when
    raty.init();

    // then
    expect(document.querySelector('#hint').innerHTML).toEqual('none');
  });
});
