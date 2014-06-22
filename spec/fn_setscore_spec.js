describe('#fn_setScore', function() {
  beforeEach(function() {
    $.fn.raty.defaults.path = '../lib/images';

    this.el = Helper.create('#el');
  });

  afterEach(function() {
    Helper.clear();
  });

  it ('sets the score', function() {
    // given

    // when
    this.el.raty({ score: 1 });

    // then
    expect(this.el.raty('score')).toEqual(1);
  });

  describe('with :readOnly', function() {
    it ('does not set the score', function() {
      // given
      this.el.raty({ readOnly: true });

      // when
      this.el.raty('score', 5);

      // then
      expect(this.el.children('input')).toHaveValue('');
    });
  });

  context('with :target', function() {
    beforeEach(function() {
      this.target = Helper.create('#target');
    });

    context('and :score greater then :number', function() {
      it ('does not throw error', function() {
        // given
        var that = this;

        this.el.raty({ target: '#target' });

        // when
        var lambda = function() { that.el.raty('score', 6); };

        // then
        expect(lambda).not.toThrow();
      });
    });

    context('and :targetType', function() {
      context('as *score', function() {
        context('and :targetKeep', function() {
          context('as *true', function() {
            it ('sets the value equal :number', function() {
              // given
              this.el.raty({
                target     : '#target',
                targetType : 'score',
                targetKeep : true
              });

              // when
              this.el.raty('score', 6);

              // then
              expect(this.target.text()).toEqual(this.el[0].opt.number.toString());
            });

            it ('sets the :score on target', function() {
              // given
              this.el.raty({
                target     : '#target',
                targetType : 'score',
                targetKeep : true
              });

              // when
              this.el.raty('score', 1);

              // then
              expect(this.target.text()).toEqual('1');
            });
          });
        });
      });
    });
  });
});
