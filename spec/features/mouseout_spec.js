describe('#mouseout', function () {
  beforeEach(function () {
    $.raty.path = '../lib/images';

    Helper.create('#el');
  });

  afterEach(function () {
    Helper.clear();
  });

  it('receives the mouse event', function () {
    // given
    var raty = new Raty('#el', {
      mouseout: function (score, evt) {
        this.result = evt;
      },
    });

    var star = raty.self.querySelector('img:last');

    // when
    star.trigger('mouseout');

    // then
    expect(this.el[0].result.type).toEqual('mouseout');
  });

  context('without score', function () {
    it('receives undefined', function () {
      // given
      var raty = new Raty('#el', {
        cancelButton: true,
        mouseout: function (score) {
          this.result = score;
        },
      });

      var star = raty.self.querySelector('img:last');

      // when
      star.trigger('mouseout');

      // then
      expect(this.el[0].result).toBeUndefined();
    });
  });

  context('with score', function () {
    it('receives the score value as number', function () {
      // given
      var raty = new Raty('#el', {
        score: 1,
        mouseout: function (score) {
          this.result = score;
        },
      });

      var star = raty.self.querySelector('img:last');

      // when
      star.trigger('mouseout');

      // then
      expect(typeof this.el[0].result).toEqual('number');
    });
  });

  context('when acts on :cancel', function () {
    it('receives the event', function () {
      // given
      var raty = new Raty('#el', {
        cancelButton: true,
        mouseout: function (_, evt) {
          this.evt = evt;
        },
      });

      var cancel = raty.self.querySelector('.raty-cancel');

      // when
      cancel.trigger('mouseout');

      // then
      expect(this.el[0].evt.type).toEqual('mouseout');
    });

    context('without score', function () {
      it('receives undefined', function () {
        // given
        var raty = new Raty('#el', {
          cancelButton: true,
          mouseout: function (score) {
            this.result = score;
          },
        });

        var cancel = raty.self.querySelector('.raty-cancel');

        // when
        cancel.trigger('mouseout');

        // then
        expect(this.el[0].result).toBeUndefined();
      });
    });

    context('with score', function () {
      it('receives the score value as number', function () {
        // given
        var raty = new Raty('#el', {
          score: 1,
          cancelButton: true,
          mouseout: function (score) {
            this.result = score;
          },
        });

        var cancel = raty.self.querySelector('.raty-cancel');

        // when
        cancel.trigger('mouseout');

        // then
        expect(typeof this.el[0].result).toEqual('number');
      });
    });
  });
});
