describe('#click', () => {
  beforeEach(() => {
    Helper.create('#el');
  });

  it('has "this" scope as the object instance ', () => {
    // given
    var raty = new Raty(document.querySelector('#el'), {
      cancelButton: true,
      click: function () {
        this.result = this;
      },
    }).init();

    var star = Helper.last(raty.element.querySelectorAll('img'));

    // when
    Helper.trigger(star, 'click');

    // then
    expect(raty.result).toBe(raty);
  });

  it('receives the score as integer', () => {
    // given
    var raty = new Raty(document.querySelector('#el'), {
      click: function (score) {
        this.result = score;
      },
    }).init();

    var star = Helper.last(raty.element.querySelectorAll('img'));

    // when
    Helper.trigger(star, 'click');

    expect(raty.result).toEqual(5);
  });

  it('receives the element', () => {
    // given
    var raty = new Raty(document.querySelector('#el'), {
      click: function (_score, element) {
        this.result = element;
      },
    }).init();

    var star = Helper.last(raty.element.querySelectorAll('img'));

    // when
    Helper.trigger(star, 'click');

    // then
    expect(raty.result).toEqual(document.querySelector('#el'));
  });

  it('receives the mouse event', () => {
    // given
    var raty = new Raty(document.querySelector('#el'), {
      click: function (_score, _element, evt) {
        this.result = evt;
      },
    }).init();

    var star = Helper.last(raty.element.querySelectorAll('img'));

    // when
    Helper.trigger(star, 'click');

    // then
    expect(raty.result.type).toEqual('click');
  });

  context('with return as undefined', function () {
    it('executes click behavior', () => {
      // given
      var raty = new Raty(document.querySelector('#el'), {
        click: function () {},
      }).init();

      var star = Helper.last(raty.element.querySelectorAll('img'));

      // when
      Helper.trigger(star, 'click');

      // then
      expect(raty.element.querySelector('input').value).toEqual('5');
    });

    it('turns on the stars', () => {
      // given
      var raty = new Raty(document.querySelector('#el'), {
        click: function () {},
      }).init();

      var stars = raty.element.querySelectorAll('img');

      // when
      Helper.trigger(stars[0], 'click');

      // then
      expect(Helper.extension(stars[0].src)).toEqual('star-on.png');
      expect(Helper.extension(stars[1].src)).toEqual('star-off.png');
      expect(Helper.extension(stars[2].src)).toEqual('star-off.png');
      expect(Helper.extension(stars[3].src)).toEqual('star-off.png');
      expect(Helper.extension(stars[4].src)).toEqual('star-off.png');
    });
  });

  context('with return as true', function () {
    it('applies the score', () => {
      // given
      var raty = new Raty(document.querySelector('#el'), {
        click: function () {
          return true;
        },
      }).init();

      var star = Helper.last(raty.element.querySelectorAll('img'));

      // when
      Helper.trigger(star, 'click');

      // then
      expect(raty.element.querySelector('input').value).toEqual('5');
    });

    it('turns on the stars', () => {
      // given
      var raty = new Raty(document.querySelector('#el'), {
        click: function () {
          return true;
        },
      }).init();

      var stars = raty.element.querySelectorAll('img');

      // when
      Helper.trigger(stars[0], 'click');

      // then
      expect(Helper.extension(stars[0].src)).toEqual('star-on.png');
      expect(Helper.extension(stars[1].src)).toEqual('star-off.png');
      expect(Helper.extension(stars[2].src)).toEqual('star-off.png');
      expect(Helper.extension(stars[3].src)).toEqual('star-off.png');
      expect(Helper.extension(stars[4].src)).toEqual('star-off.png');
    });
  });

  context('with return as false', function () {
    it('does not applies the score', () => {
      // given
      var raty = new Raty(document.querySelector('#el'), {
        click: function () {
          return false;
        },
      }).init();

      var star = raty.element.querySelector('img');

      // when
      Helper.trigger(star, 'click');

      // then
      expect(raty.element.querySelector('input').value).toEqual('');
    });

    it('does not turns on the stars', () => {
      // given
      var raty = new Raty(document.querySelector('#el'), {
        click: function () {
          return false;
        },
      }).init();

      var stars = raty.element.querySelectorAll('img');

      // when
      Helper.trigger(stars[0], 'click');

      // then
      expect(Helper.extension(stars[0].src)).toEqual('star-off.png');
      expect(Helper.extension(stars[1].src)).toEqual('star-off.png');
      expect(Helper.extension(stars[2].src)).toEqual('star-off.png');
      expect(Helper.extension(stars[3].src)).toEqual('star-off.png');
      expect(Helper.extension(stars[4].src)).toEqual('star-off.png');
    });
  });

  context('with :cancel', function () {
    it('has "this" scope as the object instance ', () => {
      // given
      var raty = new Raty(document.querySelector('#el'), {
        cancelButton: true,
        click: function () {
          this.result = this;
        },
      }).init();

      var cancel = raty.element.querySelector('.raty-cancel');

      // when
      Helper.trigger(cancel, 'click');

      // then
      expect(raty.result).toBe(raty);
    });

    it('receives the score as null', () => {
      // given
      var raty = new Raty(document.querySelector('#el'), {
        cancelButton: true,
        click: function (score) {
          this.result = score;
        },
      }).init();

      var cancel = raty.element.querySelector('.raty-cancel');

      // when
      Helper.trigger(cancel, 'click');

      expect(raty.result).toEqual(null);
    });

    it('receives the element', () => {
      // given
      var raty = new Raty(document.querySelector('#el'), {
        cancelButton: true,
        click: function (_score, element) {
          this.result = element;
        },
      }).init();

      var cancel = raty.element.querySelector('.raty-cancel');

      // when
      Helper.trigger(cancel, 'click');

      // then
      expect(raty.result).toEqual(document.querySelector('#el'));
    });

    it('receives the mouse event', () => {
      // given
      var raty = new Raty(document.querySelector('#el'), {
        cancelButton: true,
        click: function (_score, _element, evt) {
          this.result = evt;
        },
      }).init();

      var cancel = raty.element.querySelector('.raty-cancel');

      // when
      Helper.trigger(cancel, 'click');

      // then
      expect(raty.result.type).toEqual('click');
    });
  });

  context('on click without mouseover', function () {
    it('changes the stars to on', () => {
      // given
      var raty = new Raty(document.querySelector('#el')).init();
      var stars = raty.element.querySelectorAll('img');

      // when
      Helper.trigger(Helper.last(stars), 'click');

      // then
      expect(Helper.extension(stars[0].src)).toEqual('star-on.png');
      expect(Helper.extension(stars[1].src)).toEqual('star-on.png');
      expect(Helper.extension(stars[2].src)).toEqual('star-on.png');
      expect(Helper.extension(stars[3].src)).toEqual('star-on.png');
      expect(Helper.extension(stars[4].src)).toEqual('star-on.png');
    });
  });
});
