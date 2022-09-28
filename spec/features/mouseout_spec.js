describe('#mouseout', function () {
  beforeEach(function () {
    Helper.create('#el');
  });

  xit('receives the mouse event', function () {
    // given
    var raty = new Raty('#el', {
      mouseout: function (score, evt) {
        debugger;

        this.result = evt;
      },
    }).init();

    // when
    Helper.trigger(raty.self, 'mouseleave');

    // then
    expect(raty.self.result.type).toEqual('mouseleave');
  });

  context('without score', function () {
    xit('receives undefined', function () {
      // given
      var raty = new Raty('#el', {
        cancelButton: true,
        mouseout: function (score) {
          this.result = score;
        },
      }).init();

      // when
      Helper.trigger(raty.self, 'mouseleave');

      // then
      expect(raty.self.result).toEqual(undefined);
    });
  });

  context('with score', function () {
    xit('receives the score value as number', function () {
      // given
      var raty = new Raty('#el', {
        score: 1,
        mouseout: function (score) {
          this.result = score;
        },
      }).init();

      // when
      Helper.trigger(raty.self, 'mouseleave');

      // then
      expect(typeof raty.self.result).toEqual('number');
    });
  });

  context('when acts on :cancel', function () {
    xit('receives the event', function () {
      // given
      var raty = new Raty('#el', {
        cancelButton: true,
        mouseout: function (_, evt) {
          this.evt = evt;
        },
      }).init();

      var cancel = raty.self.querySelector('.raty-cancel');

      // when
      Helper.trigger(cancel, 'mouseleave');

      // then
      expect(raty.self.evt.type).toEqual('mouseleave');
    });

    context('without score', function () {
      xit('receives undefined', function () {
        // given
        var raty = new Raty('#el', {
          cancelButton: true,
          mouseout: function (score) {
            this.result = score;
          },
        }).init();

        var cancel = raty.self.querySelector('.raty-cancel');

        // when
        Helper.trigger(cancel, 'mouseleave');

        // then
        expect(raty.self.result).toEqual(undefined);
      });
    });

    context('with score', function () {
      xit('receives the score value as number', function () {
        // given
        var raty = new Raty('#el', {
          score: 1,
          cancelButton: true,
          mouseout: function (score) {
            this.result = score;
          },
        }).init();

        var cancel = raty.self.querySelector('.raty-cancel');

        // when
        Helper.trigger(cancel, 'mouseleave');

        // then
        expect(typeof raty.self.result).toEqual('number');
      });
    });
  });
});
