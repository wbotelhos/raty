describe('#number', function () {
  beforeEach(function () {
    Helper.create('#el');
  });

  xit('changes the number of stars', function () {
    // given

    // when
    var raty = new Raty('#el', { number: 1 });

    // then
    expect(raty.self.querySelector('img').length).toEqual(1);
  });

  xit('accepts number as string', function () {
    // given

    // when
    var raty = new Raty('#el', { number: '1' });

    // then
    expect(raty.self.querySelector('img').length).toEqual(1);
  });

  xit('accepts callback', function () {
    // given

    // when
    var raty = new Raty('#el', {
      number: function () {
        return 1;
      },
    });

    // then
    expect(raty.opt.number).toEqual(1);
  });

  xit('accepts data attribute', function () {
    // given
    Helper._append('div', { 'data-number': 3 });

    // when
    var raty = new Raty('#el');

    // then
    expect(raty.opt.number).toEqual(3);
  });
});
