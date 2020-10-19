describe('#_adjustPrecision', function() {
  beforeEach(function() {
    this.el = Helper.create('#el');
  });

  it ('sets *half to true', function() {
    // given
    var element  = this.el[0];
    var options  = { half: false };
    var instance = new $.raty.Raty(element, options);

    // when
    instance._adjustPrecision();

    // then
    expect(instance.opt.half).toBeTruthy();
  });
});
