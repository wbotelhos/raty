describe('#number', function () {
  beforeEach(function () {
    $.raty.path = '../lib/images';

    Helper.create('#el');
  });

  afterEach(function () {
    Helper.clear();
  });

  it('changes the number of stars', function () {
    // given

    // when
    var raty = new Raty('#el', { number: 1 });

    // then
    expect(raty.self.querySelector('img').length).toEqual(1);
  });

  it('accepts number as string', function () {
    // given

    // when
    var raty = new Raty('#el', { number: '1' });

    // then
    expect(raty.self.querySelector('img').length).toEqual(1);
  });

  it('accepts callback', function () {
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

  it('accepts data attribute', function () {
    // given
    Helper._append('div', { 'data-number': 3 });

    // when
    var raty = new Raty('#el');

    // then
    expect(raty.opt.number).toEqual(3);
  });
});
