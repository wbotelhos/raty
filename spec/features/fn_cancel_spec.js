describe('#fn_cancel', function () {
  beforeEach(function () {
    Helper.create('#el');
  });

  describe('with :readOnly', function () {
    xit('does not cancel', function () {
      // given
      var raty = new Raty('#el', { readOnly: true, score: 5 });
      var stars = raty.self.querySelectorAll('img');

      // when
      raty.cancel();

      // then
      expect(Helper.extension(stars[0].src)).toEqual('star-on.png');
      expect(Helper.extension(stars[1].src)).toEqual('star-on.png');
      expect(Helper.extension(stars[2].src)).toEqual('star-on.png');
      expect(Helper.extension(stars[3].src)).toEqual('star-on.png');
      expect(Helper.extension(stars[4].src)).toEqual('star-on.png');
    });

    xit('does not remove the score input value', function () {
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
      xit('does not triggers click callback', function () {
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
            xit('sets the :targetText on target', function () {
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
      xit('triggers the :click callback', function () {
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
            xit('sets the :targetText on target', function () {
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
