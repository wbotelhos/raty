describe('#_adjustPrecision', function () {
  beforeEach(function () {
    Helper.create('#el');
  });

  xit('sets *half to true', function () {
    // given

    var options = { half: false };
    var raty = new Raty('#el', options);

    // when
    raty._adjustPrecision();

    // then
    expect(raty.opt.half).toEqual(true);
  });
});
