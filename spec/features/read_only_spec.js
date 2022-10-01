describe('#readOnly', function () {
  it('accepts data attribute', function () {
    // given
    Helper._append('div', { 'data-readonly': true });

    var raty = new Raty(document.querySelector('[data-readonly]'));

    // when
    raty.init();

    // then
    expect(raty.opt.readonly).toEqual(true);
  });

  it('accepts callback return and has the correct arguments', function () {
    // given
    Helper.create('#el');

    var raty = new Raty(document.querySelector('#el'), {
      readOnly: function (element) {
        this._this = this;
        this._element = element;

        return true;
      },
    });

    // when
    raty.init();

    // then
    expect(raty.element.querySelector('input').readOnly).toEqual(true);
    expect(raty._this).toBe(raty);
    expect(raty._element).toEqual(document.querySelector('#el'));
  });

  context('on true', function () {
    beforeEach(function () {
      Helper.create('#el');
    });

    it('sets score as readonly', function () {
      // given
      var raty = new Raty(document.querySelector('#el'), { readOnly: true });

      // when
      raty.init();

      // then
      expect(raty.element.querySelector('input').readOnly).toEqual(true);
    });

    it('removes the pointer cursor', function () {
      // given
      var el = document.querySelector('#el');
      var raty = new Raty(el, { readOnly: true });

      // when
      raty.init();

      // then
      expect(el).not.toHaveCss({ cursor: 'pointer' });
      expect(el).not.toHaveCss({ cursor: 'default' });
    });

    context('without rating', function () {
      it('Applies the :noRatedMsg on stars', function () {
        // given
        var raty = new Raty(document.querySelector('#el'), { readOnly: true });

        // when
        raty.init();

        // then
        expect(raty.element.querySelector('img').title).toEqual('Not rated yet!');
      });
    });

    it('does not trigger mouseover', function () {
      // given
      var raty = new Raty(document.querySelector('#el'), { readOnly: true }).init();
      var stars = raty.element.querySelectorAll('img');

      // when
      Helper.trigger(stars[0], 'mouseover');

      // then
      expect(Helper.extension(stars[0].src)).toEqual('star-off.png');
      expect(Helper.extension(stars[1].src)).toEqual('star-off.png');
      expect(Helper.extension(stars[2].src)).toEqual('star-off.png');
      expect(Helper.extension(stars[3].src)).toEqual('star-off.png');
      expect(Helper.extension(stars[4].src)).toEqual('star-off.png');
    });

    it('does not trigger click', function () {
      // given
      var raty = new Raty(document.querySelector('#el'), { readOnly: true }).init();
      var stars = raty.element.querySelectorAll('img');

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
        var raty = new Raty(document.querySelector('#el'), { cancelButton: true, readOnly: true });

        // when
        raty.init();

        // then
        expect(raty.element.querySelectorAll('.raty-cancel')).toBeHidden();
      });
    });

    context('with external bind on wrapper', function () {
      it('is kept', function () {
        // given
        var el = document.querySelector('#el');

        el.addEventListener('click', function () {
          this.dataset.trigged = true;
        });

        var raty = new Raty(document.querySelector('#el'), { readOnly: true }).init();

        // when
        el.click();

        // then
        expect(el.dataset.trigged).toEqual('true');
      });
    });

    context('with external bind on stars', function () {
      it('keeps it', function () {
        // given
        var raty = new Raty(document.querySelector('#el'), { readOnly: true }).init();
        var star = raty.element.querySelector('img');

        star.addEventListener('click', function () {
          this.dataset.trigged = true;
        });

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
              readOnly: true,
              score: 1,
            });

            // when
            raty.init();

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
              readOnly: true,
              score: 0.5,
            });

            // when
            raty.init();

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
              readOnly: true,
              score: 1,
            });

            // when
            raty.init();

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
              readOnly: true,
              score: 0.5,
            });

            // when
            raty.init();

            // then
            expect(raty.element.querySelector('img').title).toEqual('half');
          });
        });
      });
    });

    context('with :precision', function () {
      context('as *true', function () {
        context('with :score as integer', function () {
          it('applies the score hint', function () {
            // given
            var raty = new Raty(document.querySelector('#el'), {
              hints: [['zero.one', 'zero.two']],
              precision: true,
              readonly: true,
              score: 1,
            });

            // when
            raty.init();

            // then
            expect(raty.element.querySelector('img').title).toEqual('zero.two');
          });
        });

        context('with :score as float', function () {
          it('applies the score hint', function () {
            // given
            var raty = new Raty(document.querySelector('#el'), {
              hints: [['zero.one', 'zero.two']],
              precision: true,
              readOnly: true,
              score: 0.1,
            });

            // when
            raty.init();

            // then
            expect(raty.element.querySelector('img').title).toEqual('zero.one');
          });
        });
      });
    });
  });

  context('on false', function () {
    beforeEach(function () {
      Helper.create('#el');
    });

    it('removes the :readOnly of the score', function () {
      // given
      var raty = new Raty(document.querySelector('#el'), { readOnly: true }).init();
      var input = raty.element.querySelector('input');

      // when
      raty.readOnly(false);

      // then
      expect(input).not.toHaveAttr('readonly', 'readonly');
      expect(input).not.toHaveProp('readonly', 'readonly');
    });

    it('applies the pointer cursor on wrapper', function () {
      // given
      var el = document.querySelector('#el');
      var raty = new Raty(el, { readOnly: true }).init();

      // when
      raty.readOnly(false);

      // then
      expect(el).toHaveCss({ cursor: 'pointer' });
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
      var star = raty.element.querySelector('img');

      raty.readOnly(false);

      // when
      Helper.trigger(star, 'mouseover');

      // then
      expect(star.getAttribute('src')).toEqual('star-on.png');
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
      it('shows the button', function () {
        // given
        var raty = new Raty(document.querySelector('#el'), { cancelButton: true, readOnly: true }).init();

        // when
        raty.readOnly(false);

        // then
        expect(raty.element.querySelector('.raty-cancel')).toBeVisible();
      });

      it('rebinds the mouseover', function () {
        // given
        var raty = new Raty(document.querySelector('#el'), { readOnly: true, cancelButton: true }).init();

        var cancel = raty.element.querySelector('.raty-cancel');
        var stars = raty.element.querySelector('img:not(.raty-cancel)');

        raty.readOnly(false);

        // when
        Helper.trigger(cancel, 'mouseover');

        // then
        expect(Helper.extension(cancel.src)).toEqual('cancel-on.png');
        expect(Helper.extension(stars.src)).toEqual('star-off.png');
      });

      it('rebinds the click', function () {
        // given
        var raty = new Raty(document.querySelector('#el'), { cancelButton: true, readOnly: true, score: 5 }).init();

        raty.readOnly(false);

        var cancel = raty.element.querySelector('.raty-cancel');
        var stars = raty.element.querySelectorAll('img:not(.raty-cancel)');

        // when
        cancel.click();
        Helper.trigger(raty.element, 'mouseleave');

        // then
        expect(stars[0].getAttribute('src')).toEqual('star-off.png');
        expect(stars[1].getAttribute('src')).toEqual('star-off.png');
        expect(stars[2].getAttribute('src')).toEqual('star-off.png');
        expect(stars[3].getAttribute('src')).toEqual('star-off.png');
        expect(stars[4].getAttribute('src')).toEqual('star-off.png');
      });
    });
  });
});
