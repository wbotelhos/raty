describe('#_adjustPrecision', () => {
  beforeEach(() => {
    Helper.create('#el');
  });

  it('sets *half to true', () => {
    // given

    var options = { half: false };
    var raty = new Raty(document.querySelector('#el'), options);

    // when
    raty._adjustPrecision();

    // then
    expect(raty.opt.half).toEqual(true);
  });
});
