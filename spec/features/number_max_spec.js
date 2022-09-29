xdescribe('#numberMax', function () {
  beforeEach(function () {
    this.el = Helper.create('#el');
  });

  it('limits the max of "number" option', function () {
    // given
    var raty = new Raty('#el', { number: 2, numberMax: 1 });

    // when
    raty.init();

    // then
    expect(raty.opt.number).toEqual(1);
  });

  it('limits the min of "number" option', function () {
    // given
    var raty = new Raty('#el', { number: -1 });

    // when
    raty.init();

    // then
    expect(raty.opt.number).toEqual(1);
  });
});
