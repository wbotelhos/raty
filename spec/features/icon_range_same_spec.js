describe('#iconRangeSame', function() {
  beforeEach(function() {
    $.raty.path = '../lib/images';

    $('body').append('<div id="element"></div>');
  });

  afterEach(function() {
    $('#element').remove();
    $('#hint').remove();
  });

  describe('when first star is chosen', function() {
    it ('repeats the range icon', function() {
      // given
      var self = $('#element');

      self.raty({
        iconRangeSame: true,

        iconRange: [
          { range: 2, on: 'star-on.png',  off: 'star-off.png' },
          { range: 3, on: 'star-off.png', off: 'star-off.png' },
          { range: 4, on: 'star-off.png', off: 'star-off.png' },
          { range: 5, on: 'star-on.png',  off: 'star-off.png' }
        ]
      });

      var stars = self.children('img');

      // when
      stars[0].dispatchEvent(new MouseEvent('mouseover'));

      // then
      expect(stars[0].src).toMatch('star-on.png');
      expect(stars[1].src).toMatch('star-off.png');
      expect(stars[2].src).toMatch('star-off.png');
      expect(stars[3].src).toMatch('star-off.png');
      expect(stars[4].src).toMatch('star-off.png');
    });
  });

  describe('when a middle star is chosen', function() {
    it ('repeats the range icon', function() {
      // given
      var self = $('#element');

      self.raty({
        iconRangeSame: true,

        iconRange: [
          { range: 2, on: 'star-on.png',  off: 'star-off.png' },
          { range: 3, on: 'star-off.png', off: 'star-off.png' },
          { range: 4, on: 'star-off.png', off: 'star-off.png' },
          { range: 5, on: 'star-on.png',  off: 'star-off.png' }
        ]
      });

      var stars = self.children('img');

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

  describe('when the last star is chosen', function() {
    it ('repeats the range icon', function() {
      // given
      var self = $('#element');

      self.raty({
        iconRangeSame: true,

        iconRange: [
          { range: 2, on: 'star-on.png',  off: 'star-off.png' },
          { range: 3, on: 'star-off.png', off: 'star-off.png' },
          { range: 4, on: 'star-off.png', off: 'star-off.png' },
          { range: 5, on: 'star-on.png',  off: 'star-off.png' }
        ]
      });

      var stars = self.children('img');

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

  describe('when mouse out', function() {
    describe('after mouse over', function() {
      it ('removes the range icon', function() {
        // given
        var self = $('#element');

        self.raty({
          iconRangeSame: true,

          iconRange: [
            { range: 2, on: 'star-on.png',  off: 'star-off.png' },
            { range: 3, on: 'star-off.png', off: 'star-off.png' },
            { range: 4, on: 'star-off.png', off: 'star-off.png' },
            { range: 5, on: 'star-on.png',  off: 'star-off.png' }
          ]
        });

        var stars = self.children('img');

        stars[4].dispatchEvent(new MouseEvent('mouseover'));

        // when
        self[0].dispatchEvent(new MouseEvent('mouseout'));

        // then
        expect(stars[0].src).toMatch('star-off.png');
        expect(stars[1].src).toMatch('star-off.png');
        expect(stars[2].src).toMatch('star-off.png');
        expect(stars[3].src).toMatch('star-off.png');
        expect(stars[4].src).toMatch('star-off.png');
      });
    });

    describe('after rating', function() {
      it ('keeps the selection', function() {
        // given
        var self = $('#element');

        self.raty({
          iconRangeSame: true,

          iconRange: [
            { range: 2, on: 'star-on.png',  off: 'star-off.png' },
            { range: 3, on: 'star-off.png', off: 'star-off.png' },
            { range: 4, on: 'star-off.png', off: 'star-off.png' },
            { range: 5, on: 'star-on.png',  off: 'star-off.png' }
          ]
        });

        var stars = self.children('img');

        stars[4].dispatchEvent(new MouseEvent('click'));

        // when
        self[0].dispatchEvent(new MouseEvent('mouseout'));

        // then
        expect(stars[0].src).toMatch('star-on.png');
        expect(stars[1].src).toMatch('star-on.png');
        expect(stars[2].src).toMatch('star-on.png');
        expect(stars[3].src).toMatch('star-on.png');
        expect(stars[4].src).toMatch('star-on.png');
      });
    });
  });
});
