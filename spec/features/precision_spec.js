describe('#precision', function () {
  beforeEach(function () {
    Helper.create('#el', 'div', { 'data-target': '#target' });
    this.target = Helper.create('#target');
  });

  it('enables the :half options', function () {
    // given
    Helper.create('#el', 'div', { 'data-target': '#target' });

    var raty = new Raty(document.querySelector('#el'), { precision: true });

    // when
    raty.init();

    // then
    expect(raty.opt.half).toEqual(true);
  });

  it('accepts data attribute', function () {
    // given
    Helper._append('div', { 'data-precision': true });

    var raty = new Raty(document.querySelector('[data-precision]'));

    // when
    raty.init();

    // then
    expect(raty.opt.precision).toEqual(true);
  });

  context('with :target', function () {
    context('and :targetKeep', function () {
      context('and :targetType as score', function () {
        context('on :score', function () {
          it('sets the float with one fractional number', function () {
            // given
            var raty = new Raty(document.querySelector('#el'), {
              precision: true,
              score: 1.2,
              targetKeep: true,
              targetType: 'score',
              target: function () {
                return this.getAttribute('data-target');
              },
            });

            // when
            raty.init();

            // then
            expect(this.target[0].innerHTML).toEqual('1.2');
          });
        });

        context('on mouseover', function () {
          it('sets the float with one fractional number', function (done) {
            // given
            var raty = new Raty(document.querySelector('#el'), {
              precision: true,
              targetKeep: true,
              targetType: 'score',
              target: function () {
                return this.getAttribute('data-target');
              },
            }).init();

            var that = this;

            setTimeout(function () {
              // when
              raty.move(1.23);

              // then
              expect(that.target[0].innerHTML).toEqual('1.2');

              done();
            }, 100);
          });
        });
      });

      context('and :targetType as hint', function () {
        context('on :score', function () {
          context('with one float digit', function () {
            it('gets the [integer][float] position of :hints', function () {
              // given
              var raty = new Raty(document.querySelector('#el'), {
                hints: ['first', ['second']],
                precision: true,
                score: 1.1,
                targetKeep: true,
                targetType: 'hint',
                target: function () {
                  return this.getAttribute('data-target');
                },
              });

              // when
              raty.init();

              // then
              expect(this.target[0].innerHTML).toEqual('second');
            });
          });

          context('with integer digit is zero', function () {
            it('gets the [integer][last item] position of :hints', function () {
              // given
              var raty = new Raty(document.querySelector('#el'), {
                hints: ['first', 'second'],
                precision: true,
                score: 0,
                targetKeep: true,
                targetType: 'hint',
                target: function () {
                  return this.getAttribute('data-target');
                },
              });

              // when
              raty.init();

              // then
              expect(this.target[0].innerHTML).toEqual('first');
            });
          });

          context('with float digit is zero', function () {
            it('gets the [integer][last item] position of :hints', function () {
              // given
              var raty = new Raty(document.querySelector('#el'), {
                hints: ['first', 'second'],
                precision: true,
                score: 1.0,
                targetKeep: true,
                targetType: 'hint',
                target: function () {
                  return this.getAttribute('data-target');
                },
              });

              // when
              raty.init();

              // then
              expect(this.target[0].innerHTML).toEqual('first');
            });
          });

          context('with one float digit as string', function () {
            it('gets the [integer][float.fixed(1) without decimates] position of :hints', function () {
              // given
              var raty = new Raty(document.querySelector('#el'), {
                hints: ['first', ['second']],
                precision: true,
                score: '1.1',
                targetKeep: true,
                targetType: 'hint',
                target: function () {
                  return this.getAttribute('data-target');
                },
              });

              // when
              raty.init();

              // then
              expect(this.target[0].innerHTML).toEqual('second');
            });
          });

          context('with two float digits', function () {
            it('gets the [integer][float.fixed(1) without decimates] position of :hints', function () {
              // given
              var raty = new Raty(document.querySelector('#el'), {
                hints: ['first', ['second']],
                precision: true,
                score: 1.19,
                targetKeep: true,
                targetType: 'hint',
                target: function () {
                  return this.getAttribute('data-target');
                },
              });

              // when
              raty.init();

              // then
              expect(this.target[0].innerHTML).toEqual('second');
            });
          });

          context('with two float digits as string', function () {
            it('gets the [integer][float.fixed(1) without decimates] position of :hints', function () {
              // given
              var raty = new Raty(document.querySelector('#el'), {
                hints: ['first', ['second']],
                precision: true,
                score: '1.19',
                targetKeep: true,
                targetType: 'hint',
                target: function () {
                  return this.getAttribute('data-target');
                },
              });

              // when
              raty.init();

              // then
              expect(this.target[0].innerHTML).toEqual('second');
            });
          });
        });

        context('on mouseover', function () {
          context('with one float digit', function () {
            it('gets the [integer][float.fixed(1) without decimates] position of :hints', function (done) {
              // given
              var raty = new Raty(document.querySelector('#el'), {
                hints: ['first', ['second']],
                precision: true,
                targetKeep: true,
                targetType: 'hint',
                target: function () {
                  return this.getAttribute('data-target');
                },
              }).init();

              var that = this;

              setTimeout(function () {
                // when
                raty.move(1.1);

                // then
                expect(that.target[0].innerHTML).toEqual('second');

                done();
              }, 100);
            });
          });

          context('with two float digits', function () {
            it('gets the [integer][float.fixed(1) without decimates] position of :hints', function (done) {
              // given
              var raty = new Raty(document.querySelector('#el'), {
                hints: ['first', ['second']],
                precision: true,
                targetKeep: true,
                targetType: 'hint',
                target: function () {
                  return this.getAttribute('data-target');
                },
              }).init();

              var that = this;

              setTimeout(function () {
                // when
                raty.move(1.19);

                // then
                expect(that.target[0].innerHTML).toEqual('second');

                done();
              }, 100);
            });
          });
        });

        context('with :cancel', function () {
          it('shows :cancelHint', function () {
            // given
            var raty = new Raty(document.querySelector('#el'), {
              cancelButton: true,
              precision: true,
              targetKeep: true,
              targetType: 'hint',
              target: function () {
                return this.getAttribute('data-target');
              },
            }).init();

            var cancel = raty.element.querySelector('img');

            // when
            Helper.trigger(cancel, 'mouseover');

            // then
            expect(this.target).toHaveHtml(raty.opt.cancelHint);
          });
        });
      });
    });
  });
});
