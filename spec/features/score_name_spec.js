describe('#scoreName', function () {
  it('changes the score field name', function () {
    // given
    this.el = Helper.create('#el');

    var raty = new Raty(document.querySelector('#el'), { scoreName: 'double' });

    // when
    raty.init();

    // then
    expect(raty.element.querySelector('input').name).toEqual('double');
  });

  it('accepts callback', function () {
    // given
    this.el = Helper.create('#el');

    var raty = new Raty(document.querySelector('#el'), {
      scoreName: function () {
        return 'double';
      },
    });

    // when
    raty.init();

    // then
    expect(raty.opt.scoreName).toEqual('double');
  });
});
