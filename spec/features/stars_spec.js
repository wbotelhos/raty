describe('stars', function () {
  beforeEach(function () {
    this.el = Helper.create('#el');
  });

  it('starts all off', function () {
    // given / when
    var raty = new Raty('#el').init();

    // then
    expect(Helper.extension(raty.self.querySelector('img').src)).toEqual('star-off.png');
  });

  context('on click', function () {
    it('changes the score', function () {
      // given
      var raty = new Raty('#el').init();
      var stars = raty.self.querySelectorAll('img');

      // when
      Helper.trigger(Helper.last(stars), 'click');

      // then
      expect(raty.self.querySelector('input').value).toEqual('5');
    });
  });

  context('on mouseover', function () {
    it('turns on the stars', function () {
      // given
      var raty = new Raty('#el').init();
      var stars = raty.self.querySelectorAll('img');

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
      it('turns off all stars', function () {
        // given
        var raty = new Raty('#el').init();
        var stars = raty.self.querySelectorAll('img');

        // when
        Helper.trigger(raty.self, 'mouseover');
        Helper.trigger(raty.self, 'mouseout');

        // then
        expect(Helper.extension(stars[0].src)).toEqual('star-off.png');
        expect(Helper.extension(stars[1].src)).toEqual('star-off.png');
        expect(Helper.extension(stars[2].src)).toEqual('star-off.png');
        expect(Helper.extension(stars[3].src)).toEqual('star-off.png');
        expect(Helper.extension(stars[4].src)).toEqual('star-off.png');
      });
    });

    context('and click', function () {
      it('changes the score', function () {
        // given
        var raty = new Raty('#el').init();
        var stars = raty.self.querySelectorAll('img');
        var star = Helper.last(stars);

        // when
        Helper.trigger(star, 'mouseover');
        Helper.trigger(star, 'click');

        // then
        expect(raty.self.querySelector('input').value).toEqual('5');
      });

      context('and mouseout', function () {
        it('keeps the stars on', function () {
          // given
          var raty = new Raty('#el').init();
          var stars = raty.self.querySelectorAll('img');
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
