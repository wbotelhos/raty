describe('#half', function() {
  beforeEach(function() {
    $.fn.raty.defaults.path = '../lib/images';

    this.el = Helper.create('#el');
  });

  afterEach(function() {
    Helper.clear();
  });

  context('as *false', function() {
    context('and :halfShow', function() {
      context('as *false', function() {
        it ('rounds down while less the full limit', function() {
          // given

          // when
          this.el.raty({
            half     : false,
            halfShow : false,
            round    : { down: 0.25, full: 0.6, up: 0.76 },
            score    : 0.5
          });

          // then
          var stars = this.el.children('img');

          expect(stars[0]).toHaveAttr('src', '../lib/images/star-off.png');
          expect(stars[1]).toHaveAttr('src', '../lib/images/star-off.png');
        });

        it ('rounds full when equal the full limit', function() {
          // given

          // when
          this.el.raty({
            half     : false,
            halfShow : false,
            round    : { down: 0.25, full: 0.6, up: 0.76 },
            score    : 0.6
          });


          // then
          expect(this.el.children('img:first')).toHaveAttr('src', '../lib/images/star-on.png');
        });
      });
    });
  });

  context('as *true', function() {
    context('on click', function() {
      context('into half area', function() {
        it ('receives the half value', function() {
          // given
          this.el.raty({
            half     : true,
            halfShow : true
          });

          // when
          Helper.click(this.el, 1, 5);

          // then
          expect(this.el.children('input').val()).toEqual('1.5');
        });
      });

      context('into round area', function() {
        it ('receives the rounded value', function() {
          // given
          this.el.raty({
            half     : true,
            halfShow : true
          });

          // when
          Helper.click(this.el, 1, 9);

          // then
          expect(this.el.children('input').val()).toEqual('2');
        });
      });

      context('into zero position', function() {
        it ('receives the half value', function() {
          // given
          this.el.raty({
            half     : true,
            halfShow : true
          });

          // when
          Helper.click(this.el, 1, 0);

          // then
          expect(this.el.children('input').val()).toEqual('1');
        });
      });
    });

    context('and :halfShow', function() {
      context('as *false', function() {
        it ('ignores the round down while less down limit', function() {
          // given

          // when
          this.el.raty({
            half     : true,
            halfShow : false,
            round    : { down: 0.25, full: 0.6, up: 0.76 },
            score    : 0.24
          });

          // then
          expect(this.el.children('img:first')).toHaveAttr('src', '../lib/images/star-off.png');
          expect(this.el.children('input')).toHaveValue('0.24');
        });

        it ('ignores half while greater then down limit', function() {
          // given

          // when
          this.el.raty({
            half     : true,
            halfShow : false,
            round    : { down: 0.25, full: 0.6, up: 0.76 },
            score    : 0.26
          });

          // then
          expect(this.el.children('img:first')).toHaveAttr('src', '../lib/images/star-off.png');
          expect(this.el.children('input').val()).toEqual('0.26');
        });

        it ('ignores half while equal full limit, ignoring it', function() {
          // given

          // when
          this.el.raty({
            half     : true,
            halfShow : false,
            round    : { down: 0.25, full: 0.6, up: 0.76 },
            score    : 0.6
          });

          // then
          expect(this.el.children('img:first')).toHaveAttr('src', '../lib/images/star-on.png');
          expect(this.el.children('input').val()).toEqual('0.6');
        });

        it ('ignores half while greater than down limxit and less than up limit', function() {
          // given

          // when
          this.el.raty({
            half     : true,
            halfShow : false,
            round    : { down: 0.25, full: 0.6, up: 0.76 },
            score    : 0.75
          });

          // then
          expect(this.el.children('img:first')).toHaveAttr('src', '../lib/images/star-on.png');
          expect(this.el.children('input').val()).toEqual('0.75');
        });

        it ('ignores full while equal or greater than up limit', function() {
          // given

          // when
          this.el.raty({
            half     : true,
            halfShow : false,
            round    : { down: 0.25, full: 0.6, up: 0.76 },
            score    : 0.76
          });

          // then
          expect(this.el.children('img:first')).toHaveAttr('src', '../lib/images/star-on.png');
        });
      });

      context('as *true', function() {
        context('on :score', function() {
          it ('rounds down while less down limit', function() {
            // given

            // when
            this.el.raty({
              half     : true,
              halfShow : true,
              round    : { down: 0.25, full: 0.6, up: 0.76 },
              score    : 0.24
            });

            // then
            expect(this.el.children('img:first')).toHaveAttr('src', '../lib/images/star-off.png');
          });

          it ('receives half while greater then down limit', function() {
            // given

            // when
            this.el.raty({
              half     : true,
              halfShow : true,
              round    : { down: 0.25, full: 0.6, up: 0.76 },
              score    : 0.26
            });

            // then
            expect(this.el.children('img:first')).toHaveAttr('src', '../lib/images/star-half.png');
          });

          it ('receives half while equal full limit, ignoring it', function() {
            // given

            // when
            this.el.raty({
              half     : true,
              halfShow : true,
              round    : { down: 0.25, full: 0.6, up: 0.76 },
              score    : 0.6
            });

            // then
            expect(this.el.children('img:first')).toHaveAttr('src', '../lib/images/star-half.png');
          });

          it ('receives half while greater than down limxit and less than up limit', function() {
            // given

            // when
            this.el.raty({
              half     : true,
              halfShow : true,
              round    : { down: 0.25, full: 0.6, up: 0.76 },
              score    : 0.75
            });

            // then
            expect(this.el.children('img:first')).toHaveAttr('src', '../lib/images/star-half.png');
          });

          it ('receives full while equal or greater than up limit', function() {
            // given

            // when
            this.el.raty({
              half     : true,
              halfShow : true,
              round    : { down: 0.25, full: 0.6, up: 0.76 },
              score    : 0.76
            });

            // then
            expect(this.el.children('img:first')).toHaveAttr('src', '../lib/images/star-on.png');
          });

          context('with :target', function() {
            beforeEach(function() {
              this.target = Helper.create('#target');
            });

            context('and :targetKeep', function() {
              context('and :targetType', function() {
                context('as *score', function() {
                  it ('shows the 0.5 float', function() {
                    // given

                    // when
                    this.el.raty({
                      half       : true,
                      halfShow   : true,
                      score      : 1.5,
                      target     : '#target',
                      targetKeep : true,
                      targetType : 'score'
                    });

                    // then
                    expect(this.target).toHaveHtml('1.5');
                  });
                });

                context('as *hint', function() {
                  context('with half value', function() {
                    var score = 1.5;

                    context('with only integer hints', function() {
                      var hints = ['one', 'two', 'three', 'four', 'five'];

                      it ('shows this hint as [1][0] hint', function() {
                        // given

                        // when
                        this.el.raty({
                          half       : true,
                          halfShow   : true,
                          hints      : hints,
                          score      : score,
                          target     : '#target',
                          targetKeep : true,
                          targetType : 'hint'
                        });

                        // then
                        expect(this.target).toHaveHtml('two');
                      });
                    });

                    context('with one float hint', function() {
                      var hints = ['one', ['two'], 'three', 'four', 'five'];

                      it ('shows this hint as [1][0] hint', function() {
                        // given

                        // when
                        this.el.raty({
                          half       : true,
                          hints      : hints,
                          halfShow   : true,
                          precision  : false,
                          score      : score,
                          target     : '#target',
                          targetKeep : true,
                          targetType : 'hint'
                        });

                        // then
                        expect(this.target).toHaveHtml('two');
                      });
                    });

                    context('with two float hints', function() {
                      var hints = ['one', ['one and half', 'two'], 'three', 'four', 'five'];

                      it ('shows this hint as [1][0] hint', function() {
                        // given

                        // when
                        this.el.raty({
                          half       : true,
                          hints      : hints,
                          halfShow   : true,
                          precision  : false,
                          score      : score,
                          target     : '#target',
                          targetKeep : true,
                          targetType : 'hint'
                        });

                        // then
                        expect(this.target).toHaveHtml('one and half');
                      });
                    });
                  });

                  context('with integer value', function() {
                    var score = 2;

                    context('with only integer hints', function() {
                      var hints = ['one', 'two', 'three', 'four', 'five'];

                      it ('shows this hint as [1][1] hint', function() {
                        // given

                        // when
                        this.el.raty({
                          half       : true,
                          hints      : hints,
                          halfShow   : true,
                          precision  : false,
                          score      : score,
                          target     : '#target',
                          targetKeep : true,
                          targetType : 'hint'
                        });

                        // then
                        expect(this.target).toHaveHtml('two');
                      });
                    });

                    context('with one float hint', function() {
                      var hints = ['one', ['two'], 'three', 'four', 'five'];

                      it ('shows this hint as [1][1] hint', function() {
                        // given

                        // when
                        this.el.raty({
                          half       : true,
                          hints      : hints,
                          halfShow   : true,
                          precision  : false,
                          score      : score,
                          target     : '#target',
                          targetKeep : true,
                          targetType : 'hint'
                        });

                        // then
                        expect(this.target).toHaveHtml('two');
                      });
                    });

                    context('with two float hints', function() {
                      var hints = ['one', ['one and half', 'two'], 'three', 'four', 'five'];

                      it ('shows this hint as [1][1] hint', function() {
                        // given

                        // when
                        this.el.raty({
                          half       : true,
                          hints      : hints,
                          halfShow   : true,
                          precision  : false,
                          score      : score,
                          target     : '#target',
                          targetKeep : true,
                          targetType : 'hint'
                        });

                        // then
                        expect(this.target).toHaveHtml('two');
                      });
                    });
                  });

                  context('with float as zero value', function() {
                    var score = 2.0;

                    context('with only integer hints', function() {
                      var hints = ['one', 'two', 'three', 'four', 'five'];

                      it ('shows this hint as [1][1] hint', function() {
                        // given

                        // when
                        this.el.raty({
                          half       : true,
                          hints      : hints,
                          halfShow   : true,
                          precision  : false,
                          score      : score,
                          target     : '#target',
                          targetKeep : true,
                          targetType : 'hint'
                        });

                        // then
                        expect(this.target).toHaveHtml('two');
                      });
                    });

                    context('with one float hint', function() {
                      var hints = ['one', ['two'], 'three', 'four', 'five'];

                      it ('shows this hint as [1][1] hint', function() {
                        // given

                        // when
                        this.el.raty({
                          half       : true,
                          hints      : hints,
                          halfShow   : true,
                          precision  : false,
                          score      : score,
                          target     : '#target',
                          targetKeep : true,
                          targetType : 'hint'
                        });

                        // then
                        expect(this.target).toHaveHtml('two');
                      });
                    });

                    context('with two float hints', function() {
                      var hints = ['one', ['one and half', 'two'], 'three', 'four', 'five'];

                      it ('shows this hint as [1][1] hint', function() {
                        // given

                        // when
                        this.el.raty({
                          half       : true,
                          hints      : hints,
                          halfShow   : true,
                          precision  : false,
                          score      : score,
                          target     : '#target',
                          targetKeep : true,
                          targetType : 'hint'
                        });

                        // then
                        expect(this.target).toHaveHtml('two');
                      });
                    });
                  });
                });
              });
            });
          });
        });

        context('on #move', function() {
          beforeEach(function() {
            this.target = Helper.create('#target');
          });

          context('on 1.1', function() {
            it ('receives the half star', function() {
              // given
              this.el.raty({
                half       : true,
                hints      : [null, ['1,5', '2,0']],
                target     : '#target',
                targetKeep : true
              });

              // when
              this.el.raty('move', 1.1);

              // then
              expect(this.el.children(':eq(1)')).toHaveAttr('src', '../lib/images/star-half.png');
            });
          });

          context('on 1.2', function() {
            it ('receives half star', function() {
              // given
              this.el.raty({
                half       : true,
                hints      : [null, ['1,5', '2,0']],
                target     : '#target',
                targetKeep : true
              });

              // when
              this.el.raty('move', 1.2);

              // then
              expect(this.el.children(':eq(1)')).toHaveAttr('src', '../lib/images/star-half.png');
            });
          });

          context('on 1.3', function() {
            it ('receives half star', function() {
              // given
              this.el.raty({
                half       : true,
                hints      : [null, ['1,5', '2,0']],
                target     : '#target',
                targetKeep : true
              });

              // when
              this.el.raty('move', 1.3);

              // then
              expect(this.el.children(':eq(1)')).toHaveAttr('src', '../lib/images/star-half.png');
            });
          });

          context('on 1.4', function() {
            it ('receives half star', function() {
              // given
              this.el.raty({
                half       : true,
                hints      : [null, ['1,5', '2,0']],
                target     : '#target',
                targetKeep : true
              });

              // when
              this.el.raty('move', 1.4);

              // then
              expect(this.el.children(':eq(1)')).toHaveAttr('src', '../lib/images/star-half.png');
            });
          });

          context('on 1.5', function() {
            it ('receives half star', function() {
              // given
              this.el.raty({
                half       : true,
                hints      : [null, ['1,5', '2,0']],
                target     : '#target',
                targetKeep : true
              });

              // when
              this.el.raty('move', 1.5);

              // then
              expect(this.el.children(':eq(1)')).toHaveAttr('src', '../lib/images/star-half.png');
            });
          });

          context('on 1.6', function() {
            it ('receives the full star', function() {
              // given
              this.el.raty({
                half       : true,
                hints      : [null, ['1,5', '2,0']],
                target     : '#target',
                targetKeep : true
              });

              // when
              this.el.raty('move', 1.6);

              // then
              expect(this.target.text()).toEqual('2,0');
            });
          });

          context('on 1.7', function() {
            it ('receives the full star', function() {
              // given
              this.el.raty({
                half       : true,
                hints      : [null, ['1,5', '2,0']],
                target     : '#target',
                targetKeep : true
              });

              // when
              this.el.raty('move', 1.7);

              // then
              expect(this.target.text()).toEqual('2,0');
            });
          });

          context('on 1.8', function() {
            it ('receives the full star', function() {
              // given
              this.el.raty({
                half       : true,
                hints      : [null, ['1,5', '2,0']],
                target     : '#target',
                targetKeep : true
              });

              // when
              this.el.raty('move', 1.8);

              // then
              expect(this.target.text()).toEqual('2,0');
            });
          });

          context('on 1.9', function() {
            it ('receives the full star', function() {
              // given
              this.el.raty({
                half       : true,
                hints      : [null, ['1,5', '2,0']],
                target     : '#target',
                targetKeep : true
              });

              // when
              this.el.raty('move', 1.9);

              // then
              expect(this.target.text()).toEqual('2,0');
            });
          });

          context('on 2.0', function() {
            it ('receives the full star', function() {
              // given
              this.el.raty({
                half       : true,
                hints      : [null, ['1,5', '2,0']],
                target     : '#target',
                targetKeep : true
              });

              // when
              this.el.raty('move', 2.0);

              // then
              expect(this.target.text()).toEqual('2,0');
            });
          });

          context('on 2', function() {
            it ('receives the full star', function() {
              // given
              this.el.raty({
                half       : true,
                hints      : [null, ['1,5', '2,0']],
                target     : '#target',
                targetKeep : true
              });

              // when
              this.el.raty('move', 2);

              // then
              expect(this.target.text()).toEqual('2,0');
            });
          });
        });

        context('on mousemove', function() {
          beforeEach(function() {
            this.target = Helper.create('#target');
          });

          context('on 1.0 fraction', function() {
            it ('receives half star', function() {
              // given
              this.el.raty({
                half       : true,
                hints      : [null, ['half', 'integer']],
                target     : '#target',
                targetKeep : true
              });

              // when
              Helper.mousemove(this.el, 1, 0);

              // then
              expect(this.target.text()).toEqual('half');
            });
          });

          context('on 1.1 fraction', function() {
            it ('receives half star', function() {
              // given
              this.el.raty({
                half       : true,
                hints      : [null, ['half', 'integer']],
                target     : '#target',
                targetKeep : true
              });

              // when
              Helper.mousemove(this.el, 1, 1);

              // then
              expect(this.target.text()).toEqual('half');
            });
          });

          context('on 1.2 fraction', function() {
            it ('receives half star', function() {
              // given
              this.el.raty({
                half       : true,
                hints      : [null, ['half', 'integer']],
                target     : '#target',
                targetKeep : true
              });

              // when
              Helper.mousemove(this.el, 1, 2);

              // then
              expect(this.target.text()).toEqual('half');
            });
          });

          context('on 1.3 fraction', function() {
            it ('receives half star', function() {
              // given
              this.el.raty({
                half       : true,
                hints      : [null, ['half', 'integer']],
                target     : '#target',
                targetKeep : true
              });

              // when
              Helper.mousemove(this.el, 1, 3);

              // then
              expect(this.target.text()).toEqual('half');
            });
          });

          context('on 1.4 fraction', function() {
            it ('receives half star', function() {
              // given
              this.el.raty({
                half       : true,
                hints      : [null, ['half', 'integer']],
                target     : '#target',
                targetKeep : true
              });

              // when
              Helper.mousemove(this.el, 1, 4);

              // then
              expect(this.target.text()).toEqual('half');
            });
          });

          context('on 1.5 fraction', function() {
            it ('receives half star', function() {
              // given
              this.el.raty({
                half       : true,
                hints      : [null, ['half', 'integer']],
                target     : '#target',
                targetKeep : true
              });

              // when
              Helper.mousemove(this.el, 1, 5);

              // then
              expect(this.target.text()).toEqual('half');
            });
          });

          context('on 1.6 fraction', function() {
            it ('receives the full star', function() {
              // given
              this.el.raty({
                half       : true,
                hints      : [null, ['half', 'integer']],
                target     : '#target',
                targetKeep : true
              });

              // when
              Helper.mousemove(this.el, 1, 6);

              // then
              expect(this.target.text()).toEqual('integer');
            });
          });

          context('on 1.7 fraction', function() {
            it ('receives the full star', function() {
              // given
              this.el.raty({
                half       : true,
                hints      : [null, ['half', 'integer']],
                target     : '#target',
                targetKeep : true
              });

              // when
              Helper.mousemove(this.el, 1, 7);

              // then
              expect(this.target.text()).toEqual('integer');
            });
          });

          context('on 1.8 fraction', function() {
            it ('receives the full star', function() {
              // given
              this.el.raty({
                half       : true,
                hints      : [null, ['half', 'integer']],
                target     : '#target',
                targetKeep : true
              });

              // when
              Helper.mousemove(this.el, 1, 8);

              // then
              expect(this.target.text()).toEqual('integer');
            });
          });

          context('on 1.9 fraction', function() {
            it ('receives the full star', function() {
              // given
              this.el.raty({
                half       : true,
                hints      : [null, ['half', 'integer']],
                target     : '#target',
                targetKeep : true
              });

              // when
              Helper.mousemove(this.el, 1, 9);

              // then
              expect(this.target.text()).toEqual('integer');
            });
          });
        });
      });
    });
  });
});
