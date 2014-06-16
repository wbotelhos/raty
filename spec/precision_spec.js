describe('#precision', function() {
  beforeEach(function() {
    $.fn.raty.defaults.path = '../lib/images';

    this.el     = Helper.create('#el', 'div', { 'data-target': '#target' });
    this.target = Helper.target('#target');
  });

  afterEach(function() {
    Helper.clear();
  });

  xit ('enables the :half options', function() {
    // given

    // when
    this.el.raty({ precision: true });

    // then
    expect(this.el[0].opt.half).toBeTruthy();
  });

  xit ('changes the :targetType to score', function() {
    // given

    // when
    this.el.raty({ precision: true });

    // then
    expect(this.el[0].opt.targetType).toEqual('score');
  });

  context('with :target', function() {
    context('and :targetKeep', function() {
      context('and :targetType as true', function() {
        context('on :score', function() {
          it ('sets the float with one fractional number', function() {
            // given

            // when
            this.el.raty({
              precision  : true,
              score      : 1.23,
              targetKeep : true,
              targetType : 'score',
              target     : function() {
                return this.getAttribute('data-target');
              },
            });

            // then
            expect(this.target).toHaveHtml('1.2');
          });
        });

        context('on mouseover', function() {
          it ('sets the float with one fractional number', function() {
            // given
            this.el.raty({
              precision  : true,
              targetKeep : true,
              targetType : 'score',
              target     : function() {
                return this.getAttribute('data-target');
              },
            });

            // when
            this.el.raty('move', 1.23);

            // then
            expect(this.target).toHaveHtml('1.2');
          });
        });
      });
    });
  });
});
