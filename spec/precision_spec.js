describe('#precision', function() {
  beforeEach(function() {
    $.fn.raty.defaults.path = '../lib/images';

    this.el     = Helper.create('#el', 'div', { 'data-target': '#target' });
    this.target = Helper.target('#target');
  });

  afterEach(function() {
    Helper.clear();
  });

  it ('enables the :half options', function() {
    // given

    // when
    this.el.raty({ precision: true });

    // then
    expect(this.el[0].opt.half).toBeTruthy();
  });

  it ('accepts data attribute', function() {
    // given
    var el = Helper._append('div', { 'data-precision': true });

    // when
    el.raty();

    // then
    expect(el[0].opt.precision).toEqual(true);
  });

  context('with :target', function() {
    context('and :targetKeep', function() {
      context('and :targetType as score', function() {
        context('on :score', function() {
          it ('sets the float with one fractional number', function() {
            // given

            // when
            this.el.raty({
              precision  : true,
              score      : 1.2,
              targetKeep : true,
              targetType : 'score',
              target     : function() {
                return this.getAttribute('data-target');
              }
            });

            // then
            expect(this.target).toHaveHtml('1.2');
          });
        });

        context('on mouseover', function() {
          it ('sets the float with one fractional number', function(done) {
            // given
            var that = this;

            this.el.raty({
              precision  : true,
              targetKeep : true,
              targetType : 'score',
              target     : function() {
                return this.getAttribute('data-target');
              }
            });

            setTimeout(function() {
              // when
              that.el.raty('move', 1.23);

              // then
              expect(that.target).toHaveHtml('1.2');

              done();
            }, 100);
          });
        });
      });

      context('and :targetType as hint', function() {
        context('on :score', function() {
          context('with one float digit', function() {
            it ('gets the [integer][float] position of :hints', function() {
              // given

              // when
              this.el.raty({
                hints      : ['first', ['second']],
                precision  : true,
                score      : 1.1,
                targetKeep : true,
                targetType : 'hint',
                target     : function() {
                  return this.getAttribute('data-target');
                },
              });

              // then
              expect(this.target).toHaveHtml('second');
            });
          });

          context('with integer digit is zero', function() {
            it ('gets the [integer][last item] position of :hints', function() {
              // given

              // when
              this.el.raty({
                hints      : ['first', 'second'],
                precision  : true,
                score      : 0,
                targetKeep : true,
                targetType : 'hint',
                target     : function() {
                  return this.getAttribute('data-target');
                },
              });

              // then
              expect(this.target).toHaveHtml('first');
            });
          });

          context('with float digit is zero', function() {
            it ('gets the [integer][last item] position of :hints', function() {
              // given

              // when
              this.el.raty({
                hints      : ['first', 'second'],
                precision  : true,
                score      : 1.0,
                targetKeep : true,
                targetType : 'hint',
                target     : function() {
                  return this.getAttribute('data-target');
                },
              });

              // then
              expect(this.target).toHaveHtml('first');
            });
          });

          context('with one float digit as string', function() {
            it ('gets the [integer][float.fixed(1) without decimates] position of :hints', function() {
              // given

              // when
              this.el.raty({
                hints      : ['first', ['second']],
                precision  : true,
                score      : '1.1',
                targetKeep : true,
                targetType : 'hint',
                target     : function() {
                  return this.getAttribute('data-target');
                },
              });

              // then
              expect(this.target).toHaveHtml('second');
            });
          });

          context('with two float digits', function() {
            it ('gets the [integer][float.fixed(1) without decimates] position of :hints', function() {
              // given

              // when
              this.el.raty({
                hints      : ['first', ['second']],
                precision  : true,
                score      : 1.19,
                targetKeep : true,
                targetType : 'hint',
                target     : function() {
                  return this.getAttribute('data-target');
                },
              });

              // then
              expect(this.target).toHaveHtml('second');
            });
          });

          context('with two float digits as string', function() {
            it ('gets the [integer][float.fixed(1) without decimates] position of :hints', function() {
              // given

              // when
              this.el.raty({
                hints      : ['first', ['second']],
                precision  : true,
                score      : '1.19',
                targetKeep : true,
                targetType : 'hint',
                target     : function() {
                  return this.getAttribute('data-target');
                },
              });

              // then
              expect(this.target).toHaveHtml('second');
            });
          });
        });

        context('on mouseover', function() {
          context('with one float digit', function() {
            it ('gets the [integer][float.fixed(1) without decimates] position of :hints', function(done) {
              // given
              var that = this;

              this.el.raty({
                hints      : ['first', ['second']],
                precision  : true,
                targetKeep : true,
                targetType : 'hint',
                target     : function() {
                  return this.getAttribute('data-target');
                },
              });

              setTimeout(function() {
                // when
                that.el.raty('move', 1.1);

                // then
                expect(that.target).toHaveHtml('second');

                done();
              }, 100);
            });
          });

          context('with two float digits', function() {
            it ('gets the [integer][float.fixed(1) without decimates] position of :hints', function(done) {
              // given
              var that = this;

              this.el.raty({
                hints      : ['first', ['second']],
                precision  : true,
                targetKeep : true,
                targetType : 'hint',
                target     : function() {
                  return this.getAttribute('data-target');
                },
              });

              setTimeout(function() {
                // when
                that.el.raty('move', 1.19);

                // then
                expect(that.target).toHaveHtml('second');

                done();
              }, 100);
            });
          });
        });

        context('with :cancel', function() {
          it ('shows :cancelHint', function(done) {
            // given
            var that = this;

            this.el.raty({
              cancel     : true,
              precision  : true,
              targetKeep : true,
              targetType : 'hint',
              target     : function() {
                return this.getAttribute('data-target');
              }
            });

            var cancel = this.el.children('.' + this.el[0].opt.cancelClass);

            setTimeout(function() {
              // when
              cancel.trigger('mouseover');

              // then
              expect(that.target).toHaveHtml(that.el[0].opt.cancelHint);

              done();
            }, 100);
          });
        });
      });
    });
  });
});
