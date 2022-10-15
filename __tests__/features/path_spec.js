describe('#path', () => {
  beforeEach(() => {
    Helper.create('#el');
  });

  it('accepts callback return and has the correct arguments', () => {
    // given
    var raty = new Raty(document.querySelector('#el'), {
      path: function (element) {
        this._this = this;
        this._element = element;

        return 'path';
      },
    });

    // when
    raty.init();

    // then
    expect(raty.opt.path).toEqual('path/');
    expect(raty._this).toBe(raty);
    expect(raty._element).toEqual(document.querySelector('#el'));
  });

  it('changes the path', () => {
    // given
    var raty = new Raty(document.querySelector('#el'), { path: '../demo/images' });

    // when
    raty.init();

    // then
    var stars = raty.element.querySelectorAll('img');

    expect(stars[0].getAttribute('src')).toEqual('../demo/images/star-off.png');
    expect(stars[1].getAttribute('src')).toEqual('../demo/images/star-off.png');
    expect(stars[2].getAttribute('src')).toEqual('../demo/images/star-off.png');
    expect(stars[3].getAttribute('src')).toEqual('../demo/images/star-off.png');
    expect(stars[4].getAttribute('src')).toEqual('../demo/images/star-off.png');
  });

  it('accepts data attribute', () => {
    // given
    Helper._append('div', { 'data-path': 'custom' });

    var raty = new Raty(document.querySelector('[data-path]'));

    // when
    raty.init();

    // then
    expect(raty.opt.path).toEqual('custom/');
  });

  context('without slash on the final', function () {
    it('receives the slash', () => {
      // given
      var raty = new Raty(document.querySelector('#el'), { path: '../demo/images' });

      // when
      raty.init();

      // then
      expect(raty.opt.path).toEqual('../demo/images/');
    });
  });

  context('with slash on the final', function () {
    it('is keeped', () => {
      // given
      var raty = new Raty(document.querySelector('#el'), { path: '../demo/images/' });

      // when
      raty.init();

      // then
      expect(raty.opt.path).toEqual('../demo/images/');
    });
  });

  context('as null', function () {
    it('replace to an empty string', () => {
      // given
      var raty = new Raty(document.querySelector('#el'), { path: null });

      // when
      raty.init();

      // then
      var stars = raty.element.querySelectorAll('img');

      expect(stars[0].getAttribute('src')).toEqual('star-off.png');
      expect(stars[1].getAttribute('src')).toEqual('star-off.png');
      expect(stars[2].getAttribute('src')).toEqual('star-off.png');
      expect(stars[3].getAttribute('src')).toEqual('star-off.png');
      expect(stars[4].getAttribute('src')).toEqual('star-off.png');
    });
  });

  context('as undefined', function () {
    it('replace to an empty string', () => {
      // given
      var raty = new Raty(document.querySelector('#el'));

      // when
      raty.init();

      // then
      var stars = raty.element.querySelectorAll('img');

      expect(stars[0].getAttribute('src')).toEqual('star-off.png');
      expect(stars[1].getAttribute('src')).toEqual('star-off.png');
      expect(stars[2].getAttribute('src')).toEqual('star-off.png');
      expect(stars[3].getAttribute('src')).toEqual('star-off.png');
      expect(stars[4].getAttribute('src')).toEqual('star-off.png');
    });
  });

  context('with :cancel', function () {
    it('changes the path', () => {
      // given
      var raty = new Raty(document.querySelector('#el'), { cancelButton: true, path: '../demo/images' });

      // when
      raty.init();

      // then
      expect(raty.element.querySelector('.raty-cancel').getAttribute('src')).toEqual('../demo/images/cancel-off.png');
    });
  });

  context('with :iconRange', function () {
    it('changes the path', () => {
      // given
      var raty = new Raty(document.querySelector('#el'), { iconRange: [{ range: 1 }], path: '../demo/images' });

      // when
      raty.init();

      // then
      expect(raty.element.querySelector('img').getAttribute('src')).toEqual('../demo/images/star-off.png');
    });
  });
});
