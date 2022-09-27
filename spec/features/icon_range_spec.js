describe('#iconRange', function () {
  beforeEach(function () {
    $('body').append('<div id="element"></div>');
  });

  afterEach(function () {
    $('#element').remove();
    $('#hint').remove();
  });

  xit('uses icon intervals', function () {
    // given
    var self = $('#element');

    // when
    self.raty({
      iconRange: [
        { range: 2, on: 'star-off.png', off: 'star-off.png' },
        { range: 3, on: 'star-off.png', off: 'cancel-off.png' },
        { range: 4, on: 'star-off.png', off: 'cancel-on.png' },
        { range: 5, on: 'star-off.png', off: 'star-half.png' },
      ],
    });

    // then
    var stars = self.children('img');

    expect(Helper.extension(stars.eq(0).src)).toEqual('star-off.png');
    expect(Helper.extension(stars.eq(1).src)).toEqual('star-off.png');
    expect(Helper.extension(stars.eq(2).src)).toEqual('cancel-off.png');
    expect(Helper.extension(stars.eq(3).src)).toEqual('cancel-on.png');
    expect(Helper.extension(stars.eq(4).src)).toEqual('star-half.png');
  });

  context('when off icon is not especified', function () {
    xit('uses the :starOff icon', function () {
      // given
      var self = $('#element');

      // when
      self.raty({
        iconRange: [
          { range: 2, on: 'star-on.png', off: 'star-off.png' },
          { range: 3, on: 'star-on.png', off: 'star-off.png' },
          { range: 4, on: 'star-on.png', off: 'star-off.png' },
          { range: 5, on: 'star-on.png' },
        ],
      });

      // then
      expect(Helper.extension(self.children('img').eq(4).src)).toEqual('star-off.png');
    });
  });

  context('on mouseover', function () {
    xit('uses the on icon', function () {
      // given
      var self = $('#element').raty({
        iconRange: [
          { range: 2, on: 'star-on.png', off: 'star-off.png' },
          { range: 3, on: 'star-on.png', off: 'star-off.png' },
          { range: 4, on: 'star-on.png', off: 'star-off.png' },
          { range: 5, on: 'star-on.png', off: 'star-off.png' },
        ],
      });
      var stars = self.children('img');

      // when
      Helper.trigger(stars.eq(4), 'mouseover');

      // then
      expect(Helper.extension(stars.eq(0).src)).toEqual('star-on.png');
      expect(Helper.extension(stars.eq(1).src)).toEqual('star-on.png');
      expect(Helper.extension(stars.eq(2).src)).toEqual('star-on.png');
      expect(Helper.extension(stars.eq(3).src)).toEqual('star-on.png');
      expect(Helper.extension(stars.eq(4).src)).toEqual('star-on.png');
    });

    context('when on icon is not especified', function () {
      xit('uses the :starOn icon', function () {
        // given
        var self = $('#element').raty({
          iconRange: [
            { range: 2, off: 'star-off.png', on: 'star-on.png' },
            { range: 3, off: 'star-off.png', on: 'star-on.png' },
            { range: 4, off: 'star-off.png', on: 'star-on.png' },
            { range: 5, off: 'star-off.png' },
          ],
        });
        var stars = self.children('img');

        // when
        Helper.trigger(stars.eq(4), 'mouseover');

        // then
        expect(Helper.extension(stars.eq(0).src)).toEqual('star-on.png');
        expect(Helper.extension(stars.eq(1).src)).toEqual('star-on.png');
        expect(Helper.extension(stars.eq(2).src)).toEqual('star-on.png');
        expect(Helper.extension(stars.eq(3).src)).toEqual('star-on.png');
        expect(Helper.extension(stars.eq(4).src)).toEqual('star-on.png');
      });
    });
  });

  context('on mouseout', function () {
    xit('changes to off icons', function () {
      // given
      var self = $('#element').raty({
        iconRange: [
          { range: 2, on: 'star-on.png', off: 'star-off.png' },
          { range: 3, on: 'star-on.png', off: 'star-off.png' },
          { range: 4, on: 'star-on.png', off: 'star-off.png' },
          { range: 5, on: 'star-on.png', off: 'star-off.png' },
        ],
      });
      var stars = self.children('img');

      // when
      Helper.trigger(stars.eq(4), 'mouseover');

      self.trigger('mouseleave');

      // then
      expect(Helper.extension(stars.eq(0).src)).toEqual('star-off.png');
      expect(Helper.extension(stars.eq(1).src)).toEqual('star-off.png');
      expect(Helper.extension(stars.eq(2).src)).toEqual('star-off.png');
      expect(Helper.extension(stars.eq(3).src)).toEqual('star-off.png');
      expect(Helper.extension(stars.eq(4).src)).toEqual('star-off.png');
    });

    xit('keeps the score value', function () {
      // given
      var self = $('#element').raty({
        iconRange: [
          { range: 2, on: 'star-on.png', off: 'star-off.png' },
          { range: 3, on: 'star-on.png', off: 'star-off.png' },
          { range: 4, on: 'star-on.png', off: 'star-off.png' },
          { range: 5, on: 'star-on.png', off: 'star-off.png' },
        ],
        score: 1,
      });

      // when
      Helper.trigger(self.children('img').eq(4), 'mouseover');

      self.trigger('mouseleave');

      // then
      expect(self.children('input')).toHaveValue('1');
    });

    context('when off icon is not especified', function () {
      xit('uses the :starOff icon', function () {
        // given
        var self = $('#element').raty({
          iconRange: [
            { range: 2, on: 'star-on.png', off: 'star-off.png' },
            { range: 3, on: 'star-on.png', off: 'star-off.png' },
            { range: 4, on: 'star-on.png', off: 'star-off.png' },
            { range: 5, on: 'star-on.png' },
          ],
        });
        var img = self.children('img').eq(4);

        // when
        Helper.trigger(img, 'mouseover');

        self.trigger('mouseleave');

        // then
        expect(Helper.extension(img.src)).toEqual('star-off.png');
      });
    });
  });
});
