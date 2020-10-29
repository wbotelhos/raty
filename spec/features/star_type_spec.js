describe('#starType', function() {
  beforeEach(function() {
    $.raty.path = '../lib/images';

    this.el = Helper.create('#el');
  });

  afterEach(function() {
    Helper.clear();
  });

  context('when actived', function() {
    it('disable the width property', function() {
      // given
      var self = this.el;

      // when
      self.raty({ starType: 'i' });

      // then
      expect(self[0].style.width).toEqual('');
    });
  });

  it ('accepts data attribute', function() {
    // given
    var el = Helper._append('div', { 'data-star-type': 'b' });

    // when
    el.raty();

    // then
    expect(el.data('raty').opt.starType).toEqual('b');
  });

  context('when is "img"', function() {
    it ('does not changes the :path to blank', function() {
      // given

      // when
      this.el.raty({ path: 'path', starType: 'i' });

      // then
      expect(this.el.data('raty').opt.path).toEqual('');
    });

    it ('creates the default markup', function() {
      // given

      // when
      this.el.raty();

      // then
      var stars = this.el.children('img');
      var score = this.el.children('input');

      expect(stars.eq(0)).toHaveAttr('title', 'bad');
      expect(stars.eq(1)).toHaveAttr('title', 'poor');
      expect(stars.eq(2)).toHaveAttr('title', 'regular');
      expect(stars.eq(3)).toHaveAttr('title', 'good');
      expect(stars.eq(4)).toHaveAttr('title', 'gorgeous');

      expect(stars.eq(0)).toHaveAttr('alt', '1');
      expect(stars.eq(1)).toHaveAttr('alt', '2');
      expect(stars.eq(2)).toHaveAttr('alt', '3');
      expect(stars.eq(3)).toHaveAttr('alt', '4');
      expect(stars.eq(4)).toHaveAttr('alt', '5');

      expect(stars).toHaveAttr('src', '../lib/images/star-off.png');
      expect(score).toHaveAttr('type', 'hidden');
      expect(score).toHaveAttr('name', 'score');
      expect(score.val()).toEqual('');
    });
  });

  context('when is other element', function() {
    it ('changes the :path to blank', function() {
      // given

      // when
      this.el.raty({ path: 'path', starType: 'i' });

      // then
      expect(this.el.data('raty').opt.path).toEqual('');
    });

    it ('creates the default markup', function() {
      // given

      // when
      this.el.raty({ starType: 'i' });

      // then
      var stars = this.el.children('i');
      var score = this.el.children('input');

      expect(stars.eq(0)).toHaveAttr('title', 'bad');
      expect(stars.eq(1)).toHaveAttr('title', 'poor');
      expect(stars.eq(2)).toHaveAttr('title', 'regular');
      expect(stars.eq(3)).toHaveAttr('title', 'good');
      expect(stars.eq(4)).toHaveAttr('title', 'gorgeous');

      expect(stars.eq(0)).toHaveAttr('data-alt', '1');
      expect(stars.eq(1)).toHaveAttr('data-alt', '2');
      expect(stars.eq(2)).toHaveAttr('data-alt', '3');
      expect(stars.eq(3)).toHaveAttr('data-alt', '4');
      expect(stars.eq(4)).toHaveAttr('data-alt', '5');

      expect(stars).not.toHaveAttr('alt');
      expect(stars).not.toHaveAttr('src');

      expect(score).toHaveAttr('type', 'hidden');
      expect(score).toHaveAttr('name', 'score');
      expect(score.val()).toEqual('');
    });

    context('with :half true', function() {
      it ('fills half star', function() {
        // given
        this.el.raty({ half: true, starType: 'i' });

        var stars = this.el.children('i');

        // when
        this.el.data('raty').move(4.5);

        // then
        expect(stars[0]).toHaveClass('star-on-png');
        expect(stars[1]).toHaveClass('star-on-png');
        expect(stars[2]).toHaveClass('star-on-png');
        expect(stars[3]).toHaveClass('star-on-png');
        expect(stars[4]).toHaveClass('star-half-png');
      });
    });
  });
});
