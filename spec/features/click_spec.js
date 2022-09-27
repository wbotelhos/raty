describe('#click', function () {
  beforeEach(function () {
    $.raty.path = '../lib/images';

    Helper.create('#el');
  });

  afterEach(function () {
    Helper.clear();
  });

  it('is called on star click', function () {
    // given
    var raty = new Raty('#el', {
      click: function () {
        this.called = true;
      },
    }).init();

    var star = raty.self.querySelector('img:last');

    // when
    star.trigger('click');

    // then
    expect(this.el[0].called).toBeTruthy();
  });

  it('has "this" as context', function () {
    // given
    var raty = new Raty('#el', {
      click: function () {
        this.result = this;
      },
    }).init();

    var star = raty.self.querySelector('img:last');

    // when
    star.trigger('click');

    // then

    expect(this.el[0].result).toBe(this.el[0]);
  });

  it('receives the score as argument', function () {
    // given
    var raty = new Raty('#el', {
      click: function (score) {
        this.result = score;
      },
    }).init();

    var star = raty.self.querySelector('img:last');

    // when
    star.trigger('click');

    // then
    expect(this.el[0].result).toEqual(5);
  });

  context('with return as undefined', function () {
    it('executes click behavior', function () {
      // given
      var raty = new Raty('#el', {
        click: function () {},
      }).init();

      var star = raty.self.querySelector('img:last');

      // when
      star.trigger('click');

      // then
      expect(raty.self.querySelector('input')).toHaveValue('5');
    });

    it('turns on the stars', function () {
      // given
      var raty = new Raty('#el', {
        click: function () {},
      }).init();

      var stars = raty.self.querySelector('img');

      // when
      stars.first().trigger('click');

      // then
      expect(stars.src).toEqual('../lib/images/star-on.png');
    });
  });

  context('with return as true', function () {
    it('applies the score', function () {
      // given
      var raty = new Raty('#el', {
        click: function () {
          return true;
        },
      }).init();

      var star = raty.self.querySelector('img:last');

      // when
      star.trigger('click');

      // then
      expect(raty.self.querySelector('input')).toHaveValue('5');
    });

    it('turns on the stars', function () {
      // given
      var raty = new Raty('#el', {
        click: function () {
          return true;
        },
      }).init();

      var stars = raty.self.querySelector('img');

      // when
      stars.first().trigger('click');

      // then
      expect(stars.src).toEqual('../lib/images/star-on.png');
    });
  });

  context('with return as false', function () {
    it('does not applies the score', function () {
      // given
      var raty = new Raty('#el', {
        click: function () {
          return false;
        },
      }).init();

      var star = raty.self.querySelector('img:last');

      // when
      star.trigger('click');

      // then
      expect(raty.self.querySelector('input')).toHaveValue('');
    });

    it('does not turns on the stars', function () {
      // given
      var raty = new Raty('#el', {
        click: function () {
          return false;
        },
      }).init();

      var stars = raty.self.querySelector('img');

      // when
      stars.first().trigger('click');

      // then
      expect(stars.src).toEqual('../lib/images/star-off.png');
    });
  });

  context('with :cancel', function () {
    it('executes the callback', function () {
      // given
      var raty = new Raty('#el', {
        cancelButton: true,
        click: function () {
          this.called = true;
        },
      }).init();

      var cancel = raty.self.querySelector('.raty-cancel');

      // when
      cancel.trigger('click');

      // then
      expect(this.el[0].called).toEqual(true);
    });
  });

  context('on click without mouseover', function () {
    it('changes the stars to on', function () {
      // given
      var raty = new Raty('#el');
      var stars = self.children('img');

      // when
      stars.last().trigger('click');

      // then
      expect(stars.src).toEqual('../lib/images/star-on.png');
    });
  });
});
