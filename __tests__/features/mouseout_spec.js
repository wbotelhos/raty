describe('#mouseout', () => {
  beforeEach(() => {
    Helper.create('#el');
  });

  it('has "this" scope as the object instance ', () => {
    // given
    var raty = new Raty(document.querySelector('#el'), {
      mouseout: function () {
        this.result = this;
      },
    }).init();

    // when
    Helper.trigger(raty.element, 'mouseleave');

    // then
    expect(raty.result).toBe(raty);
  });

  it('receives the score as integer', () => {
    // given
    var raty = new Raty(document.querySelector('#el'), {
      mouseout: function (score) {
        this.result = score;
      },
      score: 4,
    }).init();

    // when
    Helper.trigger(raty.element, 'mouseleave');

    expect(raty.result).toEqual(4);
  });

  it('receives the element', () => {
    // given
    var raty = new Raty(document.querySelector('#el'), {
      mouseout: function (_score, element) {
        this.result = element;
      },
    }).init();

    // when
    Helper.trigger(raty.element, 'mouseleave');

    // then
    expect(raty.result).toEqual(document.querySelector('#el'));
  });

  it('receives the mouse event', () => {
    // given
    var raty = new Raty(document.querySelector('#el'), {
      mouseout: function (_score, _element, evt) {
        this.result = evt;
      },
    }).init();

    // when
    Helper.trigger(raty.element, 'mouseleave');

    // then
    expect(raty.result.type).toEqual('mouseleave');
  });

  context('without score', function () {
    it('receives undefined', () => {
      // given
      var raty = new Raty(document.querySelector('#el'), {
        mouseout: function (score) {
          this.result = score;
        },
      }).init();

      // when
      Helper.trigger(raty.element, 'mouseleave');

      // then
      expect(raty.result).toEqual(undefined);
    });
  });

  context('with score', function () {
    it('receives the score value as number', () => {
      // given
      var raty = new Raty(document.querySelector('#el'), {
        score: 1,
        mouseout: function (score) {
          this.result = score;
        },
      }).init();

      // when
      Helper.trigger(raty.element, 'mouseleave');

      // then
      expect(typeof raty.result).toEqual('number');
    });
  });

  context('when acts on :cancel', function () {
    it('has "this" scope as the object instance ', () => {
      // given
      var raty = new Raty(document.querySelector('#el'), {
        cancelButton: true,
        mouseout: function () {
          this.result = this;
        },
      }).init();

      var cancel = raty.element.querySelector('.raty-cancel');

      // when
      Helper.trigger(cancel, 'mouseleave');

      // then
      expect(raty.result).toBe(raty);
    });

    context('without score', function () {
      it('receives undefined', () => {
        // given
        var raty = new Raty(document.querySelector('#el'), {
          cancelButton: true,
          mouseout: function (score) {
            this.result = score;
          },
        }).init();

        var cancel = raty.element.querySelector('.raty-cancel');

        // when
        Helper.trigger(cancel, 'mouseleave');

        // then
        expect(raty.result).toEqual(undefined);
      });
    });

    context('with score', function () {
      it('receives the score value as number', () => {
        // given
        var raty = new Raty(document.querySelector('#el'), {
          score: 1,
          cancelButton: true,
          mouseout: function (score) {
            this.result = score;
          },
        }).init();

        var cancel = raty.element.querySelector('.raty-cancel');

        // when
        Helper.trigger(cancel, 'mouseleave');

        // then
        expect(raty.result).toEqual(1);
      });
    });

    it('receives the element', () => {
      // given
      var raty = new Raty(document.querySelector('#el'), {
        cancelButton: true,
        mouseout: function (_score, element) {
          this.result = element;
        },
      }).init();

      var cancel = raty.element.querySelector('.raty-cancel');

      // when
      Helper.trigger(cancel, 'mouseleave');

      // then
      expect(raty.result).toEqual(document.querySelector('#el'));
    });

    it('receives the mouse event', () => {
      // given
      var raty = new Raty(document.querySelector('#el'), {
        cancelButton: true,
        mouseout: function (_score, _element, evt) {
          this.result = evt;
        },
      }).init();

      var cancel = raty.element.querySelector('.raty-cancel');

      // when
      Helper.trigger(cancel, 'mouseleave');

      // then
      expect(raty.result.type).toEqual('mouseleave');
    });
  });
});
