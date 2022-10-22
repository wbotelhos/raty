describe('#iconRangeSame', () => {
  beforeEach(() => {
    var element = document.createElement('div');
    element.id = 'element';
    document.querySelector(`body`).appendChild(element);
  });

  afterEach(() => {
    document.querySelector('#element').remove();
  });

  describe('when first star is chosen', () => {
    it('repeats the range icon', () => {
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

  describe('when a middle star is chosen', () => {
    it('repeats the range icon', () => {
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

  describe('when the last star is chosen', () => {
    it('repeats the range icon', () => {
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

  describe('when mouse out', () => {
    describe('after mouse over', () => {
      it('removes the range icon', () => {
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

    describe('after rating', () => {
      it('keeps the selection', () => {
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

  describe('with cancel option', () => {
    describe('after rating', () => {
      describe('when mouse over', () => {
        it('removes the range icon', () => {
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

      describe('when mouse over and out', () => {
        it('puts the selection back', () => {
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

      describe('when click on cancel button and mouse out', () => {
        it('removes the range icon', () => {
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

  describe('when call cancel method', () => {
    it('removes the range icon', () => {
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
