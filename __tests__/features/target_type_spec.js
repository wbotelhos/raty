describe('#targetType', () => {
  let testContext;

  beforeEach(() => {
    testContext = {};
  });

  beforeEach(() => {
    Helper.create('#el');

    testContext.target = Helper.target('#target');
  });

  context('target missing', function () {
    it('throws error', () => {
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
    it('receives the hint', () => {
      // given
      var raty = new Raty(document.querySelector('#el'), {
        target: '#' + testContext.target.id,
        targetType: 'hint',
      }).init();

      var star = Helper.last(raty.element.querySelectorAll('img'));

      // when
      Helper.trigger(star, 'mouseover');

      // then
      expect(testContext.target.innerHTML).toEqual('gorgeous');
    });

    context('with :cancel', function () {
      it('receives the :cancelHint', () => {
        // given
        var raty = new Raty(document.querySelector('#el'), {
          cancelButton: true,
          target: '#' + testContext.target.id,
          targetType: 'hint',
        }).init();

        var cancel = raty.element.querySelector('.raty-cancel');

        // when
        Helper.trigger(cancel, 'mouseover');

        // then
        expect(testContext.target.innerHTML).toEqual('Cancel this rating!');
      });
    });
  });

  context('as *score', function () {
    it('receives the score', () => {
      // given
      var raty = new Raty(document.querySelector('#el'), {
        target: '#' + testContext.target.id,
        targetType: 'score',
      }).init();

      var star = Helper.last(raty.element.querySelectorAll('img'));

      // when
      Helper.trigger(star, 'mouseover');

      // then
      expect(testContext.target).toContainHTML('5');
    });

    context('with :cancel', function () {
      it('receives the :cancelHint', () => {
        // given
        var raty = new Raty(document.querySelector('#el'), {
          cancelButton: true,
          target: '#' + testContext.target.id,
          targetType: 'score',
        }).init();

        var cancel = raty.element.querySelector('.raty-cancel');

        // when
        Helper.trigger(cancel, 'mouseover');

        // then
        expect(testContext.target.innerHTML).toEqual('Cancel this rating!');
      });
    });
  });
});
