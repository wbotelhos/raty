describe('#starOn', function () {
  beforeEach(function () {
    Helper.create('#el');
  });

  xit('accepts data attribute', function () {
    // given
    Helper._append('div', { 'data-star-on': 'custom' });

    // when
    var raty = new Raty('#el');

    // then
    expect(raty.opt.starOn).toEqual('custom');
  });

  context('on mouseover', function () {
    xit('changes the stars on', function () {
      // given
      var raty = new Raty('#el', { starOn: 'star-half.png' });
      var stars = self.children('img');

      // when
      Helper.trigger(Helper.last(stars), 'mouseover');

      // then
      expect(Helper.extension(stars.src)).toEqual('star-half.png');
    });

    context('with :starType', function () {
      xit('uses the given element', function () {
        // given
        var raty = new Raty('#el', { starType: 'i' });
        var stars = self.children('i');

        // when
        Helper.trigger(Helper.last(stars), 'mouseover');

        // then
        expect(stars[0].tagName).toEqual('I');
        expect(stars[1].tagName).toEqual('I');
        expect(stars[2].tagName).toEqual('I');
        expect(stars[3].tagName).toEqual('I');
        expect(stars[4].tagName).toEqual('I');
      });

      xit('normalizes the class name', function () {
        // given
        var raty = new Raty('#el', { starType: 'i' });
        var stars = self.children('i');

        // when
        Helper.trigger(Helper.last(stars), 'mouseover');

        // then
        expect(stars).toHaveClass('star-on-png');
      });

      xit('does not create "src" attribute', function () {
        // given
        var raty = new Raty('#el', { starType: 'i' });
        var stars = self.children('i');

        // when
        Helper.trigger(Helper.last(stars), 'mouseover');

        // then
        expect(stars).not.toHaveAttr('src');
      });

      xit('creates "data-alt" attribute', function () {
        // given
        var raty = new Raty('#el', { starType: 'i' });
        var stars = self.children('i');

        // when
        Helper.trigger(Helper.last(stars), 'mouseover');

        // then
        expect(stars).toHaveAttr('data-alt');
      });

      xit('does not create "alt" attribute', function () {
        // given
        var raty = new Raty('#el', { starType: 'i' });
        var stars = self.children('i');

        // when
        Helper.trigger(Helper.last(stars), 'mouseover');

        // then
        expect(stars).not.toHaveAttr('alt');
      });
    });
  });
});
