describe('#targetType', function () {
  beforeEach(function () {
    Helper.create('#el');

    this.target = Helper.target('#target');
  });

  context('target missing', function () {
    it('throws error', function () {
      // given
      var that = this;

      // when
      var lambda = function () {
        var raty = new Raty(document.querySelector('#el'), { target: '#missing' }).init();
      };

      // then
      expect(lambda).toThrow(new Error('Target selector invalid or missing!'));
    });
  });

  context('as *hint', function () {
    it('receives the hint', function () {
      // given
      var raty = new Raty(document.querySelector('#el'), {
        target: '#' + this.target[0].id,
        targetType: 'hint',
      }).init();

      var star = Helper.last(raty.element.querySelectorAll('img'));

      // when
      Helper.trigger(star, 'mouseover');

      // then
      expect(this.target[0].innerHTML).toEqual('gorgeous');
    });

    context('with :cancel', function () {
      it('receives the :cancelHint', function () {
        // given
        var raty = new Raty(document.querySelector('#el'), {
          cancelButton: true,
          target: '#' + this.target[0].id,
          targetType: 'hint',
        }).init();

        var cancel = raty.element.querySelector('.raty-cancel');

        // when
        Helper.trigger(cancel, 'mouseover');

        // then
        expect(this.target[0].innerHTML).toEqual('Cancel this rating!');
      });
    });
  });

  context('as *score', function () {
    it('receives the score', function () {
      // given
      var raty = new Raty(document.querySelector('#el'), {
        target: '#' + this.target[0].id,
        targetType: 'score',
      }).init();

      var star = Helper.last(raty.element.querySelectorAll('img'));

      // when
      Helper.trigger(star, 'mouseover');

      // then
      expect(this.target).toHaveHtml(5);
    });

    context('with :cancel', function () {
      it('receives the :cancelHint', function () {
        // given
        var raty = new Raty(document.querySelector('#el'), {
          cancelButton: true,
          target: '#' + this.target[0].id,
          targetType: 'score',
        }).init();

        var cancel = raty.element.querySelector('.raty-cancel');

        // when
        Helper.trigger(cancel, 'mouseover');

        // then
        expect(this.target[0].innerHTML).toEqual('Cancel this rating!');
      });
    });
  });
});
