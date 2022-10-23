describe('#fn_cancel', () => {
  let testContext;

  beforeEach(() => {
    testContext = {};
  });

  beforeEach(() => {
    Helper.create('#el');
  });

  describe('with :readOnly', () => {
    it('does not cancel', () => {
      // given
      var raty = new Raty(document.querySelector('#el'), { readOnly: true, score: 5 }).init();
      var stars = raty.element.querySelectorAll('img');

      // when
      raty.cancel();

      // then
      expect(Helper.extension(stars[0].src)).toEqual('star-on.png');
      expect(Helper.extension(stars[1].src)).toEqual('star-on.png');
      expect(Helper.extension(stars[2].src)).toEqual('star-on.png');
      expect(Helper.extension(stars[3].src)).toEqual('star-on.png');
      expect(Helper.extension(stars[4].src)).toEqual('star-on.png');
    });

    it('does not remove the score input value', () => {
      // given
      var raty = new Raty(document.querySelector('#el'), { readOnly: true, score: 5 }).init();

      // when
      raty.cancel();

      // then
      expect(raty.element.querySelector('input').value).toEqual('5');
    });
  });

  context('with click trigger', function () {
    context('as *false', function () {
      it('does not triggers click callback', () => {
        // given
        var raty = new Raty(document.querySelector('#el'), {
          score: 1,
          click: function () {
            this.clicked = true;
          },
        }).init();

        // when
        raty.cancel(false);

        // then
        expect(raty.element.clicked).toEqual(undefined);
      });

      context('with :target', function () {
        beforeEach(() => {
          testContext.target = Helper.create('#target');
        });

        context('and :targetKeep', function () {
          context('as *true', function () {
            it('sets the :targetText on target', () => {
              // given
              var raty = new Raty(document.querySelector('#el'), {
                cancel: true,
                target: '#target',
                targetKeep: true,
                targetText: 'targetText',
              }).init();

              // when
              raty.cancel();

              // then
              expect(document.querySelector('#target').textContent).toEqual('targetText');
            });
          });
        });
      });
    });

    context('as *true', function () {
      it('triggers the :click callback', () => {
        // given
        var raty = new Raty(document.querySelector('#el'), {
          score: 1,
          click: function () {
            this.clicked = true;
          },
        }).init();

        // when
        raty.cancel(true);

        // then
        expect(raty.clicked).toEqual(true);
      });

      context('with :target', function () {
        beforeEach(() => {
          testContext.target = Helper.create('#target');
        });

        context('and :targetKeep', function () {
          context('as *true', function () {
            it('sets the :targetText on target', () => {
              // given
              var raty = new Raty(document.querySelector('#el'), {
                cancel: true,
                target: '#target',
                targetKeep: true,
                targetText: 'targetText',
              }).init();

              // when
              raty.cancel(true);

              // then
              expect(testContext.target.textContent).toEqual('targetText');
            });
          });
        });
      });
    });
  });
});
