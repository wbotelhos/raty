describe('#starOn', () => {
  it('accepts data attribute', () => {
    // given
    Helper._append('div', { 'data-star-on': 'custom' });

    // when
    var raty = new Raty(document.querySelector('[data-star-on]')).init();

    // then
    expect(raty.opt.starOn).toEqual('custom');
  });

  context('on mouseover', function () {
    beforeEach(() => {
      Helper.create('#el');
    });

    it('changes the stars on', () => {
      // given
      var raty = new Raty(document.querySelector('#el'), { starOn: 'star-half.png' }).init();
      var stars = raty.element.querySelectorAll('img');

      // when
      Helper.trigger(Helper.last(stars), 'mouseover');

      // then
      expect(Helper.extension(stars[0].src)).toEqual('star-half.png');
      expect(Helper.extension(stars[1].src)).toEqual('star-half.png');
      expect(Helper.extension(stars[2].src)).toEqual('star-half.png');
      expect(Helper.extension(stars[3].src)).toEqual('star-half.png');
      expect(Helper.extension(stars[4].src)).toEqual('star-half.png');
    });

    context('with :starType', function () {
      it('uses the given element', () => {
        // given
        var raty = new Raty(document.querySelector('#el'), { starType: 'i' }).init();
        var stars = raty.element.querySelectorAll('i');

        // when
        Helper.trigger(Helper.last(stars), 'mouseover');

        // then
        expect(stars[0].tagName).toEqual('I');
        expect(stars[1].tagName).toEqual('I');
        expect(stars[2].tagName).toEqual('I');
        expect(stars[3].tagName).toEqual('I');
        expect(stars[4].tagName).toEqual('I');
      });

      it('normalizes the class name', () => {
        // given
        var raty = new Raty(document.querySelector('#el'), { starType: 'i' }).init();
        var stars = raty.element.querySelectorAll('i');

        // when
        Helper.trigger(Helper.last(stars), 'mouseover');

        // then
        stars.forEach((element) => {
          expect(element).toHaveClass('star-on-png');
        });
      });

      it('does not create "src" attribute', () => {
        // given
        var raty = new Raty(document.querySelector('#el'), { starType: 'i' }).init();
        var stars = raty.element.querySelectorAll('i');

        // when
        Helper.trigger(Helper.last(stars), 'mouseover');

        // then
        stars.forEach((element) => {
          expect(element).not.toHaveAttribute('src');
        });
      });

      it('creates "data-alt" attribute', () => {
        // given
        var raty = new Raty(document.querySelector('#el'), { starType: 'i' }).init();
        var stars = raty.element.querySelectorAll('i');

        // when
        Helper.trigger(Helper.last(stars), 'mouseover');

        // then
        stars.forEach((element) => {
          expect(element).toHaveAttribute('data-alt');
        });
      });

      it('does not create "alt" attribute', () => {
        // given
        var raty = new Raty(document.querySelector('#el'), { starType: 'i' }).init();
        var stars = raty.element.querySelectorAll('i');

        // when
        Helper.trigger(Helper.last(stars), 'mouseover');

        // then
        stars.forEach((element) => {
          expect(element).not.toHaveAttribute('alt');
        });
      });
    });
  });
});
