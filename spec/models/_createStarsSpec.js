describe('#_createStars', function () {
  beforeEach(function () {
    this.el = Helper.create('#el');
  });

  context('with :number as 3', function () {
    xit('creates 3 stars', function () {
      // given

      var options = { number: 3 };
      var raty = new Raty('#el', options);

      // when
      raty._createStars();

      // then
      expect(raty.self.querySelectorAll(raty.opt.starType).length).toEqual(3);
    });

    xit('sets the right attributes', function () {
      // given

      var options = {};
      var raty = new Raty('#el', options);

      spyOn(raty, '_attributesForIndex').and.returnValue({
        alt: 'alt',
      });

      // when
      raty._createStars();

      // then
      expect(raty.self.querySelectorAll(raty.opt.starType)).toHaveAttr('alt', 'alt');
    });

    xit('uses the :starType to build the star', function () {
      // given

      var options = { starType: 'li' };
      var raty = new Raty('#el', options);

      // when
      raty._createStars();

      // then
      var stars = raty.self.querySelectorAll(raty.opt.starType);

      expect(stars[0].tagName).toEqual('LI');
      expect(stars[1].tagName).toEqual('LI');
      expect(stars[2].tagName).toEqual('LI');
      expect(stars[3].tagName).toEqual('LI');
      expect(stars[4].tagName).toEqual('LI');
    });

    context('with :space as true', function () {
      xit('puts one space between the stars', function () {
        // given
        var options = { number: 2, space: true };
        var raty = new Raty('#el', options);
        var regex = /.+&nbsp;.+/;

        spyOn(raty, '_attributesForIndex').and.returnValue({});

        // when
        raty._createStars();

        // then
        expect(regex.test(raty.self.innerHTML)).toEqual(true);
      });
    });

    context('with :space as false', function () {
      xit('does not puts space between the stars', function () {
        // given
        var options = { number: 2, space: true };
        var raty = new Raty('#el', options);
        var regex = /.+&nbsp;.+/;

        spyOn(raty, '_attributesForIndex').and.returnValue({});

        // when
        raty._createStars();

        // then
        expect(regex.test(raty.self.innerHTML)).toEqual(true);
      });
    });

    xit('saves the stars on raty', function () {
      // given

      var options = {};
      var raty = new Raty('#el', options);

      // when
      raty._createStars();

      // then
      expect(raty.stars).toEqual(raty.self.querySelectorAll(raty.opt.starType));
    });
  });
});
