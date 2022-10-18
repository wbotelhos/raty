describe('#numberMax', () => {
  beforeEach(() => {
    Helper.create('#el');
  });

  it('limits the max of "number" option', () => {
    // given
    var raty = new Raty(document.querySelector('#el'), { number: 2, numberMax: 1 });

    // when
    raty.init();

    // then
    expect(raty.opt.number).toEqual(1);
  });

  it('limits the min of "number" option', () => {
    // given
    var raty = new Raty(document.querySelector('#el'), { number: -1 });

    // when
    raty.init();

    // then
    expect(raty.opt.number).toEqual(1);
  });
});
