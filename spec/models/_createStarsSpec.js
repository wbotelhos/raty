describe('#_createStars', function() {
  beforeEach(function() {
    this.el = Helper.create('#el');
  });

  context('with :number as 3', function() {
    it ('creates 3 stars', function() {
      // given
      var element  = this.el[0];
      var options  = { number: 3 };
      var instance = new $.raty.Raty(element, options);

      // when
      instance._createStars();

      // then
      expect(instance.self.children().length).toEqual(3);
    });

    it ('sets the right attributes', function() {
      // given
      var element  = this.el[0];
      var options  = {};
      var instance = new $.raty.Raty(element, options);

      spyOn($.raty.Raty.prototype, '_attributesForIndex').and.returnValue({ alt: 'alt' });

      // when
      instance._createStars();

      // then
      expect(instance.self.children()).toHaveAttr('alt', 'alt');
    });

    it ('uses the :starType to build the star', function() {
      // given
      var element  = this.el[0];
      var options  = { starType: 'li' };
      var instance = new $.raty.Raty(element, options);

      // when
      instance._createStars();

      // then
      var stars = instance.self.children();

      expect(stars[0].tagName).toEqual('LI');
      expect(stars[1].tagName).toEqual('LI');
      expect(stars[2].tagName).toEqual('LI');
      expect(stars[3].tagName).toEqual('LI');
      expect(stars[4].tagName).toEqual('LI');
    });

    context('with :space as true', function() {
      it ('puts one space between the stars', function() {
        // given
        var element  = this.el[0];
        var options  = { number: 2, space: true };
        var instance = new $.raty.Raty(element, options);
        var regex    = /<[a-zA-Z]+>&nbsp;<[a-zA-Z]+>/;

        spyOn($.raty.Raty.prototype, '_attributesForIndex').and.returnValue({});

        // when
        instance._createStars();

        // then
        expect(regex.test(instance.self.html())).toBeTruthy();
      });
    });

    context('with :space as false', function() {
      it ('does not puts space between the stars', function() {
        // given
        var element  = this.el[0];
        var options  = { number: 2, space: true };
        var instance = new $.raty.Raty(element, options);
        var regex    = /<[a-zA-Z]+>&nbsp;<[a-zA-Z]+>/;

        spyOn($.raty.Raty.prototype, '_attributesForIndex').and.returnValue({});

        // when
        instance._createStars();

        // then
        expect(regex.test(instance.self.html())).toBeTruthy();
      });
    });

    it ('saves the stars on instance', function() {
      // given
      var element  = this.el[0];
      var options  = {};
      var instance = new $.raty.Raty(element, options);

      // when
      instance._createStars();

      // then
      expect(instance.stars).toEqual(instance.self.children());
    });
  });
});
