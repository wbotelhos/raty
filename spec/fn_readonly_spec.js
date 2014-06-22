describe('#fn readOnly', function() {
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
      this.el.raty();

      // when
      this.el.raty('readOnly', true);

      // then
      expect(this.el.children('input')).toHaveAttr('readonly', 'readonly');
    });

    it ('removes the pointer cursor', function() {
      // given
      this.el.raty();

      // when
      this.el.raty('readOnly', true);

      // then
      expect(this.el).not.toHaveCss({ cursor: 'pointer' });
      expect(this.el).not.toHaveCss({ cursor: 'default' });
    });

    context('without rating', function() {
      it ('Applies the :noRatedMsg on stars', function() {
        // given
        this.el.raty();

        // when
        this.el.raty('readOnly', true);

        // then
        expect(this.el.children('img')[0].title).toEqual(this.el[0].opt.noRatedMsg);
      });
    });

    it ('does not trigger mouseover', function() {
      // given
      this.el.raty()

      var stars = this.el.children('img');

      this.el.raty('readOnly', true);

      // when
      stars.first().trigger('mouseover');

      // then
      expect(stars).toHaveAttr('src', '../lib/images/star-off.png');
    });

    it ('does not trigger click', function() {
      // given
      this.el.raty();

      var stars = this.el.children('img');

      this.el.raty('readOnly', true);

      // when
      stars.first().trigger('click');

      // then
      expect(stars).toHaveAttr('src', '../lib/images/star-off.png');
      expect(this.el.children('input').val()).toEqual('');
    });

    context('with :cancel', function() {
      it ('hides the button', function() {
        // given
        this.el.raty({ cancel: true });

        // when
        this.el.raty('readOnly', true);

        // then
        expect(this.el.children('.raty-cancel')).toBeHidden();
      });
    });

    context('with external bind on wrapper', function() {
      it ('is kept', function() {
        // given
        this.el.on('click', function() {
          $(this).data('trigged', true);
        }).raty();

        this.el.raty('readOnly', true);

        // when
        this.el.trigger('click');

        // then
        expect(this.el.data('trigged')).toBeTruthy();
      });
    });

    context('with external bind on stars', function() {
      it ('keeps it', function() {
        // given
        this.el.raty();

        var
          star = this.el.children('img'),
          that = this;

        star.on('click', function() {
          that.el.data('trigged', true);
        });

        this.el.raty('readOnly', true);

        // when
        star.trigger('click');

        // then
        expect(this.el.data('trigged')).toBeTruthy();
      });
    });

    context('with :halfShow', function() {
      context('as *true', function() {
        context('with :score as integer', function() {
          it ('applies the score hint', function() {
            // given
            this.el.raty({
              halfShow : true,
              hints    : [['half', 'one']],
              score    : 1
            });

            // when
            this.el.raty('readOnly', true);

            // then
            expect(this.el.children('img')[0].title).toEqual('one');
          });
        });

        context('with :score as float', function() {
          it ('applies the score hint', function() {
            // given
            this.el.raty({
              halfShow : true,
              hints    : [['half', 'one']],
              score    : 0.5
            });

            // when
            this.el.raty('readOnly', true);

            // then
            expect(this.el.children('img')[0].title).toEqual('half');
          });
        });
      });
    });

    context('with :half', function() {
      context('as *true', function() {
        context('with :score as integer', function() {
          it ('applies the score hint', function() {
            // given
            this.el.raty({
              half  : true,
              hints : [['half', 'one']],
              score : 1
            });

            // when
            this.el.raty('readOnly', true);

            // then
            expect(this.el.children('img')[0].title).toEqual('one');
          });
        });

        context('with :score as float', function() {
          it ('applies the score hint', function() {
            // given
            this.el.raty({
              half  : true,
              hints : [['half', 'one']],
              score : 0.5
            });

            // when
            this.el.raty('readOnly', true);

            // then
            expect(this.el.children('img')[0].title).toEqual('half');
          });
        });
      });
    });

    context('with :precision', function() {
      context('as *true', function() {
        context('and :targetType', function() {
          context('as *hint', function() {
            context('with :score as integer', function() {
              it ('applies the 10 - 1 decimal hint', function() {
                // given
                this.el.raty({
                  hints      : [['bad 1', 'bad 2', 'bad 3', 'bad 4', 'bad 5', 'bad 6', 'bad 7', 'bad 8', 'bad 9', 'bad']],
                  precision  : true,
                  score      : 1,
                  targetType : 'hint'
                });

                var stars = this.el.children('img');

                // when
                this.el.raty('readOnly', true);

                // then
                expect(stars[0].title).toEqual('bad');
                expect(stars[1].title).toEqual('bad');
                expect(stars[2].title).toEqual('bad');
                expect(stars[3].title).toEqual('bad');
                expect(stars[4].title).toEqual('bad');
              });
            });

            context('with :score as float', function() {
              it ('applies the 1 - 1 decimal hint', function() {
                // given
                this.el.raty({
                  hints      : [['bad 1', 'bad 2', 'bad 3', 'bad 4', 'bad 5', 'bad 6', 'bad 7', 'bad 8', 'bad 9', 'bad']],
                  precision  : true,
                  score      : 0.1,
                  targetType : 'hint'
                });

                var stars = this.el.children('img');

                // when
                this.el.raty('readOnly', true);

                // then
                expect(stars[0].title).toEqual('bad 1');
                expect(stars[1].title).toEqual('bad 1');
                expect(stars[2].title).toEqual('bad 1');
                expect(stars[3].title).toEqual('bad 1');
                expect(stars[4].title).toEqual('bad 1');
              });
            });
          });

          context('as *score', function() {
            context('with :score as integer', function() {
              it ('applies the score', function() {
                // given
                this.el.raty({
                  hints      : [['bad 1', 'bad 2', 'bad 3', 'bad 4', 'bad 5', 'bad 6', 'bad 7', 'bad 8', 'bad 9', 'bad']],
                  precision  : true,
                  score      : 1,
                  targetType : 'score'
                });

                var stars = this.el.children('img');

                // when
                this.el.raty('readOnly', true);

                // then
                expect(stars[0].title).toEqual('bad');
                expect(stars[1].title).toEqual('bad');
                expect(stars[2].title).toEqual('bad');
                expect(stars[3].title).toEqual('bad');
                expect(stars[4].title).toEqual('bad');
              });
            });

            context('with :score as float', function() {
              it ('applies the score', function() {
                // given
                this.el.raty({
                  hints      : [['bad 1', 'bad 2', 'bad 3', 'bad 4', 'bad 5', 'bad 6', 'bad 7', 'bad 8', 'bad 9', 'bad']],
                  precision  : true,
                  score      : 0.1,
                  targetType : 'score'
                });

                var stars = this.el.children('img');

                // when
                this.el.raty('readOnly', true);

                // then
                expect(stars[0].title).toEqual('bad 1');
                expect(stars[1].title).toEqual('bad 1');
                expect(stars[2].title).toEqual('bad 1');
                expect(stars[3].title).toEqual('bad 1');
                expect(stars[4].title).toEqual('bad 1');
              });
            });
          });
        });
      });
    });
  });

  context('on false', function() {
    it ('removes the :readOnly of the score', function() {
      // given
      this.el.raty({ readOnly: true })

      var input = this.el.children('input');

      // when
      this.el.raty('readOnly', false);

      // then
      expect(input).not.toHaveAttr('readonly', 'readonly');
      expect(input).not.toHaveProp('readonly', 'readonly');
    });

    it ('applies the pointer cursor on wrapper', function() {
      // given
      this.el.raty({ readOnly: true });

      // when
      this.el.raty('readOnly', false);

      // then
      expect(this.el).toHaveCss({ cursor: 'pointer' });
    });

    it ('Removes the :noRatedMsg from stars', function() {
      // given
      this.el.raty({ readOnly: true });

      var stars = this.el.children('img');

      // when
      this.el.raty('readOnly', false);

      // then
      expect(stars[0].title).toEqual('bad');
      expect(stars[1].title).toEqual('poor');
      expect(stars[2].title).toEqual('regular');
      expect(stars[3].title).toEqual('good');
      expect(stars[4].title).toEqual('gorgeous');
    });

    it ('triggers mouseover', function() {
      // given
      this.el.raty({ readOnly: true });

      var stars = this.el.children('img');

      this.el.raty('readOnly', false);

      // when
      stars.first().trigger('mouseover');

      // then
      expect(stars.first()).toHaveAttr('src', '../lib/images/star-on.png');
    });

    it ('triggers click', function() {
      // given
      this.el.raty({ readOnly: true });

      var star = this.el.children('img:first');

      this.el.raty('readOnly', false);

      // when
      star.trigger('click');

      // then
      expect(this.el.children('input')).toHaveValue('1');
    });

    context('with :score', function() {
      it ('removes the score title off the stars', function() {
        // given
        this.el.raty({ readOnly: true, score: 3 });

        var stars = this.el.children('img');

        // when
        this.el.raty('readOnly', false);

        // then
        expect(stars[0].title).toEqual('bad');
        expect(stars[1].title).toEqual('poor');
        expect(stars[2].title).toEqual('regular');
        expect(stars[3].title).toEqual('good');
        expect(stars[4].title).toEqual('gorgeous');
      });
    });

    context('with :cancel', function() {
      it ('shows the button', function(done) {
        // given
        var that = this;

        that.el.raty({ cancel: true, readOnly: true });

        setTimeout(function() {
          // when
          that.el.raty('readOnly', false);

          // then
          expect(that.el.children('.raty-cancel')).toBeVisible();

          done();
        }, 100);
      });

      it ('rebinds the mouseover', function() {
        // given
        this.el.raty({ readOnly: true, cancel: true });

        var
          cancel = this.el.children('.raty-cancel'),
          stars  = this.el.children('img:not(.raty-cancel)');

        this.el.raty('readOnly', false);

        // when
        cancel.trigger('mouseover');

        // then
        expect(cancel).toHaveAttr('src', '../lib/images/cancel-on.png');
        expect(stars).toHaveAttr('src', '../lib/images/star-off.png');
      });

      it ('rebinds the click', function() {
        // given
        this.el.raty({ cancel: true, readOnly: true, score: 5 });

        var
          cancel = this.el.children('.raty-cancel'),
          stars  = this.el.children('img:not(.raty-cancel)');

        this.el.raty('readOnly', false);

        // when
        cancel.trigger('click').trigger('mouseout');

        // then
        expect(stars).toHaveAttr('src', '../lib/images/star-off.png');
      });
    });
  });
});
