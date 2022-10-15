describe('#scoreName', () => {
  it('changes the score field name', () => {
    // given
    Helper.create('#el');

    var raty = new Raty(document.querySelector('#el'), { scoreName: 'double' });

    // when
    raty.init();

    // then
    expect(raty.element.querySelector('input').name).toEqual('double');
  });

  it('accepts callback return and has the correct arguments', () => {
    // given
    Helper.create('#el');

    var raty = new Raty(document.querySelector('#el'), {
      scoreName: function (element) {
        this._this = this;
        this._element = element;

        return 'name';
      },
    });

    // when
    raty.init();

    // then
    expect(raty.opt.scoreName).toEqual('name');
    expect(raty._this).toBe(raty);
    expect(raty._element).toEqual(document.querySelector('#el'));
  });
});
