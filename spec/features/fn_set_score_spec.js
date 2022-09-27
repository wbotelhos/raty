describe('#fn_setScore', function () {
  beforeEach(function () {
    Helper.create('#el');
  });

  xit('sets the score', function () {
    // given

    // when
    var raty = new Raty('#el', { score: 1 });

    // then
    expect(raty.score()).toEqual(1);
  });

  describe('with :readOnly', function () {
    xit('does not set the score', function () {
      // given
      var raty = new Raty('#el', { readOnly: true });

      // when
      raty.score(5);

      // then
      expect(raty.self.querySelector('input')).toHaveValue('');
    });
  });

  context('with :target', function () {
    beforeEach(function () {
      this.target = Helper.create('#target');
    });

    context('and :score greater then :number', function () {
      xit('does not throw error', function () {
        // given
        var that = this;

        var raty = new Raty('#el', { target: '#target' });

        // when
        var lambda = function () {
          that.el.data('raty').score(6);
        };

        // then
        expect(lambda).not.toThrow();
      });
    });

    context('and :targetType', function () {
      context('as *score', function () {
        context('and :targetKeep', function () {
          context('as *true', function () {
            xit('sets the value equal :number', function () {
              // given
              var raty = new Raty('#el', {
                target: '#target',
                targetType: 'score',
                targetKeep: true,
              });

              // when
              raty.score(6);

              // then
              expect(this.target.text()).toEqual(raty.opt.number.toString());
            });

            xit('sets the :score on target', function () {
              // given
              var raty = new Raty('#el', {
                target: '#target',
                targetType: 'score',
                targetKeep: true,
              });

              // when
              raty.score(1);

              // then
              expect(this.target.text()).toEqual('1');
            });
          });
        });
      });
    });
  });
});
