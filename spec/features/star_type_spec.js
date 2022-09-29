describe('#starType', function () {
  context('when actived', function () {
    xit('disable the width property', function () {
      // given
      this.el = Helper.create('#el');

      var raty = new Raty('#el', { starType: 'i' }).init();

      // when
      raty.init();

      // then
      expect(raty.self.style.width).toEqual('');
    });
  });

  xit('accepts data attribute', function () {
    // given
    Helper._append('div', { 'data-star-type': 'b' });

    var raty = new Raty('[data-star-type]').init();

    // when
    raty.init();

    // then
    expect(raty.opt.starType).toEqual('b');
  });

  context('when is "img"', function () {
    xit('does not changes the :path to blank', function () {
      // given
      this.el = Helper.create('#el');

      // when
      var raty = new Raty('#el', { path: 'path', starType: 'img' }).init();

      // then
      expect(raty.opt.path).toEqual('');
    });

    xit('creates the default markup', function () {
      // given
      this.el = Helper.create('#el');

      // when
      var raty = new Raty('#el', { path: 'path', starType: 'img' }).init();

      // then
      var stars = raty.self.querySelectorAll('img');
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

      expect(Helper.extension(stars[0].src)).toEqual('star-off.png');
      expect(Helper.extension(stars[1].src)).toEqual('star-off.png');
      expect(Helper.extension(stars[2].src)).toEqual('star-off.png');
      expect(Helper.extension(stars[3].src)).toEqual('star-off.png');
      expect(Helper.extension(stars[4].src)).toEqual('star-off.png');

      expect(score.type).toEqual('hidden');
      expect(score.name).toEqual('score');
      expect(score.value).toEqual('');
    });
  });

  context('when is other element', function () {
    xit('changes the :path to blank', function () {
      // given
      this.el = Helper.create('#el');

      // when
      var raty = new Raty('#el', { path: 'path', starType: 'i' }).init();

      // then
      expect(raty.opt.path).toEqual('');
    });

    xit('creates the default markup', function () {
      // given
      this.el = Helper.create('#el');

      // when
      var raty = new Raty('#el', { starType: 'i' }).init();

      // then
      var stars = raty.self.querySelectorAll('i');
      var score = raty.self.querySelector('input');

      expect(stars[0].title).toEqual('bad');
      expect(stars[1].title).toEqual('poor');
      expect(stars[2].title).toEqual('regular');
      expect(stars[3].title).toEqual('good');
      expect(stars[4].title).toEqual('gorgeous');

      expect(stars[0].dataset.alt).toEqual('1');
      expect(stars[1].dataset.alt).toEqual('2');
      expect(stars[2].dataset.alt).toEqual('3');
      expect(stars[3].dataset.alt).toEqual('4');
      expect(stars[4].dataset.alt).toEqual('5');

      expect(stars).not.toHaveAttr('alt');
      expect(stars).not.toHaveAttr('src');

      expect(score.type).toEqual('hidden');
      expect(score.name).toEqual('score');
      expect(score.value).toEqual('');
    });

    context('with :half true', function () {
      xit('fills half star', function () {
        // given
        this.el = Helper.create('#el');

        var raty = new Raty('#el', { half: true, starType: 'i' }).init();
        var stars = raty.self.querySelectorAll('i');

        // when
        raty.move(4.5);

        // then
        expect(stars[0].classList.contains('star-on-png')).toEqual(true);
        expect(stars[1].classList.contains('star-on-png')).toEqual(true);
        expect(stars[2].classList.contains('star-on-png')).toEqual(true);
        expect(stars[3].classList.contains('star-on-png')).toEqual(true);
        expect(stars[4].classList.contains('star-half-png')).toEqual(true);
      });
    });
  });
});
