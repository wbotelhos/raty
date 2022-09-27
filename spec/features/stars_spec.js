describe('stars', function () {
  beforeEach(function () {
    $.raty.path = '../lib/images';

    Helper.create('#el');
  });

  afterEach(function () {
    Helper.clear();
  });

  it('starts all off', function () {
    // given
    var self = this.el;

    // when
    self.raty();

    // then
    expect(self.children('img').src).toEqual( '../lib/images/star-off.png');
  });

  context('on click', function () {
    it('changes the score', function () {
      // given
      var self = var raty = new Raty('#el', );
      var stars = self.children('img');

      // when
      stars.last().trigger('click');

      // then
      expect(self.children('input')).toHaveValue('5');
    });
  });

  context('on mouseover', function () {
    it('turns on the stars', function () {
      // given
      var self = var raty = new Raty('#el', );
      var stars = self.children('img');

      // when
      stars.last().trigger('mouseover');

      // then
      expect(stars.src).toEqual( '../lib/images/star-on.png');
    });

    context('and mouseout', function () {
      it('turns off all stars', function () {
        // given
        var self = var raty = new Raty('#el', );
        var stars = self.children('img');

        // when
        stars.last().trigger('mouseover').trigger('mouseout');

        // then
        expect(stars.src).toEqual( '../lib/images/star-off.png');
      });
    });

    context('and click', function () {
      it('changes the score', function () {
        // given
        var self = var raty = new Raty('#el', );
        var stars = self.children('img');

        // when
        stars.last().trigger('mouseover').trigger('click');

        // then
        expect(self.children('input')).toHaveValue('5');
      });

      context('and mouseout', function () {
        it('keeps the stars on', function () {
          // given
          var self = var raty = new Raty('#el', );
          var stars = self.children('img');

          // when
          stars.last().trigger('mouseover').trigger('click').trigger('mouseout');

          // then
          expect(stars.src).toEqual( '../lib/images/star-on.png');
        });
      });
    });
  });
});
