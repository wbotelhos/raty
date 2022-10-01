describe('#fn readOnly', function () {
  beforeEach(function () {
    Helper.create('#el');
  });

  context('on true', function () {
    it('sets score as readonly', function () {
      // given
      var raty = new Raty(document.querySelector('#el')).init();

      // when
      raty.readOnly(true);

      // then
      expect(raty.element.querySelector('input').readOnly).toEqual(true);
    });

    it('disables the mouse interaction', function () {
      // given
      var raty = new Raty(document.querySelector('#el')).init();

      // when
      raty.readOnly(true);

      // then
      expect(raty.element.style.pointerEvents).toEqual('none');
    });

    context('without rating', function () {
      it('Applies the :noRatedMsg on stars', function () {
        // given
        var raty = new Raty(document.querySelector('#el')).init();

        // when
        raty.readOnly(true);

        // then
        expect(raty.element.querySelector('img').title).toEqual(raty.opt.noRatedMsg);
      });
    });

    it('triggers mouseover since it is not unbind anymore but pointer events ', function () {
      // given
      var raty = new Raty(document.querySelector('#el')).init();
      var stars = raty.element.querySelectorAll('img');

      raty.readOnly(true);

      // when
      Helper.trigger(stars[0], 'mouseover');

      // then
      expect(Helper.extension(stars[0].src)).toEqual('star-on.png');
      expect(Helper.extension(stars[1].src)).toEqual('star-off.png');
      expect(Helper.extension(stars[2].src)).toEqual('star-off.png');
      expect(Helper.extension(stars[3].src)).toEqual('star-off.png');
      expect(Helper.extension(stars[4].src)).toEqual('star-off.png');
    });

    it('does not trigger click', function () {
      // given
      var raty = new Raty(document.querySelector('#el')).init();
      var stars = raty.element.querySelectorAll('img');

      raty.readOnly(true);

      // when
      Helper.trigger(stars[0], 'click');

      // then
      expect(Helper.extension(stars[0].src)).toEqual('star-off.png');
      expect(Helper.extension(stars[1].src)).toEqual('star-off.png');
      expect(Helper.extension(stars[2].src)).toEqual('star-off.png');
      expect(Helper.extension(stars[3].src)).toEqual('star-off.png');
      expect(Helper.extension(stars[4].src)).toEqual('star-off.png');

      expect(raty.element.querySelector('input').value).toEqual('');
    });

    context('with :cancel', function () {
      it('hides the button', function () {
        // given
        var raty = new Raty(document.querySelector('#el'), { cancelButton: true }).init();

        // when
        raty.readOnly(true);

        // then
        expect(raty.element.querySelector('.raty-cancel')).toBeHidden();
      });
    });

    context('with external bind on wrapper', function () {
      it('is kept', function () {
        // given
        var el = document.querySelector('#el');

        el.addEventListener('click', function () {
          this.dataset.trigged = true;
        });

        var raty = new Raty(document.querySelector('#el')).init();

        raty.readOnly(true);

        // when
        Helper.trigger(el, 'click');

        // then
        expect(el.dataset.trigged).toEqual('true');
      });
    });

    context('with external bind on stars', function () {
      it('keeps it', function () {
        // given
        var raty = new Raty(document.querySelector('#el')).init();
        var star = raty.element.querySelector('img');

        star.addEventListener('click', function () {
          this.dataset.trigged = true;
        });

        raty.readOnly(true);

        // when
        Helper.trigger(star, 'click');

        // then
        expect(star.dataset.trigged).toEqual('true');
      });
    });

    context('with :halfShow', function () {
      context('as *true', function () {
        context('with :score as integer', function () {
          it('applies the score hint', function () {
            // given
            var raty = new Raty(document.querySelector('#el'), {
              halfShow: true,
              hints: [['half', 'one']],
              score: 1,
            }).init();

            // when
            raty.readOnly(true);

            // then
            expect(raty.element.querySelector('img').title).toEqual('one');
          });
        });

        context('with :score as float', function () {
          it('applies the score hint', function () {
            // given
            var raty = new Raty(document.querySelector('#el'), {
              halfShow: true,
              hints: [['half', 'one']],
              score: 0.5,
            }).init();

            // when
            raty.readOnly(true);

            // then
            expect(raty.element.querySelector('img').title).toEqual('half');
          });
        });
      });
    });

    context('with :half', function () {
      context('as *true', function () {
        context('with :score as integer', function () {
          it('applies the score hint', function () {
            // given
            var raty = new Raty(document.querySelector('#el'), {
              half: true,
              hints: [['half', 'one']],
              score: 1,
            }).init();

            // when
            raty.readOnly(true);

            // then
            expect(raty.element.querySelector('img').title).toEqual('one');
          });
        });

        context('with :score as float', function () {
          it('applies the score hint', function () {
            // given
            var raty = new Raty(document.querySelector('#el'), {
              half: true,
              hints: [['half', 'one']],
              score: 0.5,
            }).init();

            // when
            raty.readOnly(true);

            // then
            expect(raty.element.querySelector('img').title).toEqual('half');
          });
        });
      });
    });

    context('with :precision', function () {
      context('as *true', function () {
        context('and :targetType', function () {
          context('as *hint', function () {
            context('with :score as integer', function () {
              it('applies the 10 - 1 decimal hint', function () {
                // given
                var raty = new Raty(document.querySelector('#el'), {
                  hints: [['bad 1', 'bad 2', 'bad 3', 'bad 4', 'bad 5', 'bad 6', 'bad 7', 'bad 8', 'bad 9', 'bad']],
                  precision: true,
                  score: 1,
                  targetType: 'hint',
                }).init();

                var stars = raty.element.querySelectorAll('img');

                // when
                raty.readOnly(true);

                // then
                expect(stars[0].title).toEqual('bad');
                expect(stars[1].title).toEqual('bad');
                expect(stars[2].title).toEqual('bad');
                expect(stars[3].title).toEqual('bad');
                expect(stars[4].title).toEqual('bad');
              });
            });

            context('with :score as float', function () {
              it('applies the 1 - 1 decimal hint', function () {
                // given
                var raty = new Raty(document.querySelector('#el'), {
                  hints: [['bad 1', 'bad 2', 'bad 3', 'bad 4', 'bad 5', 'bad 6', 'bad 7', 'bad 8', 'bad 9', 'bad']],
                  precision: true,
                  score: 0.1,
                  targetType: 'hint',
                }).init();

                var stars = raty.element.querySelectorAll('img');

                // when
                raty.readOnly(true);

                // then
                expect(stars[0].title).toEqual('bad 1');
                expect(stars[1].title).toEqual('bad 1');
                expect(stars[2].title).toEqual('bad 1');
                expect(stars[3].title).toEqual('bad 1');
                expect(stars[4].title).toEqual('bad 1');
              });
            });
          });

          context('as *score', function () {
            context('with :score as integer', function () {
              it('applies the score', function () {
                // given
                var raty = new Raty(document.querySelector('#el'), {
                  hints: [['bad 1', 'bad 2', 'bad 3', 'bad 4', 'bad 5', 'bad 6', 'bad 7', 'bad 8', 'bad 9', 'bad']],
                  precision: true,
                  score: 1,
                  targetType: 'score',
                }).init();

                var stars = raty.element.querySelectorAll('img');

                // when
                raty.readOnly(true);

                // then
                expect(stars[0].title).toEqual('bad');
                expect(stars[1].title).toEqual('bad');
                expect(stars[2].title).toEqual('bad');
                expect(stars[3].title).toEqual('bad');
                expect(stars[4].title).toEqual('bad');
              });
            });

            context('with :score as float', function () {
              it('applies the score', function () {
                // given
                var raty = new Raty(document.querySelector('#el'), {
                  hints: [['bad 1', 'bad 2', 'bad 3', 'bad 4', 'bad 5', 'bad 6', 'bad 7', 'bad 8', 'bad 9', 'bad']],
                  precision: true,
                  score: 0.1,
                  targetType: 'score',
                }).init();

                var stars = raty.element.querySelectorAll('img');

                // when
                raty.readOnly(true);

                // then
                expect(stars[0].title).toEqual('bad 1');
                expect(stars[1].title).toEqual('bad 1');
                expect(stars[2].title).toEqual('bad 1');
                expect(stars[3].title).toEqual('bad 1');
                expect(stars[4].title).toEqual('bad 1');
              });
            });
          });
        });
      });
    });
  });

  context('on false', function () {
    it('removes the :readOnly of the score', function () {
      // given
      var raty = new Raty(document.querySelector('#el'), { readOnly: true }).init();

      var input = raty.element.querySelector('input');

      // when
      raty.readOnly(false);

      // then
      expect(input.readOnly).toEqual(false);
      expect(input.getAttribute('readonly')).toEqual(null);
    });

    it('applies the pointer cursor on wrapper', function () {
      // given
      var raty = new Raty(document.querySelector('#el'), { readOnly: true }).init();

      // when
      raty.readOnly(false);

      // then
      expect(raty.element.style.cursor).toEqual('pointer');
    });

    it('Removes the :noRatedMsg from stars', function () {
      // given
      var raty = new Raty(document.querySelector('#el'), { readOnly: true }).init();

      var stars = raty.element.querySelectorAll('img');

      // when
      raty.readOnly(false);

      // then
      expect(stars[0].title).toEqual('bad');
      expect(stars[1].title).toEqual('poor');
      expect(stars[2].title).toEqual('regular');
      expect(stars[3].title).toEqual('good');
      expect(stars[4].title).toEqual('gorgeous');
    });

    it('triggers mouseover', function () {
      // given
      var raty = new Raty(document.querySelector('#el'), { readOnly: true }).init();

      var stars = raty.element.querySelectorAll('img');

      raty.readOnly(false);

      // when
      Helper.trigger(stars[0], 'mouseover');

      // then
      expect(Helper.extension(stars[0].src)).toEqual('star-on.png');
    });

    it('triggers click', function () {
      // given
      var raty = new Raty(document.querySelector('#el'), { readOnly: true }).init();

      var star = raty.element.querySelector('img');

      raty.readOnly(false);

      // when
      Helper.trigger(star, 'click');

      // then
      expect(raty.element.querySelector('input').value).toEqual('1');
    });

    context('with :score', function () {
      it('removes the score title off the stars', function () {
        // given
        var raty = new Raty(document.querySelector('#el'), { readOnly: true, score: 3 }).init();

        var stars = raty.element.querySelectorAll('img');

        // when
        raty.readOnly(false);

        // then
        expect(stars[0].title).toEqual('bad');
        expect(stars[1].title).toEqual('poor');
        expect(stars[2].title).toEqual('regular');
        expect(stars[3].title).toEqual('good');
        expect(stars[4].title).toEqual('gorgeous');
      });
    });

    context('with :cancel', function () {
      it('shows the button', function (done) {
        // given
        var raty = new Raty(document.querySelector('#el'), { cancelButton: true, readOnly: true }).init();

        setTimeout(function () {
          // when
          raty.readOnly(false);

          // then
          expect(raty.element.querySelector('.raty-cancel')).toBeVisible();

          done();
        }, 100);
      });

      it('rebinds the mouseover', function () {
        // given
        var raty = new Raty(document.querySelector('#el'), { readOnly: true, cancelButton: true }).init();

        var cancel = raty.element.querySelector('.raty-cancel');
        var stars = raty.element.querySelectorAll('img:not(.raty-cancel)');

        raty.readOnly(false);

        // when
        Helper.trigger(cancel, 'mouseover');

        // then
        expect(Helper.extension(cancel.src)).toEqual('cancel-on.png');
        expect(Helper.extension(stars[0].src)).toEqual('star-off.png');
        expect(Helper.extension(stars[1].src)).toEqual('star-off.png');
        expect(Helper.extension(stars[2].src)).toEqual('star-off.png');
        expect(Helper.extension(stars[3].src)).toEqual('star-off.png');
        expect(Helper.extension(stars[4].src)).toEqual('star-off.png');
      });

      it('rebinds the click', function () {
        // given
        var raty = new Raty(document.querySelector('#el'), { cancelButton: true, readOnly: true, score: 5 }).init();
        var cancel = raty.element.querySelector('.raty-cancel');
        var stars = raty.element.querySelectorAll('img:not(.raty-cancel)');

        raty.readOnly(false);

        // when
        Helper.trigger(cancel, 'click');
        Helper.trigger(raty.element, 'mouseleave');

        // then
        expect(Helper.extension(stars[0].src)).toEqual('star-off.png');
        expect(Helper.extension(stars[1].src)).toEqual('star-off.png');
        expect(Helper.extension(stars[2].src)).toEqual('star-off.png');
        expect(Helper.extension(stars[3].src)).toEqual('star-off.png');
        expect(Helper.extension(stars[4].src)).toEqual('star-off.png');
      });
    });
  });
});
