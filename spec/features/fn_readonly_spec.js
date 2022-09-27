describe('#fn readOnly', function () {
  beforeEach(function () {
    Helper.create('#el');
  });

  context('on true', function () {
    xit('sets score as readonly', function () {
      // given
      var raty = new Raty('#el');

      // when
      raty.readOnly(true);

      // then
      expect(raty.self.querySelector('input').readonly).toEqual('readonly');
    });

    xit('removes the pointer cursor', function () {
      // given
      var raty = new Raty('#el');

      // when
      raty.readOnly(true);

      // then
      expect(this.el).not.toHaveCss({ cursor: 'pointer' });
      expect(this.el).not.toHaveCss({ cursor: 'default' });
    });

    context('without rating', function () {
      xit('Applies the :noRatedMsg on stars', function () {
        // given
        var raty = new Raty('#el');

        // when
        raty.readOnly(true);

        // then
        expect(raty.self.querySelector('img')[0].title).toEqual(raty.opt.noRatedMsg);
      });
    });

    xit('does not trigger mouseover', function () {
      // given
      var raty = new Raty('#el');

      var stars = raty.self.querySelector('img');

      raty.readOnly(true);

      // when
      Helper.trigger(stars.first(), 'mouseover');

      // then
      expect(Helper.extension(stars.src)).toEqual('star-off.png');
    });

    xit('does not trigger click', function () {
      // given
      var raty = new Raty('#el');

      var stars = raty.self.querySelector('img');

      raty.readOnly(true);

      // when
      stars.first().trigger('click');

      // then
      expect(Helper.extension(stars.src)).toEqual('star-off.png');

      expect(raty.self.querySelector('input').value).toEqual('');
    });

    context('with :cancel', function () {
      xit('hides the button', function () {
        // given
        var raty = new Raty('#el', { cancelButton: true });

        // when
        raty.readOnly(true);

        // then
        expect(raty.self.querySelectorAll('.raty-cancel')).toBeHidden();
      });
    });

    context('with external bind on wrapper', function () {
      xit('is kept', function () {
        // given
        this.el.on('click', function () {
          $(this).data('trigged', true);
        });

        var raty = new Raty('#e').init();

        raty.readOnly(true);

        // when
        Helper.trigger('#el', 'click');

        // then
        expect(this.el.dataset.trigged).toBeTruthy();
      });
    });

    context('with external bind on stars', function () {
      xit('keeps it', function () {
        // given
        var raty = new Raty('#el');

        var star = raty.self.querySelector('img');
        var that = this;

        star.on('click', function () {
          that.el.data('trigged', true);
        });

        raty.readOnly(true);

        // when
        star.trigger('click');

        // then
        expect(raty.self.data('trigged')).toBeTruthy();
      });
    });

    context('with :halfShow', function () {
      context('as *true', function () {
        context('with :score as integer', function () {
          xit('applies the score hint', function () {
            // given
            var raty = new Raty('#el', {
              halfShow: true,
              hints: [['half', 'one']],
              score: 1,
            });

            // when
            raty.readOnly(true);

            // then
            expect(raty.self.querySelector('img')[0].title).toEqual('one');
          });
        });

        context('with :score as float', function () {
          xit('applies the score hint', function () {
            // given
            var raty = new Raty('#el', {
              halfShow: true,
              hints: [['half', 'one']],
              score: 0.5,
            });

            // when
            raty.readOnly(true);

            // then
            expect(raty.self.querySelector('img')[0].title).toEqual('half');
          });
        });
      });
    });

    context('with :half', function () {
      context('as *true', function () {
        context('with :score as integer', function () {
          xit('applies the score hint', function () {
            // given
            var raty = new Raty('#el', {
              half: true,
              hints: [['half', 'one']],
              score: 1,
            });

            // when
            raty.readOnly(true);

            // then
            expect(raty.self.querySelector('img')[0].title).toEqual('one');
          });
        });

        context('with :score as float', function () {
          xit('applies the score hint', function () {
            // given
            var raty = new Raty('#el', {
              half: true,
              hints: [['half', 'one']],
              score: 0.5,
            });

            // when
            raty.readOnly(true);

            // then
            expect(raty.self.querySelector('img')[0].title).toEqual('half');
          });
        });
      });
    });

    context('with :precision', function () {
      context('as *true', function () {
        context('and :targetType', function () {
          context('as *hint', function () {
            context('with :score as integer', function () {
              xit('applies the 10 - 1 decimal hint', function () {
                // given
                var raty = new Raty('#el', {
                  hints: [['bad 1', 'bad 2', 'bad 3', 'bad 4', 'bad 5', 'bad 6', 'bad 7', 'bad 8', 'bad 9', 'bad']],
                  precision: true,
                  score: 1,
                  targetType: 'hint',
                });

                var stars = raty.self.querySelector('img');

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
              xit('applies the 1 - 1 decimal hint', function () {
                // given
                var raty = new Raty('#el', {
                  hints: [['bad 1', 'bad 2', 'bad 3', 'bad 4', 'bad 5', 'bad 6', 'bad 7', 'bad 8', 'bad 9', 'bad']],
                  precision: true,
                  score: 0.1,
                  targetType: 'hint',
                });

                var stars = raty.self.querySelector('img');

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
              xit('applies the score', function () {
                // given
                var raty = new Raty('#el', {
                  hints: [['bad 1', 'bad 2', 'bad 3', 'bad 4', 'bad 5', 'bad 6', 'bad 7', 'bad 8', 'bad 9', 'bad']],
                  precision: true,
                  score: 1,
                  targetType: 'score',
                });

                var stars = raty.self.querySelector('img');

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
              xit('applies the score', function () {
                // given
                var raty = new Raty('#el', {
                  hints: [['bad 1', 'bad 2', 'bad 3', 'bad 4', 'bad 5', 'bad 6', 'bad 7', 'bad 8', 'bad 9', 'bad']],
                  precision: true,
                  score: 0.1,
                  targetType: 'score',
                });

                var stars = raty.self.querySelector('img');

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
    xit('removes the :readOnly of the score', function () {
      // given
      var raty = new Raty('#el', { readOnly: true });

      var input = raty.self.querySelector('input');

      // when
      raty.readOnly(false);

      // then
      expect(input).not.toHaveAttr('readonly', 'readonly');
      expect(input).not.toHaveProp('readonly', 'readonly');
    });

    xit('applies the pointer cursor on wrapper', function () {
      // given
      var raty = new Raty('#el', { readOnly: true });

      // when
      raty.readOnly(false);

      // then
      expect(this.el).toHaveCss({ cursor: 'pointer' });
    });

    xit('Removes the :noRatedMsg from stars', function () {
      // given
      var raty = new Raty('#el', { readOnly: true });

      var stars = raty.self.querySelector('img');

      // when
      raty.readOnly(false);

      // then
      expect(stars[0].title).toEqual('bad');
      expect(stars[1].title).toEqual('poor');
      expect(stars[2].title).toEqual('regular');
      expect(stars[3].title).toEqual('good');
      expect(stars[4].title).toEqual('gorgeous');
    });

    xit('triggers mouseover', function () {
      // given
      var raty = new Raty('#el', { readOnly: true });

      var stars = raty.self.querySelector('img');

      raty.readOnly(false);

      // when
      Helper.trigger(stars.first(), 'mouseover');

      // then
      expect(Helper.extension(stars.first().src)).toEqual('star-on.png');
    });

    xit('triggers click', function () {
      // given
      var raty = new Raty('#el', { readOnly: true });

      var star = raty.self.querySelector('img:first-child');

      raty.readOnly(false);

      // when
      star.trigger('click');

      // then
      expect(raty.self.querySelector('input')).toHaveValue('1');
    });

    context('with :score', function () {
      xit('removes the score title off the stars', function () {
        // given
        var raty = new Raty('#el', { readOnly: true, score: 3 });

        var stars = raty.self.querySelector('img');

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
      xit('shows the button', function (done) {
        // given
        var that = this;

        var raty = new Raty('#el', { cancelButton: true, readOnly: true });

        setTimeout(function () {
          // when
          that.el.data('raty').readOnly(false);

          // then
          expect(that.raty.self.querySelector('.raty-cancel')).toBeVisible();

          done();
        }, 100);
      });

      xit('rebinds the mouseover', function () {
        // given
        var raty = new Raty('#el', { readOnly: true, cancelButton: true });

        var cancel = raty.self.querySelector('.raty-cancel');
        var stars = raty.self.querySelector('img:not(.raty-cancel)');

        raty.readOnly(false);

        // when
        Helper.trigger(cancel, 'mouseover');

        // then
        expect(Helper.extension(cancel.src)).toEqual('cancel-on.png');
        expect(Helper.extension(stars.src)).toEqual('star-off.png');
      });

      xit('rebinds the click', function () {
        // given
        var raty = new Raty('#el', { cancelButton: true, readOnly: true, score: 5 });

        var cancel = raty.self.querySelector('.raty-cancel');
        var stars = raty.self.querySelector('img:not(.raty-cancel)');

        raty.readOnly(false);

        // when
        cancel.trigger('click').trigger('mouseout');

        // then
        expect(Helper.extension(stars.src)).toEqual('star-off.png');
      });
    });
  });
});
