describe('#fn_cancel', function () {
  beforeEach(function () {
    $.raty.path = '../lib/images';

    Helper.create('#el');
  });

  afterEach(function () {
    Helper.clear();
  });

  describe('with :readOnly', function () {
    it('does turns the stars off', function () {
      // given
      var raty = new Raty('#el', { readOnly: true, score: 5 });

      // when
      raty.cancel();

      // then
      expect(raty.self.querySelector('img').src).toEqual('../lib/images/star-on.png');
    });

    it('does not remove the score input value', function () {
      // given
      var raty = new Raty('#el', { readOnly: true, score: 5 });

      // when
      raty.cancel();

      // then
      expect(raty.self.querySelector('input')).toHaveValue('5');
    });
  });

  context('with click trigger', function () {
    context('as *false', function () {
      it('does not triggers click callback', function () {
        // given
        var raty = new Raty('#el', {
          score: 1,
          click: function () {
            this.clicked = true;
          },
        });

        // when
        raty.cancel(false);

        // then
        expect(this.el[0].clicked).toBeFalsy();
      });

      context('with :target', function () {
        beforeEach(function () {
          this.target = Helper.create('#target');
        });

        context('and :targetKeep', function () {
          context('as *true', function () {
            it('sets the :targetText on target', function () {
              // given
              var raty = new Raty('#el', {
                cancel: true,
                target: '#target',
                targetKeep: true,
                targetText: 'targetText',
              });

              // when
              raty.cancel();

              // then
              expect(this.target.text()).toEqual('targetText');
            });
          });
        });
      });
    });

    context('as *true', function () {
      it('triggers the :click callback', function () {
        // given
        var raty = new Raty('#el', {
          score: 1,
          click: function () {
            this.clicked = true;
          },
        });

        // when
        raty.cancel(true);

        // then
        expect(this.el[0].clicked).toBeTruthy();
      });

      context('with :target', function () {
        beforeEach(function () {
          this.target = Helper.create('#target');
        });

        context('and :targetKeep', function () {
          context('as *true', function () {
            it('sets the :targetText on target', function () {
              // given
              var raty = new Raty('#el', {
                cancel: true,
                target: '#target',
                targetKeep: true,
                targetText: 'targetText',
              });

              // when
              raty.cancel(true);

              // then
              expect(this.target.text()).toEqual('targetText');
            });
          });
        });
      });
    });
  });
});
