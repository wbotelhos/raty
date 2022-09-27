describe('#scoreName', function () {
  beforeEach(function () {
    $.raty.path = '../lib/images';
  });

  afterEach(function () {
    Helper.clear();
  });

  it('changes the score field name', function () {
    // given
    Helper.create('#el');

    // when
    var raty = new Raty('#el', { scoreName: 'double' });

    // then
    expect(raty.self.querySelector('input').name).toEqual('double');
  });

  it('accepts callback', function () {
    // given
    Helper.create('#el');

    // when
    var raty = new Raty('#el', {
      scoreName: function () {
        return 'double';
      },
    });

    // then
    expect(raty.opt.scoreName).toEqual('double');
  });
});
