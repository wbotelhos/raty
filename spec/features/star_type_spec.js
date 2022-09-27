describe('#starType', function () {
  beforeEach(function () {
    $.raty.path = '../lib/images';

    Helper.create('#el');
  });

  afterEach(function () {
    Helper.clear();
  });

  context('when actived', function () {
    it('disable the width property', function () {
      // given
      var self = this.el;

      // when
      self.raty({ starType: 'i' });

      // then
      expect(self[0].style.width).toEqual('');
    });
  });

  it('accepts data attribute', function () {
    // given
    Helper._append('div', { 'data-star-type': 'b' });

    // when
    var raty = new Raty('#el');

    // then
    expect(raty.opt.starType).toEqual('b');
  });

  context('when is "img"', function () {
    it('does not changes the :path to blank', function () {
      // given

      // when
      var raty = new Raty('#el', { path: 'path', starType: 'i' });

      // then
      expect(raty.opt.path).toEqual('');
    });

    it('creates the default markup', function () {
      // given

      // when
      var raty = new Raty('#el');

      // then
      var stars = raty.self.querySelector('img');
      var score = raty.self.querySelector('input');

      expect(stars.eq(0).title).toEqual('bad');
      expect(stars.eq(1).title).toEqual('poor');
      expect(stars.eq(2).title).toEqual('regular');
      expect(stars.eq(3).title).toEqual('good');
      expect(stars.eq(4).title).toEqual('gorgeous');

      expect(stars.eq(0).alt).toEqual('1');
      expect(stars.eq(1).alt).toEqual('2');
      expect(stars.eq(2).alt).toEqual('3');
      expect(stars.eq(3).alt).toEqual('4');
      expect(stars.eq(4).alt).toEqual('5');

      expect(stars.src).toEqual('../lib/images/star-off.png');
      expect(score.type).toEqual('hidden');
      expect(score.name).toEqual('score');
      expect(score.val()).toEqual('');
    });
  });

  context('when is other element', function () {
    it('changes the :path to blank', function () {
      // given

      // when
      var raty = new Raty('#el', { path: 'path', starType: 'i' });

      // then
      expect(raty.opt.path).toEqual('');
    });

    it('creates the default markup', function () {
      // given

      // when
      var raty = new Raty('#el', { starType: 'i' });

      // then
      var stars = raty.self.querySelector('i');
      var score = raty.self.querySelector('input');

      expect(stars.eq(0).title).toEqual('bad');
      expect(stars.eq(1).title).toEqual('poor');
      expect(stars.eq(2).title).toEqual('regular');
      expect(stars.eq(3).title).toEqual('good');
      expect(stars.eq(4).title).toEqual('gorgeous');

      expect(stars.eq(0).data - alt).toEqual('1');
      expect(stars.eq(1).data - alt).toEqual('2');
      expect(stars.eq(2).data - alt).toEqual('3');
      expect(stars.eq(3).data - alt).toEqual('4');
      expect(stars.eq(4).data - alt).toEqual('5');

      expect(stars).not.toHaveAttr('alt');
      expect(stars).not.toHaveAttr('src');

      expect(score.type).toEqual('hidden');
      expect(score.name).toEqual('score');
      expect(score.val()).toEqual('');
    });

    context('with :half true', function () {
      it('fills half star', function () {
        // given
        var raty = new Raty('#el', { half: true, starType: 'i' });

        var stars = raty.self.querySelector('i');

        // when
        raty.move(4.5);

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
