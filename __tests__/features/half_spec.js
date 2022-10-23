describe('#half', () => {
  let testContext;

  beforeEach(() => {
    testContext = {};
  });

  it('accepts data attribute', () => {
    // given
    Helper._append('div', { 'data-cancel-class': true });

    // when
    var raty = new Raty(document.querySelector('[data-cancel-class]'));

    // then
    expect(raty.opt.cancelClass).toEqual(true);
  });

  context('as *false', function () {
    beforeEach(() => {
      Helper.create('#el');
    });

    context('and :halfShow', function () {
      context('as *false', function () {
        it('rounds down while less the full limit', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: false,
            halfShow: false,
            round: { down: 0.25, full: 0.6, up: 0.76 },
            score: 0.5,
          });

          // when
          raty.init();

          // then
          var stars = raty.element.querySelectorAll('img');

          expect(Helper.extension(stars[0].src)).toEqual('star-off.png');
          expect(Helper.extension(stars[1].src)).toEqual('star-off.png');
          expect(Helper.extension(stars[2].src)).toEqual('star-off.png');
          expect(Helper.extension(stars[3].src)).toEqual('star-off.png');
          expect(Helper.extension(stars[4].src)).toEqual('star-off.png');
        });

        it('rounds full when equal the full limit', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: false,
            halfShow: false,
            round: { down: 0.25, full: 0.6, up: 0.76 },
            score: 0.6,
          });

          // when
          raty.init();

          // then
          var star = raty.element.querySelector('img');

          expect(Helper.extension(star.src)).toEqual('star-on.png');
        });
      });
    });
  });

  context('as *true', function () {
    beforeEach(() => {
      Helper.create('#el');
    });

    // TODO: manual click event is not working on test
    xcontext('on click', function () {
      context('into half area', function () {
        it('receives the half value', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), { half: true, halfShow: true }).init();

          // when
          Helper.click(document.querySelector('#el'), 1, 5);

          // then
          expect(raty.element.querySelector('input').value).toEqual('1.5');
        });

        it('gives a callback the rounded value', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            halfShow: true,
            click: function (score) {
              // then
              expect(score).toEqual(1.5);
            },
          }).init();

          // when
          Helper.click(document.querySelector('#el'), 1, 5);
        });
      });

      context('into round area', function () {
        it('receives the rounded value', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), { half: true, halfShow: true }).init();

          // when
          Helper.click(document.querySelector('#el'), 1, 9);

          // then
          expect(raty.element.querySelector('input').value).toEqual('2');
        });

        it('gives a callback the rounded value', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            halfShow: true,
            click: function (score) {
              // then
              expect(score).toEqual(2);
            },
          }).init();

          // when
          Helper.click(document.querySelector('#el'), 1, 9);
        });
      });

      context('into zero position', function () {
        it('receives the half value', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), { half: true, halfShow: true }).init();

          // when
          Helper.click(document.querySelector('#el'), 1, 0);

          // then
          expect(raty.element.querySelector('input').value).toEqual('1');
        });
      });
    });

    context('and :halfShow', function () {
      context('as *false', function () {
        it('ignores the round down while less down limit', () => {
          // given

          // when
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            halfShow: false,
            round: { down: 0.25, full: 0.6, up: 0.76 },
            score: 0.24,
          }).init();

          // then
          expect(Helper.extension(raty.element.querySelector('img').src)).toEqual('star-off.png');
          expect(raty.element.querySelector('input').value).toEqual('0.24');
        });

        it('ignores half while greater then down limit', () => {
          // given

          // when
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            halfShow: false,
            round: { down: 0.25, full: 0.6, up: 0.76 },
            score: 0.26,
          }).init();

          // then
          expect(Helper.extension(raty.element.querySelector('img').src)).toEqual('star-off.png');
          expect(raty.element.querySelector('input').value).toEqual('0.26');
        });

        it('ignores half while equal full limit, ignoring it', () => {
          // given

          // when
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            halfShow: false,
            round: { down: 0.25, full: 0.6, up: 0.76 },
            score: 0.6,
          }).init();

          // then
          expect(Helper.extension(raty.element.querySelector('img').src)).toEqual('star-on.png');
          expect(raty.element.querySelector('input').value).toEqual('0.6');
        });

        it('ignores half while greater than down limit and less than up limit', () => {
          // given

          // when
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            halfShow: false,
            round: { down: 0.25, full: 0.6, up: 0.76 },
            score: 0.75,
          }).init();

          // then
          expect(Helper.extension(raty.element.querySelector('img').src)).toEqual('star-on.png');
          expect(raty.element.querySelector('input').value).toEqual('0.75');
        });

        it('ignores full while equal or greater than up limit', () => {
          // given

          // when
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            halfShow: false,
            round: { down: 0.25, full: 0.6, up: 0.76 },
            score: 0.76,
          }).init();

          // then
          expect(Helper.extension(raty.element.querySelector('img').src)).toEqual('star-on.png');
        });
      });

      context('as *true', function () {
        context('on :score', function () {
          it('rounds down while less down limit', () => {
            // given

            // when
            var raty = new Raty(document.querySelector('#el'), {
              half: true,
              halfShow: true,
              round: { down: 0.25, full: 0.6, up: 0.76 },
              score: 0.24,
            }).init();

            // then
            expect(Helper.extension(raty.element.querySelector('img').src)).toEqual('star-off.png');
          });

          it('receives half while greater then down limit', () => {
            // given

            // when
            var raty = new Raty(document.querySelector('#el'), {
              half: true,
              halfShow: true,
              round: { down: 0.25, full: 0.6, up: 0.76 },
              score: 0.26,
            }).init();

            // then
            expect(Helper.extension(raty.element.querySelector('img').src)).toEqual('star-half.png');
          });

          it('receives half while equal full limit, ignoring it', () => {
            // given

            // when
            var raty = new Raty(document.querySelector('#el'), {
              half: true,
              halfShow: true,
              round: { down: 0.25, full: 0.6, up: 0.76 },
              score: 0.6,
            }).init();

            // then
            expect(Helper.extension(raty.element.querySelector('img').src)).toEqual('star-half.png');
          });

          it('receives half while greater than down limit and less than up limit', () => {
            // given

            // when
            var raty = new Raty(document.querySelector('#el'), {
              half: true,
              halfShow: true,
              round: { down: 0.25, full: 0.6, up: 0.76 },
              score: 0.75,
            }).init();

            // then
            expect(Helper.extension(raty.element.querySelector('img').src)).toEqual('star-half.png');
          });

          it('receives full while equal or greater than up limit', () => {
            // given

            // when
            var raty = new Raty(document.querySelector('#el'), {
              half: true,
              halfShow: true,
              round: { down: 0.25, full: 0.6, up: 0.76 },
              score: 0.76,
            }).init();

            // then
            expect(Helper.extension(raty.element.querySelector('img').src)).toEqual('star-on.png');
          });

          context('with :target', function () {
            beforeEach(() => {
              testContext.target = Helper.create('#target');
            });

            context('and :targetKeep', function () {
              context('and :targetType', function () {
                context('as *score', function () {
                  it('shows the 0.5 float', () => {
                    // given

                    // when
                    var raty = new Raty(document.querySelector('#el'), {
                      half: true,
                      halfShow: true,
                      score: 1.5,
                      target: '#target',
                      targetKeep: true,
                      targetType: 'score',
                    }).init();

                    // then
                    expect(testContext.target.innerHTML).toEqual('1.5');
                  });
                });

                context('as *hint', function () {
                  context('with half value', function () {
                    var score = 1.5;

                    context('with only integer hints', function () {
                      var hints = ['one', 'two', 'three', 'four', 'five'];

                      it('shows this hint as [1][0] hint', () => {
                        // given

                        // when
                        var raty = new Raty(document.querySelector('#el'), {
                          half: true,
                          halfShow: true,
                          hints: hints,
                          score: score,
                          target: '#target',
                          targetKeep: true,
                          targetType: 'hint',
                        }).init();

                        // then
                        expect(testContext.target.innerHTML).toEqual('two');
                      });
                    });

                    context('with one float hint', function () {
                      var hints = ['one', ['two'], 'three', 'four', 'five'];

                      it('shows this hint as [1][0] hint', () => {
                        // given

                        // when
                        var raty = new Raty(document.querySelector('#el'), {
                          half: true,
                          hints: hints,
                          halfShow: true,
                          precision: false,
                          score: score,
                          target: '#target',
                          targetKeep: true,
                          targetType: 'hint',
                        }).init();

                        // then
                        expect(testContext.target.innerHTML).toEqual('two');
                      });
                    });

                    context('with two float hints', function () {
                      var hints = ['one', ['one and half', 'two'], 'three', 'four', 'five'];

                      it('shows this hint as [1][0] hint', () => {
                        // given

                        // when
                        var raty = new Raty(document.querySelector('#el'), {
                          half: true,
                          hints: hints,
                          halfShow: true,
                          precision: false,
                          score: score,
                          target: '#target',
                          targetKeep: true,
                          targetType: 'hint',
                        }).init();

                        // then
                        expect(testContext.target.innerHTML).toEqual('one and half');
                      });
                    });
                  });

                  context('with integer value', function () {
                    var score = 2;

                    context('with only integer hints', function () {
                      var hints = ['one', 'two', 'three', 'four', 'five'];

                      it('shows this hint as [1][1] hint', () => {
                        // given

                        // when
                        var raty = new Raty(document.querySelector('#el'), {
                          half: true,
                          hints: hints,
                          halfShow: true,
                          precision: false,
                          score: score,
                          target: '#target',
                          targetKeep: true,
                          targetType: 'hint',
                        }).init();

                        // then
                        expect(testContext.target.innerHTML).toEqual('two');
                      });
                    });

                    context('with one float hint', function () {
                      var hints = ['one', ['two'], 'three', 'four', 'five'];

                      it('shows this hint as [1][1] hint', () => {
                        // given

                        // when
                        var raty = new Raty(document.querySelector('#el'), {
                          half: true,
                          hints: hints,
                          halfShow: true,
                          precision: false,
                          score: score,
                          target: '#target',
                          targetKeep: true,
                          targetType: 'hint',
                        }).init();

                        // then
                        expect(testContext.target.innerHTML).toEqual('two');
                      });
                    });

                    context('with two float hints', function () {
                      var hints = ['one', ['one and half', 'two'], 'three', 'four', 'five'];

                      it('shows this hint as [1][1] hint', () => {
                        // given

                        // when
                        var raty = new Raty(document.querySelector('#el'), {
                          half: true,
                          hints: hints,
                          halfShow: true,
                          precision: false,
                          score: score,
                          target: '#target',
                          targetKeep: true,
                          targetType: 'hint',
                        }).init();

                        // then
                        expect(testContext.target.innerHTML).toEqual('two');
                      });
                    });
                  });

                  context('with float as zero value', function () {
                    var score = 2.0;

                    context('with only integer hints', function () {
                      var hints = ['one', 'two', 'three', 'four', 'five'];

                      it('shows this hint as [1][1] hint', () => {
                        // given

                        // when
                        var raty = new Raty(document.querySelector('#el'), {
                          half: true,
                          hints: hints,
                          halfShow: true,
                          precision: false,
                          score: score,
                          target: '#target',
                          targetKeep: true,
                          targetType: 'hint',
                        }).init();

                        // then
                        expect(testContext.target.innerHTML).toEqual('two');
                      });
                    });

                    context('with one float hint', function () {
                      var hints = ['one', ['two'], 'three', 'four', 'five'];

                      it('shows this hint as [1][1] hint', () => {
                        // given

                        // when
                        var raty = new Raty(document.querySelector('#el'), {
                          half: true,
                          hints: hints,
                          halfShow: true,
                          precision: false,
                          score: score,
                          target: '#target',
                          targetKeep: true,
                          targetType: 'hint',
                        }).init();

                        // then
                        expect(testContext.target.innerHTML).toEqual('two');
                      });
                    });

                    context('with two float hints', function () {
                      var hints = ['one', ['one and half', 'two'], 'three', 'four', 'five'];

                      it('shows this hint as [1][1] hint', () => {
                        // given

                        // when
                        var raty = new Raty(document.querySelector('#el'), {
                          half: true,
                          hints: hints,
                          halfShow: true,
                          precision: false,
                          score: score,
                          target: '#target',
                          targetKeep: true,
                          targetType: 'hint',
                        }).init();

                        // then
                        expect(testContext.target.innerHTML).toEqual('two');
                      });
                    });
                  });
                });
              });
            });
          });
        });

        context('on #move', function () {
          beforeEach(() => {
            testContext.target = Helper.create('#target');
          });

          context('on 1.1', function () {
            it('receives the half star', () => {
              // given
              var raty = new Raty(document.querySelector('#el'), {
                half: true,
                hints: [null, ['1,5', '2,0']],
                target: '#target',
                targetKeep: true,
              }).init();

              // when
              raty.move(0.1);

              // then
              expect(Helper.extension(raty.element.querySelectorAll('img')[0].src)).toEqual('star-half.png');
            });
          });

          context('on 1.2', function () {
            it('receives half star', () => {
              // given
              var raty = new Raty(document.querySelector('#el'), {
                half: true,
                hints: [null, ['1,5', '2,0']],
                target: '#target',
                targetKeep: true,
              }).init();

              // when
              raty.move(1.1);

              // then
              expect(Helper.extension(raty.element.querySelectorAll('img')[1].src)).toEqual('star-half.png');
            });
          });

          context('on 1.3', function () {
            it('receives half star', () => {
              // given
              var raty = new Raty(document.querySelector('#el'), {
                half: true,
                hints: [null, ['1,5', '2,0']],
                target: '#target',
                targetKeep: true,
              }).init();

              // when
              raty.move(1.3);

              // then
              expect(Helper.extension(raty.element.querySelectorAll('img')[1].src)).toEqual('star-half.png');
            });
          });

          context('on 1.4', function () {
            it('receives half star', () => {
              // given
              var raty = new Raty(document.querySelector('#el'), {
                half: true,
                hints: [null, ['1,5', '2,0']],
                target: '#target',
                targetKeep: true,
              }).init();

              // when
              raty.move(1.4);

              // then
              expect(Helper.extension(raty.element.querySelectorAll('img')[1].src)).toEqual('star-half.png');
            });
          });

          context('on 1.5', function () {
            it('receives half star', () => {
              // given
              var raty = new Raty(document.querySelector('#el'), {
                half: true,
                hints: [null, ['1,5', '2,0']],
                target: '#target',
                targetKeep: true,
              }).init();

              // when
              raty.move(1.5);

              // then
              expect(Helper.extension(raty.element.querySelectorAll('img')[1].src)).toEqual('star-half.png');
            });
          });

          context('on 1.6', function () {
            it('receives the full star', () => {
              // given
              var raty = new Raty(document.querySelector('#el'), {
                half: true,
                hints: [null, ['1,5', '2,0']],
                target: '#target',
                targetKeep: true,
              }).init();

              // when
              raty.move(1.6);

              // then
              expect(testContext.target.textContent).toEqual('2,0');
            });
          });

          context('on 1.7', function () {
            it('receives the full star', () => {
              // given
              var raty = new Raty(document.querySelector('#el'), {
                half: true,
                hints: [null, ['1,5', '2,0']],
                target: '#target',
                targetKeep: true,
              }).init();

              // when
              raty.move(1.7);

              // then
              expect(testContext.target.textContent).toEqual('2,0');
            });
          });

          context('on 1.8', function () {
            it('receives the full star', () => {
              // given
              var raty = new Raty(document.querySelector('#el'), {
                half: true,
                hints: [null, ['1,5', '2,0']],
                target: '#target',
                targetKeep: true,
              }).init();

              // when
              raty.move(1.8);

              // then
              expect(testContext.target.textContent).toEqual('2,0');
            });
          });

          context('on 1.9', function () {
            it('receives the full star', () => {
              // given
              var raty = new Raty(document.querySelector('#el'), {
                half: true,
                hints: [null, ['1,5', '2,0']],
                target: '#target',
                targetKeep: true,
              }).init();

              // when
              raty.move(1.9);

              // then
              expect(testContext.target.textContent).toEqual('2,0');
            });
          });

          context('on 2.0', function () {
            it('receives the full star', () => {
              // given
              var raty = new Raty(document.querySelector('#el'), {
                half: true,
                hints: [null, ['1,5', '2,0']],
                target: '#target',
                targetKeep: true,
              }).init();

              // when
              raty.move(2.0);

              // then
              expect(testContext.target.textContent).toEqual('2,0');
            });
          });

          context('on 2', function () {
            it('receives the full star', () => {
              // given
              var raty = new Raty(document.querySelector('#el'), {
                half: true,
                hints: [null, ['1,5', '2,0']],
                target: '#target',
                targetKeep: true,
              }).init();

              // when
              raty.move(2);

              // then
              expect(testContext.target.textContent).toEqual('2,0');
            });
          });
        });

        // TODO: manual mousemove event is not working on test
        xcontext('on mousemove', function () {
          beforeEach(() => {
            testContext.target = Helper.create('#target');
          });

          context('on 1.0 fraction', function () {
            it('receives half star', () => {
              // given
              var raty = new Raty(document.querySelector('#el'), {
                half: true,
                hints: [null, ['half', 'integer']],
                target: '#target',
                targetKeep: true,
              }).init();

              // when
              Helper.mousemove(document.querySelector('#el'), 1, 0);

              // then
              expect(testContext.target.textContent).toEqual('half');
            });
          });

          context('on 1.1 fraction', function () {
            it('receives half star', () => {
              // given
              var raty = new Raty(document.querySelector('#el'), {
                half: true,
                hints: [null, ['half', 'integer']],
                target: '#target',
                targetKeep: true,
              }).init();

              // when
              Helper.mousemove(document.querySelector('#el'), 1, 1);

              // then
              expect(testContext.target.textContent).toEqual('half');
            });
          });

          context('on 1.2 fraction', function () {
            it('receives half star', () => {
              // given
              var raty = new Raty(document.querySelector('#el'), {
                half: true,
                hints: [null, ['half', 'integer']],
                target: '#target',
                targetKeep: true,
              }).init();

              // when
              Helper.mousemove(document.querySelector('#el'), 1, 2);

              // then
              expect(testContext.target.textContent).toEqual('half');
            });
          });

          context('on 1.3 fraction', function () {
            it('receives half star', () => {
              // given
              var raty = new Raty(document.querySelector('#el'), {
                half: true,
                hints: [null, ['half', 'integer']],
                target: '#target',
                targetKeep: true,
              }).init();

              // when
              Helper.mousemove(document.querySelector('#el'), 1, 3);

              // then
              expect(testContext.target.textContent).toEqual('half');
            });
          });

          context('on 1.4 fraction', function () {
            it('receives half star', () => {
              // given
              var raty = new Raty(document.querySelector('#el'), {
                half: true,
                hints: [null, ['half', 'integer']],
                target: '#target',
                targetKeep: true,
              }).init();

              // when
              Helper.mousemove(document.querySelector('#el'), 1, 4);

              // then
              expect(testContext.target.textContent).toEqual('half');
            });
          });

          context('on 1.5 fraction', function () {
            it('receives half star', () => {
              // given
              var raty = new Raty(document.querySelector('#el'), {
                half: true,
                hints: [null, ['half', 'integer']],
                target: '#target',
                targetKeep: true,
              }).init();

              // when
              Helper.mousemove(document.querySelector('#el'), 1, 5);

              // then
              expect(testContext.target.textContent).toEqual('half');
            });
          });

          context('on 1.6 fraction', function () {
            it('receives the full star', () => {
              // given
              var raty = new Raty(document.querySelector('#el'), {
                half: true,
                hints: [null, ['half', 'integer']],
                target: '#target',
                targetKeep: true,
              }).init();

              // when
              Helper.mousemove(document.querySelector('#el'), 1, 6);

              // then
              expect(testContext.target.textContent).toEqual('integer');
            });
          });

          context('on 1.7 fraction', function () {
            it('receives the full star', () => {
              // given
              var raty = new Raty(document.querySelector('#el'), {
                half: true,
                hints: [null, ['half', 'integer']],
                target: '#target',
                targetKeep: true,
              }).init();

              // when
              Helper.mousemove(document.querySelector('#el'), 1, 7);

              // then
              expect(testContext.target.textContent).toEqual('integer');
            });
          });

          context('on 1.8 fraction', function () {
            it('receives the full star', () => {
              // given
              var raty = new Raty(document.querySelector('#el'), {
                half: true,
                hints: [null, ['half', 'integer']],
                target: '#target',
                targetKeep: true,
              }).init();

              // when
              Helper.mousemove(document.querySelector('#el'), 1, 8);

              // then
              expect(testContext.target.textContent).toEqual('integer');
            });
          });

          context('on 1.9 fraction', function () {
            it('receives the full star', () => {
              // given
              var raty = new Raty(document.querySelector('#el'), {
                half: true,
                hints: [null, ['half', 'integer']],
                target: '#target',
                targetKeep: true,
              }).init();

              // when
              Helper.mousemove(document.querySelector('#el'), 1, 9);

              // then
              expect(testContext.target.textContent).toEqual('integer');
            });
          });
        });
      });
    });
  });
});
