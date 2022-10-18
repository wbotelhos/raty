describe('#_createStars', () => {
  beforeEach(() => {
    Helper.create('#el');
  });

  context('with :number as 3', function () {
    it('creates 3 stars', () => {
      // given

      var options = { number: 3 };
      var raty = new Raty(document.querySelector('#el'), options);

      // when
      raty._createStars();

      // then
      expect(raty.element.querySelectorAll(raty.opt.starType).length).toEqual(3);
    });

    it('sets the right attributes', () => {
      // given
      var options = {};
      var raty = new Raty(document.querySelector('#el'), options);

      jest.spyOn(raty, '_attributesForIndex').mockImplementation(() => ({
        alt: 'alt',
      }));

      // when
      raty._createStars();

      // then
      raty.element.querySelectorAll(raty.opt.starType).forEach((element) =>
        expect(element).toHaveAttribute('alt', 'alt')
      );
    });

    it('uses the :starType to build the star', () => {
      // given

      var options = { starType: 'li' };
      var raty = new Raty(document.querySelector('#el'), options);

      // when
      raty._createStars();

      // then
      var stars = raty.element.querySelectorAll(raty.opt.starType);

      expect(stars[0].tagName).toEqual('LI');
      expect(stars[1].tagName).toEqual('LI');
      expect(stars[2].tagName).toEqual('LI');
      expect(stars[3].tagName).toEqual('LI');
      expect(stars[4].tagName).toEqual('LI');
    });

    context('with :space as true', function () {
      it('puts one space between the stars', () => {
        // given
        var options = { number: 2, space: true };
        var raty = new Raty(document.querySelector('#el'), options);
        var regex = /.+&nbsp;.+/;

        jest.spyOn(raty, '_attributesForIndex').mockImplementationOnce(() => ({}));

        // when
        raty._createStars();

        // then
        expect(regex.test(raty.element.innerHTML)).toEqual(true);
      });
    });

    context('with :space as false', function () {
      it('does not puts space between the stars', () => {
        // given
        var options = { number: 2, space: true };
        var raty = new Raty(document.querySelector('#el'), options);
        var regex = /.+&nbsp;.+/;

        jest.spyOn(raty, '_attributesForIndex').mockImplementationOnce(() => ({}));

        // when
        raty._createStars();

        // then
        expect(regex.test(raty.element.innerHTML)).toEqual(true);
      });
    });

    it('saves the stars on raty', () => {
      // given

      var options = {};
      var raty = new Raty(document.querySelector('#el'), options);

      // when
      raty._createStars();

      // then
      expect(raty.stars).toEqual(raty.element.querySelectorAll(raty.opt.starType));
    });
  });
});
