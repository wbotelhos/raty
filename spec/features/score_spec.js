describe('#score', function () {
  beforeEach(function () {
    $.raty.path = '../lib/images';

    Helper.create('#el');
  });

  afterEach(function () {
    Helper.clear();
  });

  it('can be initialized on bind', function () {
    // given

    // when
    var raty = new Raty('#el', { score: 1 });

    // then
    expect(raty.self.querySelector('input')).toHaveValue('1');
  });

  it('turns on stars', function () {
    // given

    // when
    var raty = new Raty('#el', { score: 5 });

    // then
    expect(raty.self.querySelector('img').src).toEqual('../lib/images/star-on.png');
  });

  it('accepts callback', function () {
    // given

    // when
    var raty = new Raty('#el', {
      score: function () {
        return 1;
      },
    });

    // then
    expect(raty.opt.score).toEqual(1);
  });

  it('accepts data attribute', function () {
    // given
    Helper._append('div', { 'data-score': 3 });

    // when
    var raty = new Raty('#el');

    // then
    expect(raty.opt.score).toEqual(3);
  });

  context('with negative number', function () {
    it('does not set the score', function () {
      // given

      // when
      var raty = new Raty('#el', { score: -1 });

      // then
      expect(raty.self.querySelector('input')).toHaveValue('');
    });
  });

  context('with :readOnly', function () {
    it('becomes readOnly too', function () {
      // given

      // when
      var raty = new Raty('#el', { readOnly: true });

      // then
      expect(raty.self.querySelector('input').readonly).toEqual('readonly');
    });
  });

  context('with value greater then numbers', function () {
    it('receives the number of star as value', function () {
      // given

      // when
      var raty = new Raty('#el', { score: 100 });

      // then
      expect(raty.opt.score).toEqual(raty.opt.number);
    });
  });
});
