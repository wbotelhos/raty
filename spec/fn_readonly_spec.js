describe('#readOnly', function() {
  beforeEach(function() {
    $.fn.raty.defaults.path = '../lib/images';

    this.el = Helper.create('#el');
  });

  afterEach(function() {
    Helper.clear();
  });

  context('on true', function() {
    it ('sets score as readonly', function() {
      // given
      var self = this.el.raty();

      // when
      self.raty('readOnly', true);

      // then
      expect(self.children('input')).toHaveAttr('readonly', 'readonly');
    });

    it ('removes the pointer cursor', function() {
      // given
      var self = this.el.raty();

      // when
      self.raty('readOnly', true);

      // then
      expect(self).not.toHaveCss({ cursor: 'pointer' });
      expect(self).not.toHaveCss({ cursor: 'default' });
    });

    it ('Applies the :noRatedMsg on stars', function() {
      // given
      var self = this.el.raty();

      // when
      self.raty('readOnly', true);

      // then
      expect(self.children('img')).toHaveAttr('title', self[0].opt.noRatedMsg);
    });

    it ('does not trigger mouseover', function() {
      // given
      var self  = this.el.raty(),
          stars = self.children('img');

      self.raty('readOnly', true);

      // when
      stars.eq(0).trigger('mouseover');

      // then
      expect(stars).toHaveAttr('src', '../lib/images/star-off.png');
    });

    it ('does not trigger click', function() {
      // given
      var self = this.el.raty(),
          stars = self.children('img');

      self.raty('readOnly', true);

      // when
      stars.eq(0).trigger('click');

      // then
      expect(stars).toHaveAttr('src', '../lib/images/star-off.png');
      expect(self.children('input').val()).toEqual('');
    });

    context('with :score', function() {
      it ('applies the score value on stars title', function() {
        // given
        var self = this.el.raty({ score: 1 });

        // when
        self.raty('readOnly', true);

        // then
        expect(self.children('img')).toHaveAttr('title', self[0].opt.hints[0]);
      });
    });

    context('with :cancel', function() {
      it ('hides the button', function() {
        // given
        var self = this.el.raty({ cancel: true });

        // when
        self.raty('readOnly', true);

        // then
        expect(self.children('.raty-cancel')).toBeHidden();
      });
    });

    context('with external bind on wrapper', function() {
      it ('is kept', function() {
        // given
        var self = this.el.on('click', function() {
          $(this).data('trigged', true);
        }).raty();

        self.raty('readOnly', true);

        // when
        self.trigger('click');

        // then
        expect(self.data('trigged')).toBeTruthy();
      });
    });

    context('with external bind on stars', function() {
      it ('keeps it', function() {
        // given
        var self = this.el.raty(),
            star = self.children('img').first();

        star.on('click', function() {
          self.data('trigged', true);
        });

        self.raty('readOnly', true);

        // when
        star.trigger('click');

        // then
        expect(self.data('trigged')).toBeTruthy();
      });
    });
  });

  context('on false', function() {
    it ('removes the :readOnly of the score', function() {
      // given
      var self  = this.el.raty({ readOnly: true }),
          input = self.children('input');

      // when
      self.raty('readOnly', false);

      // then
      expect(input).not.toHaveAttr('readonly', 'readonly');
      expect(input).not.toHaveProp('readonly', 'readonly');
    });

    it ('applies the pointer cursor on wrapper', function() {
      // given
      var self = this.el.raty({ readOnly: true });

      // when
      self.raty('readOnly', false);

      // then
      expect(self).toHaveCss({ cursor: 'pointer' });
    });

    it ('Removes the :noRatedMsg from stars', function() {
      // given
      var self  = this.el.raty({ readOnly: true }),
          stars = self.children('img');

      // when
      self.raty('readOnly', false);

      // then
      expect(stars[0]).toHaveAttr('title', 'bad');
      expect(stars[1]).toHaveAttr('title', 'poor');
      expect(stars[2]).toHaveAttr('title', 'regular');
      expect(stars[3]).toHaveAttr('title', 'good');
      expect(stars[4]).toHaveAttr('title', 'gorgeous');
    });

    it ('triggers mouseover', function() {
      // given
      var self  = this.el.raty({ readOnly: true }),
          stars = self.children('img');

      self.raty('readOnly', false);

      // when
      stars.eq(0).trigger('mouseover');

      // then
      expect(stars.eq(0)).toHaveAttr('src', '../lib/images/star-on.png');
    });

    it ('triggers click', function() {
      // given
      var self = this.el.raty({ readOnly: true }),
          star = self.children('img:first');

      self.raty('readOnly', false);

      // when
      star.trigger('click');

      // then
      expect(self.children('input')).toHaveValue('1');
    });

    context('with :score', function() {
      it ('removes the score title off the stars', function() {
        // given
        var self  = this.el.raty({ readOnly: true, score: 3 }),
            stars = self.children('img');

        // when
        self.raty('readOnly', false);

        // then
        expect(stars[0]).toHaveAttr('title', 'bad');
        expect(stars[1]).toHaveAttr('title', 'poor');
        expect(stars[2]).toHaveAttr('title', 'regular');
        expect(stars[3]).toHaveAttr('title', 'good');
        expect(stars[4]).toHaveAttr('title', 'gorgeous');
      });
    });

    context('with :cancel', function() {
      xit ('shows the button', function() {
        // given
        var self = $('#el').raty({ cancel: true, readOnly: true });

        // when
        self.raty('readOnly', false);

        // then
        expect(self.children('.raty-cancel')).toBeVisible();
      });

      it ('rebinds the mouseover', function() {
        // given
        var self   = this.el.raty({ readOnly: true, cancel: true }),
            cancel = self.children('.raty-cancel'),
            stars  = self.children('img:not(.raty-cancel)');

        self.raty('readOnly', false);

        // when
        cancel.trigger('mouseover');

        // then
        expect(cancel).toHaveAttr('src', '../lib/images/cancel-on.png');
        expect(stars).toHaveAttr('src', '../lib/images/star-off.png');
      });

      it ('rebinds the click', function() {
        // given
        var self   = this.el.raty({ cancel: true, readOnly: true, score: 5 }),
            cancel = self.children('.raty-cancel'),
            stars  = self.children('img:not(.raty-cancel)');

        self.raty('readOnly', false);

        // when
        cancel.trigger('click').trigger('mouseout');

        // then
        expect(stars).toHaveAttr('src', '../lib/images/star-off.png');
      });
    });
  });
});
