describe('#cancel', function() {
  beforeEach(function() {
    $.raty.path = '../lib/images';

    this.el = Helper.create('#el');
  });

  afterEach(function() {
    Helper.clear();
  });

  it ('creates the element', function() {
    // given

    // when
    this.el.raty({ cancelButton: true });

    // then
    var cancel = this.el.children('.raty-cancel');

    expect(cancel).toHaveClass('raty-cancel');
    expect(cancel).toHaveAttr('title', 'Cancel this rating!');
    expect(cancel).toHaveAttr('alt', 'x');
    expect(cancel).toHaveAttr('src', '../lib/images/cancel-off.png');
  });

  it ('accepts data attribute', function() {
    // given
    this.el = Helper._append('div', { 'data-cancel': true });

    // when
    this.el.raty();

    // then
    expect(this.el.data('raty').opt.cancel).toEqual(true);
  });

  context('on mouseover', function() {
    it ('turns on', function() {
      // given
      this.el.raty({ cancelButton: true });

      var cancel = this.el.children('.raty-cancel');

      // when
      cancel.trigger('mouseover');

      // then
      expect(cancel).toHaveAttr('src', '../lib/images/cancel-on.png');
    });

    it ('keeps the :cancelClass', function() {
      // given
      this.el.raty({ cancelButton: true });

      var cancel = this.el.children('.raty-cancel');

      // when
      cancel.trigger('mouseover');

      // then
      expect(cancel).toHaveClass(this.el.data('raty').opt.cancelClass);
    });

    context('with stars on', function() {
      it ('turns off the stars', function() {
        // given
        this.el.raty({ score: 3, cancelButton: true });

        var
          cancel = this.el.children('.raty-cancel');
        var stars  = this.el.children('img:not(.raty-cancel)');

        // when
        cancel.trigger('mouseover');

        // then
        expect(stars).toHaveAttr('src', '../lib/images/star-off.png');
      });
    });

    context('with :starType', function() {
      it ('uses the given element', function() {
        // given
        this.el.raty({ cancelButton: true, starType: 'i' });

        var cancel = this.el.children('.raty-cancel');

        // when
        cancel.trigger('mouseover');

        // then
        expect(cancel[0].tagName).toEqual('I');
      });

      it ('keeps the :cancelClass', function() {
        // given
        this.el.raty({ cancelButton: true, starType: 'i' });

        var cancel = this.el.children('.raty-cancel');

        // when
        cancel.trigger('mouseover');

        // then
        expect(cancel).toHaveClass(this.el.data('raty').opt.cancelClass);
      });

      it ('sets class replacing dot to hiphen', function() {
        // given
        this.el.raty({ cancelButton: true, starType: 'i' });

        var cancel = this.el.children('.raty-cancel');

        // when
        cancel.trigger('mouseover');

        // then
        expect(cancel).toHaveClass('cancel-on-png');
      });

      it ('does not set "src" attribute', function() {
        // given
        this.el.raty({ cancelButton: true, starType: 'i' });

        var cancel = this.el.children('.raty-cancel');

        // when
        cancel.trigger('mouseover');

        // then
        expect(cancel).not.toHaveAttr('src');
      });

      it ('sets "data-alt" attribute', function() {
        // given
        this.el.raty({ cancelButton: true, starType: 'i' });

        var cancel = this.el.children('.raty-cancel');

        // when
        cancel.trigger('mouseover');

        // then
        expect(cancel).toHaveAttr('data-alt');
      });

      it ('does not set "alt" attribute', function() {
        // given
        this.el.raty({ cancelButton: true, starType: 'i' });

        var cancel = this.el.children('.raty-cancel');

        // when
        cancel.trigger('mouseover');

        // then
        expect(cancel).not.toHaveAttr('alt');
      });
    });
  });

  context('on mouseleave', function() {
    it ('turns off', function() {
      // given
      this.el.raty({ cancelButton: true });

      var cancel = this.el.children('.raty-cancel');

      // when
      cancel.trigger('mouseleave');

      // then
      expect(cancel).toHaveAttr('src', '../lib/images/cancel-off.png');
    });

    it ('keeps the :cancelClass', function() {
      // given
      this.el.raty({ cancelButton: true });

      var cancel = this.el.children('.raty-cancel');

      // when
      cancel.trigger('mouseleave');

      // then
      expect(cancel).toHaveClass(this.el.data('raty').opt.cancelClass);
    });

    context('with stars turned on', function() {
      it ('turns on the star again', function() {
        // given
        this.el.raty({ score: 5, cancelButton: true });

        var
          cancel = this.el.children('.raty-cancel');
        var stars  = this.el.children('img:not(.raty-cancel)');

        // when
        cancel.trigger('mouseleave');

        // then
        expect(stars).toHaveAttr('src', '../lib/images/star-on.png');
      });
    });
  });

  context('on click', function() {
    it ('cancel the rating', function() {
      // given
      this.el.raty({ cancelButton: true, score: 1 });

      var
        cancel = this.el.children('.raty-cancel');
      var input  = this.el.children('input');
      var stars  = this.el.children('img:not(.raty-cancel)');

      // when
      cancel.trigger('click').trigger('mouseleave');

      // then
      expect(stars).toHaveAttr('src', '../lib/images/star-off.png');
      expect(input).toHaveValue('');
    });
  });

  context('when starts :readOnly', function() {
    it ('starts hidden', function() {
      // given
      this.el.raty({ cancelButton: true, readOnly: true });

      var cancel = this.el.children('.raty-cancel');

      // when
      this.el.data('raty').readOnly(true);

      // then
      expect(cancel).toBeHidden();
    });

    context('on click', function() {
      it ('does not cancel the rating', function() {
        // given
        this.el.raty({ cancelButton: true, readOnly: true, score: 5 });

        var
          cancel = this.el.children('.raty-cancel');
        var input  = this.el.children('input');
        var stars  = this.el.children('img:not(.raty-cancel)');

        // when
        cancel.trigger('click').trigger('mouseleave');

        // then
        expect(stars).toHaveAttr('src', '../lib/images/star-on.png');
        expect(input).toHaveValue('5');
      });
    });
  });

  context('when become :readOnly', function() {
    it ('becomes hidden', function() {
      // given
      this.el.raty({ cancelButton: true });

      // when
      this.el.data('raty').readOnly(true);

      // then
      expect(this.el.children('.raty-cancel')).toBeHidden();
    });
  });

  context('with :starType', function() {
    it ('uses the given element', function() {
      // given

      // when
      this.el.raty({ cancelButton: true, starType: 'i' });

      // then
      expect(this.el.children('.raty-cancel')[0].tagName).toEqual('I');
    });

    it ('keeps the :cancelClass', function() {
      // given
      this.el.raty({ cancelButton: true, starType: 'i' });

      var cancel = this.el.children('.raty-cancel');

      // when
      cancel.trigger('mouseleave');

      // then
      expect(cancel).toHaveClass(this.el.data('raty').opt.cancelClass);
    });

    it ('sets class replacing dot to hiphen', function() {
      // given

      // when
      this.el.raty({ cancelButton: true, starType: 'i' });

      // then
      expect(this.el.children('.raty-cancel')).toHaveClass('cancel-off-png');
    });

    it ('does not set "src" attribute', function() {
      // given

      // when
      this.el.raty({ cancelButton: true, starType: 'i' });

      // then
      expect(this.el.children('.raty-cancel')).not.toHaveProp('src');
    });

    it ('sets "data-alt" attribute', function() {
      // given

      // when
      this.el.raty({ cancelButton: true, starType: 'i' });

      // then
      expect(this.el.children('.raty-cancel')).toHaveAttr('data-alt', 'x');
    });

    it ('does not set "alt" attribute', function() {
      // given

      // when
      this.el.raty({ cancelButton: true, starType: 'i' });

      // then
      expect(this.el.children('.raty-cancel')).not.toHaveProp('alt');
    });
  });
});
