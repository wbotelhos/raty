describe('#iconRange', function() {
  beforeEach(function() {
    $.raty.path = '../lib/images';

    $('body').append('<div id="element"></div>');
  });

  afterEach(function() {
    $('#element').remove();
    $('#hint').remove();
  });

  it ('uses icon intervals', function() {
    // given
    var self = $('#element');

    // when
    self.raty({
      iconRange: [
        { range: 2, on: 'star-off.png', off: 'star-off.png' },
        { range: 3, on: 'star-off.png', off: 'cancel-off.png' },
        { range: 4, on: 'star-off.png', off: 'cancel-on.png' },
        { range: 5, on: 'star-off.png', off: 'star-half.png' }
      ]
    });

    // then
    var stars = self.children('img');

    expect(stars.eq(0)).toHaveAttr('src', '../lib/images/star-off.png');
    expect(stars.eq(1)).toHaveAttr('src', '../lib/images/star-off.png');
    expect(stars.eq(2)).toHaveAttr('src', '../lib/images/cancel-off.png');
    expect(stars.eq(3)).toHaveAttr('src', '../lib/images/cancel-on.png');
    expect(stars.eq(4)).toHaveAttr('src', '../lib/images/star-half.png');
  });

  context('when off icon is not especified', function() {
    it ('uses the :starOff icon', function() {
      // given
      var self = $('#element');

      // when
      self.raty({
        iconRange: [
          { range: 2, on: 'star-on.png', off: 'star-off.png' },
          { range: 3, on: 'star-on.png', off: 'star-off.png' },
          { range: 4, on: 'star-on.png', off: 'star-off.png' },
          { range: 5, on: 'star-on.png' }
        ]
      });

      // then
      expect(self.children('img').eq(4)).toHaveAttr('src', '../lib/images/star-off.png');
    });
  });

  context('on mouseover', function() {
    it ('uses the on icon', function() {
      // given
      var self = $('#element').raty({
        iconRange: [
          { range: 2, on: 'star-on.png', off: 'star-off.png' },
          { range: 3, on: 'star-on.png', off: 'star-off.png' },
          { range: 4, on: 'star-on.png', off: 'star-off.png' },
          { range: 5, on: 'star-on.png', off: 'star-off.png' }
        ]
      });
      var stars = self.children('img');

      // when
      stars.eq(4).trigger('mouseover');

      // then
      expect(stars.eq(0)).toHaveAttr('src', '../lib/images/star-on.png');
      expect(stars.eq(1)).toHaveAttr('src', '../lib/images/star-on.png');
      expect(stars.eq(2)).toHaveAttr('src', '../lib/images/star-on.png');
      expect(stars.eq(3)).toHaveAttr('src', '../lib/images/star-on.png');
      expect(stars.eq(4)).toHaveAttr('src', '../lib/images/star-on.png');
    });

    context('when on icon is not especified', function() {
      it ('uses the :starOn icon', function() {
        // given
        var self = $('#element').raty({
          iconRange: [
            { range: 2, off: 'star-off.png', on: 'star-on.png' },
            { range: 3, off: 'star-off.png', on: 'star-on.png' },
            { range: 4, off: 'star-off.png', on: 'star-on.png' },
            { range: 5, off: 'star-off.png' }
          ]
        });
        var stars = self.children('img');

        // when
        stars.eq(4).trigger('mouseover');

        // then
        expect(stars.eq(0)).toHaveAttr('src', '../lib/images/star-on.png');
        expect(stars.eq(1)).toHaveAttr('src', '../lib/images/star-on.png');
        expect(stars.eq(2)).toHaveAttr('src', '../lib/images/star-on.png');
        expect(stars.eq(3)).toHaveAttr('src', '../lib/images/star-on.png');
        expect(stars.eq(4)).toHaveAttr('src', '../lib/images/star-on.png');
      });
    });
  });

  context('on mouseout', function() {
    it ('changes to off icons', function() {
      // given
      var self = $('#element').raty({
        iconRange: [
          { range: 2, on: 'star-on.png', off: 'star-off.png' },
          { range: 3, on: 'star-on.png', off: 'star-off.png' },
          { range: 4, on: 'star-on.png', off: 'star-off.png' },
          { range: 5, on: 'star-on.png', off: 'star-off.png' },
        ]
      });
      var stars = self.children('img');

      // when
      stars.eq(4).trigger('mouseover');

      self.trigger('mouseleave');

      // then
      expect(stars.eq(0)).toHaveAttr('src', '../lib/images/star-off.png');
      expect(stars.eq(1)).toHaveAttr('src', '../lib/images/star-off.png');
      expect(stars.eq(2)).toHaveAttr('src', '../lib/images/star-off.png');
      expect(stars.eq(3)).toHaveAttr('src', '../lib/images/star-off.png');
      expect(stars.eq(4)).toHaveAttr('src', '../lib/images/star-off.png');
    });

    it ('keeps the score value', function() {
      // given
      var self = $('#element').raty({
        iconRange  : [
          { range: 2, on: 'star-on.png', off: 'star-off.png' },
          { range: 3, on: 'star-on.png', off: 'star-off.png' },
          { range: 4, on: 'star-on.png', off: 'star-off.png' },
          { range: 5, on: 'star-on.png', off: 'star-off.png' }
        ],
        score      : 1
      });

      // when
      self.children('img').eq(4).trigger('mouseover');

      self.trigger('mouseleave');

      // then
      expect(self.children('input')).toHaveValue('1');
    });

    context('when off icon is not especified', function() {
      it ('uses the :starOff icon', function() {
        // given
        var self = $('#element').raty({
          iconRange: [
            { range: 2, on: 'star-on.png', off: 'star-off.png' },
            { range: 3, on: 'star-on.png', off: 'star-off.png' },
            { range: 4, on: 'star-on.png', off: 'star-off.png' },
            { range: 5, on: 'star-on.png' }
          ]
        });
        var img = self.children('img').eq(4);

        // when
        img.trigger('mouseover');

        self.trigger('mouseleave');

        // then
        expect(img).toHaveAttr('src', '../lib/images/star-off.png');
      });
    });
  });
});
