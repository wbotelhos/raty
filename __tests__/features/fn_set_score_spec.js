describe('#fn_setScore', () => {
  let testContext;

  beforeEach(() => {
    testContext = {};
  });

  beforeEach(() => {
    Helper.create('#el');
  });

  it('sets the score', () => {
    // given

    // when
    var raty = new Raty(document.querySelector('#el'), { score: 1 }).init();

    // then
    expect(raty.score()).toEqual(1);
  });

  describe('with :readOnly', () => {
    it('does not set the score', () => {
      // given
      var raty = new Raty(document.querySelector('#el'), { readOnly: true }).init();

      // when
      raty.score(5);

      // then
      expect(raty.element.querySelector('input').value).toEqual('');
    });
  });

  context('with :target', function () {
    beforeEach(() => {
      testContext.target = Helper.create('#target');
    });

    context('and :score greater then :number', function () {
      it('does not throw error', () => {
        // given
        var that = this;

        var raty = new Raty(document.querySelector('#el'), { target: '#target' }).init();

        // when
        var lambda = function () {
          raty.score(6);
        };

        // then
        expect(lambda).not.toThrow();
      });
    });

    context('and :targetType', function () {
      context('as *score', function () {
        context('and :targetKeep', function () {
          context('as *true', function () {
            it('sets the value equal :number', () => {
              // given
              var raty = new Raty(document.querySelector('#el'), {
                target: '#target',
                targetType: 'score',
                targetKeep: true,
              }).init();

              // when
              raty.score(6);

              // then
              expect(testContext.target.textContent).toEqual(raty.opt.number.toString());
            });

            it('sets the :score on target', () => {
              // given
              var raty = new Raty(document.querySelector('#el'), {
                target: '#target',
                targetType: 'score',
                targetKeep: true,
              }).init();

              // when
              raty.score(1);

              // then
              expect(testContext.target.textContent).toEqual('1');
            });
          });
        });
      });
    });
  });
});
