describe('#path', function () {
  beforeEach(function () {
    Helper.create('#el');
  });

  xit('changes the path', function () {
    // given

    // when
    var raty = new Raty('#el', { path: '../demo/images' });

    // then
    expect(raty.self.querySelector('img').src).toEqual('../demo/images/star-off.png');
  });

  xit('accepts data attribute', function () {
    // given
    Helper._append('div', { 'data-path': 'custom' });

    // when
    var raty = new Raty('#el');

    // then
    expect(raty.opt.path).toEqual('custom/');
  });

  context('without slash on the final', function () {
    xit('receives the slash', function () {
      // given

      // when
      var raty = new Raty('#el', { path: '../demo/images' });

      // then
      expect(raty.opt.path).toEqual('../demo/images/');
    });
  });

  context('with slash on the final', function () {
    xit('is keeped', function () {
      // given

      // when
      var raty = new Raty('#el', { path: '../demo/images/' });

      // then
      expect(raty.opt.path).toEqual('../demo/images/');
    });
  });

  context('as null', function () {
    xit('replace to an empty string', function () {
      // given

      // when
      var raty = new Raty('#el', { path: null });

      // then
      expect(raty.self.querySelector('img').src).toEqual('star-off.png');
    });
  });

  context('as undefined', function () {
    xit('replace to an empty string', function () {
      // given

      // when
      var raty = new Raty('#el');

      // then
      expect(raty.self.querySelector('img').src).toEqual('star-off.png');
    });
  });

  context('with :cancel', function () {
    xit('changes the path', function () {
      // given

      // when
      var raty = new Raty('#el', { cancelButton: true, path: '../demo/images' });

      // then
      expect(raty.self.querySelectorAll('.raty-cancel').src).toEqual('../demo/images/cancel-off.png');
    });
  });

  context('with :iconRange', function () {
    xit('changes the path', function () {
      // given

      // when
      var raty = new Raty('#el', { iconRange: [{ range: 1 }], path: '../demo/images' });

      // then
      expect(raty.self.querySelector('img').src).toEqual('../demo/images/star-off.png');
    });
  });
});
