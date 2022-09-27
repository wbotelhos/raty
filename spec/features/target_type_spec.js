describe('#targetType', function () {
  beforeEach(function () {
    $.raty.path = '../lib/images';

    Helper.create('#el');
    this.target = Helper.target('#target');
  });

  afterEach(function () {
    Helper.clear();
  });

  context('target missing', function () {
    it('throws error', function () {
      // given
      var that = this;

      // when
      var lambda = function () {
        that.var raty = new Raty('#el', { target: '#missing' });
      };

      // then
      expect(lambda).toThrow(new Error('Target selector invalid or missing!'));
    });
  });

  context('as *hint', function () {
    it('receives the hint', function () {
      // given
      var raty = new Raty('#el', { target: '#' + this.target[0].id, targetType: 'hint' });

      var star = raty.self.querySelector('img:last');

      // when
      star.trigger('mouseover');

      // then
      expect(this.target).toHaveHtml('gorgeous');
    });

    context('with :cancel', function () {
      it('receives the :cancelHint', function () {
        // given
        var raty = new Raty('#el', { cancelButton: true, target: '#' + this.target[0].id, targetType: 'hint' });

        var cancel = raty.self.querySelector('.raty-cancel');

        // when
        cancel.trigger('mouseover');

        // then
        expect(this.target).toHaveHtml('Cancel this rating!');
      });
    });
  });

  context('as *score', function () {
    it('receives the score', function () {
      // given
      var raty = new Raty('#el', { target: '#' + this.target[0].id, targetType: 'score' });

      var star = raty.self.querySelector('img:last');

      // when
      star.trigger('mouseover');

      // then
      expect(this.target).toHaveHtml(5);
    });

    context('with :cancel', function () {
      it('receives the :cancelHint', function () {
        // given
        var raty = new Raty('#el', { cancelButton: true, target: '#' + this.target[0].id, targetType: 'score' });

        var cancel = raty.self.querySelector('.raty-cancel');

        // when
        cancel.trigger('mouseover');

        // then
        expect(this.target).toHaveHtml('Cancel this rating!');
      });
    });
  });
});
