describe('#starOn', function() {
  beforeEach(function() {
    $.fn.raty.defaults.path = '../lib/images';

    this.el = Helper.create('#el');
  });

  afterEach(function() {
    Helper.clear();
  });

  it ('accepts data attribute', function() {
    // given
    var el = Helper._append('div', { 'data-star-on': 'custom' });

    // when
    el.raty();

    // then
    expect(el[0].opt.starOn).toEqual('custom');
  });

  context('on mouseover', function() {
    it ('changes the stars on', function() {
      // given
      var self  = this.el.raty({ starOn: 'star-half.png' }),
          stars = self.children('img');

      // when
      stars.last().trigger('mouseover');

      // then
      expect(stars).toHaveAttr('src', '../lib/images/star-half.png');
    });

    context('with :starType', function() {
      it ('uses the given element', function() {
        // given
        var self  = this.el.raty({ starType: 'i' }),
            stars = self.children('i');

        // when
        stars.last().trigger('mouseover');

        // then
        expect(stars[0].tagName).toEqual('I');
        expect(stars[1].tagName).toEqual('I');
        expect(stars[2].tagName).toEqual('I');
        expect(stars[3].tagName).toEqual('I');
        expect(stars[4].tagName).toEqual('I');
      });

      it ('normalizes the class name', function() {
        // given
        var self  = this.el.raty({ starType: 'i' }),
            stars = self.children('i');

        // when
        stars.last().trigger('mouseover');

        // then
        expect(stars).toHaveClass('star-on-png');
      });

      it ('does not create "src" attribute', function() {
        // given
        var self  = this.el.raty({ starType: 'i' }),
            stars = self.children('i');

        // when
        stars.last().trigger('mouseover');

        // then
        expect(stars).not.toHaveAttr('src');
      });

      it ('creates "data-alt" attribute', function() {
        // given
        var self  = this.el.raty({ starType: 'i' }),
            stars = self.children('i');

        // when
        stars.last().trigger('mouseover');

        // then
        expect(stars).toHaveAttr('data-alt');
      });

      it ('does not create "alt" attribute', function() {
        // given
        var self  = this.el.raty({ starType: 'i' }),
            stars = self.children('i');

        // when
        stars.last().trigger('mouseover');

        // then
        expect(stars).not.toHaveAttr('alt');
      });
    });
  });
});
