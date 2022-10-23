describe('#iconRange', () => {
  beforeEach(() => {
    var element = document.createElement('div');
    element.id = 'element';
    document.querySelector(`body`).appendChild(element);
  });

  afterEach(() => {
    document.querySelector('#element').remove();
  });

  it('uses icon intervals', () => {
    // given
    var raty = new Raty(document.querySelector('#element'), {
      iconRange: [
        { range: 2, on: 'star-off.png', off: 'star-off.png' },
        { range: 3, on: 'star-off.png', off: 'cancel-off.png' },
        { range: 4, on: 'star-off.png', off: 'cancel-on.png' },
        { range: 5, on: 'star-off.png', off: 'star-half.png' },
      ],
    });

    // when
    raty.init();

    // then
    var stars = raty.element.querySelectorAll('img');

    expect(Helper.extension(stars[0].src)).toEqual('star-off.png');
    expect(Helper.extension(stars[1].src)).toEqual('star-off.png');
    expect(Helper.extension(stars[2].src)).toEqual('cancel-off.png');
    expect(Helper.extension(stars[3].src)).toEqual('cancel-on.png');
    expect(Helper.extension(stars[4].src)).toEqual('star-half.png');
  });

  context('when off icon is not especified', function () {
    it('uses the :starOff icon', () => {
      // given
      var raty = new Raty(document.querySelector('#element'), {
        iconRange: [
          { range: 2, on: 'star-on.png', off: 'star-off.png' },
          { range: 3, on: 'star-on.png', off: 'star-off.png' },
          { range: 4, on: 'star-on.png', off: 'star-off.png' },
          { range: 5, on: 'star-on.png' },
        ],
      });

      // when
      raty.init();

      // then
      expect(Helper.extension(raty.element.querySelectorAll('img')[4].src)).toEqual('star-off.png');
    });
  });

  context('on mouseover', function () {
    it('uses the on icon', () => {
      // given
      var raty = new Raty(document.querySelector('#element'), {
        iconRange: [
          { range: 2, on: 'star-on.png', off: 'star-off.png' },
          { range: 3, on: 'star-on.png', off: 'star-off.png' },
          { range: 4, on: 'star-on.png', off: 'star-off.png' },
          { range: 5, on: 'star-on.png', off: 'star-off.png' },
        ],
      }).init();

      var stars = raty.element.querySelectorAll('img');

      // when
      Helper.trigger(stars[4], 'mouseover');

      // then
      expect(Helper.extension(stars[0].src)).toEqual('star-on.png');
      expect(Helper.extension(stars[1].src)).toEqual('star-on.png');
      expect(Helper.extension(stars[2].src)).toEqual('star-on.png');
      expect(Helper.extension(stars[3].src)).toEqual('star-on.png');
      expect(Helper.extension(stars[4].src)).toEqual('star-on.png');
    });

    context('when on icon is not especified', function () {
      it('uses the :starOn icon', () => {
        // given
        var raty = new Raty(document.querySelector('#element'), {
          iconRange: [
            { range: 2, off: 'star-off.png', on: 'star-on.png' },
            { range: 3, off: 'star-off.png', on: 'star-on.png' },
            { range: 4, off: 'star-off.png', on: 'star-on.png' },
            { range: 5, off: 'star-off.png' },
          ],
        }).init();

        var stars = raty.element.querySelectorAll('img');

        // when
        Helper.trigger(stars[4], 'mouseover');

        // then
        expect(Helper.extension(stars[0].src)).toEqual('star-on.png');
        expect(Helper.extension(stars[1].src)).toEqual('star-on.png');
        expect(Helper.extension(stars[2].src)).toEqual('star-on.png');
        expect(Helper.extension(stars[3].src)).toEqual('star-on.png');
        expect(Helper.extension(stars[4].src)).toEqual('star-on.png');
      });
    });
  });

  context('on mouseout', function () {
    it('changes to off icons', () => {
      // given
      var raty = new Raty(document.querySelector('#element'), {
        iconRange: [
          { range: 2, on: 'star-on.png', off: 'star-off.png' },
          { range: 3, on: 'star-on.png', off: 'star-off.png' },
          { range: 4, on: 'star-on.png', off: 'star-off.png' },
          { range: 5, on: 'star-on.png', off: 'star-off.png' },
        ],
      }).init();

      var stars = raty.element.querySelectorAll('img');

      // when
      Helper.trigger(stars[4], 'mouseover');
      Helper.trigger(raty.element, 'mouseleave');

      // then
      expect(Helper.extension(stars[0].src)).toEqual('star-off.png');
      expect(Helper.extension(stars[1].src)).toEqual('star-off.png');
      expect(Helper.extension(stars[2].src)).toEqual('star-off.png');
      expect(Helper.extension(stars[3].src)).toEqual('star-off.png');
      expect(Helper.extension(stars[4].src)).toEqual('star-off.png');
    });

    it('keeps the score value', () => {
      // given
      var raty = new Raty(document.querySelector('#element'), {
        iconRange: [
          { range: 2, on: 'star-on.png', off: 'star-off.png' },
          { range: 3, on: 'star-on.png', off: 'star-off.png' },
          { range: 4, on: 'star-on.png', off: 'star-off.png' },
          { range: 5, on: 'star-on.png', off: 'star-off.png' },
        ],
        score: 1,
      }).init();

      // when
      Helper.trigger(raty.element.querySelectorAll('img')[4], 'mouseover');
      Helper.trigger(raty.element, 'mouseleave');

      // then
      expect(raty.element.querySelector('input').value).toEqual('1');
    });

    context('when off icon is not especified', function () {
      it('uses the :starOff icon', () => {
        // given
        var raty = new Raty(document.querySelector('#element'), {
          iconRange: [
            { range: 2, on: 'star-on.png', off: 'star-off.png' },
            { range: 3, on: 'star-on.png', off: 'star-off.png' },
            { range: 4, on: 'star-on.png', off: 'star-off.png' },
            { range: 5, on: 'star-on.png' },
          ],
        }).init();

        var img = raty.element.querySelectorAll('img')[4];

        // when
        Helper.trigger(img, 'mouseover');
        Helper.trigger(raty.element, 'mouseleave');

        // then
        expect(Helper.extension(img.src)).toEqual('star-off.png');
      });
    });
  });
});
