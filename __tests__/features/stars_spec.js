describe('stars', () => {
  beforeEach(() => {
    Helper.create('#el');
  });

  it('starts all off', () => {
    // given / when
    var raty = new Raty(document.querySelector('#el')).init();

    // then
    expect(Helper.extension(raty.element.querySelector('img').src)).toEqual('star-off.png');
  });

  context('on click', function () {
    it('changes the score', () => {
      // given
      var raty = new Raty(document.querySelector('#el')).init();
      var stars = raty.element.querySelectorAll('img');

      // when
      Helper.trigger(Helper.last(stars), 'click');

      // then
      expect(raty.element.querySelector('input').value).toEqual('5');
    });
  });

  context('on mouseover', function () {
    it('turns on the stars', () => {
      // given
      var raty = new Raty(document.querySelector('#el')).init();
      var stars = raty.element.querySelectorAll('img');

      // when
      Helper.trigger(Helper.last(stars), 'mouseover');

      // then
      expect(Helper.extension(stars[0].src)).toEqual('star-on.png');
      expect(Helper.extension(stars[1].src)).toEqual('star-on.png');
      expect(Helper.extension(stars[2].src)).toEqual('star-on.png');
      expect(Helper.extension(stars[3].src)).toEqual('star-on.png');
      expect(Helper.extension(stars[4].src)).toEqual('star-on.png');
    });

    context('and mouseout', function () {
      it('turns off all stars', () => {
        // given
        var raty = new Raty(document.querySelector('#el')).init();
        var stars = raty.element.querySelectorAll('img');

        // when
        Helper.trigger(raty.element, 'mouseover');
        Helper.trigger(raty.element, 'mouseout');

        // then
        expect(Helper.extension(stars[0].src)).toEqual('star-off.png');
        expect(Helper.extension(stars[1].src)).toEqual('star-off.png');
        expect(Helper.extension(stars[2].src)).toEqual('star-off.png');
        expect(Helper.extension(stars[3].src)).toEqual('star-off.png');
        expect(Helper.extension(stars[4].src)).toEqual('star-off.png');
      });
    });

    context('and click', function () {
      it('changes the score', () => {
        // given
        var raty = new Raty(document.querySelector('#el')).init();
        var stars = raty.element.querySelectorAll('img');
        var star = Helper.last(stars);

        // when
        Helper.trigger(star, 'mouseover');
        Helper.trigger(star, 'click');

        // then
        expect(raty.element.querySelector('input').value).toEqual('5');
      });

      context('and mouseout', function () {
        it('keeps the stars on', () => {
          // given
          var raty = new Raty(document.querySelector('#el')).init();
          var stars = raty.element.querySelectorAll('img');
          var star = Helper.last(stars);

          // when
          Helper.trigger(star, 'mouseover');
          Helper.trigger(star, 'click');
          Helper.trigger(star, 'mouseout');

          // then
          expect(Helper.extension(stars[0].src)).toEqual('star-on.png');
          expect(Helper.extension(stars[1].src)).toEqual('star-on.png');
          expect(Helper.extension(stars[2].src)).toEqual('star-on.png');
          expect(Helper.extension(stars[3].src)).toEqual('star-on.png');
          expect(Helper.extension(stars[4].src)).toEqual('star-on.png');
        });
      });
    });
  });
});
