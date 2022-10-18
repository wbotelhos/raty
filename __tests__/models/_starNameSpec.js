describe('#_starName', () => {
  let testContext;

  beforeEach(() => {
    testContext = {};
  });

  beforeEach(() => {
    Helper.create('#el');
  });

  context('when event is given', function () {
    beforeEach(() => {
      testContext.evt = document.createEvent('MouseEvents');
    });

    context('when decimal is bigger than 0.5', function () {
      beforeEach(() => {
        testContext.decimal = 0.51;
      });

      it('returns startOn', () => {
        // given
        var raty = new Raty(document.querySelector('#el'));

        // when
        var star = raty._starName(testContext.decimal, testContext.evt);

        // then
        expect(star).toEqual('starOn');
      });
    });

    context('when decimal is equal 0.5', function () {
      beforeEach(() => {
        testContext.decimal = 0.5;
      });

      it('returns starHalf', () => {
        // given
        var raty = new Raty(document.querySelector('#el'));

        // when
        var star = raty._starName(testContext.decimal, testContext.evt);

        // then
        expect(star).toEqual('starHalf');
      });
    });

    context('when decimal is less than 0.5', function () {
      beforeEach(() => {
        testContext.decimal = 0.49;
      });

      it('returns starHalf', () => {
        // given
        var raty = new Raty(document.querySelector('#el'));

        // when
        var star = raty._starName(testContext.decimal, testContext.evt);

        // then
        expect(star).toEqual('starHalf');
      });
    });
  });

  context('when event is not given', function () {
    beforeEach(() => {
      testContext.evt = undefined;
    });

    context('when move function is triggered', function () {
      beforeEach(() => {
        testContext.isMove = true;
      });

      context('when decimal is bigger than 0.5', function () {
        beforeEach(() => {
          testContext.decimal = 0.51;
        });

        it('returns startOn', () => {
          // given
          var raty = new Raty(document.querySelector('#el'));

          raty.isMove = testContext.isMove;

          // when
          var star = raty._starName(testContext.decimal, testContext.evt);

          // then
          expect(star).toEqual('starOn');
        });
      });

      context('when decimal is equal 0.5', function () {
        it('returns starHalf', () => {
          // given
          var raty = new Raty(document.querySelector('#el'));

          raty.isMove = testContext.isMove;

          // when
          var star = raty._starName(testContext.decimal, testContext.evt);

          // then
          expect(star).toEqual('starHalf');
        });
      });

      context('when decimal is less than 0.5', function () {
        it('returns starHalf', () => {
          // given
          var raty = new Raty(document.querySelector('#el'));

          raty.isMove = testContext.isMove;

          // when
          var star = raty._starName(testContext.decimal, testContext.evt);

          // then
          expect(star).toEqual('starHalf');
        });
      });
    });

    context('when move function is not triggered', function () {
      beforeEach(() => {
        testContext.isMove = false;
      });

      context('when decimal is less than option round.down', function () {
        beforeEach(() => {
          testContext.decimal = 0.51;
          testContext.roundDown = testContext.decimal + 0.1;
        });

        it('returns undefined', () => {
          // given
          var raty = new Raty(document.querySelector('#el'));

          raty.isMove = testContext.isMove;
          raty.opt.round.down = testContext.roundDown;

          // when
          var star = raty._starName(testContext.decimal, testContext.evt);

          // then
          expect(star).toEqual(undefined);
        });
      });

      context('when decimal is equal option round.down', function () {
        beforeEach(() => {
          testContext.decimal = 0.51;
          testContext.roundDown = testContext.decimal;
        });

        it('returns undefined', () => {
          // given
          var raty = new Raty(document.querySelector('#el'));

          raty.isMove = testContext.isMove;
          raty.opt.round.down = testContext.roundDown;

          // when
          var star = raty._starName(testContext.decimal, testContext.evt);

          // then
          expect(star).toEqual(undefined);
        });
      });

      context('when decimal is bigger than option round.down', function () {
        beforeEach(() => {
          testContext.roundDown = 0.5;
          testContext.decimal = testContext.roundDown + 0.1;
        });

        context('when option halfShow is enabled', function () {
          beforeEach(() => {
            testContext.halfShow = true;
          });

          context('when decimal is less than options round.up', function () {
            beforeEach(() => {
              testContext.roundUp = testContext.decimal + 0.1;
            });

            it('returns starHalf', () => {
              // given
              var raty = new Raty(document.querySelector('#el'));

              raty.isMove = testContext.isMove;
              raty.opt.halfShow = testContext.halfShow;
              raty.opt.round.down = testContext.roundDown;
              raty.opt.round.up = testContext.roundUp;

              // when
              var star = raty._starName(testContext.decimal, testContext.evt);

              // then
              expect(star).toEqual('starHalf');
            });
          });

          context('when decimal is equal options round.up', function () {
            beforeEach(() => {
              testContext.roundUp = testContext.decimal;
            });

            context('when decimal is less than options round.full', function () {
              beforeEach(() => {
                testContext.roundFull = testContext.decimal + 0.1;
              });

              it('returns starOff', () => {
                // given
                var raty = new Raty(document.querySelector('#el'));

                raty.isMove = testContext.isMove;
                raty.opt.halfShow = testContext.halfShow;
                raty.opt.round.down = testContext.roundDown;
                raty.opt.round.full = testContext.roundFull;
                raty.opt.round.up = testContext.roundUp;

                // when
                var star = raty._starName(testContext.decimal, testContext.evt);

                // then
                expect(star).toEqual('starOff');
              });
            });

            context('when decimal is equal options round.full', function () {
              beforeEach(() => {
                testContext.roundFull = testContext.decimal;
              });

              it('returns starOn', () => {
                // given
                var raty = new Raty(document.querySelector('#el'));

                raty.isMove = testContext.isMove;
                raty.opt.halfShow = testContext.halfShow;
                raty.opt.round.down = testContext.roundDown;
                raty.opt.round.full = testContext.roundFull;
                raty.opt.round.up = testContext.roundUp;

                // when
                var star = raty._starName(testContext.decimal, testContext.evt);

                // then
                expect(star).toEqual('starOn');
              });
            });

            context('when decimal is bigger than options round.full', function () {
              beforeEach(() => {
                testContext.roundFull = testContext.decimal - 0.1;
              });

              it('returns starOn', () => {
                // given
                var raty = new Raty(document.querySelector('#el'));

                raty.isMove = testContext.isMove;
                raty.opt.halfShow = testContext.halfShow;
                raty.opt.round.down = testContext.roundDown;
                raty.opt.round.full = testContext.roundFull;
                raty.opt.round.up = testContext.roundUp;

                // when
                var star = raty._starName(testContext.decimal, testContext.evt);

                // then
                expect(star).toEqual('starOn');
              });
            });
          });

          context('when decimal is bigger than options round.up', function () {
            beforeEach(() => {
              testContext.roundUp = testContext.decimal - 0.1;
            });

            context('when decimal is less than options round.full', function () {
              beforeEach(() => {
                testContext.roundFull = testContext.decimal + 0.1;
              });

              it('returns starOff', () => {
                // given
                var raty = new Raty(document.querySelector('#el'));

                raty.isMove = testContext.isMove;
                raty.opt.halfShow = testContext.halfShow;
                raty.opt.round.down = testContext.roundDown;
                raty.opt.round.full = testContext.roundFull;
                raty.opt.round.up = testContext.roundUp;

                // when
                var star = raty._starName(testContext.decimal, testContext.evt);

                // then
                expect(star).toEqual('starOff');
              });
            });

            context('when decimal is equal options round.full', function () {
              beforeEach(() => {
                testContext.roundFull = testContext.decimal;
              });

              it('returns starOn', () => {
                // given
                var raty = new Raty(document.querySelector('#el'));

                raty.isMove = testContext.isMove;
                raty.opt.halfShow = testContext.halfShow;
                raty.opt.round.down = testContext.roundDown;
                raty.opt.round.full = testContext.roundFull;
                raty.opt.round.up = testContext.roundUp;

                // when
                var star = raty._starName(testContext.decimal, testContext.evt);

                // then
                expect(star).toEqual('starOn');
              });
            });

            context('when decimal is bigger than options round.full', function () {
              beforeEach(() => {
                testContext.roundFull = testContext.decimal - 0.1;
              });

              it('returns starOn', () => {
                // given
                var raty = new Raty(document.querySelector('#el'));

                raty.isMove = testContext.isMove;
                raty.opt.halfShow = testContext.halfShow;
                raty.opt.round.down = testContext.roundDown;
                raty.opt.round.full = testContext.roundFull;
                raty.opt.round.up = testContext.roundUp;

                // when
                var star = raty._starName(testContext.decimal, testContext.evt);

                // then
                expect(star).toEqual('starOn');
              });
            });
          });
        });

        context('when option halfShow is not enabled', function () {
          beforeEach(() => {
            testContext.halfShow = false;
          });

          context('when decimal is less than options round.full', function () {
            beforeEach(() => {
              testContext.roundFull = testContext.decimal + 0.1;
            });

            it('returns starOff', () => {
              // given
              var raty = new Raty(document.querySelector('#el'));

              raty.isMove = testContext.isMove;
              raty.opt.halfShow = testContext.halfShow;
              raty.opt.round.down = testContext.roundDown;
              raty.opt.round.full = testContext.roundFull;

              // when
              var star = raty._starName(testContext.decimal, testContext.evt);

              // then
              expect(star).toEqual('starOff');
            });
          });

          context('when decimal is equal options round.full', function () {
            beforeEach(() => {
              testContext.roundFull = testContext.decimal;
            });

            it('returns starOn', () => {
              // given
              var raty = new Raty(document.querySelector('#el'));

              raty.isMove = testContext.isMove;
              raty.opt.halfShow = testContext.halfShow;
              raty.opt.round.down = testContext.roundDown;
              raty.opt.round.full = testContext.roundFull;

              // when
              var star = raty._starName(testContext.decimal, testContext.evt);

              // then
              expect(star).toEqual('starOn');
            });
          });

          context('when decimal is bigger than options round.full', function () {
            beforeEach(() => {
              testContext.roundFull = testContext.decimal - 0.1;
            });

            it('returns starOn', () => {
              // given
              var raty = new Raty(document.querySelector('#el'));

              raty.isMove = testContext.isMove;
              raty.opt.halfShow = testContext.halfShow;
              raty.opt.round.down = testContext.roundDown;
              raty.opt.round.full = testContext.roundFull;

              // when
              var star = raty._starName(testContext.decimal, testContext.evt);

              // then
              expect(star).toEqual('starOn');
            });
          });
        });
      });
    });
  });
});
