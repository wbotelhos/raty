describe('#_starName', function () {
  beforeEach(function () {
    Helper.create('#el');
  });

  context('when event is given', function () {
    beforeEach(function () {
      this.evt = document.createEvent('MouseEvents');
    });

    context('when decimal is bigger than 0.5', function () {
      beforeEach(function () {
        this.decimal = 0.51;
      });

      it('returns startOn', function () {
        // given
        var raty = new Raty(document.querySelector('#el'));

        // when
        var star = raty._starName(this.decimal, this.evt);

        // then
        expect(star).toEqual('starOn');
      });
    });

    context('when decimal is equal 0.5', function () {
      beforeEach(function () {
        this.decimal = 0.5;
      });

      it('returns starHalf', function () {
        // given
        var raty = new Raty(document.querySelector('#el'));

        // when
        var star = raty._starName(this.decimal, this.evt);

        // then
        expect(star).toEqual('starHalf');
      });
    });

    context('when decimal is less than 0.5', function () {
      beforeEach(function () {
        this.decimal = 0.49;
      });

      it('returns starHalf', function () {
        // given
        var raty = new Raty(document.querySelector('#el'));

        // when
        var star = raty._starName(this.decimal, this.evt);

        // then
        expect(star).toEqual('starHalf');
      });
    });
  });

  context('when event is not given', function () {
    beforeEach(function () {
      this.evt = undefined;
    });

    context('when move function is triggered', function () {
      beforeEach(function () {
        this.isMove = true;
      });

      context('when decimal is bigger than 0.5', function () {
        beforeEach(function () {
          this.decimal = 0.51;
        });

        it('returns startOn', function () {
          // given
          var raty = new Raty(document.querySelector('#el'));

          raty.isMove = this.isMove;

          // when
          var star = raty._starName(this.decimal, this.evt);

          // then
          expect(star).toEqual('starOn');
        });
      });

      context('when decimal is equal 0.5', function () {
        it('returns starHalf', function () {
          // given
          var raty = new Raty(document.querySelector('#el'));

          raty.isMove = this.isMove;

          // when
          var star = raty._starName(this.decimal, this.evt);

          // then
          expect(star).toEqual('starHalf');
        });
      });

      context('when decimal is less than 0.5', function () {
        it('returns starHalf', function () {
          // given
          var raty = new Raty(document.querySelector('#el'));

          raty.isMove = this.isMove;

          // when
          var star = raty._starName(this.decimal, this.evt);

          // then
          expect(star).toEqual('starHalf');
        });
      });
    });

    context('when move function is not triggered', function () {
      beforeEach(function () {
        this.isMove = false;
      });

      context('when decimal is less than option round.down', function () {
        beforeEach(function () {
          this.decimal = 0.51;
          this.roundDown = this.decimal + 0.1;
        });

        it('returns undefined', function () {
          // given
          var raty = new Raty(document.querySelector('#el'));

          raty.isMove = this.isMove;
          raty.opt.round.down = this.roundDown;

          // when
          var star = raty._starName(this.decimal, this.evt);

          // then
          expect(star).toEqual(undefined);
        });
      });

      context('when decimal is equal option round.down', function () {
        beforeEach(function () {
          this.decimal = 0.51;
          this.roundDown = this.decimal;
        });

        it('returns undefined', function () {
          // given
          var raty = new Raty(document.querySelector('#el'));

          raty.isMove = this.isMove;
          raty.opt.round.down = this.roundDown;

          // when
          var star = raty._starName(this.decimal, this.evt);

          // then
          expect(star).toEqual(undefined);
        });
      });

      context('when decimal is bigger than option round.down', function () {
        beforeEach(function () {
          this.roundDown = 0.5;
          this.decimal = this.roundDown + 0.1;
        });

        context('when option halfShow is enabled', function () {
          beforeEach(function () {
            this.halfShow = true;
          });

          context('when decimal is less than options round.up', function () {
            beforeEach(function () {
              this.roundUp = this.decimal + 0.1;
            });

            it('returns starHalf', function () {
              // given
              var raty = new Raty(document.querySelector('#el'));

              raty.isMove = this.isMove;
              raty.opt.halfShow = this.halfShow;
              raty.opt.round.down = this.roundDown;
              raty.opt.round.up = this.roundUp;

              // when
              var star = raty._starName(this.decimal, this.evt);

              // then
              expect(star).toEqual('starHalf');
            });
          });

          context('when decimal is equal options round.up', function () {
            beforeEach(function () {
              this.roundUp = this.decimal;
            });

            context('when decimal is less than options round.full', function () {
              beforeEach(function () {
                this.roundFull = this.decimal + 0.1;
              });

              it('returns starOff', function () {
                // given
                var raty = new Raty(document.querySelector('#el'));

                raty.isMove = this.isMove;
                raty.opt.halfShow = this.halfShow;
                raty.opt.round.down = this.roundDown;
                raty.opt.round.full = this.roundFull;
                raty.opt.round.up = this.roundUp;

                // when
                var star = raty._starName(this.decimal, this.evt);

                // then
                expect(star).toEqual('starOff');
              });
            });

            context('when decimal is equal options round.full', function () {
              beforeEach(function () {
                this.roundFull = this.decimal;
              });

              it('returns starOn', function () {
                // given
                var raty = new Raty(document.querySelector('#el'));

                raty.isMove = this.isMove;
                raty.opt.halfShow = this.halfShow;
                raty.opt.round.down = this.roundDown;
                raty.opt.round.full = this.roundFull;
                raty.opt.round.up = this.roundUp;

                // when
                var star = raty._starName(this.decimal, this.evt);

                // then
                expect(star).toEqual('starOn');
              });
            });

            context('when decimal is bigger than options round.full', function () {
              beforeEach(function () {
                this.roundFull = this.decimal - 0.1;
              });

              it('returns starOn', function () {
                // given
                var raty = new Raty(document.querySelector('#el'));

                raty.isMove = this.isMove;
                raty.opt.halfShow = this.halfShow;
                raty.opt.round.down = this.roundDown;
                raty.opt.round.full = this.roundFull;
                raty.opt.round.up = this.roundUp;

                // when
                var star = raty._starName(this.decimal, this.evt);

                // then
                expect(star).toEqual('starOn');
              });
            });
          });

          context('when decimal is bigger than options round.up', function () {
            beforeEach(function () {
              this.roundUp = this.decimal - 0.1;
            });

            context('when decimal is less than options round.full', function () {
              beforeEach(function () {
                this.roundFull = this.decimal + 0.1;
              });

              it('returns starOff', function () {
                // given
                var raty = new Raty(document.querySelector('#el'));

                raty.isMove = this.isMove;
                raty.opt.halfShow = this.halfShow;
                raty.opt.round.down = this.roundDown;
                raty.opt.round.full = this.roundFull;
                raty.opt.round.up = this.roundUp;

                // when
                var star = raty._starName(this.decimal, this.evt);

                // then
                expect(star).toEqual('starOff');
              });
            });

            context('when decimal is equal options round.full', function () {
              beforeEach(function () {
                this.roundFull = this.decimal;
              });

              it('returns starOn', function () {
                // given
                var raty = new Raty(document.querySelector('#el'));

                raty.isMove = this.isMove;
                raty.opt.halfShow = this.halfShow;
                raty.opt.round.down = this.roundDown;
                raty.opt.round.full = this.roundFull;
                raty.opt.round.up = this.roundUp;

                // when
                var star = raty._starName(this.decimal, this.evt);

                // then
                expect(star).toEqual('starOn');
              });
            });

            context('when decimal is bigger than options round.full', function () {
              beforeEach(function () {
                this.roundFull = this.decimal - 0.1;
              });

              it('returns starOn', function () {
                // given
                var raty = new Raty(document.querySelector('#el'));

                raty.isMove = this.isMove;
                raty.opt.halfShow = this.halfShow;
                raty.opt.round.down = this.roundDown;
                raty.opt.round.full = this.roundFull;
                raty.opt.round.up = this.roundUp;

                // when
                var star = raty._starName(this.decimal, this.evt);

                // then
                expect(star).toEqual('starOn');
              });
            });
          });
        });

        context('when option halfShow is not enabled', function () {
          beforeEach(function () {
            this.halfShow = false;
          });

          context('when decimal is less than options round.full', function () {
            beforeEach(function () {
              this.roundFull = this.decimal + 0.1;
            });

            it('returns starOff', function () {
              // given
              var raty = new Raty(document.querySelector('#el'));

              raty.isMove = this.isMove;
              raty.opt.halfShow = this.halfShow;
              raty.opt.round.down = this.roundDown;
              raty.opt.round.full = this.roundFull;

              // when
              var star = raty._starName(this.decimal, this.evt);

              // then
              expect(star).toEqual('starOff');
            });
          });

          context('when decimal is equal options round.full', function () {
            beforeEach(function () {
              this.roundFull = this.decimal;
            });

            it('returns starOn', function () {
              // given
              var raty = new Raty(document.querySelector('#el'));

              raty.isMove = this.isMove;
              raty.opt.halfShow = this.halfShow;
              raty.opt.round.down = this.roundDown;
              raty.opt.round.full = this.roundFull;

              // when
              var star = raty._starName(this.decimal, this.evt);

              // then
              expect(star).toEqual('starOn');
            });
          });

          context('when decimal is bigger than options round.full', function () {
            beforeEach(function () {
              this.roundFull = this.decimal - 0.1;
            });

            it('returns starOn', function () {
              // given
              var raty = new Raty(document.querySelector('#el'));

              raty.isMove = this.isMove;
              raty.opt.halfShow = this.halfShow;
              raty.opt.round.down = this.roundDown;
              raty.opt.round.full = this.roundFull;

              // when
              var star = raty._starName(this.decimal, this.evt);

              // then
              expect(star).toEqual('starOn');
            });
          });
        });
      });
    });
  });
});
