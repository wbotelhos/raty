describe('#cancelPlace', () => {
  it('accepts data attribute', () => {
    // given
    Helper._append('div', { 'data-cancel-place': 'custom' });

    // when
    var raty = new Raty(document.querySelector('[data-cancel-place]')).init();

    // then
    expect(raty.opt.cancelPlace).toEqual('custom');
  });

  context('when left', function () {
    it('is prepended', () => {
      // given
      Helper.create('#el');

      // when
      var raty = new Raty(document.querySelector('#el'), { cancelButton: true, cancelPlace: 'left' }).init();

      // then
      expect(raty.element.querySelector('img').classList.contains('raty-cancel')).toEqual(true);
    });
  });

  context('when left', function () {
    it('is appended', () => {
      // given
      Helper.create('#el');

      // when
      var raty = new Raty(document.querySelector('#el'), { cancelButton: true, cancelPlace: 'right' }).init();

      // then
      var stars = raty.element.querySelectorAll('img');

      expect(stars[stars.length - 1].classList.contains('raty-cancel')).toEqual(true);
    });
  });
});
