describe('#scoreName', function () {
  xit('changes the score field name', function () {
    // given
    this.el = Helper.create('#el');

    // when
    var raty = new Raty('#el', { scoreName: 'double' });

    // then
    expect(raty.self.querySelector('input').name).toEqual('double');
  });

  xit('accepts callback', function () {
    // given
    this.el = Helper.create('#el');

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
