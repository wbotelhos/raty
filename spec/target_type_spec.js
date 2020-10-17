describe('#targetType', function() {
  beforeEach(function() {
    $.fn.raty.defaults.path = '../lib/images';

    this.el     = Helper.create('#el');
    this.target = Helper.target('#target');
  });

  afterEach(function() {
    Helper.clear();
  });

  context('target missing', function() {
    it ('throws error', function() {
      // given
      var that = this;

      // when
      var lambda = function() { that.el.raty({ target: '#missing' }); };

      // then
      expect(lambda).toThrow(new Error('Target selector invalid or missing!'));
    });
  });

  context('as *hint', function() {
    it ('receives the hint', function() {
      // given
      this.el.raty({ target: '#' + this.target[0].id, targetType: 'hint' });

      var star = this.el.children('img:last');

      // when
      star.trigger('mouseover');

      // then
      expect(this.target).toHaveHtml('gorgeous');
    });

    context('with :cancel', function() {
      it ('receives the :cancelHint', function() {
        // given
        this.el.raty({ cancel: true, target: '#' + this.target[0].id, targetType: 'hint' });

        var cancel = this.el.children('.raty-cancel');

        // when
        cancel.trigger('mouseover');

        // then
        expect(this.target).toHaveHtml('Cancel this rating!');
      });
    });
  });

  context('as *score', function() {
    it ('receives the score', function() {
      // given
      this.el.raty({ target: '#' + this.target[0].id, targetType: 'score' });

      var star = this.el.children('img:last');

      // when
      star.trigger('mouseover');

      // then
      expect(this.target).toHaveHtml(5);
    });

    context('with :cancel', function() {
      it ('receives the :cancelHint', function() {
        // given
        this.el.raty({ cancel: true, target: '#' + this.target[0].id, targetType: 'score' });

        var cancel = this.el.children('.raty-cancel');

        // when
        cancel.trigger('mouseover');

        // then
        expect(this.target).toHaveHtml('Cancel this rating!');
      });
    });
  });
});
