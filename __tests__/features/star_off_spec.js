describe('#starOff', () => {
  it('changes the stars off', () => {
    // given
    Helper.create('#el');

    var raty = new Raty(document.querySelector('#el'), { starOff: 'star-half.png' });

    // when
    raty.init();

    // then
    var stars = raty.element.querySelectorAll('img');

    expect(Helper.extension(stars[0].src)).toEqual('star-half.png');
    expect(Helper.extension(stars[1].src)).toEqual('star-half.png');
    expect(Helper.extension(stars[2].src)).toEqual('star-half.png');
    expect(Helper.extension(stars[3].src)).toEqual('star-half.png');
    expect(Helper.extension(stars[4].src)).toEqual('star-half.png');
  });

  it('accepts data attribute', () => {
    // given
    Helper._append('div', { 'data-star-off': 'custom' });

    // when
    var raty = new Raty(document.querySelector('[data-star-off]'));

    // then
    expect(raty.opt.starOff).toEqual('custom');
  });

  context('with :starType', function () {
    it('uses the given element', () => {
      // given
      Helper.create('#el');

      var raty = new Raty(document.querySelector('#el'), { starType: 'i' });

      // when
      raty.init();

      // then
      var stars = raty.element.querySelectorAll('i');

      expect(stars[0].tagName).toEqual('I');
      expect(stars[1].tagName).toEqual('I');
      expect(stars[2].tagName).toEqual('I');
      expect(stars[3].tagName).toEqual('I');
      expect(stars[4].tagName).toEqual('I');
    });

    it('normalizes the class name', () => {
      // given
      Helper.create('#el');

      var raty = new Raty(document.querySelector('#el'), { starType: 'i' });

      // when
      raty.init();

      // then
      var stars = raty.element.querySelectorAll('i');

      expect(stars[0].classList.contains('star-off-png')).toEqual(true);
      expect(stars[1].classList.contains('star-off-png')).toEqual(true);
      expect(stars[2].classList.contains('star-off-png')).toEqual(true);
      expect(stars[3].classList.contains('star-off-png')).toEqual(true);
      expect(stars[4].classList.contains('star-off-png')).toEqual(true);
    });

    it('does not create the "src" attribute', () => {
      // given
      Helper.create('#el');

      var raty = new Raty(document.querySelector('#el'), { starType: 'i' });

      // when
      raty.init();

      // then
      var stars = raty.element.querySelectorAll('i');

      expect(stars[0].src).toEqual(undefined);
      expect(stars[1].src).toEqual(undefined);
      expect(stars[2].src).toEqual(undefined);
      expect(stars[3].src).toEqual(undefined);
      expect(stars[4].src).toEqual(undefined);
    });

    it('creates the "data-alt" attribute', () => {
      // given
      Helper.create('#el');

      var raty = new Raty(document.querySelector('#el'), { starType: 'i' });

      // when
      raty.init();

      // then
      var stars = raty.element.querySelectorAll('i');

      expect(stars[0].getAttribute('data-alt')).toEqual('1');
      expect(stars[1].getAttribute('data-alt')).toEqual('2');
      expect(stars[2].getAttribute('data-alt')).toEqual('3');
      expect(stars[3].getAttribute('data-alt')).toEqual('4');
      expect(stars[4].getAttribute('data-alt')).toEqual('5');
    });

    it('does not create the "alt" attribute', () => {
      // given
      Helper.create('#el');

      var raty = new Raty(document.querySelector('#el'), { starType: 'i' });

      // when
      raty.init();

      // then
      var stars = raty.element.querySelectorAll('i');

      expect(stars[0].alt).toEqual(undefined);
      expect(stars[1].alt).toEqual(undefined);
      expect(stars[2].alt).toEqual(undefined);
      expect(stars[3].alt).toEqual(undefined);
      expect(stars[4].alt).toEqual(undefined);
    });
  });
});
