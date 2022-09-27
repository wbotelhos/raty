describe('#readOnly', function () {
  beforeEach(function () {
    $.raty.path = '../lib/images';

    Helper.create('#el');
  });

  afterEach(function () {
    Helper.clear();
  });

  it('accepts data attribute', function () {
    // given
    Helper._append('div', { 'data-readonly': true });

    // when
    var raty = new Raty('#el', );

    // then
    expect(raty.opt.readonly).toEqual(true);
  });

  context('on true', function () {
    it('sets score as readonly', function () {
      // given

      // when
      var raty = new Raty('#el', { readOnly: true });

      // then
      expect(raty.self.querySelector('input').readonly).toEqual('readonly');
    });

    it('removes the pointer cursor', function () {
      // given

      // when
      var raty = new Raty('#el', { readOnly: true });

      // then
      expect(this.el).not.toHaveCss({ cursor: 'pointer' });
      expect(this.el).not.toHaveCss({ cursor: 'default' });
    });

    context('without rating', function () {
      it('Applies the :noRatedMsg on stars', function () {
        // given

        // when
        var raty = new Raty('#el', { readOnly: true });

        // then
        expect(raty.self.querySelector('img').title).toEqual('Not rated yet!');
      });
    });

    it('does not trigger mouseover', function () {
      // given
      var raty = new Raty('#el', { readOnly: true });

      var stars = raty.self.querySelector('img');

      // when
      stars.first().trigger('mouseover');

      // then
      expect(stars.src).toEqual('../lib/images/star-off.png');
    });

    it('does not trigger click', function () {
      // given
      var raty = new Raty('#el', { readOnly: true });

      var stars = raty.self.querySelector('img');

      // when
      stars.first().trigger('click');

      // then
      expect(stars.src).toEqual('../lib/images/star-off.png');
      expect(raty.self.querySelector('input').val()).toEqual('');
    });

    context('with :cancel', function () {
      it('hides the button', function () {
        // given

        // when
        var raty = new Raty('#el', { cancelButton: true, readOnly: true });

        // then
        expect(raty.self.querySelectorAll('.raty-cancel')).toBeHidden();
      });
    });

    context('with external bind on wrapper', function () {
      it('is kept', function () {
        // given
        this.el
          .on('click', function () {
            $(this).data('trigged', true);
          })
          .raty({ readOnly: true });

        // when
        raty.self.trigger('click');

        // then
        expect(raty.self.data('trigged')).toBeTruthy();
      });
    });

    context('with external bind on stars', function () {
      it('keeps it', function () {
        // given
        var raty = new Raty('#el', { readOnly: true });

        var star = raty.self.querySelector('img');
        var that = this;

        star.on('click', function () {
          that.el.data('trigged', true);
        });

        // when
        star.trigger('click');

        // then
        expect(raty.self.data('trigged')).toBeTruthy();
      });
    });

    context('with :halfShow', function () {
      context('as *true', function () {
        context('with :score as integer', function () {
          it('applies the score hint', function () {
            // given

            // when
            var raty = new Raty('#el', {
              halfShow: true,
              hints: [['half', 'one']],
              readOnly: true,
              score: 1,
            });

            // then
            expect(raty.self.querySelector('img').title).toEqual('one');
          });
        });

        context('with :score as float', function () {
          it('applies the score hint', function () {
            // given

            // when
            var raty = new Raty('#el', {
              halfShow: true,
              hints: [['half', 'one']],
              readOnly: true,
              score: 0.5,
            });

            // then
            expect(raty.self.querySelector('img').title).toEqual('half');
          });
        });
      });
    });

    context('with :half', function () {
      context('as *true', function () {
        context('with :score as integer', function () {
          it('applies the score hint', function () {
            // given

            // when
            var raty = new Raty('#el', {
              half: true,
              hints: [['half', 'one']],
              readOnly: true,
              score: 1,
            });

            // then
            expect(raty.self.querySelector('img').title).toEqual('one');
          });
        });

        context('with :score as float', function () {
          it('applies the score hint', function () {
            // given

            // when
            var raty = new Raty('#el', {
              half: true,
              hints: [['half', 'one']],
              readOnly: true,
              score: 0.5,
            });

            // then
            expect(raty.self.querySelector('img').title).toEqual('half');
          });
        });
      });
    });

    context('with :precision', function () {
      context('as *true', function () {
        context('with :score as integer', function () {
          it('applies the score hint', function () {
            // given

            // when
            var raty = new Raty('#el', {
              hints: [['zero.one', 'zero.two']],
              precision: true,
              readonly: true,
              score: 1,
            });

            // then
            expect(raty.self.querySelector('img').title).toEqual('zero.two');
          });
        });

        context('with :score as float', function () {
          it('applies the score hint', function () {
            // given

            // when
            var raty = new Raty('#el', {
              hints: [['zero.one', 'zero.two']],
              precision: true,
              readOnly: true,
              score: 0.1,
            });

            // then
            expect(raty.self.querySelector('img').title).toEqual('zero.one');
          });
        });
      });
    });
  });

  context('on false', function () {
    it('removes the :readOnly of the score', function () {
      // given
      var raty = new Raty('#el', { readOnly: true });

      var input = raty.self.querySelector('input');

      // when
      raty.readOnly(false);

      // then
      expect(input).not.toHaveAttr('readonly', 'readonly');
      expect(input).not.toHaveProp('readonly', 'readonly');
    });

    it('applies the pointer cursor on wrapper', function () {
      // given
      var raty = new Raty('#el', { readOnly: true });

      // when
      raty.readOnly(false);

      // then
      expect(this.el).toHaveCss({ cursor: 'pointer' });
    });

    it('Removes the :noRatedMsg from stars', function () {
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

    it('triggers mouseover', function () {
      // given
      var raty = new Raty('#el', { readOnly: true });

      var stars = raty.self.querySelector('img');

      raty.readOnly(false);

      // when
      stars.first().trigger('mouseover');

      // then
      expect(stars.first().src).toEqual('../lib/images/star-on.png');
    });

    it('triggers click', function () {
      // given
      var raty = new Raty('#el', { readOnly: true });

      var star = raty.self.querySelector('img:first');

      raty.readOnly(false);

      // when
      star.trigger('click');

      // then
      expect(raty.self.querySelector('input')).toHaveValue('1');
    });

    context('with :score', function () {
      it('removes the score title off the stars', function () {
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
      it('shows the button', function (done) {
        // given
        var that = this;

        that.var raty = new Raty('#el', { cancelButton: true, readOnly: true });

        setTimeout(function () {
          // when
          that.el.data('raty').readOnly(false);

          // then
          expect(that.raty.self.querySelector('.raty-cancel')).toBeVisible();

          done();
        }, 100);
      });

      it('rebinds the mouseover', function () {
        // given
        var raty = new Raty('#el', { readOnly: true, cancelButton: true });

        var cancel = raty.self.querySelector('.raty-cancel');
        var stars = raty.self.querySelector('img:not(.raty-cancel)');

        raty.readOnly(false);

        // when
        cancel.trigger('mouseover');

        // then
        expect(cancel.src).toEqual('../lib/images/cancel-on.png');
        expect(stars.src).toEqual('../lib/images/star-off.png');
      });

      it('rebinds the click', function () {
        // given
        var raty = new Raty('#el', { cancelButton: true, readOnly: true, score: 5 });

        var cancel = raty.self.querySelector('.raty-cancel');
        var stars = raty.self.querySelector('img:not(.raty-cancel)');

        raty.readOnly(false);

        // when
        cancel.trigger('click').trigger('mouseout');

        // then
        expect(stars.src).toEqual('../lib/images/star-off.png');
      });
    });
  });
});
