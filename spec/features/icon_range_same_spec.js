describe('#iconRangeSame', function () {
  beforeEach(function () {
    $('body').append('<div id="element"></div>');
  });

  afterEach(function () {
    $('#element').remove();
    $('#hint').remove();
  });

  describe('when first star is chosen', function () {
    it('repeats the range icon', function () {
      // given
      var raty = new Raty(document.querySelector('#element'), {
        iconRangeSame: true,

        iconRange: [
          { range: 2, on: 'star-on.png', off: 'star-off.png' },
          { range: 3, on: 'star-off.png', off: 'star-off.png' },
          { range: 4, on: 'star-off.png', off: 'star-off.png' },
          { range: 5, on: 'star-on.png', off: 'star-off.png' },
        ],
      }).init();

      var stars = raty.element.querySelectorAll('img');

      // when
      Helper.trigger(stars[0], 'mouseover');

      // then
      expect(stars[0].src).toMatch('star-on.png');
      expect(stars[1].src).toMatch('star-off.png');
      expect(stars[2].src).toMatch('star-off.png');
      expect(stars[3].src).toMatch('star-off.png');
      expect(stars[4].src).toMatch('star-off.png');
    });
  });

  describe('when a middle star is chosen', function () {
    it('repeats the range icon', function () {
      // given
      var raty = new Raty(document.querySelector('#element'), {
        iconRangeSame: true,

        iconRange: [
          { range: 2, on: 'star-on.png', off: 'star-off.png' },
          { range: 3, on: 'star-off.png', off: 'star-off.png' },
          { range: 4, on: 'star-off.png', off: 'star-off.png' },
          { range: 5, on: 'star-on.png', off: 'star-off.png' },
        ],
      }).init();

      var stars = raty.element.querySelectorAll('img');

      // when
      stars[1].dispatchEvent(new MouseEvent('mouseover'));

      // then
      expect(stars[0].src).toMatch('star-on.png');
      expect(stars[1].src).toMatch('star-on.png');
      expect(stars[2].src).toMatch('star-off.png');
      expect(stars[3].src).toMatch('star-off.png');
      expect(stars[4].src).toMatch('star-off.png');
    });
  });

  describe('when the last star is chosen', function () {
    it('repeats the range icon', function () {
      // given
      var raty = new Raty(document.querySelector('#element'), {
        iconRangeSame: true,

        iconRange: [
          { range: 2, on: 'star-on.png', off: 'star-off.png' },
          { range: 3, on: 'star-off.png', off: 'star-off.png' },
          { range: 4, on: 'star-off.png', off: 'star-off.png' },
          { range: 5, on: 'star-on.png', off: 'star-off.png' },
        ],
      }).init();

      var stars = raty.element.querySelectorAll('img');

      // when
      stars[4].dispatchEvent(new MouseEvent('mouseover'));

      // then
      expect(stars[0].src).toMatch('star-on.png');
      expect(stars[1].src).toMatch('star-on.png');
      expect(stars[2].src).toMatch('star-on.png');
      expect(stars[3].src).toMatch('star-on.png');
      expect(stars[4].src).toMatch('star-on.png');
    });
  });

  describe('when mouse out', function () {
    describe('after mouse over', function () {
      it('removes the range icon', function () {
        // given
        var raty = new Raty(document.querySelector('#element'), {
          iconRangeSame: true,

          iconRange: [
            { range: 2, on: 'star-on.png', off: 'star-off.png' },
            { range: 3, on: 'star-off.png', off: 'star-off.png' },
            { range: 4, on: 'star-off.png', off: 'star-off.png' },
            { range: 5, on: 'star-on.png', off: 'star-off.png' },
          ],
        }).init();

        var stars = raty.element.querySelectorAll('img');

        Helper.trigger(stars[4], 'mouseover');

        // when
        Helper.trigger(raty.element, 'mouseleave');

        // then
        expect(stars[0].src).toMatch('star-off.png');
        expect(stars[1].src).toMatch('star-off.png');
        expect(stars[2].src).toMatch('star-off.png');
        expect(stars[3].src).toMatch('star-off.png');
        expect(stars[4].src).toMatch('star-off.png');
      });
    });

    describe('after rating', function () {
      it('keeps the selection', function () {
        // given
        var raty = new Raty(document.querySelector('#element'), {
          iconRangeSame: true,

          iconRange: [
            { range: 2, on: 'star-on.png', off: 'star-off.png' },
            { range: 3, on: 'star-off.png', off: 'star-off.png' },
            { range: 4, on: 'star-off.png', off: 'star-off.png' },
            { range: 5, on: 'star-on.png', off: 'star-off.png' },
          ],
        }).init();

        var stars = raty.element.querySelectorAll('img');

        Helper.trigger(stars[4], 'click');

        // when
        Helper.trigger(raty.element, 'mouseleave');

        // then
        expect(stars[0].src).toMatch('star-on.png');
        expect(stars[1].src).toMatch('star-on.png');
        expect(stars[2].src).toMatch('star-on.png');
        expect(stars[3].src).toMatch('star-on.png');
        expect(stars[4].src).toMatch('star-on.png');
      });
    });
  });

  describe('with cancel option', function () {
    describe('after rating', function () {
      describe('when mouse over', function () {
        it('removes the range icon', function () {
          // given
          var raty = new Raty(document.querySelector('#element'), {
            cancelButton: true,
            iconRangeSame: true,

            iconRange: [
              { range: 2, on: 'star-on.png', off: 'star-off.png' },
              { range: 3, on: 'star-on.png', off: 'star-off.png' },
              { range: 4, on: 'star-on.png', off: 'star-off.png' },
              { range: 5, on: 'star-on.png', off: 'star-off.png' },
            ],
          }).init();

          var stars = raty.element.querySelectorAll('img:not(.raty-cancel)');

          stars[4].click();

          // when
          document.querySelector('.raty-cancel').dispatchEvent(new MouseEvent('mouseover'));

          // then
          expect(stars[0].src).toMatch('star-off.png');
          expect(stars[1].src).toMatch('star-off.png');
          expect(stars[2].src).toMatch('star-off.png');
          expect(stars[3].src).toMatch('star-off.png');
          expect(stars[4].src).toMatch('star-off.png');
        });
      });

      describe('when mouse over and out', function () {
        it('puts the selection back', function () {
          // given
          var raty = new Raty(document.querySelector('#element'), {
            cancelButton: true,
            iconRangeSame: true,

            iconRange: [
              { range: 2, on: 'star-on.png', off: 'star-off.png' },
              { range: 3, on: 'star-on.png', off: 'star-off.png' },
              { range: 4, on: 'star-on.png', off: 'star-off.png' },
              { range: 5, on: 'star-on.png', off: 'star-off.png' },
            ],
          }).init();

          var stars = raty.element.querySelectorAll('img:not(.raty-cancel)');

          stars[4].click();

          var cancel = document.querySelector('.raty-cancel');

          cancel.dispatchEvent(new MouseEvent('mouseover'));

          // when
          Helper.trigger(raty.element, 'mouseleave');

          // then
          expect(stars[0].src).toMatch('star-on.png');
          expect(stars[1].src).toMatch('star-on.png');
          expect(stars[2].src).toMatch('star-on.png');
          expect(stars[3].src).toMatch('star-on.png');
          expect(stars[4].src).toMatch('star-on.png');
        });
      });

      describe('when click on cancel button and mouse out', function () {
        it('removes the range icon', function () {
          // given
          var raty = new Raty(document.querySelector('#element'), {
            cancelButton: true,
            iconRangeSame: true,

            iconRange: [
              { range: 2, on: 'star-on.png', off: 'star-off.png' },
              { range: 3, on: 'star-on.png', off: 'star-off.png' },
              { range: 4, on: 'star-on.png', off: 'star-off.png' },
              { range: 5, on: 'star-on.png', off: 'star-off.png' },
            ],
          }).init();

          var stars = raty.element.querySelectorAll('img:not(.raty-cancel)');

          stars[4].click();

          // when
          document.querySelector('.raty-cancel').click();

          Helper.trigger(raty.element, 'mouseleave');

          // then
          expect(stars[0].src).toMatch('star-off.png');
          expect(stars[1].src).toMatch('star-off.png');
          expect(stars[2].src).toMatch('star-off.png');
          expect(stars[3].src).toMatch('star-off.png');
          expect(stars[4].src).toMatch('star-off.png');
        });
      });
    });
  });

  describe('when call cancel method', function () {
    it('removes the range icon', function () {
      // given
      var raty = new Raty(document.querySelector('#element'), {
        cancelButton: true,
        iconRangeSame: true,

        iconRange: [
          { range: 2, on: 'star-on.png', off: 'star-off.png' },
          { range: 3, on: 'star-on.png', off: 'star-off.png' },
          { range: 4, on: 'star-on.png', off: 'star-off.png' },
          { range: 5, on: 'star-on.png', off: 'star-off.png' },
        ],
      }).init();

      var stars = raty.element.querySelectorAll('img:not(.raty-cancel)');

      stars[4].click();

      // when
      raty.cancel();

      // then
      expect(stars[0].src).toMatch('star-off.png');
      expect(stars[1].src).toMatch('star-off.png');
      expect(stars[2].src).toMatch('star-off.png');
      expect(stars[3].src).toMatch('star-off.png');
      expect(stars[4].src).toMatch('star-off.png');
    });
  });
});
