describe('#single', function() {
  beforeEach(function() {
    $.raty.path = '../lib/images';

    $('body').append('<div id="element"></div>');
  });

  afterEach(function() {
    $('#element').remove();
    $('#hint').remove();
  });

  context('on mouseover', function() {
    it ('turns on just one icon', function() {
      // given
      var self = $('#element').raty({ single: true });
      var stars = self.children('img');

      // when
      stars.eq(2).trigger('mouseover');

      // then
      expect(stars.eq(0)).toHaveAttr('src', '../lib/images/star-off.png');
      expect(stars.eq(1)).toHaveAttr('src', '../lib/images/star-off.png');
      expect(stars.eq(2)).toHaveAttr('src', '../lib/images/star-on.png');
      expect(stars.eq(3)).toHaveAttr('src', '../lib/images/star-off.png');
      expect(stars.eq(4)).toHaveAttr('src', '../lib/images/star-off.png');
    });

    context('with :iconRange', function() {
      it ('shows just on icon', function() {
        // given
        var self = $('#element').raty({
          iconRange  : [
            { range: 2, on: 'star-on.png', off: 'star-off.png' },
            { range: 3, on: 'star-on.png', off: 'star-off.png' },
            { range: 4, on: 'star-on.png', off: 'star-off.png' },
            { range: 5, on: 'star-on.png', off: 'star-off.png' }
          ],
          single     : true
        });
        var stars = self.children('img');

        // when
        stars.eq(3).trigger('mouseover');

        // then
        expect(stars.eq(0)).toHaveAttr('src', '../lib/images/star-off.png');
        expect(stars.eq(1)).toHaveAttr('src', '../lib/images/star-off.png');
        expect(stars.eq(2)).toHaveAttr('src', '../lib/images/star-off.png');
        expect(stars.eq(3)).toHaveAttr('src', '../lib/images/star-on.png');
        expect(stars.eq(4)).toHaveAttr('src', '../lib/images/star-off.png');
      });
    });
  });

  context('on click', function() {
    it ('turns on the star', function() {
      // given
      var self  = $('#element').raty({ single: true });
      var stars = self.children('img');

      // when
      stars.eq(2).trigger('mouseover').trigger('click');

      // then
      expect(stars.eq(0)).toHaveAttr('src', '../lib/images/star-off.png');
      expect(stars.eq(1)).toHaveAttr('src', '../lib/images/star-off.png');
      expect(stars.eq(2)).toHaveAttr('src', '../lib/images/star-on.png');
      expect(stars.eq(3)).toHaveAttr('src', '../lib/images/star-off.png');
      expect(stars.eq(4)).toHaveAttr('src', '../lib/images/star-off.png');
    });

    context('on mouseout', function() {
      it ('keeps the score', function() {
        // given
        var self = $('#element').raty({ single: true });
        var stars = self.children('img');

        // when
        stars.eq(2).trigger('mouseover').trigger('click').trigger('mouseleave');

        // then
        expect(stars.eq(0)).toHaveAttr('src', '../lib/images/star-off.png');
        expect(stars.eq(1)).toHaveAttr('src', '../lib/images/star-off.png');
        expect(stars.eq(2)).toHaveAttr('src', '../lib/images/star-on.png');
        expect(stars.eq(3)).toHaveAttr('src', '../lib/images/star-off.png');
        expect(stars.eq(4)).toHaveAttr('src', '../lib/images/star-off.png');
      });

      context('and :iconRange', function() {
        it ('keeps the score', function() {
          // given
          var self = $('#element').raty({
            single    : true,
            iconRange  : [
              { range: 2, on: 'a.png', off: 'a-off.png' },
              { range: 3, on: 'b.png', off: 'b-off.png' },
              { range: 4, on: 'c.png', off: 'c-off.png' },
              { range: 5, on: 'd.png', off: 'd-off.png' }
            ]
          });
          var stars = self.children('img');

          // when
          stars.eq(3).trigger('mouseover').trigger('click').trigger('mouseleave');

          // then
          expect(stars.eq(0)).toHaveAttr('src', '../lib/images/a-off.png');
          expect(stars.eq(1)).toHaveAttr('src', '../lib/images/a-off.png');
          expect(stars.eq(2)).toHaveAttr('src', '../lib/images/b-off.png');
          expect(stars.eq(3)).toHaveAttr('src', '../lib/images/c.png');
          expect(stars.eq(4)).toHaveAttr('src', '../lib/images/d-off.png');
        });
      });
    });
  });
});
