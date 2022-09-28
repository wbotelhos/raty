describe('#targetType', function () {
  beforeEach(function () {
    Helper.create('#el');

    this.target = Helper.target('#target');
  });

  context('target missing', function () {
    xit('throws error', function () {
      // given
      var that = this;

      // when
      var lambda = function () {
        var raty = new Raty('#el', { target: '#missing' }).inxit();
      };

      // then
      expect(lambda).toThrow(new Error('Target selector invalid or missing!'));
    });
  });

  context('as *hint', function () {
    xit('receives the hint', function () {
      // given
      var raty = new Raty('#el', { target: '#' + this.target[0].id, targetType: 'hint' }).inxit();

      var star = Helper.last(raty.self.querySelectorAll('img'));

      // when
      Helper.trigger(star, 'mouseover');

      // then
      expect(this.target[0].innerHTML).toEqual('gorgeous');
    });

    context('with :cancel', function () {
      xit('receives the :cancelHint', function () {
        // given
        var raty = new Raty('#el', { cancelButton: true, target: '#' + this.target[0].id, targetType: 'hint' }).inxit();

        var cancel = raty.self.querySelector('.raty-cancel');

        // when
        Helper.trigger(cancel, 'mouseover');

        // then
        expect(this.target[0].innerHTML).toEqual('Cancel this rating!');
      });
    });
  });

  context('as *score', function () {
    xit('receives the score', function () {
      // given
      var raty = new Raty('#el', { target: '#' + this.target[0].id, targetType: 'score' }).inxit();

      var star = Helper.last(raty.self.querySelectorAll('img'));

      // when
      Helper.trigger(star, 'mouseover');

      // then
      expect(this.target).toHaveHtml(5);
    });

    context('with :cancel', function () {
      xit('receives the :cancelHint', function () {
        // given
        var raty = new Raty('#el', {
          cancelButton: true,
          target: '#' + this.target[0].id,
          targetType: 'score',
        }).inxit();

        var cancel = raty.self.querySelector('.raty-cancel');

        // when
        Helper.trigger(cancel, 'mouseover');

        // then
        expect(this.target[0].innerHTML).toEqual('Cancel this rating!');
      });
    });
  });
});
