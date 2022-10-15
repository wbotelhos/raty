describe('#_adjustStarName', () => {
  beforeEach(() => {
    Helper.create('#el');
  });

  it('set *path to empty', () => {
    // given

    var options = { path: 'path' };
    var raty = new Raty(document.querySelector('#el'), options);

    // when
    raty._adjustStarName();

    // then
    expect(raty.opt.path).toEqual('');
  });

  it('replaces "." to "-" on stars name', () => {
    // given

    var options = {
      cancelOff: 'x.x',
      cancelOn: 'x.x',
      starHalf: 'x.x',
      starOff: 'x.x',
      starOn: 'x.x',
    };
    var raty = new Raty(document.querySelector('#el'), options);

    // when
    raty._adjustStarName();

    // then
    expect(raty.opt.cancelOff).toEqual('x-x');
    expect(raty.opt.cancelOn).toEqual('x-x');
    expect(raty.opt.starHalf).toEqual('x-x');
    expect(raty.opt.starOff).toEqual('x-x');
    expect(raty.opt.starOn).toEqual('x-x');
  });
});
