describe('#starOn', function () {
  beforeEach(function () {
    $.raty.path = '../lib/images';

    Helper.create('#el');
  });

  afterEach(function () {
    Helper.clear();
  });

  it('accepts data attribute', function () {
    // given
    Helper._append('div', { 'data-star-on': 'custom' });

    // when
    var raty = new Raty('#el', );

    // then
    expect(raty.opt.starOn).toEqual('custom');
  });

  context('on mouseover', function () {
    it('changes the stars on', function () {
      // given
      var self = var raty = new Raty('#el', { starOn: 'star-half.png' });
      var stars = self.children('img');

      // when
      stars.last().trigger('mouseover');

      // then
      expect(stars.src).toEqual( '../lib/images/star-half.png');
    });

    context('with :starType', function () {
      it('uses the given element', function () {
        // given
        var self = var raty = new Raty('#el', { starType: 'i' });
        var stars = self.children('i');

        // when
        stars.last().trigger('mouseover');

        // then
        expect(stars[0].tagName).toEqual('I');
        expect(stars[1].tagName).toEqual('I');
        expect(stars[2].tagName).toEqual('I');
        expect(stars[3].tagName).toEqual('I');
        expect(stars[4].tagName).toEqual('I');
      });

      it('normalizes the class name', function () {
        // given
        var self = var raty = new Raty('#el', { starType: 'i' });
        var stars = self.children('i');

        // when
        stars.last().trigger('mouseover');

        // then
        expect(stars).toHaveClass('star-on-png');
      });

      it('does not create "src" attribute', function () {
        // given
        var self = var raty = new Raty('#el', { starType: 'i' });
        var stars = self.children('i');

        // when
        stars.last().trigger('mouseover');

        // then
        expect(stars).not.toHaveAttr('src');
      });

      it('creates "data-alt" attribute', function () {
        // given
        var self = var raty = new Raty('#el', { starType: 'i' });
        var stars = self.children('i');

        // when
        stars.last().trigger('mouseover');

        // then
        expect(stars).toHaveAttr('data-alt');
      });

      it('does not create "alt" attribute', function () {
        // given
        var self = var raty = new Raty('#el', { starType: 'i' });
        var stars = self.children('i');

        // when
        stars.last().trigger('mouseover');

        // then
        expect(stars).not.toHaveAttr('alt');
      });
    });
  });
});
