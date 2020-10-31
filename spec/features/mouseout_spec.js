describe('#mouseout', function() {
  beforeEach(function() {
    $.raty.path = '../lib/images';

    this.el = Helper.create('#el');
  });

  afterEach(function() {
    Helper.clear();
  });

  it ('receives the mouse event', function() {
    // given
    this.el.raty({
      mouseout: function(score, evt) {
        this.result = evt;
      }
    });

    var star = this.el.children('img:last');

    // when
    star.trigger('mouseout');

    // then
    expect(this.el[0].result.type).toEqual('mouseout');
  });

  context('without score', function() {
    it ('receives undefined', function() {
      // given
      this.el.raty({
        cancelButton: true,
        mouseout: function(score) {
          this.result = score;
        }
      });

      var star = this.el.children('img:last');

      // when
      star.trigger('mouseout');

      // then
      expect(this.el[0].result).toBeUndefined();
    });
  });

  context('with score', function() {
    it ('receives the score value as number', function() {
      // given
      this.el.raty({
        score    : 1,
        mouseout : function(score) {
          this.result = score;
        }
      });

      var star = this.el.children('img:last');

      // when
      star.trigger('mouseout');

      // then
      expect(typeof this.el[0].result).toEqual('number');
    });
  });

  context('when acts on :cancel', function() {
    it ('receives the event', function() {
      // given
      this.el.raty({
        cancelButton: true,
        mouseout: function(_, evt) {
          this.evt = evt;
        }
      });

      var cancel = this.el.children('.raty-cancel');

      // when
      cancel.trigger('mouseout');

      // then
      expect(this.el[0].evt.type).toEqual('mouseout');
    });

    context('without score', function() {
      it ('receives undefined', function() {
        // given
        this.el.raty({
          cancelButton: true,
          mouseout: function(score) {
            this.result = score;
          }
        });

        var cancel = this.el.children('.raty-cancel');

        // when
        cancel.trigger('mouseout');

        // then
        expect(this.el[0].result).toBeUndefined();
      });
    });

    context('with score', function() {
      it ('receives the score value as number', function() {
        // given
        this.el.raty({
          score: 1,
          cancelButton: true,
          mouseout: function(score) {
            this.result = score;
          }
        });

        var cancel = this.el.children('.raty-cancel');

        // when
        cancel.trigger('mouseout');

        // then
        expect(typeof this.el[0].result).toEqual('number');
      });
    });
  });
});
