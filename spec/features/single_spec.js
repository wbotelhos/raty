describe('#single', function () {
  beforeEach(function () {
    $('body').append('<div id="element"></div>');
  });

  afterEach(function () {
    $('#element').remove();
    $('#hint').remove();
  });

  context('on mouseover', function () {
    xit('turns on just one icon', function () {
      // given
      var self = $('#element').raty({ single: true });
      var stars = self.children('img');

      // when
      Helper.trigger(stars.eq(2), 'mouseover');

      // then
      expect(Helper.extension(stars.eq(0).src)).toEqual('star-off.png');
      expect(Helper.extension(stars.eq(1).src)).toEqual('star-off.png');
      expect(Helper.extension(stars.eq(2).src)).toEqual('star-on.png');
      expect(Helper.extension(stars.eq(3).src)).toEqual('star-off.png');
      expect(Helper.extension(stars.eq(4).src)).toEqual('star-off.png');
    });

    context('with :iconRange', function () {
      xit('shows just on icon', function () {
        // given
        var self = $('#element').raty({
          iconRange: [
            { range: 2, on: 'star-on.png', off: 'star-off.png' },
            { range: 3, on: 'star-on.png', off: 'star-off.png' },
            { range: 4, on: 'star-on.png', off: 'star-off.png' },
            { range: 5, on: 'star-on.png', off: 'star-off.png' },
          ],
          single: true,
        });
        var stars = self.children('img');

        // when
        Helper.trigger(stars.eq(3), 'mouseover');

        // then
        expect(Helper.extension(stars.eq(0).src)).toEqual('star-off.png');
        expect(Helper.extension(stars.eq(1).src)).toEqual('star-off.png');
        expect(Helper.extension(stars.eq(2).src)).toEqual('star-off.png');
        expect(Helper.extension(stars.eq(3).src)).toEqual('star-on.png');
        expect(Helper.extension(stars.eq(4).src)).toEqual('star-off.png');
      });
    });
  });

  context('on click', function () {
    xit('turns on the star', function () {
      // given
      var self = $('#element').raty({ single: true });
      var stars = self.children('img');

      // when
      stars.eq(2).trigger('mouseover').trigger('click');

      // then
      expect(Helper.extension(stars.eq(0).src)).toEqual('star-off.png');
      expect(Helper.extension(stars.eq(1).src)).toEqual('star-off.png');
      expect(Helper.extension(stars.eq(2).src)).toEqual('star-on.png');
      expect(Helper.extension(stars.eq(3).src)).toEqual('star-off.png');
      expect(Helper.extension(stars.eq(4).src)).toEqual('star-off.png');
    });

    context('on mouseout', function () {
      xit('keeps the score', function () {
        // given
        var self = $('#element').raty({ single: true });
        var stars = self.children('img');

        // when
        stars.eq(2).trigger('mouseover').trigger('click').trigger('mouseleave');

        // then
        expect(Helper.extension(stars.eq(0).src)).toEqual('star-off.png');
        expect(Helper.extension(stars.eq(1).src)).toEqual('star-off.png');
        expect(Helper.extension(stars.eq(2).src)).toEqual('star-on.png');
        expect(Helper.extension(stars.eq(3).src)).toEqual('star-off.png');
        expect(Helper.extension(stars.eq(4).src)).toEqual('star-off.png');
      });

      context('and :iconRange', function () {
        xit('keeps the score', function () {
          // given
          var self = $('#element').raty({
            single: true,
            iconRange: [
              { range: 2, on: 'a.png', off: 'a-off.png' },
              { range: 3, on: 'b.png', off: 'b-off.png' },
              { range: 4, on: 'c.png', off: 'c-off.png' },
              { range: 5, on: 'd.png', off: 'd-off.png' },
            ],
          });
          var stars = self.children('img');

          // when
          stars.eq(3).trigger('mouseover').trigger('click').trigger('mouseleave');

          // then
          expect(Helper.extension(stars.eq(0).src)).toEqual('a-off.png');
          expect(Helper.extension(stars.eq(1).src)).toEqual('a-off.png');
          expect(Helper.extension(stars.eq(2).src)).toEqual('b-off.png');
          expect(Helper.extension(stars.eq(3).src)).toEqual('c.png');
          expect(Helper.extension(stars.eq(4).src)).toEqual('d-off.png');
        });
      });
    });
  });
});
