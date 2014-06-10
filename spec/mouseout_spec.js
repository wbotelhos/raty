describe('#mouseout', function() {
  beforeEach(function() {
    $.fn.raty.defaults.path = '../lib/images';

    this.el = Helper.create('#el');
  });

  afterEach(function() {
    Helper.clear();
  });

  it ('receives the mouse event', function() {
    // given
    this.el.raty({
      mouseout: function(score, evt) {
        $(this).data('evt', evt);
      }
    });

    var star = this.el.children('img:last');

    // when
    star.trigger('mouseout');

    // then
    expect(this.el.data('evt').type).toEqual('mouseout');
  });

  context('without score', function() {
    it ('receives undefined', function() {
      // given
      this.el.raty({
        cancel  : true,
        mouseout: function(score) {
          $(this).data('score', score);
        }
      });

      var star = this.el.children('img:last');

      // when
      star.trigger('mouseout');

      // then
      expect(this.el.data('score')).toBeUndefined();
    });
  });

  context('with score', function() {
    it ('receives the score value as number', function() {
      // given
      this.el.raty({
        score    : 1,
        mouseout : function(score) {
          $(this).data('score', score);
        }
      });

      var star = this.el.children('img:last');

      // when
      star.trigger('mouseout');

      // then
      expect(this.el.data('score')).toEqual(1);
    });
  });

  context('when acts on :cancel', function() {
    it ('receives the event', function() {
      // given
      this.el.raty({
        cancel   : true,
        mouseout : function(_, evt) {
          $(this).data('evt', evt);
        }
      });

      var cancel = this.el.children('.raty-cancel');

      // when
      cancel.trigger('mouseout');

      // then
      expect(this.el.data('evt').type).toEqual('mouseout');
    });

    context('without score', function() {
      it ('receives undefined', function() {
        // given
        this.el.raty({
          cancel   : true,
          mouseout : function(score) {
            $(this).data('score', score);
          }
        });

        var cancel = this.el.children('.raty-cancel');

        // when
        cancel.trigger('mouseout');

        // then
        expect(this.el.data('score')).toBeUndefined();
      });
    });

    context('with score', function() {
      it ('receives the score value as number', function() {
        // given
        this.el.raty({
          score    : 1,
          cancel   : true,
          mouseout : function(score) {
            $(this).data('score', score);
          }
        });

        var cancel = this.el.children('.raty-cancel');

        // when
        cancel.trigger('mouseout');

        // then
        expect(typeof this.el.data('score')).toEqual('number');
      });
    });
  });
});
