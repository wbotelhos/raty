describe('#cancelPlace', function () {
  xit('accepts data attribute', function () {
    // given
    Helper._append('div', { 'data-cancel-place': 'custom' });

    // when
    var raty = new Raty('[data-cancel-place]').init();

    // then
    expect(raty.opt.cancelPlace).toEqual('custom');
  });

  context('when left', function () {
    xit('is prepended', function () {
      // given
      Helper.create('#el');

      // when
      var raty = new Raty('#el', { cancelButton: true, cancelPlace: 'left' }).init();

      // then
      expect(raty.self.querySelector('img').classList.contains('raty-cancel')).toEqual(true);
    });
  });

  context('when left', function () {
    it('is appended', function () {
      // given
      Helper.create('#el');

      // when
      var raty = new Raty('#el', { cancelButton: true, cancelPlace: 'right' }).init();

      // then
      var stars = raty.self.querySelectorAll('img');

      expect(stars[stars.length - 1].classList.contains('raty-cancel')).toEqual(true);
    });
  });
});
