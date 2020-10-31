describe('#_adjustStarName', function() {
  beforeEach(function() {
    this.el = Helper.create('#el');
  });

  it ('set *path to empty', function() {
    // given
    var element  = this.el[0];
    var options  = { path: 'path' };
    var instance = new $.raty.Raty(element, options);

    // when
    instance._adjustStarName();

    // then
    expect(instance.opt.path).toEqual('');
  });

  it ('replaces "." to "-" on stars name', function() {
    // given
    var element  = this.el[0];
    var options  = { cancelOff: 'x.x', cancelOn: 'x.x', starHalf: 'x.x', starOff: 'x.x', starOn: 'x.x' };
    var instance = new $.raty.Raty(element, options);

    // when
    instance._adjustStarName();

    // then
    expect(instance.opt.cancelOff).toEqual('x-x');
    expect(instance.opt.cancelOn).toEqual('x-x');
    expect(instance.opt.starHalf).toEqual('x-x');
    expect(instance.opt.starOff).toEqual('x-x');
    expect(instance.opt.starOn).toEqual('x-x');
  });
});
