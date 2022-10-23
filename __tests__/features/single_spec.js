describe('#single', () => {
  beforeEach(() => {
    var element = document.createElement('div');
    element.id = 'element';
    document.querySelector(`body`).appendChild(element);
  });

  afterEach(() => {
    document.querySelector('#element').remove();
  });

  context('on mouseover', function () {
    it('turns on just one icon', () => {
      // given
      var raty = new Raty(document.querySelector('#element'), { single: true }).init();
      var stars = raty.element.querySelectorAll('img');

      // when
      Helper.trigger(stars[2], 'mouseover');

      // then
      expect(Helper.extension(stars[0].src)).toEqual('star-off.png');
      expect(Helper.extension(stars[1].src)).toEqual('star-off.png');
      expect(Helper.extension(stars[2].src)).toEqual('star-on.png');
      expect(Helper.extension(stars[3].src)).toEqual('star-off.png');
      expect(Helper.extension(stars[4].src)).toEqual('star-off.png');
    });

    context('with :iconRange', function () {
      it('shows just on icon', () => {
        // given
        var raty = new Raty(document.querySelector('#element'), {
          iconRange: [
            { range: 2, on: 'star-on.png', off: 'star-off.png' },
            { range: 3, on: 'star-on.png', off: 'star-off.png' },
            { range: 4, on: 'star-on.png', off: 'star-off.png' },
            { range: 5, on: 'star-on.png', off: 'star-off.png' },
          ],
          single: true,
        }).init();

        var stars = raty.element.querySelectorAll('img');

        // when
        Helper.trigger(stars[3], 'mouseover');

        // then
        expect(Helper.extension(stars[0].src)).toEqual('star-off.png');
        expect(Helper.extension(stars[1].src)).toEqual('star-off.png');
        expect(Helper.extension(stars[2].src)).toEqual('star-off.png');
        expect(Helper.extension(stars[3].src)).toEqual('star-on.png');
        expect(Helper.extension(stars[4].src)).toEqual('star-off.png');
      });
    });
  });

  context('on click', function () {
    it('turns on the star', () => {
      // given
      var raty = new Raty(document.querySelector('#element'), { single: true }).init();
      var stars = raty.element.querySelectorAll('img');

      // when
      Helper.trigger(stars[2], 'mouseover');
      Helper.trigger(stars[2], 'click');

      // then
      expect(Helper.extension(stars[0].src)).toEqual('star-off.png');
      expect(Helper.extension(stars[1].src)).toEqual('star-off.png');
      expect(Helper.extension(stars[2].src)).toEqual('star-on.png');
      expect(Helper.extension(stars[3].src)).toEqual('star-off.png');
      expect(Helper.extension(stars[4].src)).toEqual('star-off.png');
    });

    context('on mouseout', function () {
      it('keeps the score', () => {
        // given
        var raty = new Raty(document.querySelector('#element'), { single: true }).init();
        var stars = raty.element.querySelectorAll('img');

        // when
        Helper.trigger(stars[2], 'mouseover');
        Helper.trigger(stars[2], 'click');
        Helper.trigger(stars[2], 'mouseleave');

        // then
        expect(Helper.extension(stars[0].src)).toEqual('star-off.png');
        expect(Helper.extension(stars[1].src)).toEqual('star-off.png');
        expect(Helper.extension(stars[2].src)).toEqual('star-on.png');
        expect(Helper.extension(stars[3].src)).toEqual('star-off.png');
        expect(Helper.extension(stars[4].src)).toEqual('star-off.png');
      });

      context('and :iconRange', function () {
        it('keeps the score', () => {
          // given
          var raty = new Raty(document.querySelector('#element'), {
            single: true,
            iconRange: [
              { range: 2, on: 'a.png', off: 'a-off.png' },
              { range: 3, on: 'b.png', off: 'b-off.png' },
              { range: 4, on: 'c.png', off: 'c-off.png' },
              { range: 5, on: 'd.png', off: 'd-off.png' },
            ],
          }).init();

          var stars = raty.element.querySelectorAll('img');

          // when
          Helper.trigger(stars[3], 'mouseover');
          Helper.trigger(stars[3], 'click');
          Helper.trigger(stars[3], 'mouseleave');

          // then
          expect(Helper.extension(stars[0].src)).toEqual('a-off.png');
          expect(Helper.extension(stars[1].src)).toEqual('a-off.png');
          expect(Helper.extension(stars[2].src)).toEqual('b-off.png');
          expect(Helper.extension(stars[3].src)).toEqual('c.png');
          expect(Helper.extension(stars[4].src)).toEqual('d-off.png');
        });
      });
    });
  });
});
