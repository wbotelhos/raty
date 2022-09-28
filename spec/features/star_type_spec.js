describe('#starType', function () {
  context('when actived', function () {
    xit('disable the width property', function () {
      // given
      Helper.create('#el');

      var raty = new Raty('#el', { starType: 'i' });

      // when
      raty.init();

      // then
      expect(raty.self.style.width).toEqual('');
    });
  });

  it('accepts data attribute', function () {
    // given
    Helper._append('div', { 'data-star-type': 'b' });

    var raty = new Raty('[data-star-type]');

    // when
    raty.init();

    // then
    expect(raty.opt.starType).toEqual('b');
  });

  context('when is "img"', function () {
    xit('does not changes the :path to blank', function () {
      // given
      Helper.create('#el');

      // when
      var raty = new Raty('#el', { path: 'path', starType: 'i' });

      // then
      expect(raty.opt.path).toEqual('');
    });

    xit('creates the default markup', function () {
      // given
      Helper.create('#el');

      // when
      var raty = new Raty('#el');

      // then
      var stars = raty.self.querySelector('img');
      var score = raty.self.querySelector('input');

      expect(stars[0].title).toEqual('bad');
      expect(stars[1].title).toEqual('poor');
      expect(stars[2].title).toEqual('regular');
      expect(stars[3].title).toEqual('good');
      expect(stars[4].title).toEqual('gorgeous');

      expect(stars[0].alt).toEqual('1');
      expect(stars[1].alt).toEqual('2');
      expect(stars[2].alt).toEqual('3');
      expect(stars[3].alt).toEqual('4');
      expect(stars[4].alt).toEqual('5');

      expect(Helper.extension(stars.src)).toEqual('star-off.png');
      expect(score.type).toEqual('hidden');
      expect(score.name).toEqual('score');
      expect(score.value).toEqual('');
    });
  });

  context('when is other element', function () {
    xit('changes the :path to blank', function () {
      // given
      Helper.create('#el');

      // when
      var raty = new Raty('#el', { path: 'path', starType: 'i' });

      // then
      expect(raty.opt.path).toEqual('');
    });

    xit('creates the default markup', function () {
      // given
      Helper.create('#el');

      // when
      var raty = new Raty('#el', { starType: 'i' });

      // then
      var stars = raty.self.querySelector('i');
      var score = raty.self.querySelector('input');

      expect(stars[0].title).toEqual('bad');
      expect(stars[1].title).toEqual('poor');
      expect(stars[2].title).toEqual('regular');
      expect(stars[3].title).toEqual('good');
      expect(stars[4].title).toEqual('gorgeous');

      expect(stars[0].data - alt).toEqual('1');
      expect(stars[1].data - alt).toEqual('2');
      expect(stars[2].data - alt).toEqual('3');
      expect(stars[3].data - alt).toEqual('4');
      expect(stars[4].data - alt).toEqual('5');

      expect(stars).not.toHaveAttr('alt');
      expect(stars).not.toHaveAttr('src');

      expect(score.type).toEqual('hidden');
      expect(score.name).toEqual('score');
      expect(score.value).toEqual('');
    });

    context('with :half true', function () {
      xit('fills half star', function () {
        // given
        Helper.create('#el');

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
