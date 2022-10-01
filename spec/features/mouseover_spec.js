describe('#mouseover', function () {
  beforeEach(function () {
    Helper.create('#el');
  });

  it('has "this" scope as the object instance ', function () {
    // given
    var raty = new Raty(document.querySelector('#el'), {
      cancelButton: true,
      mouseover: function () {
        this.result = this;
      },
    }).init();

    var star = Helper.last(raty.element.querySelectorAll('img'));

    // when
    Helper.trigger(star, 'mouseover');

    // then
    expect(raty.result).toBe(raty);
  });

  it('receives the score as integer', function () {
    // given
    var raty = new Raty(document.querySelector('#el'), {
      mouseover: function (score) {
        this.result = score;
      },
    }).init();

    var star = Helper.last(raty.element.querySelectorAll('img'));

    // when
    Helper.trigger(star, 'mouseover');

    expect(raty.result).toEqual(5);
  });

  it('receives the element', function () {
    // given
    var raty = new Raty(document.querySelector('#el'), {
      mouseover: function (_score, element) {
        this.result = element;
      },
    }).init();

    var star = Helper.last(raty.element.querySelectorAll('img'));

    // when
    Helper.trigger(star, 'mouseover');

    // then
    expect(raty.result).toEqual(document.querySelector('#el'));
  });

  it('receives the mouse event', function () {
    // given
    var raty = new Raty(document.querySelector('#el'), {
      mouseover: function (_score, _element, evt) {
        this.result = evt;
      },
    }).init();

    var star = Helper.last(raty.element.querySelectorAll('img'));

    // when
    Helper.trigger(star, 'mouseover');

    // then
    expect(raty.result.type).toEqual('mouseover');
  });

  context('with return as undefined', function () {
    it('executes mouseover behavior', function () {
      // given
      var raty = new Raty(document.querySelector('#el'), {
        mouseover: function () {},
      }).init();

      var stars = raty.element.querySelectorAll('img');

      // when
      Helper.trigger(stars[0], 'mouseover');

      // then
      expect(Helper.extension(stars[0].src)).toEqual('star-on.png');
      expect(Helper.extension(stars[1].src)).toEqual('star-off.png');
      expect(Helper.extension(stars[2].src)).toEqual('star-off.png');
      expect(Helper.extension(stars[3].src)).toEqual('star-off.png');
      expect(Helper.extension(stars[4].src)).toEqual('star-off.png');
    });

    it('turns on the stars', function () {
      // given
      var raty = new Raty(document.querySelector('#el'), {
        mouseover: function () {},
      }).init();

      var stars = raty.element.querySelectorAll('img');

      // when
      Helper.trigger(stars[0], 'mouseover');

      // then
      expect(Helper.extension(stars[0].src)).toEqual('star-on.png');
      expect(Helper.extension(stars[1].src)).toEqual('star-off.png');
      expect(Helper.extension(stars[2].src)).toEqual('star-off.png');
      expect(Helper.extension(stars[3].src)).toEqual('star-off.png');
      expect(Helper.extension(stars[4].src)).toEqual('star-off.png');
    });
  });

  context('with :cancel', function () {
    it('has "this" scope as the object instance ', function () {
      // given
      var raty = new Raty(document.querySelector('#el'), {
        cancelButton: true,
        mouseover: function () {
          this.result = this;
        },
      }).init();

      var cancel = raty.element.querySelector('.raty-cancel');

      // when
      Helper.trigger(cancel, 'mouseover');

      // then
      expect(raty.result).toBe(raty);
    });

    it('receives the score as null', function () {
      // given
      var raty = new Raty(document.querySelector('#el'), {
        cancelButton: true,
        mouseover: function (score) {
          this.result = score;
        },
      }).init();

      var cancel = raty.element.querySelector('.raty-cancel');

      // when
      Helper.trigger(cancel, 'mouseover');

      expect(raty.result).toEqual(null);
    });

    it('receives the element', function () {
      // given
      var raty = new Raty(document.querySelector('#el'), {
        cancelButton: true,
        mouseover: function (_score, element) {
          this.result = element;
        },
      }).init();

      var cancel = raty.element.querySelector('.raty-cancel');

      // when
      Helper.trigger(cancel, 'mouseover');

      // then
      expect(raty.result).toEqual(document.querySelector('#el'));
    });

    it('receives the mouse event', function () {
      // given
      var raty = new Raty(document.querySelector('#el'), {
        cancelButton: true,
        mouseover: function (_score, _element, evt) {
          this.result = evt;
        },
      }).init();

      var cancel = raty.element.querySelector('.raty-cancel');

      // when
      Helper.trigger(cancel, 'mouseover');

      // then
      expect(raty.result.type).toEqual('mouseover');
    });
  });

  context('on mouseover without mouseover', function () {
    it('changes the stars to on', function () {
      // given
      var raty = new Raty(document.querySelector('#el')).init();
      var stars = raty.element.querySelectorAll('img');

      // when
      Helper.trigger(Helper.last(stars), 'mouseover');

      // then
      expect(Helper.extension(stars[0].src)).toEqual('star-on.png');
      expect(Helper.extension(stars[1].src)).toEqual('star-on.png');
      expect(Helper.extension(stars[2].src)).toEqual('star-on.png');
      expect(Helper.extension(stars[3].src)).toEqual('star-on.png');
      expect(Helper.extension(stars[4].src)).toEqual('star-on.png');
    });
  });
});
