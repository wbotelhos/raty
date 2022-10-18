describe('#readOnly', () => {
  let testContext;

  beforeEach(() => {
    testContext = { dataset: {} };
  });

  it('accepts data attribute', () => {
    // given
    Helper._append('div', { 'data-readonly': true });

    var raty = new Raty(document.querySelector('[data-readonly]'));

    // when
    raty.init();

    // then
    expect(raty.opt.readonly).toEqual(true);
  });

  it('accepts callback return and has the correct arguments', () => {
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
    beforeEach(() => {
      Helper.create('#el');
    });

    it('sets score as readonly', () => {
      // given
      var raty = new Raty(document.querySelector('#el'), { readOnly: true });

      // when
      raty.init();

      // then
      expect(raty.element.querySelector('input').readOnly).toEqual(true);
    });

    it('removes the pointer cursor', () => {
      // given
      var el = document.querySelector('#el');
      var raty = new Raty(el, { readOnly: true });

      // when
      raty.init();

      // then
      expect(el).not.toHaveStyle({ cursor: 'pointer' });
      expect(el).not.toHaveStyle({ cursor: 'default' });
    });

    context('without rating', function () {
      it('Applies the :noRatedMsg on stars', () => {
        // given
        var raty = new Raty(document.querySelector('#el'), { readOnly: true });

        // when
        raty.init();

        // then
        expect(raty.element.querySelector('img').title).toEqual('Not rated yet!');
      });
    });

    it('does not trigger mouseover', () => {
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

    it('does not trigger click', () => {
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
      it('hides the button', () => {
        // given
        var raty = new Raty(document.querySelector('#el'), { cancelButton: true, readOnly: true });

        // when
        raty.init();

        // then
        expect(raty.element.querySelector('.raty-cancel')).not.toBeVisible();
      });
    });

    context('with external bind on wrapper', function () {
      it('is kept', () => {
        // given
        var el = document.querySelector('#el');

        el.addEventListener('click', function () {
          this.dataset.trigger = true;
        });

        var raty = new Raty(document.querySelector('#el'), { readOnly: true }).init();

        // when
        el.click();

        // then
        expect(el.dataset.trigger).toEqual('true');
      });
    });

    context('with external bind on stars', function () {
      it('keeps it', () => {
        // given
        var raty = new Raty(document.querySelector('#el'), { readOnly: true }).init();
        var star = raty.element.querySelector('img');

        star.addEventListener('click', function () {
          this.dataset.trigger = true;
        });

        // when
        Helper.trigger(star, 'click');

        // then
        expect(star.dataset.trigger).toEqual('true');
      });
    });

    context('with :halfShow', function () {
      context('as *true', function () {
        context('with :score as integer', function () {
          it('applies the score hint', () => {
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
          it('applies the score hint', () => {
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
          it('applies the score hint', () => {
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
          it('applies the score hint', () => {
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
          it('applies the score hint', () => {
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
          it('applies the score hint', () => {
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
    beforeEach(() => {
      Helper.create('#el');
    });

    it('removes the :readOnly of the score', () => {
      // given
      var raty = new Raty(document.querySelector('#el'), { readOnly: true }).init();
      var input = raty.element.querySelector('input');

      // when
      raty.readOnly(false);

      // then
      expect(input).not.toHaveAttribute('readonly', 'readonly');
      expect(input).not.toHaveProperty('readonly', 'readonly');
    });

    it('applies the pointer cursor on wrapper', () => {
      // given
      var el = document.querySelector('#el');
      var raty = new Raty(el, { readOnly: true }).init();

      // when
      raty.readOnly(false);

      // then
      expect(el).toHaveStyle({ cursor: 'pointer' });
    });

    it('Removes the :noRatedMsg from stars', () => {
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

    it('triggers mouseover', () => {
      // given
      var raty = new Raty(document.querySelector('#el'), { readOnly: true }).init();
      var star = raty.element.querySelector('img');

      raty.readOnly(false);

      // when
      Helper.trigger(star, 'mouseover');

      // then
      expect(star.getAttribute('src')).toEqual('star-on.png');
    });

    it('triggers click', () => {
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
      it('removes the score title off the stars', () => {
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
      it('shows the button', () => {
        // given
        var raty = new Raty(document.querySelector('#el'), { cancelButton: true, readOnly: true }).init();

        // when
        raty.readOnly(false);

        // then
        expect(raty.element.querySelector('.raty-cancel')).toBeVisible();
      });

      it('rebinds the mouseover', () => {
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

      it('rebinds the click', () => {
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
