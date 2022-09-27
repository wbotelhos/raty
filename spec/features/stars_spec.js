describe('stars', function () {
  beforeEach(function () {
    Helper.create('#el');
  });

  xit('starts all off', function () {
    // given / when
    var raty = new Raty('#el');

    // then
    expect(Helper.extension(raty.self.querySelector('img').src)).toEqual('star-off.png');
  });

  context('on click', function () {
    xit('changes the score', function () {
      // given
      var raty = new Raty('#el');
      var stars = raty.self.querySelector('img');

      // when
      stars.last().trigger('click');

      // then
      expect(raty.self.querySelector('input')).toHaveValue('5');
    });
  });

  context('on mouseover', function () {
    xit('turns on the stars', function () {
      // given
      var raty = new Raty('#el');
      var stars = raty.self.querySelector('img');

      // when
      Helper.trigger(stars.last(), 'mouseover');

      // then
      expect(Helper.extension(stars.src)).toEqual('star-on.png');
    });

    context('and mouseout', function () {
      xit('turns off all stars', function () {
        // given
        var raty = new Raty('#el');
        var stars = raty.self.querySelector('img');

        // when
        stars.last().trigger('mouseover').trigger('mouseout');

        // then
        expect(Helper.extension(stars.src)).toEqual('star-off.png');
      });
    });

    context('and click', function () {
      xit('changes the score', function () {
        // given
        var raty = new Raty('#el');
        var stars = raty.self.querySelector('img');

        // when
        stars.last().trigger('mouseover').trigger('click');

        // then
        expect(raty.self.querySelector('input')).toHaveValue('5');
      });

      context('and mouseout', function () {
        xit('keeps the stars on', function () {
          // given
          var raty = new Raty('#el');
          var stars = raty.self.querySelector('img');

          // when
          stars.last().trigger('mouseover').trigger('click').trigger('mouseout');

          // then
          expect(Helper.extension(stars.src)).toEqual('star-on.png');
        });
      });
    });
  });
});
