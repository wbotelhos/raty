describe('#hints', function() {
  beforeEach(function() {
    $.fn.raty.defaults.path = '../lib/images';

    this.el = Helper.create('#el');
  });

  afterEach(function() {
    Helper.clear();
  });

  it ('changes the hints', function() {
    // given

    // when
    this.el.raty({ hints: ['1', '/', 'c', '-', '#'] });

    // then
    var stars = this.el.children('img');

    expect(stars[0]).toHaveAttr('title', '1');
    expect(stars[1]).toHaveAttr('title', '/');
    expect(stars[2]).toHaveAttr('title', 'c');
    expect(stars[3]).toHaveAttr('title', '-');
    expect(stars[4]).toHaveAttr('title', '#');
  });

  context('with undefined value', function() {
    it ('receives the number of the star', function() {
      // given

      // when
      this.el.raty({ hints: [undefined] });

      // then
      expect(this.el.children('img:first')).toHaveAttr('title', 'bad');
    });
  });

  context('with empty value', function() {
    it ('receives an empty value', function() {
      // given

      // when
      this.el.raty({ hints: [''] });

      // then
      expect(this.el.children('img:first')).toHaveAttr('title', '');
    });
  });

  context('with null value', function() {
    it ('receives the number of star', function() {
      // given

      // when
      this.el.raty({ hints: [null] });

      // then
      expect(this.el.children('img:first')).toHaveAttr('title', '1');
    });
  });

  context('with less hints than stars', function() {
    it ('receives the default hint value', function() {
      // given

      // when
      this.el.raty({ hints: ['1', '2', '3', '4'] });

      // then
      var stars = this.el.children('img');

      expect(stars[0]).toHaveAttr('title', '1');
      expect(stars[1]).toHaveAttr('title', '2');
      expect(stars[2]).toHaveAttr('title', '3');
      expect(stars[3]).toHaveAttr('title', '4');
      expect(stars[4]).toHaveAttr('title', 'gorgeous');
    });
  });

  context('with more stars than hints', function() {
    it ('receives the star number', function() {
      // given

      // when
      this.el.raty({ number: 6, hints: ['a', 'b', 'c', 'd', 'e'] });

      // then
      var stars = this.el.children('img');

      expect(stars[0]).toHaveAttr('title', 'a');
      expect(stars[1]).toHaveAttr('title', 'b');
      expect(stars[2]).toHaveAttr('title', 'c');
      expect(stars[3]).toHaveAttr('title', 'd');
      expect(stars[4]).toHaveAttr('title', 'e');
      expect(stars[5]).toHaveAttr('title', '6');
    });
  });
});
