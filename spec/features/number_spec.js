describe('#number', function () {
  it('changes the number of stars', function () {
    // given
    this.el = Helper.create('#el');

    var raty = new Raty('#el', { number: 1 });

    // when
    raty.init();

    // then
    expect(raty.self.querySelectorAll('img').length).toEqual(1);
  });

  it('accepts number as string', function () {
    // given
    this.el = Helper.create('#el');

    var raty = new Raty('#el', { number: '1' });

    // when
    raty.init();

    // then
    expect(raty.self.querySelectorAll('img').length).toEqual(1);
  });

  it('accepts callback', function () {
    // given
    this.el = Helper.create('#el');

    var raty = new Raty('#el', {
      number: function () {
        return 1;
      },
    });

    // when
    raty.init();

    // then
    expect(raty.opt.number).toEqual(1);
  });

  it('accepts data attribute', function () {
    // given
    Helper._append('div', { 'data-number': 3 });

    var raty = new Raty('[data-number]');

    // when
    raty.init();

    // then
    expect(raty.opt.number).toEqual(3);
  });
});
