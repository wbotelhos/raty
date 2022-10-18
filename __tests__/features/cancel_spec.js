describe('#cancel', () => {
  it('creates the element', () => {
    // given
    Helper.create('#el');

    // when
    var raty = new Raty(document.querySelector('#el'), { cancelButton: true }).init();

    // then
    var cancel = raty.element.querySelector('.raty-cancel');

    expect(cancel.classList.contains('raty-cancel')).toEqual(true);
    expect(cancel.title).toEqual('Cancel this rating!');
    expect(cancel.alt).toEqual('x');
    expect(Helper.extension(cancel.src)).toEqual('cancel-off.png');
  });

  it('accepts data attribute', () => {
    // given
    Helper._append('div', { 'data-cancel': true });

    // when
    var raty = new Raty(document.querySelector('[data-cancel]')).init();

    // then
    expect(raty.opt.cancel).toEqual(true);
  });

  context('on mouseover', function () {
    it('turns on', () => {
      // given
      Helper.create('#el');

      var raty = new Raty(document.querySelector('#el'), { cancelButton: true }).init();
      var cancel = raty.element.querySelector('.raty-cancel');

      // when
      Helper.trigger(cancel, 'mouseover');

      // then
      expect(Helper.extension(cancel.src)).toEqual('cancel-on.png');
    });

    it('keeps the :cancelClass', () => {
      // given
      Helper.create('#el');

      var raty = new Raty(document.querySelector('#el'), { cancelButton: true }).init();

      var cancel = raty.element.querySelector('.raty-cancel');

      // when
      Helper.trigger(cancel, 'mouseover');

      // then
      expect(cancel).toHaveClass(raty.opt.cancelClass);
    });

    context('with stars on', function () {
      it('turns off the stars', () => {
        // given
        Helper.create('#el');

        var raty = new Raty(document.querySelector('#el'), { score: 3, cancelButton: true }).init();

        var cancel = raty.element.querySelector('.raty-cancel');
        var stars = raty.element.querySelectorAll('img:not(.raty-cancel)');

        // when
        Helper.trigger(cancel, 'mouseover');

        // then
        expect(Helper.extension(stars[0].src)).toEqual('star-off.png');
        expect(Helper.extension(stars[1].src)).toEqual('star-off.png');
        expect(Helper.extension(stars[2].src)).toEqual('star-off.png');
        expect(Helper.extension(stars[3].src)).toEqual('star-off.png');
        expect(Helper.extension(stars[4].src)).toEqual('star-off.png');
      });
    });

    context('with :starType', function () {
      it('uses the given element', () => {
        // given
        Helper.create('#el');

        var raty = new Raty(document.querySelector('#el'), { cancelButton: true, starType: 'i' }).init();
        var cancel = raty.element.querySelector('.raty-cancel');

        // when
        Helper.trigger(cancel, 'mouseover');

        // then
        expect(cancel.tagName).toEqual('I');
      });

      it('keeps the :cancelClass', () => {
        // given
        Helper.create('#el');

        var raty = new Raty(document.querySelector('#el'), { cancelButton: true, starType: 'i' }).init();
        var cancel = raty.element.querySelector('.raty-cancel');

        // when
        Helper.trigger(cancel, 'mouseover');

        // then
        expect(cancel).toHaveClass(raty.opt.cancelClass);
      });

      it('sets class replacing dot to hiphen', () => {
        // given
        Helper.create('#el');

        var raty = new Raty(document.querySelector('#el'), { cancelButton: true, starType: 'i' }).init();
        var cancel = raty.element.querySelector('.raty-cancel');

        // when
        Helper.trigger(cancel, 'mouseover');

        // then
        expect(cancel).toHaveClass('cancel-on-png');
      });

      it('does not set "src" attribute', () => {
        // given
        Helper.create('#el');

        var raty = new Raty(document.querySelector('#el'), { cancelButton: true, starType: 'i' }).init();
        var cancel = raty.element.querySelector('.raty-cancel');

        // when
        Helper.trigger(cancel, 'mouseover');

        // then
        expect(cancel).not.toHaveAttribute('src');
      });

      it('sets "data-alt" attribute', () => {
        // given
        Helper.create('#el');

        var raty = new Raty(document.querySelector('#el'), { cancelButton: true, starType: 'i' }).init();
        var cancel = raty.element.querySelector('.raty-cancel');

        // when
        Helper.trigger(cancel, 'mouseover');

        // then
        expect(cancel).toHaveAttribute('data-alt');
      });

      it('does not set "alt" attribute', () => {
        // given
        Helper.create('#el');

        var raty = new Raty(document.querySelector('#el'), { cancelButton: true, starType: 'i' }).init();
        var cancel = raty.element.querySelector('.raty-cancel');

        // when
        Helper.trigger(cancel, 'mouseover');

        // then
        expect(cancel).not.toHaveAttribute('alt');
      });
    });
  });

  context('on mouseleave', function () {
    it('turns off', () => {
      // given
      Helper.create('#el');

      var raty = new Raty(document.querySelector('#el'), { cancelButton: true }).init();
      var cancel = raty.element.querySelector('.raty-cancel');

      // when
      Helper.trigger(raty.element, 'mouseleave');

      // then
      expect(Helper.extension(cancel.src)).toEqual('cancel-off.png');
    });

    it('keeps the :cancelClass', () => {
      // given
      Helper.create('#el');

      var raty = new Raty(document.querySelector('#el'), { cancelButton: true }).init();
      var cancel = raty.element.querySelector('.raty-cancel');

      // when
      Helper.trigger(raty.element, 'mouseleave');

      // then
      expect(cancel).toHaveClass(raty.opt.cancelClass);
    });

    context('with stars turned on', function () {
      it('turns on the star again', () => {
        // given
        Helper.create('#el');

        var raty = new Raty(document.querySelector('#el'), { score: 5, cancelButton: true }).init();
        var cancel = raty.element.querySelector('.raty-cancel');
        var stars = raty.element.querySelector('img:not(.raty-cancel)');

        // when
        Helper.trigger(raty.element, 'mouseleave');

        // then
        expect(Helper.extension(stars.src)).toEqual('star-on.png');
      });
    });
  });

  context('on click', function () {
    it('cancel the rating', () => {
      // given
      Helper.create('#el');

      var raty = new Raty(document.querySelector('#el'), { cancelButton: true, score: 1 }).init();
      var cancel = raty.element.querySelector('.raty-cancel');
      var input = raty.element.querySelector('input');
      var stars = raty.element.querySelectorAll('img:not(.raty-cancel)');

      // when
      Helper.trigger(cancel, 'click');
      Helper.trigger(raty.element, 'mouseleave');

      // then
      expect(Helper.extension(stars[0].src)).toEqual('star-off.png');
      expect(Helper.extension(stars[1].src)).toEqual('star-off.png');
      expect(Helper.extension(stars[2].src)).toEqual('star-off.png');
      expect(Helper.extension(stars[3].src)).toEqual('star-off.png');
      expect(Helper.extension(stars[4].src)).toEqual('star-off.png');

      expect(input.value).toEqual('');
    });
  });

  context('when starts :readOnly', function () {
    it('starts hidden', () => {
      // given
      Helper.create('#el');

      var raty = new Raty(document.querySelector('#el'), { cancelButton: true, readOnly: true }).init();
      var cancel = raty.element.querySelector('.raty-cancel');

      // when
      raty.readOnly(true);

      // then
      expect(cancel).not.toBeVisible();
    });

    context('on click', function () {
      it('does not cancel the rating', () => {
        // given
        Helper.create('#el');

        var raty = new Raty(document.querySelector('#el'), { cancelButton: true, readOnly: true, score: 5 }).init();
        var cancel = raty.element.querySelector('.raty-cancel');
        var input = raty.element.querySelector('input');
        var stars = raty.element.querySelector('img:not(.raty-cancel)');

        // when
        Helper.trigger(cancel, 'click');
        Helper.trigger(raty.element, 'mouseleave');

        // then
        expect(Helper.extension(stars.src)).toEqual('star-on.png');
        expect(input.value).toEqual('5');
      });
    });
  });

  context('when become :readOnly', function () {
    it('becomes hidden', () => {
      // given
      Helper.create('#el');

      var raty = new Raty(document.querySelector('#el'), { cancelButton: true }).init();

      // when
      raty.readOnly(true);

      // then
      raty.element.querySelectorAll('.raty-cancel').forEach((element) => expect(element).not.toBeVisible());
    });
  });

  context('with :starType', function () {
    it('uses the given element', () => {
      // given
      Helper.create('#el');

      // when
      var raty = new Raty(document.querySelector('#el'), { cancelButton: true, starType: 'i' }).init();

      // then
      expect(raty.element.querySelectorAll('.raty-cancel')[0].tagName).toEqual('I');
    });

    it('keeps the :cancelClass', () => {
      // given
      Helper.create('#el');

      var raty = new Raty(document.querySelector('#el'), { cancelButton: true, starType: 'i' }).init();
      var cancel = raty.element.querySelector('.raty-cancel');

      // when
      Helper.trigger(raty.element, 'mouseleave');

      // then
      expect(cancel).toHaveClass(raty.opt.cancelClass);
    });

    it('sets class replacing dot to hiphen', () => {
      // given
      Helper.create('#el');

      // when
      var raty = new Raty(document.querySelector('#el'), { cancelButton: true, starType: 'i' }).init();

      // then
      raty.element.querySelectorAll('.raty-cancel').forEach((element) => {
        expect(element).toHaveClass('cancel-off-png');
      });
    });

    it('does not set "src" attribute', () => {
      // given
      Helper.create('#el');

      // when
      var raty = new Raty(document.querySelector('#el'), { cancelButton: true, starType: 'i' }).init();

      // then
      expect(raty.element.querySelectorAll('.raty-cancel')).not.toHaveProperty('src');
    });

    it('sets "data-alt" attribute', () => {
      // given
      Helper.create('#el');

      // when
      var raty = new Raty(document.querySelector('#el'), { cancelButton: true, starType: 'i' }).init();

      // then
      expect(raty.element.querySelector('.raty-cancel').getAttribute('data-alt')).toEqual('x');
    });

    it('does not set "alt" attribute', () => {
      // given
      Helper.create('#el');

      // when
      var raty = new Raty(document.querySelector('#el'), { cancelButton: true, starType: 'i' }).init();

      // then
      expect(raty.element.querySelectorAll('.raty-cancel')).not.toHaveProperty('alt');
    });
  });
});
