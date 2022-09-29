xdescribe('#cancel', function () {
  it('creates the element', function () {
    // given
    this.el = Helper.create('#el');

    // when
    var raty = new Raty('#el', { cancelButton: true }).init();

    // then
    var cancel = raty.self.querySelector('.raty-cancel');

    expect(cancel.classList.contains('raty-cancel')).toEqual(true);
    expect(cancel.title).toEqual('Cancel this rating!');
    expect(cancel.alt).toEqual('x');
    expect(Helper.extension(cancel.src)).toEqual('cancel-off.png');
  });

  it('accepts data attribute', function () {
    // given
    Helper._append('div', { 'data-cancel': true });

    // when
    var raty = new Raty('[data-cancel]').init();

    // then
    expect(raty.opt.cancel).toEqual(true);
  });

  context('on mouseover', function () {
    it('turns on', function () {
      // given
      this.el = Helper.create('#el');

      var raty = new Raty('#el', { cancelButton: true }).init();
      var cancel = raty.self.querySelector('.raty-cancel');

      // when
      Helper.trigger(cancel, 'mouseover');

      // then
      expect(Helper.extension(cancel.src)).toEqual('cancel-on.png');
    });

    it('keeps the :cancelClass', function () {
      // given
      this.el = Helper.create('#el');

      var raty = new Raty('#el', { cancelButton: true }).init();

      var cancel = raty.self.querySelector('.raty-cancel');

      // when
      Helper.trigger(cancel, 'mouseover');

      // then
      expect(cancel).toHaveClass(raty.opt.cancelClass);
    });

    context('with stars on', function () {
      it('turns off the stars', function () {
        // given
        this.el = Helper.create('#el');

        var raty = new Raty('#el', { score: 3, cancelButton: true }).init();

        var cancel = raty.self.querySelector('.raty-cancel');
        var stars = raty.self.querySelectorAll('img:not(.raty-cancel)');

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
      it('uses the given element', function () {
        // given
        this.el = Helper.create('#el');

        var raty = new Raty('#el', { cancelButton: true, starType: 'i' }).init();
        var cancel = raty.self.querySelector('.raty-cancel');

        // when
        Helper.trigger(cancel, 'mouseover');

        // then
        expect(cancel.tagName).toEqual('I');
      });

      it('keeps the :cancelClass', function () {
        // given
        this.el = Helper.create('#el');

        var raty = new Raty('#el', { cancelButton: true, starType: 'i' }).init();
        var cancel = raty.self.querySelector('.raty-cancel');

        // when
        Helper.trigger(cancel, 'mouseover');

        // then
        expect(cancel).toHaveClass(raty.opt.cancelClass);
      });

      it('sets class replacing dot to hiphen', function () {
        // given
        this.el = Helper.create('#el');

        var raty = new Raty('#el', { cancelButton: true, starType: 'i' }).init();
        var cancel = raty.self.querySelector('.raty-cancel');

        // when
        Helper.trigger(cancel, 'mouseover');

        // then
        expect(cancel).toHaveClass('cancel-on-png');
      });

      it('does not set "src" attribute', function () {
        // given
        this.el = Helper.create('#el');

        var raty = new Raty('#el', { cancelButton: true, starType: 'i' }).init();
        var cancel = raty.self.querySelector('.raty-cancel');

        // when
        Helper.trigger(cancel, 'mouseover');

        // then
        expect(cancel).not.toHaveAttr('src');
      });

      it('sets "data-alt" attribute', function () {
        // given
        this.el = Helper.create('#el');

        var raty = new Raty('#el', { cancelButton: true, starType: 'i' }).init();
        var cancel = raty.self.querySelector('.raty-cancel');

        // when
        Helper.trigger(cancel, 'mouseover');

        // then
        expect(cancel).toHaveAttr('data-alt');
      });

      it('does not set "alt" attribute', function () {
        // given
        this.el = Helper.create('#el');

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
    it('turns off', function () {
      // given
      this.el = Helper.create('#el');

      var raty = new Raty('#el', { cancelButton: true }).init();
      var cancel = raty.self.querySelector('.raty-cancel');

      // when
      Helper.trigger(raty.self, 'mouseleave');

      // then
      expect(Helper.extension(cancel.src)).toEqual('cancel-off.png');
    });

    it('keeps the :cancelClass', function () {
      // given
      this.el = Helper.create('#el');

      var raty = new Raty('#el', { cancelButton: true }).init();
      var cancel = raty.self.querySelector('.raty-cancel');

      // when
      Helper.trigger(raty.self, 'mouseleave');

      // then
      expect(cancel).toHaveClass(raty.opt.cancelClass);
    });

    context('with stars turned on', function () {
      it('turns on the star again', function () {
        // given
        this.el = Helper.create('#el');

        var raty = new Raty('#el', { score: 5, cancelButton: true }).init();
        var cancel = raty.self.querySelector('.raty-cancel');
        var stars = raty.self.querySelector('img:not(.raty-cancel)');

        // when
        Helper.trigger(raty.self, 'mouseleave');

        // then
        expect(Helper.extension(stars.src)).toEqual('star-on.png');
      });
    });
  });

  context('on click', function () {
    it('cancel the rating', function () {
      // given
      this.el = Helper.create('#el');

      var raty = new Raty('#el', { cancelButton: true, score: 1 }).init();
      var cancel = raty.self.querySelector('.raty-cancel');
      var input = raty.self.querySelector('input');
      var stars = raty.self.querySelectorAll('img:not(.raty-cancel)');

      // when
      Helper.trigger(cancel, 'click');
      Helper.trigger(raty.self, 'mouseleave');

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
    it('starts hidden', function () {
      // given
      this.el = Helper.create('#el');

      var raty = new Raty('#el', { cancelButton: true, readOnly: true }).init();
      var cancel = raty.self.querySelector('.raty-cancel');

      // when
      raty.readOnly(true);

      // then
      expect(cancel).toBeHidden();
    });

    context('on click', function () {
      it('does not cancel the rating', function () {
        // given
        this.el = Helper.create('#el');

        var raty = new Raty('#el', { cancelButton: true, readOnly: true, score: 5 }).init();
        var cancel = raty.self.querySelector('.raty-cancel');
        var input = raty.self.querySelector('input');
        var stars = raty.self.querySelector('img:not(.raty-cancel)');

        // when
        Helper.trigger(cancel, 'click');
        Helper.trigger(raty.self, 'mouseleave');

        // then
        expect(Helper.extension(stars.src)).toEqual('star-on.png');
        expect(input.value).toEqual('5');
      });
    });
  });

  context('when become :readOnly', function () {
    it('becomes hidden', function () {
      // given
      this.el = Helper.create('#el');

      var raty = new Raty('#el', { cancelButton: true }).init();

      // when
      raty.readOnly(true);

      // then
      expect(raty.self.querySelectorAll('.raty-cancel')).toBeHidden();
    });
  });

  context('with :starType', function () {
    it('uses the given element', function () {
      // given
      this.el = Helper.create('#el');

      // when
      var raty = new Raty('#el', { cancelButton: true, starType: 'i' }).init();

      // then
      expect(raty.self.querySelectorAll('.raty-cancel')[0].tagName).toEqual('I');
    });

    it('keeps the :cancelClass', function () {
      // given
      this.el = Helper.create('#el');

      var raty = new Raty('#el', { cancelButton: true, starType: 'i' }).init();
      var cancel = raty.self.querySelector('.raty-cancel');

      // when
      Helper.trigger(raty.self, 'mouseleave');

      // then
      expect(cancel).toHaveClass(raty.opt.cancelClass);
    });

    it('sets class replacing dot to hiphen', function () {
      // given
      this.el = Helper.create('#el');

      // when
      var raty = new Raty('#el', { cancelButton: true, starType: 'i' }).init();

      // then
      expect(raty.self.querySelectorAll('.raty-cancel')).toHaveClass('cancel-off-png');
    });

    it('does not set "src" attribute', function () {
      // given
      this.el = Helper.create('#el');

      // when
      var raty = new Raty('#el', { cancelButton: true, starType: 'i' }).init();

      // then
      expect(raty.self.querySelectorAll('.raty-cancel')).not.toHaveProp('src');
    });

    it('sets "data-alt" attribute', function () {
      // given
      this.el = Helper.create('#el');

      // when
      var raty = new Raty('#el', { cancelButton: true, starType: 'i' }).init();

      // then
      expect(raty.self.querySelector('.raty-cancel').getAttribute('data-alt')).toEqual('x');
    });

    it('does not set "alt" attribute', function () {
      // given
      this.el = Helper.create('#el');

      // when
      var raty = new Raty('#el', { cancelButton: true, starType: 'i' }).init();

      // then
      expect(raty.self.querySelectorAll('.raty-cancel')).not.toHaveProp('alt');
    });
  });
});
