describe('#cancel', function () {
  xit('creates the element', function () {
    // given
    Helper.create('#el');

    // when
    var raty = new Raty('#el', { cancelButton: true }).init();

    // then
    var cancel = raty.self.querySelector('.raty-cancel');

    expect(cancel.classList.contains('raty-cancel')).toEqual(true);
    expect(cancel.title).toEqual('Cancel this rating!');
    expect(cancel.alt).toEqual('x');
    expect(Helper.extension(cancel.src)).toEqual('cancel-off.png');
  });

  xit('accepts data attribute', function () {
    // given
    Helper._append('div', { 'data-cancel': true });

    // when
    var raty = new Raty('[data-cancel]').init();

    // then
    expect(raty.opt.cancel).toEqual(true);
  });

  context('on mouseover', function () {
    xit('turns on', function () {
      // given
      Helper.create('#el');

      var raty = new Raty('#el', { cancelButton: true }).init();
      var cancel = raty.self.querySelector('.raty-cancel');

      // when
      Helper.trigger(cancel, 'mouseover');

      // then
      expect(Helper.extension(cancel.src)).toEqual('cancel-on.png');
    });

    xit('keeps the :cancelClass', function () {
      // given
      Helper.create('#el');

      var raty = new Raty('#el', { cancelButton: true }).init();

      var cancel = raty.self.querySelector('.raty-cancel');

      // when
      Helper.trigger(cancel, 'mouseover');

      // then
      expect(cancel).toHaveClass(raty.opt.cancelClass);
    });

    context('with stars on', function () {
      xit('turns off the stars', function () {
        // given
        Helper.create('#el');

        var raty = new Raty('#el', { score: 3, cancelButton: true }).init();

        var cancel = raty.self.querySelector('.raty-cancel');
        var stars = raty.self.querySelector('img:not(.raty-cancel)');

        // when
        Helper.trigger(cancel, 'mouseover');

        // then
        expect(Helper.extension(stars.src)).toEqual('star-off.png');
      });
    });

    context('with :starType', function () {
      xit('uses the given element', function () {
        // given
        Helper.create('#el');

        var raty = new Raty('#el', { cancelButton: true, starType: 'i' }).init();

        var cancel = raty.self.querySelector('.raty-cancel');

        // when
        Helper.trigger(cancel, 'mouseover');

        // then
        expect(cancel[0].tagName).toEqual('I');
      });

      xit('keeps the :cancelClass', function () {
        // given
        Helper.create('#el');

        var raty = new Raty('#el', { cancelButton: true, starType: 'i' }).init();

        var cancel = raty.self.querySelector('.raty-cancel');

        // when
        Helper.trigger(cancel, 'mouseover');

        // then
        expect(cancel).toHaveClass(raty.opt.cancelClass);
      });

      xit('sets class replacing dot to hiphen', function () {
        // given
        Helper.create('#el');

        var raty = new Raty('#el', { cancelButton: true, starType: 'i' }).init();

        var cancel = raty.self.querySelector('.raty-cancel');

        // when
        Helper.trigger(cancel, 'mouseover');

        // then
        expect(cancel).toHaveClass('cancel-on-png');
      });

      xit('does not set "src" attribute', function () {
        // given
        Helper.create('#el');

        var raty = new Raty('#el', { cancelButton: true, starType: 'i' }).init();

        var cancel = raty.self.querySelector('.raty-cancel');

        // when
        Helper.trigger(cancel, 'mouseover');

        // then
        expect(cancel).not.toHaveAttr('src');
      });

      xit('sets "data-alt" attribute', function () {
        // given
        Helper.create('#el');

        var raty = new Raty('#el', { cancelButton: true, starType: 'i' }).init();

        var cancel = raty.self.querySelector('.raty-cancel');

        // when
        Helper.trigger(cancel, 'mouseover');

        // then
        expect(cancel).toHaveAttr('data-alt');
      });

      xit('does not set "alt" attribute', function () {
        // given
        Helper.create('#el');

        var raty = new Raty('#el', { cancelButton: true, starType: 'i' }).init();

        var cancel = raty.self.querySelector('.raty-cancel');

        // when
        Helper.trigger(cancel, 'mouseover');

        // then
        expect(cancel).not.toHaveAttr('alt');
      });
    });
  });

  context('on mouseleave', function () {
    xit('turns off', function () {
      // given
      Helper.create('#el');

      var raty = new Raty('#el', { cancelButton: true }).init();

      var cancel = raty.self.querySelector('.raty-cancel');

      // when
      cancel.trigger('mouseleave');

      // then
      expect(Helper.extension(cancel.src)).toEqual('cancel-off.png');
    });

    xit('keeps the :cancelClass', function () {
      // given
      Helper.create('#el');

      var raty = new Raty('#el', { cancelButton: true }).init();

      var cancel = raty.self.querySelector('.raty-cancel');

      // when
      cancel.trigger('mouseleave');

      // then
      expect(cancel).toHaveClass(raty.opt.cancelClass);
    });

    context('with stars turned on', function () {
      xit('turns on the star again', function () {
        // given
        Helper.create('#el');

        var raty = new Raty('#el', { score: 5, cancelButton: true }).init();

        var cancel = raty.self.querySelector('.raty-cancel');
        var stars = raty.self.querySelector('img:not(.raty-cancel)');

        // when
        cancel.trigger('mouseleave');

        // then
        expect(Helper.extension(stars.src)).toEqual('star-on.png');
      });
    });
  });

  context('on click', function () {
    xit('cancel the rating', function () {
      // given
      Helper.create('#el');

      var raty = new Raty('#el', { cancelButton: true, score: 1 }).init();

      var cancel = raty.self.querySelector('.raty-cancel');
      var input = raty.self.querySelector('input');
      var stars = raty.self.querySelector('img:not(.raty-cancel)');

      // when
      cancel.trigger('click').trigger('mouseleave');

      // then
      expect(Helper.extension(stars.src)).toEqual('star-off.png');
      expect(input.value).toEqual('');
    });
  });

  context('when starts :readOnly', function () {
    xit('starts hidden', function () {
      // given
      Helper.create('#el');

      var raty = new Raty('#el', { cancelButton: true, readOnly: true }).init();

      var cancel = raty.self.querySelector('.raty-cancel');

      // when
      raty.readOnly(true);

      // then
      expect(cancel).toBeHidden();
    });

    context('on click', function () {
      xit('does not cancel the rating', function () {
        // given
        Helper.create('#el');

        var raty = new Raty('#el', { cancelButton: true, readOnly: true, score: 5 }).init();

        var cancel = raty.self.querySelector('.raty-cancel');
        var input = raty.self.querySelector('input');
        var stars = raty.self.querySelector('img:not(.raty-cancel)');

        // when
        cancel.trigger('click').trigger('mouseleave');

        // then
        expect(Helper.extension(stars.src)).toEqual('star-on.png');
        expect(input.value).toEqual('5');
      });
    });
  });

  context('when become :readOnly', function () {
    xit('becomes hidden', function () {
      // given
      Helper.create('#el');

      var raty = new Raty('#el', { cancelButton: true }).init();

      // when
      raty.readOnly(true);

      // then
      expect(raty.self.querySelectorAll('.raty-cancel')).toBeHidden();
    });
  });

  context('with :starType', function () {
    xit('uses the given element', function () {
      // given
      Helper.create('#el');

      // when
      var raty = new Raty('#el', { cancelButton: true, starType: 'i' }).init();

      // then
      expect(raty.self.querySelectorAll('.raty-cancel')[0].tagName).toEqual('I');
    });

    xit('keeps the :cancelClass', function () {
      // given
      Helper.create('#el');

      var raty = new Raty('#el', { cancelButton: true, starType: 'i' }).init();

      var cancel = raty.self.querySelector('.raty-cancel');

      // when
      cancel.trigger('mouseleave');

      // then
      expect(cancel).toHaveClass(raty.opt.cancelClass);
    });

    xit('sets class replacing dot to hiphen', function () {
      // given
      Helper.create('#el');

      // when
      var raty = new Raty('#el', { cancelButton: true, starType: 'i' }).init();

      // then
      expect(raty.self.querySelectorAll('.raty-cancel')).toHaveClass('cancel-off-png');
    });

    xit('does not set "src" attribute', function () {
      // given
      Helper.create('#el');

      // when
      var raty = new Raty('#el', { cancelButton: true, starType: 'i' }).init();

      // then
      expect(raty.self.querySelectorAll('.raty-cancel')).not.toHaveProp('src');
    });

    xit('sets "data-alt" attribute', function () {
      // given
      Helper.create('#el');

      // when
      var raty = new Raty('#el', { cancelButton: true, starType: 'i' }).init();

      // then
      expect(raty.self.querySelectorAll('.raty-cancel').data - alt).toEqual('x');
    });

    xit('does not set "alt" attribute', function () {
      // given
      Helper.create('#el');

      // when
      var raty = new Raty('#el', { cancelButton: true, starType: 'i' }).init();

      // then
      expect(raty.self.querySelectorAll('.raty-cancel')).not.toHaveProp('alt');
    });
  });
});
