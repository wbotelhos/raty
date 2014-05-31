describe('Integration', function() {
  beforeEach(function() {
    build();
  });

  afterEach(function() {
    clear();
  });

  describe('common features', function() {
    beforeEach(function() {
      $.fn.raty.defaults.path = '../lib/images';
    });

    it('is chainable', function() {
      // given
      var self = $('#element');

      // when
      var ref = self.raty();

      // then
      expect(ref).toBe(self);
    });
  });

  describe('stars', function() {
    beforeEach(function() {
      $.fn.raty.defaults.path = '../lib/images';
    });

    it('starts all off', function() {
      // given
      var self = $('#element');

      // when
      self.raty();

      // then
      expect(self.children('img')).toHaveAttr('src', '../lib/images/star-off.png');
    });

    context('on click', function() {
      it('changes the score', function() {
        // given
        var self  = $('#element').raty(),
            stars = self.children('img');

        // when
        stars.last().trigger('click');

        // then
        expect(self.children('input')).toHaveValue('5');
      });
    });

    context('on mouseover', function() {
      it('turns on the stars', function() {
        // given
        var self  = $('#element').raty(),
            stars = self.children('img');

        // when
        stars.last().trigger('mouseover');

        // then
        expect(stars).toHaveAttr('src', '../lib/images/star-on.png');
      });

      context('and mouseout', function() {
        it('turns off all stars', function() {
          // given
          var self  = $('#element').raty(),
              stars = self.children('img');

          // when
          stars.last().trigger('mouseover').trigger('mouseout');

          // then
          expect(stars).toHaveAttr('src', '../lib/images/star-off.png');
        });
      });

      context('and click', function() {
        it('changes the score', function() {
          // given
          var self  = $('#element').raty(),
              stars = self.children('img');

          // when
          stars.last().trigger('mouseover').trigger('click');

          // then
          expect(self.children('input')).toHaveValue('5');
        });

        context('and mouseout', function() {
          it('keeps the stars on', function() {
            // given
            var self  = $('#element').raty(),
                stars = self.children('img');

            // when
            stars.last().trigger('mouseover').trigger('click').trigger('mouseout');

            // then
            expect(stars).toHaveAttr('src', '../lib/images/star-on.png');
          });
        });
      });
    });
  });

  describe('options', function() {
    beforeEach(function() {
      $.fn.raty.defaults.path = '../lib/images';
    });

    describe('#numberMax', function() {
      it('limits the max of "number" option', function() {
        // given
        var self = $('#element');

        // when
        self.raty({ number: 2, numberMax: 1 });

        // then
        expect(self[0].opt.number).toEqual(1);
      });

      it('limits the min of "number" option', function() {
        // given
        var self = $('#element');

        // when
        self.raty({ number: -1 });

        // then
        expect(self[0].opt.number).toEqual(0);
      });
    });

    describe('#starOff', function() {
      it('sets the stars off', function() {
        // given
        var self = $('#element');

        // when
        self.raty({ starOff: 'half-star.png' });

        // then
        expect(self.children('img')).toHaveAttr('src', '../lib/images/half-star.png');
      });

      context('with :starType', function() {
        it('uses the given element', function() {
          // given
          var self = $('#element');

          // when
          self.raty({ starType: 'i' });

          // then
          var stars = self.children('i');

          expect(stars[0].tagName).toEqual('I');
          expect(stars[1].tagName).toEqual('I');
          expect(stars[2].tagName).toEqual('I');
          expect(stars[3].tagName).toEqual('I');
          expect(stars[4].tagName).toEqual('I');
        });

        it('normalizes the class name', function() {
          // given
          var self = $('#element');

          // when
          self.raty({ starType: 'i' });

          // then
          expect(self.children('i')).toHaveClass('star-off-png');
        });

        it('does not create the "src" attribute', function() {
          // given
          var self = $('#element');

          // when
          self.raty({ starType: 'i' });

          // then
          var stars = self.children('i');

          expect(stars[0].src).toBeUndefined();
          expect(stars[1].src).toBeUndefined();
          expect(stars[2].src).toBeUndefined();
          expect(stars[3].src).toBeUndefined();
          expect(stars[4].src).toBeUndefined();
        });

        it('creates the "data-alt" attribute', function() {
          // given
          var self = $('#element');

          // when
          self.raty({ starType: 'i' });

          // then
          var stars = self.children('i');

          expect(stars[0].getAttribute('data-alt')).toEqual('1');
          expect(stars[1].getAttribute('data-alt')).toEqual('2');
          expect(stars[2].getAttribute('data-alt')).toEqual('3');
          expect(stars[3].getAttribute('data-alt')).toEqual('4');
          expect(stars[4].getAttribute('data-alt')).toEqual('5');
        });

        it('does not create the "alt" attribute', function() {
          // given
          var self = $('#element');

          // when
          self.raty({ starType: 'i' });

          // then
          expect(self.children('i')).not.toHaveAttr('alt');
        });
      });
    });

    describe('#starOn', function() {
      it('changes the stars on', function() {
        // given
        var self  = $('#element').raty({ starOn: 'half-star.png' }),
            stars = self.children('img');

        // when
        stars.last().trigger('mouseover');

        // then
        expect(stars).toHaveAttr('src', '../lib/images/half-star.png');
      });

      context('with :starType', function() {
        it('uses the given element', function() {
          // given
          var self  = $('#element').raty({ starType: 'i' }),
              stars = self.children('i');

          // when
          stars.last().trigger('mouseover');

          // then
          expect(stars[0].tagName).toEqual('I');
          expect(stars[1].tagName).toEqual('I');
          expect(stars[2].tagName).toEqual('I');
          expect(stars[3].tagName).toEqual('I');
          expect(stars[4].tagName).toEqual('I');
        });

        it('normalizes the class name', function() {
          // given
          var self  = $('#element').raty({ starType: 'i' }),
              stars = self.children('i');

          // when
          stars.last().trigger('mouseover');

          // then
          expect(stars).toHaveClass('star-on-png');
        });

        it('does not create "src" attribute', function() {
          // given
          var self  = $('#element').raty({ starType: 'i' }),
              stars = self.children('i');

          // when
          stars.last().trigger('mouseover');

          // then
          expect(stars).not.toHaveAttr('src');
        });

        it('creates "data-alt" attribute', function() {
          // given
          var self  = $('#element').raty({ starType: 'i' }),
              stars = self.children('i');

          // when
          stars.last().trigger('mouseover');

          // then
          expect(stars).toHaveAttr('data-alt');
        });

        it('does not create "alt" attribute', function() {
          // given
          var self  = $('#element').raty({ starType: 'i' }),
              stars = self.children('i');

          // when
          stars.last().trigger('mouseover');

          // then
          expect(stars).not.toHaveAttr('alt');
        });
      });
    });

    describe('#click', function() {
      it('is called on star click', function() {
        // given
        var self = $('#element').raty({
              click: function() {
                $(this).data('called', true);
              }
            });

        // when
        self.children('img:last').trigger('click');

        // then
        expect(self.data('called')).toBeTruthy();
      });

      it('has "this" as context', function() {
        // given
        var self = $('#element').raty({
            click: function() {
              $(this).data('this', this);
            }
          });

        // when
        self.children('img:last').trigger('click');

        // then
        expect(self.data('this')).toBe(self[0]);
      });

      it('receives the score as argument', function() {
        // given
        var self = $('#element').raty({
              click: function(score) {
                $(this).data('score', score);
              }
            });

        // when
        self.children('img:last').trigger('click');

        // then
        expect(self.data('score')).toEqual(5);
      });

      context('with :cancel', function() {
        it('executes the callback', function() {
          // given
          var
            self = $('#element').raty({
              cancel : true,
              click  : function() {
                $(this).data('called', true);
              }
            }),
            cancel = self.children('.raty-cancel');

          // when
          cancel.trigger('click');

          // then
          expect(self.data('called')).toBeTruthy();
        });
      });
    });

    describe('#score', function() {
      it('can be initialized on bind', function() {
        // given
        var self = $('#element');

        // when
        self.raty({ score: 1 });

        // then
        expect(self.children('input')).toHaveValue('1');
      });

      it('turns on stars', function() {
        // given
        var self = $('#element');

        // when
        self.raty({ score: 5 });

        // then
        expect(self.children('img')).toHaveAttr('src', '../lib/images/star-on.png');
      });

      it('accepts callback', function() {
        // given
        var self = $('#element');

        // when
        self.raty({ score: function() { return 1; } });

        // then
        expect(self[0].opt.score).toEqual(1);
      });

      context('with negative number', function() {
        it('does not set the score', function() {
          // given
          var self = $('#element');

          // when
          self.raty({ score: -1 });

          // then
          expect(self.children('input')).toHaveValue('');
        });
      });

      context('with :readOnly', function() {
        it('becomes readOnly too', function() {
          // given
          var self = $('#element');

          // when
          self.raty({ readOnly: true });

          // then
          expect(self.children('input')).toHaveAttr('readonly', 'readonly');
        });
      });
    });

    describe('#scoreName', function() {
      it('changes the score field name', function() {
        // given
        var self = $('#element');

        // when
        self.raty({ scoreName: 'double' });

        // then
        expect(self.children('input')).toHaveAttr('name', 'double');
      });

      it('accepts callback', function() {
        // given
        var self = $('#element');

        // when
        self.raty({ scoreName: function() { return 'double'; } });

        // then
        expect(self[0].opt.scoreName).toEqual('double');
      });
    });

    describe('#readOnly', function() {
      it('Applies :noRatedMsg message on stars', function() {
        // given
        var self = $('#element');

        // when
        self.raty({ readOnly: true });

        // then
        expect(self.children('img')).toHaveAttr('title', self[0].opt.noRatedMsg);
      });

      it('removes the pointer style', function() {
        // given
        var self = $('#element');

        // when
        self.raty({ readOnly: true });

        // then
        expect(self[0].style.cursor).toEqual('');
      });

      it('accepts callback', function() {
        // given
        var self = $('#element');

        // when
        self.raty({ readOnly: function() { return 'double'; } });

        // then
        expect(self[0].opt.readOnly).toEqual('double');
      });

      it('blocks mouseover', function() {
        // given
        var self  = $('#element').raty({ readOnly: true }),
            stars = self.children('img');

        // when
        stars.last().trigger('mouseover');

        // then
        expect(stars).toHaveAttr('src', '../lib/images/star-off.png');
      });

      it('blocks click', function() {
        // given
        var self  = $('#element').raty({ readOnly: true }),
            stars = self.children('img'),
            input = self.children('input');

        // when
        stars.last().trigger('click');

        // then
        expect(stars).toHaveAttr('src', '../lib/images/star-off.png');
        expect(input).toHaveValue('');
      });

      it('blocks mouseleave', function() {
        // given
        var
          self = $('#element').raty({
            readOnly : true,
            mouseout : function() {
              $(this).data('called', true);
            }
          }),
          stars = self.children('img');

        // when
        self.trigger('mouseleave');

        // then
        expect(self.data('called')).toBeFalsy();
      });

      context('with :score', function() {
        context('as integer', function() {
          it('applies the score hint on stars', function() {
            // given
            var self = $('#element');

            // when
            self.raty({ readOnly: true, score: 1 });

            // then
            expect(self.children('img')).toHaveAttr('title', 'bad');
          });
        });

        context('as float', function() {
          it('applies the score integer hint on stars', function() {
            // given
            var self = $('#element');

            // when
            self.raty({ readOnly: true, score: 1.1 });

            // then
            expect(self.children('img')).toHaveAttr('title', 'bad');
          });
        });
      });

      context('with :cancel', function() {
        it('is hidded', function() {
          // given
          var self = $('#element');

          // when
          self.raty({ cancel: true, readOnly: true });

          // then
          expect(self.children('.raty-cancel')).toBeHidden();
        });
      });
    });

    describe('#hints', function() {
      it('changes the hints', function() {
        // given
        var self = $('#element');

        // when
        self.raty({ hints: ['1', '/', 'c', '-', '#'] });

        // then
        var stars = self.children('img');

        expect(stars[0]).toHaveAttr('title', '1');
        expect(stars[1]).toHaveAttr('title', '/');
        expect(stars[2]).toHaveAttr('title', 'c');
        expect(stars[3]).toHaveAttr('title', '-');
        expect(stars[4]).toHaveAttr('title', '#');
      });

      context('with undefined value', function() {
        it('receives the number of the star', function() {
          // given
          var self = $('#element');

          // when
          self.raty({ hints: [undefined] });

          // then
          expect(self.children('img:first')).toHaveAttr('title', 'bad');
        });
      });

      context('with empty value', function() {
        it('receives an empty value', function() {
          // given
          var self = $('#element');

          // when
          self.raty({ hints: [''] });

          // then
          expect(self.children('img:first')).toHaveAttr('title', '');
        });
      });

      context('with null value', function() {
        it('receives the number of star', function() {
          // given
          var self = $('#element');

          // when
          self.raty({ hints: [null] });

          // then
          expect(self.children('img:first')).toHaveAttr('title', '1');
        });
      });

      context('with less hints than stars', function() {
        it('receives the default hint value', function() {
          // given
          var self = $('#element');

          // when
          self.raty({ hints: ['1', '2', '3', '4'] });

          // then
          var stars = self.children('img');

          expect(stars[0]).toHaveAttr('title', '1');
          expect(stars[1]).toHaveAttr('title', '2');
          expect(stars[2]).toHaveAttr('title', '3');
          expect(stars[3]).toHaveAttr('title', '4');
          expect(stars[4]).toHaveAttr('title', 'gorgeous');
        });
      });

      context('with more stars than hints', function() {
        it('receives the star number', function() {
          // given
          var self = $('#element');

          // when
          self.raty({ number: 6, hints: ['a', 'b', 'c', 'd', 'e'] });

          // then
          var stars = self.children('img');

          expect(stars[0]).toHaveAttr('title', 'a');
          expect(stars[1]).toHaveAttr('title', 'b');
          expect(stars[2]).toHaveAttr('title', 'c');
          expect(stars[3]).toHaveAttr('title', 'd');
          expect(stars[4]).toHaveAttr('title', 'e');
          expect(stars[5]).toHaveAttr('title', '6');
        });
      });
    });

    describe('#mouseover', function() {
      it('receives the score as int', function() {
        // given
        var
          self = $('#element').raty({
            mouseover: function(score) {
              $(this).data('score', score);
            }
          }),
          star = self.children('img:last');

        // when
        star.trigger('mouseover');

        // then
        expect(self.data('score')).toEqual(5);
      });

      it('receives the mouse event', function() {
        // given
        var
          self = $('#element').raty({
            mouseover: function(_, evt) {
              $(this).data('evt', evt);
            }
          }),
          star = self.children('img:last');

        // when
        star.trigger('mouseover');

        // then
        expect(self.data('evt').type).toEqual('mouseover');
      });

      context('with :cancel', function() {
        it('receives null as score', function() {
          // given
          var
            self = $('#element').raty({
              cancel    : true,
              mouseover : function(score) {
                self.data('score', score);
              }
            }),
            cancel = self.children('.raty-cancel');

          // when
          cancel.trigger('mouseover');

          // then
          expect(self.data('score')).toBeNull();
        });
      });
    });

    describe('#mouseout', function() {
      it('receives the mouse event', function() {
        // given
        var
          self = $('#element').raty({
            mouseout: function(score, evt) {
              $(this).data('evt', evt);
            }
          }),
          star = self.children('img:last');

        // when
        star.trigger('mouseout');

        // then
        expect(self.data('evt').type).toEqual('mouseout');
      });

      context('without score', function() {
        it('receives undefined', function() {
          // given
          var
            self = $('#element').raty({
              cancel  : true,
              mouseout: function(score) {
                self.data('score', score);
              }
            }),
            star = self.children('img:last');

          // when
          star.trigger('mouseout');

          // then
          expect(self.data('score')).toBeUndefined();
        });
      });

      context('with score', function() {
        it('receives the score value as number', function() {
          // given
          var
            self = $('#element').raty({
              score    : 1,
              mouseout : function(score) {
                self.data('score', score);
              }
            }),
            star = self.children('img:last');

          // when
          star.trigger('mouseout');

          // then
          expect(self.data('score')).toEqual(1);
        });
      });

      context('when acts on :cancel', function() {
        it('receives the event', function() {
          // given
          var
            self = $('#element').raty({
              cancel   : true,
              mouseout : function(_, evt) {
                $(this).data('evt', evt);
              }
            }),
            cancel = self.children('.raty-cancel');

          // when
          cancel.trigger('mouseout');

          // then
          expect(self.data('evt').type).toEqual('mouseout');
        });

        context('without score', function() {
          it('receives undefined', function() {
            // given
            var
              self = $('#element').raty({
                cancel   : true,
                mouseout : function(score) {
                  $(this).data('score', score);
                }
              }),
              cancel = self.children('.raty-cancel');

            // when
            cancel.trigger('mouseout');

            // then
            expect(self.data('score')).toBeUndefined();
          });
        });

        context('with score', function() {
          it('receives the score value as number', function() {
            // given
            var
              self = $('#element').raty({
                score    : 1,
                cancel   : true,
                mouseout : function(score) {
                  $(this).data('score', score);
                }
              }),
              cancel = self.children('.raty-cancel');

            // when
            cancel.trigger('mouseout');

            // then
            expect(typeof self.data('score')).toEqual('number');
          });
        });
      });
    });

    describe('#number', function() {
      it('changes the number of stars', function() {
        // given
        var self = $('#element');

        // when
        self.raty({ number: 1 });

        // then
        expect(self.children('img').length).toEqual(1);
      });

      it('accepts number as string', function() {
        // given
        var self = $('#element');

        // when
        self.raty({ number: '1' });

        // then
        expect(self.children('img').length).toEqual(1);
      });

      it('accepts callback', function() {
        // given
        var self = $('#element');

        // when
        self.raty({ number: function() { return 1; } });

        // then
        expect(self[0].opt.number).toEqual(1);
      });
    });

    describe('#path', function() {
      it('changes the path', function() {
        // given
        var self = $('#element');

        // when
        self.raty({ path: '../demo/images' });

        // then
        expect(self.children('img')).toHaveAttr('src', '../demo/images/star-off.png');
      });

      context('without slash on the final', function() {
        it('receives the slash', function() {
          // given
          var self = $('#element');

          // when
          self.raty({ path: '../demo/images' });

          // then
          expect(self[0].opt.path).toEqual('../demo/images/');
        });
      });

      context('with slash on the final', function() {
        it('is keeped', function() {
          // given
          var self = $('#element');

          // when
          self.raty({ path: '../demo/images/' });

          // then
          expect(self[0].opt.path).toEqual('../demo/images/');
        });
      });

      context('as null', function() {
        it ('replace to an empty string', function() {
          // given
          var self = $('#element');

          // when
          self.raty({ path: null });

          // then
          expect(self.children('img')).toHaveAttr('src', 'star-off.png');
        });
      });

      context('as undefined', function() {
        beforeEach(function() {
          $.fn.raty.defaults.path = undefined;
        });

        it ('replace to an empty string', function() {
          // given
          var self = $('#element');

          // when
          self.raty();

          // then
          expect(self.children('img')).toHaveAttr('src', 'star-off.png');
        });
      });

      context('with :cancel', function() {
        it('changes the path', function() {
          // given
          var self = $('#element');

          // when
          self.raty({ cancel: true, path: '../demo/images' });

          // then
          expect(self.children('.raty-cancel')).toHaveAttr('src', '../demo/images/cancel-off.png');
        });
      });

      context('with :iconRange', function() {
        it('changes the path', function() {
          // given
          var self = $('#element');

          // when
          self.raty({ iconRange: [{ range: 1 }], path: '../demo/images' });

          // then
          expect(self.children('img')).toHaveAttr('src', '../demo/images/star-off.png');
        });
      });
    });

    describe('#cancelOff', function() {
      it('changes the icon', function() {
        // given
        var self = $('#element');

        // when
        self.raty({ cancel: true, cancelOff: 'half-star.png' });

        // then
        expect(self.children('.raty-cancel')).toHaveAttr('src', '../lib/images/half-star.png');
      });
    });

    describe('#cancelOn', function() {
      it('changes the icon', function() {
        // given
        var self   = $('#element').raty({ cancel: true, cancelOn: 'half-star.png' }),
            cancel = self.children('.raty-cancel');

        // when
        cancel.trigger('mouseover');

        // then
        expect(cancel).toHaveAttr('src', '../lib/images/half-star.png');
      });
    });

    describe('#cancelHint', function() {
      it('changes the cancel hint', function() {
        // given
        var self = $('#element');

        // when
        self.raty({ cancel: true, cancelHint: 'double' });

        // then
        expect(self.children('.raty-cancel')).toHaveAttr('title', 'double');
      });
    });

    describe('#cancelPlace', function() {
      context('when left', function() {
        it('is prepended', function() {
          // given
          var self = $('#element');

          // when
          self.raty({ cancel: true, cancelPlace: 'left' });

          // then
          expect(self.children('img:first')).toHaveClass('raty-cancel');
        });
      });

      context('when left', function() {
        it('is appended', function() {
          // given
          var self = $('#element');

          // when
          self.raty({ cancel: true, cancelPlace: 'right' });

          // then
          expect(self.children('img:last')).toHaveClass('raty-cancel');
        });
      });
    });

    describe('#cancel', function() {
      it('creates the element', function() {
        // given
        var self = $('#element');

        // when
        self.raty({ cancel: true });

        // then
        var cancel = self.children('.raty-cancel');

        expect(cancel).toHaveClass('raty-cancel');
        expect(cancel).toHaveAttr('title', 'Cancel this rating!');
        expect(cancel).toHaveAttr('alt', 'x');
        expect(cancel).toHaveAttr('src', '../lib/images/cancel-off.png');
      });

      context('on mouseover', function() {
        it('turns on', function() {
          // given
          var self   = $('#element').raty({ cancel: true }),
              cancel = self.children('.raty-cancel');

          // when
          cancel.trigger('mouseover');

          // then
          expect(cancel).toHaveAttr('src', '../lib/images/cancel-on.png');
        });

        context('with stars on', function() {
          it('turns off the stars', function() {
            // given
            var self   = $('#element').raty({ score: 3, cancel: true }),
                cancel = self.children('.raty-cancel'),
                stars  = self.children('img:not(.raty-cancel)');

            // when
            cancel.trigger('mouseover');

            // then
            expect(stars).toHaveAttr('src', '../lib/images/star-off.png');
          });
        });

        context('with :starType', function() {
          it('uses the given element', function() {
            // given
            var self   = $('#element').raty({ cancel: true, starType: 'i' }),
                cancel = self.children('.raty-cancel');

            // when
            cancel.trigger('mouseover');

            // then
            expect(cancel[0].tagName).toEqual('I');
          });

          it('sets class replacing dot to hiphen', function() {
            // given
            var self   = $('#element').raty({ cancel: true, starType: 'i' }),
                cancel = self.children('.raty-cancel');

            // when
            cancel.trigger('mouseover');

            // then
            expect(cancel).toHaveClass('cancel-on-png');
          });

          it('does not set "src" attribute', function() {
            // given
            var self   = $('#element').raty({ cancel: true, starType: 'i' }),
                cancel = self.children('.raty-cancel');

            // when
            cancel.trigger('mouseover');

            // then
            expect(cancel).not.toHaveAttr('src');
          });

          it('sets "data-alt" attribute', function() {
            // given
            var self   = $('#element').raty({ cancel: true, starType: 'i' }),
                cancel = self.children('.raty-cancel');

            // when
            cancel.trigger('mouseover');

            // then
            expect(cancel).toHaveAttr('data-alt');
          });

          it('does not set "alt" attribute', function() {
            // given
            var self   = $('#element').raty({ cancel: true, starType: 'i' }),
                cancel = self.children('.raty-cancel');

            // when
            cancel.trigger('mouseover');

            // then
            expect(cancel).not.toHaveAttr('alt');
          });
        });
      });

      context('on :mouseout', function() {
        it('turns off', function() {
          // given
          var self   = $('#element').raty({ cancel: true }),
              cancel = self.children('.raty-cancel');

            // when
            cancel.trigger('mouseout');

          // then
          expect(cancel).toHaveAttr('src', '../lib/images/cancel-off.png');
        });

        context('with stars on before', function() {
          it('turns on the star again', function() {
            // given
            var self   = $('#element').raty({ score: 5, cancel: true }),
                cancel = self.children('.raty-cancel'),
                stars  = self.children('img:not(.raty-cancel)');

            // when
            cancel.trigger('mouseout');

            // then
            expect(stars).toHaveAttr('src', '../lib/images/star-on.png');
          });
        });
      });

      context('on click', function() {
        it('cancel the rating', function() {
          // given
          var self   = $('#element').raty({ cancel: true, score: 1 }),
              cancel = self.children('.raty-cancel'),
              input  = self.children('input'),
              stars  = self.children('img:not(.raty-cancel)');

          // when
          cancel.trigger('click').trigger('mouseout');

          // then
          expect(stars).toHaveAttr('src', '../lib/images/star-off.png');
          expect(input).toHaveValue('');
        });
      });

      context('when starts :readOnly', function() {
        it('starts hidden', function() {
          // given
          var self   = $('#element').raty({ cancel: true, readOnly: true }),
              cancel = self.children('.raty-cancel');

          // when
          self.raty('readOnly', true);

          // then
          expect(cancel).toBeHidden();
        });

        context('on click', function() {
          it('does not cancel the rating', function() {
            // given
            var self   = $('#element').raty({ cancel: true, readOnly: true, score: 5 }),
                cancel = self.children('.raty-cancel'),
                input  = self.children('input'),
                stars  = self.children('img:not(.raty-cancel)');

            // when
            cancel.trigger('click').trigger('mouseout');

            // then
            expect(stars).toHaveAttr('src', '../lib/images/star-on.png');
            expect(input).toHaveValue('5');
          });
        });
      });

      context('when become :readOnly', function() {
        it ('becomes hidden', function() {
          // given
          var self = $('#element').raty({ cancel: true });

          // when
          self.raty('readOnly', true);

          // then
          expect(self.children('.raty-cancel')).toBeHidden();
        });
      });

      context('with :starType', function() {
        it ('uses the given element', function() {
          // given
          var self = $('#element');

          // when
          self.raty({ cancel: true, starType: 'i' });

          // then
          expect(self.children('.raty-cancel')[0].tagName).toEqual('I');
        });

        it ('sets class replacing dot to hiphen', function() {
          // given
          var self = $('#element');

          // when
          self.raty({ cancel: true, starType: 'i' });

          // then
          expect(self.children('.raty-cancel')).toHaveClass('cancel-off-png');
        });

        it ('does not set "src" attribute', function() {
          // given
          var self = $('#element');

          // when
          self.raty({ cancel: true, starType: 'i' });

          // then
          expect(self.children('.raty-cancel')).not.toHaveAttr('src');
        });

        it ('sets "data-alt" attribute', function() {
          // given
          var self = $('#element');

          // when
          self.raty({ cancel: true, starType: 'i' });

          // then
          expect(self.children('.raty-cancel')).toHaveAttr('data-alt');
        });

        it ('does not set "alt" attribute', function() {
          // given
          var self = $('#element');

          // when
          self.raty({ cancel: true, starType: 'i' });

          // then
          expect(self.children('.raty-cancel')).not.toHaveAttr('alt');
        });
      });
    });

    describe('#targetType', function() {
      beforeEach(function() {
        buildDivTarget();
      });

      context('with missing target', function() {
        it ('throws error', function() {
          // given
          var self = $('#element');

          // when
          var lambda = function() { self.raty({ target: 'missing' }); };

          // then
          expect(lambda).toThrow(new Error('Target selector invalid or missing!'));
        });
      });

      context('as hint', function() {
        it ('receives the hint', function() {
          // given
          var self = $('#element').raty({ target: '#hint', targetType: 'hint' });

          // when
          self.children('img:first').trigger('mouseover');

          // then
          expect($('#hint')).toHaveHtml('bad');
        });

        context('with :cancel', function() {
          it ('receives the :cancelHint', function() {
            // given
            var self = $('#element').raty({ cancel: true, target: '#hint', targetType: 'hint' });

            // when
            self.children('.raty-cancel').trigger('mouseover');

            // then
            expect($('#hint')).toHaveHtml('Cancel this rating!');
          });
        });
      });

      context('as score', function() {
        it ('receives the score', function() {
          // given
          var self = $('#element').raty({ target: '#hint', targetType: 'score' });

          // when
          self.children('img:first').trigger('mouseover');

          // then
          expect($('#hint')).toHaveHtml(1);
        });

        context('with :cancel', function() {
          it ('receives the :cancelHint', function() {
            // given
            var self = $('#element').raty({ cancel: true, target: '#hint', targetType: 'score' });

            // when
            self.children('.raty-cancel').trigger('mouseover');

            // then
            expect($('#hint')).toHaveHtml('Cancel this rating!');
          });
        });
      });
    });

    describe('#targetText', function() {
      beforeEach(function() {
        buildDivTarget();
      });

      it ('set target with none value', function() {
        // given
        var self = $('#element');

        // when
        self.raty({ target: '#hint', targetText: 'none' });

        // then
        expect($('#hint')).toHaveHtml('none');
      });
    });

    describe('#targetFormat', function() {
      context('with :target', function() {
        beforeEach(function() {
          buildDivTarget();
        });

        it ('stars empty', function() {
          // given
          var self = $('#element');

          // when
          self.raty({ target: '#hint', targetFormat: 'score: {score}' });

          // then
          expect($('#hint')).toBeEmpty();
        });

        context('with missing score key', function() {
          it ('throws error', function() {
            // given
            var self = $('#element');

            // when
            var lambda = function() { self.raty({ target: '#hint', targetFormat: '' }); };

            // then
            expect(lambda).toThrow(new Error('Template "{score}" missing!'));
          });
        });

        context('on mouseover', function() {
          it ('set target with format on mouseover', function() {
            // given
            var self = $('#element').raty({ target: '#hint', targetFormat: 'score: {score}' });

            // when
            self.children('img:first').trigger('mouseover');

            // then
            expect($('#hint')).toHaveHtml('score: bad');
          });
        });

        context('on mouseout', function() {
          it ('clears the target', function() {
            // given
            var self = $('#element').raty({
                  target      : '#hint',
                  targetFormat: 'score: {score}'
                });

            // when
            self.children('img:first').trigger('mouseover').trigger('mouseout');

            // then
            expect($('#hint')).toBeEmpty();
          });

          context('with :targetKeep', function() {
            context('without score', function() {
              it ('clears the target', function() {
                // given
                var self = $('#element').raty({
                      target      : '#hint',
                      targetFormat: 'score: {score}',
                      targetKeep  : true
                    });

                // when
                self.children('img:first').trigger('mouseover').trigger('mouseleave');

                // then
                expect($('#hint')).toBeEmpty();
              });
            });

            context('with score', function() {
              it ('keeps the template', function() {
                // given
                var self = $('#element').raty({
                      score       : 1,
                      target      : '#hint',
                      targetFormat: 'score: {score}',
                      targetKeep  : true
                    });

                // when
                self.children('img:first').trigger('mouseover').trigger('mouseleave');

                // then
                expect($('#hint')).toHaveHtml('score: bad');
              });
            });
          });
        });
      });
    });

    describe('#precision', function() {
      beforeEach(function() {
        buildDivTarget();
      });

      it ('enables the :half options', function() {
        // given
        var self = $('#element');

        // when
        self.raty({ precision: true });

        // then
        expect(self.data('options').half).toBeTruthy();
      });

      it ('changes the :targetType to score', function() {
        // given
        var self = $('#element');

        // when
        self.raty({ precision: true });

        // then
        expect(self.data('options').targetType).toEqual('score');
      });

      context('with :target', function() {
        context('with :targetKeep', function() {
          context('with :score', function() {
            it ('sets the float with one fractional number', function() {
              // given
              var self = $('#element');

              // when
              self.raty({
                precision : true,
                score     : 1.23,
                target    : '#hint',
                targetKeep: true,
                targetType: 'score'
              });

              // then
              expect($('#hint')).toHaveHtml('1.2');
            });
          });
        });
      });
    });

    describe('#target', function() {
      context('on mouseover', function() {
        context('as div', function() {
          beforeEach(function() {
            buildDivTarget();
          });

          it ('sets the hint', function() {
            // given
            var self = $('#element').raty({ target: '#hint' });

            // when
            self.children('img:first').trigger('mouseover');

            // then
            expect($('#hint')).toHaveHtml('bad');
          });
        });

        context('as text field', function() {
          beforeEach(function() { buildTextTarget(); });

          it ('sets the hint', function() {
            // given
            var self = $('#element').raty({ target: '#hint' });

            // when
            self.children('img:first').trigger('mouseover');

            // then
            expect($('#hint')).toHaveValue('bad');
          });
        });

        context('as textarea', function() {
          beforeEach(function() { buildTextareaTarget(); });

          it ('sets the hint', function() {
            // given
            var self = $('#element').raty({ target: '#hint' });

            // when
            self.children('img:first').trigger('mouseover');

            // then
            expect($('#hint')).toHaveValue('bad');
          });
        });

        context('as combobox', function() {
          beforeEach(function() { buildComboboxTarget(); });

          it ('sets the hint', function() {
            // given
            var self = $('#element').raty({ target: '#hint' });

            // when
            self.children('img:first').trigger('mouseover');

            // then
            expect($('#hint')).toHaveValue('bad');
          });
        });
      });

      context('on mouseout', function() {
        context('as div', function() {
          beforeEach(function() {
            buildDivTarget();
          });

          it ('gets clear', function() {
            // given
            var self = $('#element').raty({ target: '#hint' });

            // when
            self.children('img:first').trigger('mouseover').trigger('click').trigger('mouseleave');

            // then
            expect($('#hint')).toBeEmpty();
          });
        });

        context('as textarea', function() {
          beforeEach(function() { buildTextareaTarget(); });

          it ('gets clear', function() {
            // given
            var self = $('#element').raty({ target: '#hint' });

            // when
            self.children('img:first').trigger('click').trigger('mouseover').trigger('mouseleave');

            // then
            expect($('#hint')).toHaveValue('');
          });
        });

        context('as text field', function() {
          beforeEach(function() { buildTextTarget(); });

          it ('gets clear', function() {
            // given
            var self = $('#element').raty({ target: '#hint' });

            // when
            self.children('img:first').trigger('click').trigger('mouseover').trigger('mouseleave');

            // then
            expect($('#hint')).toHaveValue('');
          });
        });

        context('as combobox', function() {
          beforeEach(function() { buildComboboxTarget(); });

          it ('gets clear', function() {
            // given
            var self = $('#element').raty({ target: '#hint' });

            // when
            self.children('img:first').trigger('click').trigger('mouseover').trigger('mouseleave');

            // then
            expect($('#hint')).toHaveValue('');
          });
        });
      });
    });

    describe('#targetScore', function() {
      beforeEach(function() {
        this.score = $('<input id="score" type="text" />').appendTo('body');
      });

      afterEach(function() {
        this.score.remove();
      });

      it ('avoids the creation of default score field', function() {
        // given
        var self = $('#element');

        // when
        self.raty({ targetScore: '#score' });

        // then
        expect(self.children('input')).not.toExist();
      });

      it ('changes the place where score will be setted', function() {
        // given
        var
          self = $('#element').raty({ targetScore: '#score' }),
          stars = self.children('img');

        // when
        stars.eq(0).trigger('click');

        // then
        expect(this.score).toHaveValue('1');
      });
    });

    describe('#size', function() {
      it ('calculate the right icon size', function() {
        // given
        var self  = $('#element'),
            size  = 24,
            stars = 5,
            space = 4;

        // when
        self.raty({ size: size });

        // then
        expect(self.width()).toEqual((stars * size) + (stars * space));
      });

      context('with :cancel', function() {
        it ('addes the cancel and space witdh', function() {
          // given
          var self    = $('#element'),
              size    = 24,
              stars   = 5,
              cancel  = size,
              space   = 4;

          // when
          self.raty({ cancel: true, size: size });

          // then
          expect(self.width()).toEqual(cancel + space + (stars * size) + (stars * space));
        });
      });
    });

    describe('#space', function() {
      context('when off', function() {
        it ('takes off the space', function() {
          // given
          var self  = $('#element'),
              size  = 16,
              stars  = 5;

          // when
          self.raty({ space: false });

          // then
          expect(self.width()).toEqual(size * stars);
        });

        context('with :cancel', function() {
          it ('takes off the space', function() {
            // given
            var self    = $('#element'),
                size    = 16,
                stars   = 5,
                cancel  = size;

            // when
            self.raty({ cancel: true, space: false });

            // then
            expect(self.width()).toEqual(cancel + (size * stars));
          });
        });
      });
    });

    describe('#single', function() {
      context('on mouseover', function() {
        it ('turns on just one icon', function() {
          // given
          var self = $('#element').raty({ single: true }),
              stars = self.children('img');

          // when
          stars.eq(2).trigger('mouseover');

          // then
          expect(stars.eq(0)).toHaveAttr('src', '../lib/images/star-off.png');
          expect(stars.eq(1)).toHaveAttr('src', '../lib/images/star-off.png');
          expect(stars.eq(2)).toHaveAttr('src', '../lib/images/star-on.png');
          expect(stars.eq(3)).toHaveAttr('src', '../lib/images/star-off.png');
          expect(stars.eq(4)).toHaveAttr('src', '../lib/images/star-off.png');
        });

        context('with :iconRange', function() {
          it ('shows just on icon', function() {
            // given
            var self = $('#element').raty({
                  iconRange  : [
                    { range: 2, on: 'star-on.png', off: 'star-off.png' },
                    { range: 3, on: 'star-on.png', off: 'star-off.png' },
                    { range: 4, on: 'star-on.png', off: 'star-off.png' },
                    { range: 5, on: 'star-on.png', off: 'star-off.png' }
                  ],
                  single     : true
                }),
                stars = self.children('img');

            // when
            stars.eq(3).trigger('mouseover');

            // then
            expect(stars.eq(0)).toHaveAttr('src', '../lib/images/star-off.png');
            expect(stars.eq(1)).toHaveAttr('src', '../lib/images/star-off.png');
            expect(stars.eq(2)).toHaveAttr('src', '../lib/images/star-off.png');
            expect(stars.eq(3)).toHaveAttr('src', '../lib/images/star-on.png');
            expect(stars.eq(4)).toHaveAttr('src', '../lib/images/star-off.png');
          });
        });
      });

      context('on click', function() {
        context('on mouseout', function() {
          it ('keeps the score', function() {
            // given
            var self = $('#element').raty({ single: true }),
                stars = self.children('img');

            // when
            stars.eq(2).trigger('mouseover').trigger('click').trigger('mouseleave');

            // then
            expect(stars.eq(0)).toHaveAttr('src', '../lib/images/star-off.png');
            expect(stars.eq(1)).toHaveAttr('src', '../lib/images/star-off.png');
            expect(stars.eq(2)).toHaveAttr('src', '../lib/images/star-on.png');
            expect(stars.eq(3)).toHaveAttr('src', '../lib/images/star-off.png');
            expect(stars.eq(4)).toHaveAttr('src', '../lib/images/star-off.png');
          });

          context('and :iconRange', function() {
            it ('keeps the score', function() {
              // given
              var self = $('#element').raty({
                    single    : true,
                    iconRange  : [
                      { range: 2, on: 'a.png', off: 'a-off.png' },
                      { range: 3, on: 'b.png', off: 'b-off.png' },
                      { range: 4, on: 'c.png', off: 'c-off.png' },
                      { range: 5, on: 'd.png', off: 'd-off.png' }
                    ]
                  }),
                  stars = self.children('img');

              // when
              stars.eq(3).trigger('mouseover').trigger('click').trigger('mouseleave');

              // then
              expect(stars.eq(0)).toHaveAttr('src', '../lib/images/a-off.png');
              expect(stars.eq(1)).toHaveAttr('src', '../lib/images/a-off.png');
              expect(stars.eq(2)).toHaveAttr('src', '../lib/images/b-off.png');
              expect(stars.eq(3)).toHaveAttr('src', '../lib/images/c.png');
              expect(stars.eq(4)).toHaveAttr('src', '../lib/images/d-off.png');
            });
          });
        });
      });
    });

    describe('#width', function() {
      it ('set custom width', function() {
        // given
        var self = $('#element');

        // when
        self.raty({ width: 200 });

        // then
        expect(self.width()).toEqual(200);
      });

      describe('when it is false', function() {
        it ('does not apply the style', function() {
          // given
          var self = $('#element');

          // when
          self.raty({ width: false });

          // then
          expect(self).not.toHaveCss({ width: '100px' });
        });
      });

      describe('when :readOnly', function() {
        it ('set custom width when readOnly', function() {
          // given
          var self = $('#element');

          // when
          self.raty({ readOnly: true, width: 200 });

          // then
          expect(self.width()).toEqual(200);
        });
      });
    });

    describe('#half', function() {
      context('as false', function() {
        context('#halfShow', function() {
          context('as false', function() {
            it ('rounds down while less the full limit', function() {
              // given
              var self = $('#element');

              // when
              self.raty({
                half    : false,
                halfShow: false,
                round   : { down: 0.25, full: 0.6, up: 0.76 },
                score   : 0.5 // score.5 < full.6 === 0
              });

              var stars = self.children('img');

              // then
              expect(stars.eq(0)).toHaveAttr('src', '../lib/images/star-off.png');
              expect(stars.eq(1)).toHaveAttr('src', '../lib/images/star-off.png');
            });

            it ('rounds full when equal the full limit', function() {
              // given
              var self = $('#element');

              // when
              self.raty({
                half    : false,
                halfShow: false,
                round   : { down: 0.25, full: 0.6, up: 0.76 },
                score   : 0.6 // score.6 == full.6 === 1
              });

              var stars = self.children('img');

              // then
              expect(stars.eq(0)).toHaveAttr('src', '../lib/images/star-on.png');
            });
          });
        });
      });

      context('as true', function() {
        context('#halfShow', function() {
          context('as false', function() {
            it ('ignores round down while less down limit', function() {
              // given
              var self = $('#element');

              // when
              self.raty({
                half    : true,
                halfShow: false,
                round   : { down: 0.25, full: 0.6, up: 0.76 },
                score   : 0.24 // score.24 < down.25 === 0
              });

              // then
              var stars = self.children('img');

              expect(stars.eq(0)).toHaveAttr('src', '../lib/images/star-off.png');
              expect(self.children('input').val()).toEqual('0.24');
            });

            it ('ignores half while greater then down limit', function() {
              // given
              var self = $('#element');

              // when
              self.raty({
                half    : true,
                halfShow: false,
                round   : { down: 0.25, full: 0.6, up: 0.76 },
                score   : 0.26 // score.26 > down.25 and score.6 < up.76 === .5
              });

              // then
              var stars = self.children('img');

              expect(stars.eq(0)).toHaveAttr('src', '../lib/images/star-off.png');
              expect(self.children('input').val()).toEqual('0.26');
            });

            it ('ignores half while equal full limit, ignoring it', function() {
              // given
              var self = $('#element');

              // when
              self.raty({
                half    : true,
                halfShow: false,
                round   : { down: 0.25, full: 0.6, up: 0.76 },
                score   : 0.6 // score.6 > down.25 and score.6 < up.76 === .5
              });

              // then
              var stars = self.children('img');

              expect(stars.eq(0)).toHaveAttr('src', '../lib/images/star-on.png');
              expect(self.children('input').val()).toEqual('0.6');
            });

            it ('ignores half while greater than down limit and less than up limit', function() {
              // given
              var self = $('#element');

              // when
              self.raty({
                half    : true,
                halfShow: false,
                round   : { down: 0.25, full: 0.6, up: 0.76 },
                score   : 0.75 // score.75 > down.25 and score.75 < up.76 === .5
              });

              // then
              var stars = self.children('img');

              expect(stars.eq(0)).toHaveAttr('src', '../lib/images/star-on.png');
              expect(self.children('input').val()).toEqual('0.75');
            });

            it ('ignores full while equal or greater than up limit', function() {
              // given
              var self = $('#element');

              // when
              self.raty({
                half    : true,
                halfShow: false,
                round   : { down: 0.25, full: 0.6, up: 0.76 },
                score   : 0.76 // score.76 == up.76 === 1
              });

              // then
              var stars = self.children('img');

              expect(stars.eq(0)).toHaveAttr('src', '../lib/images/star-on.png');
            });
          });

          context('as true', function() {
            it ('rounds down while less down limit', function() {
              // given
              var self = $('#element');

              // when
              self.raty({
                half    : true,
                halfShow: true,
                round   : { down: 0.25, full: 0.6, up: 0.76 },
                score   : 0.24 // score.24 < down.25 === 0
              });

              // then
              var stars = self.children('img');

              expect(stars.eq(0)).toHaveAttr('src', '../lib/images/star-off.png');
            });

            it ('receives half while greater then down limit', function() {
              // given
              var self = $('#element');

              // when
              self.raty({
                half    : true,
                halfShow: true,
                round    : { down: 0.25, full: 0.6, up: 0.76 },
                score    : 0.26 // score.26 > down.25 and score.6 < up.76 === .5
              });

              // then
              var stars = self.children('img');

              expect(stars.eq(0)).toHaveAttr('src', '../lib/images/star-half.png');
            });

            it ('receives half while equal full limit, ignoring it', function() {
              // given
              var self = $('#element');

              // when
              self.raty({
                half    : true,
                halfShow: true,
                round   : { down: 0.25, full: 0.6, up: 0.76 },
                score   : 0.6 // score.6 > down.25 and score.6 < up.76 === .5
              });

              // then
              var stars = self.children('img');

              expect(stars.eq(0)).toHaveAttr('src', '../lib/images/star-half.png');
            });

            it ('receives half while greater than down limit and less than up limit', function() {
              // given
              var self = $('#element');

              // when
              self.raty({
                half    : true,
                halfShow: true,
                round   : { down: 0.25, full: 0.6, up: 0.76 },
                score   : 0.75 // score.75 > down.25 and score.75 < up.76 === .5
              });

              // then
              var stars = self.children('img');

              expect(stars.eq(0)).toHaveAttr('src', '../lib/images/star-half.png');
            });

            it ('receives full while equal or greater than up limit', function() {
              // given
              var self = $('#element');

              // when
              self.raty({
                half    : true,
                halfShow: true,
                round   : { down: 0.25, full: 0.6, up: 0.76 },
                score   : 0.76 // score.76 == up.76 === 1
              });

              // then
              var stars = self.children('img');

              expect(stars.eq(0)).toHaveAttr('src', '../lib/images/star-on.png');
            });
          });
        });

        context('with :target', function() {
          beforeEach(function() {
            buildDivTarget();
          });

          context('and :precision', function() {
            context('and :targetType as score', function() {
              context('and :targetKeep', function() {
                context('and :targetType as score', function() {
                  it ('set .5 increment value target with half option and no precision', function() {
                    // given
                    var self = $('#element');

                    // when
                    self.raty({
                      half      : true,
                      precision : false,
                      score     : 1.5,
                      target    : '#hint',
                      targetKeep: true,
                      targetType: 'score'
                    });

                    // then
                    expect($('#hint')).toHaveHtml('1.5');
                  });
                });
              });
            });
          });
        });
      });
    });

    describe('#iconRange', function() {
      it ('uses icon intervals', function() {
        // given
        var self = $('#element');

        // when
        self.raty({
          iconRange: [
            { range: 2, on: 'star-off.png', off: 'star-off.png' },
            { range: 3, on: 'star-off.png', off: 'cancel-off.png' },
            { range: 4, on: 'star-off.png', off: 'cancel-on.png' },
            { range: 5, on: 'star-off.png', off: 'star-half.png' }
          ]
        });

        // then
        var stars = self.children('img');

        expect(stars.eq(0)).toHaveAttr('src', '../lib/images/star-off.png');
        expect(stars.eq(1)).toHaveAttr('src', '../lib/images/star-off.png');
        expect(stars.eq(2)).toHaveAttr('src', '../lib/images/cancel-off.png');
        expect(stars.eq(3)).toHaveAttr('src', '../lib/images/cancel-on.png');
        expect(stars.eq(4)).toHaveAttr('src', '../lib/images/star-half.png');
      });

      context('when off icon is not especified', function() {
        it ('uses the :starOff icon', function() {
          // given
          var self = $('#element');

          // when
          self.raty({
            iconRange: [
              { range: 2, on: 'star-on.png', off: 'star-off.png' },
              { range: 3, on: 'star-on.png', off: 'star-off.png' },
              { range: 4, on: 'star-on.png', off: 'star-off.png' },
              { range: 5, on: 'star-on.png' }
            ]
          });

          // then
          expect(self.children('img').eq(4)).toHaveAttr('src', '../lib/images/star-off.png');
        });
      });

      context('on mouseover', function() {
        it ('uses the on icon', function() {
          // given
          var self = $('#element').raty({
              iconRange: [
                { range: 2, on: 'star-on.png', off: 'star-off.png' },
                { range: 3, on: 'star-on.png', off: 'star-off.png' },
                { range: 4, on: 'star-on.png', off: 'star-off.png' },
                { range: 5, on: 'star-on.png', off: 'star-off.png' }
              ]
            }),
            stars = self.children('img');

          // when
          stars.eq(4).trigger('mouseover');

          // then
          expect(stars.eq(0)).toHaveAttr('src', '../lib/images/star-on.png');
          expect(stars.eq(1)).toHaveAttr('src', '../lib/images/star-on.png');
          expect(stars.eq(2)).toHaveAttr('src', '../lib/images/star-on.png');
          expect(stars.eq(3)).toHaveAttr('src', '../lib/images/star-on.png');
          expect(stars.eq(4)).toHaveAttr('src', '../lib/images/star-on.png');
        });

        context('when on icon is not especified', function() {
          it ('uses the :starOn icon', function() {
            // given
            var self = $('#element').raty({
                  iconRange: [
                    { range: 2, off: 'star-off.png', on: 'star-on.png' },
                    { range: 3, off: 'star-off.png', on: 'star-on.png' },
                    { range: 4, off: 'star-off.png', on: 'star-on.png' },
                    { range: 5, off: 'star-off.png' }
                  ]
                }),
                stars = self.children('img');

            // when
            stars.eq(4).trigger('mouseover');

            // then
            expect(stars.eq(0)).toHaveAttr('src', '../lib/images/star-on.png');
            expect(stars.eq(1)).toHaveAttr('src', '../lib/images/star-on.png');
            expect(stars.eq(2)).toHaveAttr('src', '../lib/images/star-on.png');
            expect(stars.eq(3)).toHaveAttr('src', '../lib/images/star-on.png');
            expect(stars.eq(4)).toHaveAttr('src', '../lib/images/star-on.png');
          });
        });
      });

      context('on mouseout', function() {
        it ('changes to off icons', function() {
          // given
          var self = $('#element').raty({
                iconRange: [
                  { range: 2, on: 'star-on.png', off: 'star-off.png' },
                  { range: 3, on: 'star-on.png', off: 'star-off.png' },
                  { range: 4, on: 'star-on.png', off: 'star-off.png' },
                  { range: 5, on: 'star-on.png', off: 'star-off.png' },
                ]
              }),
              stars = self.children('img');

          // when
          stars.eq(4).trigger('mouseover');

          self.trigger('mouseleave');

          // then
          expect(stars.eq(0)).toHaveAttr('src', '../lib/images/star-off.png');
          expect(stars.eq(1)).toHaveAttr('src', '../lib/images/star-off.png');
          expect(stars.eq(2)).toHaveAttr('src', '../lib/images/star-off.png');
          expect(stars.eq(3)).toHaveAttr('src', '../lib/images/star-off.png');
          expect(stars.eq(4)).toHaveAttr('src', '../lib/images/star-off.png');
        });

        it ('keeps the score value', function() {
          // given
          var self = $('#element').raty({
                iconRange  : [
                  { range: 2, on: 'star-on.png', off: 'star-off.png' },
                  { range: 3, on: 'star-on.png', off: 'star-off.png' },
                  { range: 4, on: 'star-on.png', off: 'star-off.png' },
                  { range: 5, on: 'star-on.png', off: 'star-off.png' }
                ],
                score      : 1
              });

          // when
          self.children('img').eq(4).trigger('mouseover');

          self.trigger('mouseleave');

          // then
          expect(self.children('input')).toHaveValue('1');
        });

        context('when off icon is not especified', function() {
          it ('uses the :starOff icon', function() {
            // given
            var self = $('#element').raty({
                iconRange: [
                  { range: 2, on: 'star-on.png', off: 'star-off.png' },
                  { range: 3, on: 'star-on.png', off: 'star-off.png' },
                  { range: 4, on: 'star-on.png', off: 'star-off.png' },
                  { range: 5, on: 'star-on.png' }
                ]
              }),
              img = self.children('img').eq(4);

            // when
            img.trigger('mouseover');

            self.trigger('mouseleave');

            // then
            expect(img).toHaveAttr('src', '../lib/images/star-off.png');
          });
        });
      });
    });
  });

  describe('class bind', function() {
    beforeEach(function() {
      $.fn.raty.defaults.path = '../lib/images';

      $('body').append('<div class="element"></div><div class="element"></div>');
    });

    afterEach(function() {
      $('.element').remove();
    });

    it('is chainable', function() {
      // given
      var self = $('.element');

      // when
      var els = self.raty();

      // then
      expect(els.eq(0)[0]).toBe(self.eq(0)[0]);
      expect(els.eq(1)[0]).toBe(self.eq(1)[0]);
    });

    it ('creates the default markup', function() {
      // given
      var self = $('.element');

      // when
      self.raty();

      // then
      var stars  = self.eq(0).children('img'),
          score = self.eq(0).children('input');

      expect(stars.eq(0)).toHaveAttr('title', 'bad');
      expect(stars.eq(1)).toHaveAttr('title', 'poor');
      expect(stars.eq(2)).toHaveAttr('title', 'regular');
      expect(stars.eq(3)).toHaveAttr('title', 'good');
      expect(stars.eq(4)).toHaveAttr('title', 'gorgeous');
      expect(stars).toHaveAttr('src', '../lib/images/star-off.png');
      expect(score).toHaveAttr('type', 'hidden');
      expect(score).toHaveAttr('name', 'score');
      expect(score.val()).toEqual('');

      stars  = self.eq(1).children('img');
      score = self.eq(0).children('input');

      expect(stars.eq(0)).toHaveAttr('title', 'bad');
      expect(stars.eq(1)).toHaveAttr('title', 'poor');
      expect(stars.eq(2)).toHaveAttr('title', 'regular');
      expect(stars.eq(3)).toHaveAttr('title', 'good');
      expect(stars.eq(4)).toHaveAttr('title', 'gorgeous');
      expect(stars).toHaveAttr('src', '../lib/images/star-off.png');
      expect(score).toHaveAttr('type', 'hidden');
      expect(score).toHaveAttr('name', 'score');
      expect(score.val()).toEqual('');
    });
  });

  describe('functions', function() {
    beforeEach(function() {
      $.fn.raty.defaults.path = '../lib/images';
    });

    describe('GET #score', function() {
      it ('accepts number as string', function() {
        // given
        var self = $('#element');

        // when
        self.raty({ score: '1' });

        // then
        expect(self.children('input')).toHaveValue('1');
      });

      it ('accepts float string', function() {
        // given
        var self = $('#element');

        // when
        self.raty({ score: '1.5' });

        // then
        expect(self.children('input')).toHaveValue('1.5');
      });

      context('with integer score', function() {
        it ('gets as int', function() {
          // given
          var self = $('#element').raty({ score: 1 });

          // when
          var score = self.raty('score');

          // then
          expect(score).toEqual(1);
        });
      });

      context('with float score', function() {
        it ('gets as float', function() {
          // given
          var self = $('#element').raty({ score: 1.5 });

          // when
          var score = self.raty('score');

          // then
          expect(score).toEqual(1.5);
        });
      });

      context('with score zero', function() {
        it('returns an undefined value because it does not exist', function() {
          // given
          var self = $('#element').raty({ score: 0 });

          // when
          var score = self.raty('score');

          // then
          expect(score).toBeUndefined();
        });
      });

      context('with score greater than :numberMax', function() {
        it ('gets the max', function() {
          // given
          var self = $('#element').raty({ number: 50, score: 50 });

          // when
          var score = self.raty('score');

          // then
          expect(score).toEqual(self.data('options').numberMax);
        });
      });
    });

    describe('SET #score', function() {
      it ('sets the score', function() {
        // given
        var self = $('#element');

        // when
        self.raty({ score: 1 });

        // then
        expect(self.raty('score')).toEqual(1);
      });

      describe('with :click', function() {
        it ('calls the click callback', function() {
          // given
          var self = $('#element').raty({
                click: function(score) {
                  $(this).data('score', score);
                }
              });

          // when
          self.raty('score', 5);

          // then
          expect(self.children('img')).toHaveAttr('src', '../lib/images/star-on.png');
        });
      });

      describe('without :click', function() {
        it ('does not throw exception', function() {
          // given
          var self = $('#element').raty();

          // when
          var lambda = function() { self.raty('score', 1); };

          // then
          expect(lambda).not.toThrow(new Error('You must add the "click: function(score, evt) { }" callback.'));
        });
      });

      describe('with :readOnly', function() {
        it ('does not set the score', function() {
          // given
          var self = $('#element').raty({ readOnly: true });

          // when
          self.raty('score', 5);

          // then
          expect(self.children('img')).toHaveAttr('src', '../lib/images/star-off.png');
        });
      });
    });

    describe('#set', function() {
      it ('is chainable', function() {
        // given
        var self = $('#element').raty();

        // when
        var ref = self.raty('set', { number: 1 });

        // then
        expect(ref).toBe(self);
      });

      it ('changes the declared options', function() {
        // given
        var self = $('#element').raty();

        // when
        var ref = self.raty('set', { scoreName: 'change-just-it' });

        // then
        expect(ref.children('input')).toHaveAttr('name', 'change-just-it');
      });

      it ('does not change other none declared options', function() {
        // given
        var self = $('#element').raty({ number: 6 });

        // when
        var ref = self.raty('set', { scoreName: 'change-just-it' });

        // then
        expect(ref.children('img').length).toEqual(6);
      });

      context('with external bind on wrapper', function() {
        it ('keeps it', function() {
          // given
          var self = $('#element').on('click', function() {
            $(this).data('externalClick', true);
          }).raty();

          // when
          self.raty('set', {}).trigger('click');

          // then
          expect(self.data('externalClick')).toBeTruthy();
        });
      });

      context('when :readOnly by function', function() {
        it ('is removes the readonly data info', function() {
          // given
          var self = $('#element').raty().raty('readOnly', true);

          // when
          var ref = self.raty('set', { readOnly: false });

          // then
          expect(self).not.toHaveData('readonly');
        });
      });
    });

    describe('#readOnly', function() {
      context('changes to true', function() {
        it ('sets score as readonly', function() {
          // given
          var self = $('#element').raty();

          // when
          self.raty('readOnly', true);

          // then
          expect(self.children('input')).toHaveAttr('readonly', 'readonly');
        });

        it ('removes the pointer cursor', function() {
          // given
          var self = $('#element').raty();

          // when
          self.raty('readOnly', true);

          // then
          expect(self).not.toHaveCss({ cursor: 'pointer' });
          expect(self).not.toHaveCss({ cursor: 'default' });
        });

        it ('Applies "Not rated yet!" on stars', function() {
          // given
          var self = $('#element').raty();

          // when
          self.raty('readOnly', true);

          // then
          expect(self.children('img')).toHaveAttr('title', 'Not rated yet!');
        });

        it ('avoids trigger mouseover', function() {
          // given
          var self = $('#element').raty(),
              stars = self.children('img');

          self.raty('readOnly', true);

          // when
          stars.eq(0).trigger('mouseover');

          // then
          expect(stars).toHaveAttr('src', '../lib/images/star-off.png');
        });

        it ('avoids trigger click', function() {
          // given
          var self = $('#element').raty(),
              stars = self.children('img');

          self.raty('readOnly', true);

          // when
          stars.eq(0).trigger('mouseover').trigger('click').trigger('mouseleave');

          // then
          expect(stars).toHaveAttr('src', '../lib/images/star-off.png');
          expect(self.children('input').val()).toEqual('');
        });

        context('with :score', function() {
          it ('applies the score title on stars', function() {
            // given
            var self = $('#element').raty({ score: 1 });

            // when
            self.raty('readOnly', true);

            // then
            expect(self.children('img')).toHaveAttr('title', 'bad');
          });
        });

        context('with :cancel', function() {
          it ('hides the button', function() {
            // given
            var self = $('#element').raty({ cancel: true });

            // when
            self.raty('readOnly', true);

            // then
            expect(self.children('.raty-cancel')).toBeHidden();
          });
        });

        context('with external bind on wrapper', function() {
          it ('keeps it', function() {
            // given
            var self = $('#element').on('click', function() {
              $(this).data('externalClick', true);
            }).raty();

            // when
            self.raty('readOnly', true).trigger('click');

            // then
            expect(self.data('externalClick')).toBeTruthy();
          });
        });

        context('with external bind on stars', function() {
          it ('keeps it', function() {
            // given
            var self = $('#element').raty(),
                star = self.children('img').first();

            star.on('click', function() {
              self.data('externalClick', true);
            });

            // when
            self.raty('readOnly', true);
            star.click();

            // then
            expect(self.data('externalClick')).toBeTruthy();
          });
        });
      });

      context('changes to false', function() {
        it ('removes the :readOnly of the score', function() {
          // given
          var self = $('#element').raty();

          // when
          self.raty('readOnly', false);

          // then
          expect(self.children('input')).not.toHaveAttr('readonly', 'readonly');
        });

        it ('applies the pointer cursor on wrapper', function() {
          // given
          var self = $('#element').raty();

          // when
          self.raty('readOnly', false);

          // then
          expect(self).toHaveCss({ cursor: 'pointer' });
        });

        it ('Removes the "Not rated yet!" off the stars', function() {
          // given
          var self   = $('#element').raty({ readOnly: true }),
              stars  = self.children('img');

          // when
          self.raty('readOnly', false);

          // then
          expect(stars.eq(0)).toHaveAttr('title', 'bad');
          expect(stars.eq(1)).toHaveAttr('title', 'poor');
          expect(stars.eq(2)).toHaveAttr('title', 'regular');
          expect(stars.eq(3)).toHaveAttr('title', 'good');
          expect(stars.eq(4)).toHaveAttr('title', 'gorgeous');
        });

        it ('triggers mouseover', function() {
          // given
          var self = $('#element').raty({ readOnly: true }),
              stars = self.children('img');

          self.raty('readOnly', false);

          // when
          stars.eq(0).trigger('mouseover');

          // then
          expect(stars.eq(0)).toHaveAttr('src', '../lib/images/star-on.png');
        });

        it ('triggers click', function() {
          // given
          var self = $('#element').raty({ readOnly: true }),
              stars = self.children('img');

          self.raty('readOnly', false);

          // when
          stars.eq(0).trigger('mouseover').trigger('click').trigger('mouseleave');

          // then
          expect(stars).toHaveAttr('src', '../lib/images/star-on.png');
          expect(self.children('input')).toHaveValue('1');
        });

        context('with :score', function() {
          it ('removes the score title off the stars', function() {
            // given
            var self = $('#element').raty({ readOnly: true, score: 3 });

            // when
            self.raty('readOnly', false);

            // then
            var stars = self.children('img');

            expect(stars.eq(0)).toHaveAttr('title', 'bad');
            expect(stars.eq(1)).toHaveAttr('title', 'poor');
            expect(stars.eq(2)).toHaveAttr('title', 'regular');
            expect(stars.eq(3)).toHaveAttr('title', 'good');
            expect(stars.eq(4)).toHaveAttr('title', 'gorgeous');
          });
        });

        context('with :cancel', function() {
          it ('shows the button', function() {
            // given
            var self = $('#element').raty({ cancel: true, readOnly: true });

            // when
            self.raty('readOnly', false);

            // then
            expect(self.children('.raty-cancel')).toBeVisible();
            expect(self.children('.raty-cancel')).not.toHaveCss({ display: 'block' });
          });

          it ('rebinds the mouseover', function() {
            // given
            var self   = $('#element').raty({ readOnly: true, cancel: true }),
                cancel = self.children('.raty-cancel'),
                stars   = self.children('img:not(.raty-cancel)');

            // when
            self.raty('readOnly', false);

            cancel.trigger('mouseover');

            // then
            expect(cancel).toHaveAttr('src', '../lib/images/cancel-on.png');
            expect(stars).toHaveAttr('src', '../lib/images/star-off.png');
          });

          it ('rebinds the click', function() {
            // given
            var self = $('#element').raty({ readOnly: true, cancel: true, score: 5 }),
                stars = self.children('img:not(.raty-cancel)');

            // when
            self.raty('readOnly', false);

            self.children('.raty-cancel').trigger('click').trigger('mouseout');

            // then
            expect(stars).toHaveAttr('src', '../lib/images/star-off.png');
          });
        });
      });
    });

    describe('#cancel', function() {
      describe('with :readOnly', function() {
        it ('does not cancel', function() {
          // given
          var self = $('#element').raty({ readOnly: true, score: 5 });

          // when
          self.raty('cancel');

          // then
          expect(self.children('img')).toHaveAttr('src', '../lib/images/star-on.png');
        });
      });

      context('without click trigger', function() {
        it ('cancel the rating', function() {
          // given
          var self = $('#element').raty({
                score: 1,
                click: function() {
                  $(this).data('clicked', true);
                }
              });

          // when
          self.raty('cancel');

          // then
          expect(self.children('img')).toHaveAttr('src', '../lib/images/star-off.png');
          expect(self.children('input').val()).toEqual('');
          expect(self.data('clicked')).toBeFalsy();
        });
      });

      context('with click trigger', function() {
        it ('cancel the rating', function() {
          // given
          var self = $('#element').raty({
                score: 1,
                click: function() {
                  $(this).data('clicked', true);
                }
              });

          // when
          self.raty('cancel', true);

          // then
          expect(self.children('img')).toHaveAttr('src', '../lib/images/star-off.png');
          expect(self.children('input').val()).toEqual('');
          expect(self.data('clicked')).toBeTruthy();
        });
      });

      context('with :target', function() {
        beforeEach(function() {
          buildDivTarget();
        });

        context('and :targetKeep', function() {
          it ('sets the :targetText on target', function() {
            // given
            var hint = $('#hint').html('dirty'),
                self = $('#element').raty({
                  cancel    : true,
                  target    : '#hint',
                  targetKeep: true,
                  targetText: 'targetText'
                });

            // when
            self.raty('cancel');

            // then
            expect(hint).toHaveHtml('targetText');
          });
        });
      });
    });

    describe('#click', function() {
      it ('clicks on star', function() {
        // given
        var self = $('#element').raty({
          click: function() {
            $(this).data('clicked', true);
          }
        });

        // when
        self.raty('click', 1);

        // then
        expect(self.children('img')).toHaveAttr('src', '../lib/images/star-on.png');
        expect(self.data('clicked')).toBeTruthy();
      });

      it ('receives the score', function() {
        // given
        var self = $('#element').raty({
          click: function(score) {
            $(this).data('score', score);
          }
        });

        // when
        self.raty('click', 1);

        // then
        expect(self.data('score')).toEqual(1);
      });

      it ('receives the event', function() {
        // given
        var self = $('#element').raty({
          click: function(score, evt) {
            $(this).data('evt', evt);
          }
        });

        // when
        self.raty('click', 1);

        // then
        expect(self.data('evt').type).toEqual('click');
      });

      describe('with :readOnly', function() {
        it ('does not set the score', function() {
          // given
          var self = $('#element').raty({ readOnly: true });

          // when
          self.raty('click', 1);

          // then
          expect(self.children('img')).toHaveAttr('src', '../lib/images/star-off.png');
        });
      });

      context('without :click', function() {
        it ('throws error', function() {
          // given
          var self = $('#element').raty();

          // when
          var lambda = function() { self.raty('click', 1); };

          // then
          expect(lambda).toThrow(new Error('You must add the "click: function(score, evt) { }" callback.'));
        });
      });

      context('with :target', function() {
        beforeEach(function() {
          buildDivTarget();
        });

        context('and :targetKeep', function() {
          it ('sets the score on target', function() {
            // given
            var self = $('#element').raty({
              target    : '#hint',
              targetKeep: true,
              click     : function() { }
            });

            // when
            self.raty('click', 1);

            // then
            expect($('#hint')).toHaveHtml('bad');
          });
        });
      });
    });

    describe('#reload', function() {
      it ('is chainable', function() {
        // given
        var self = $('#element').raty();

        // when
        var ref = self.raty('reload');

        // then
        expect(ref).toBe(self);
      });

      it ('reloads with the same configuration', function() {
        // given
        var self = $('#element').raty({ number: 6 });

        // when
        var ref = self.raty('reload');

        // then
        expect(ref.children('img').length).toEqual(6);
      });

      context('when :readOnly by function', function() {
        it ('is removes the readonly data info', function() {
          // given
          var self = $('#element').raty().raty('readOnly', true);

          // when
          var ref = self.raty('reload');

          // then
          expect(self).not.toHaveData('readonly');
        });
      });
    });

    describe('#destroy', function() {
      it ('is chainable', function() {
        // given
        var self = $('#element').raty();

        // when
        var el = self.raty('destroy');

        // then
        expect(el[0]).toBe(self[0]);
      });

      it ('clear the content', function() {
        // given
        var self = $('#element').raty();

        // when
        self.raty('destroy');

        // then
        expect(self).toBeEmpty();
      });

      it ('removes the trigger mouseleave', function() {
        // given
        var self = $('#element').raty({
              mouseout: function() {
                $(this).data('mouseleave', true);
              }
            });

        self.raty('destroy');

        // when
        self.trigger('mouseleave');

        // then
        expect(self.data('mouseleave')).toBeFalsy();
      });

      it ('resets the style attributes', function() {
        // given
        var self = $('#element').css({ cursor: 'help', width: 10 }).raty();

        // when
        self.raty('destroy');

        // then
        expect(self[0].style.cursor).toEqual('help');
        expect(self[0].style.width).toEqual('10px');
      });
    });

    describe('#move', function() {
      describe('with interger score', function() {
        beforeEach(function() {
          this.target = $('<div id="target"></div>').appendTo('body');
        });

        afterEach(function() {
          this.target.remove();
        });

        it ('moves to the right point', function() {
          // given
          var self = $('#element').raty({
            precision  : true,
            target     : '#target',
            targetType : 'number'
          });

          // when
          self.raty('move', 1);

          // then
          expect(this.target.text()).toEqual('1.0');
        });
      });

      describe('with float score', function() {
        beforeEach(function() {
          this.target = $('<div id="target"></div>').appendTo('body');
        });

        afterEach(function() {
          this.target.remove();
        });

        it ('moves to the right point', function() {
          // given
          var self = $('#element').raty({
            precision  : true,
            target     : '#target',
            targetType : 'number'
          });

          // when
          self.raty('move', 1.7);

          // then
          expect(this.target.text()).toEqual('1.7');
        });
      });

      describe('with string score', function() {
        beforeEach(function() {
          this.target = $('<div id="target"></div>').appendTo('body');
        });

        afterEach(function() {
          this.target.remove();
        });

        it ('moves to the right point', function() {
          // given
          var self = $('#element').raty({
            precision  : true,
            target     : '#target',
            targetType : 'number'
          });

          // when
          self.raty('move', '1.7');

          // then
          expect(this.target.text()).toEqual('1.7');
        });
      });

      describe('when score is bigger then the number of stars', function() {
        beforeEach(function() {
          this.target = $('<div id="target"></div>').appendTo('body');
        });

        afterEach(function() {
          this.target.remove();
        });

        it ('moves to the and of the last star', function() {
          // given
          var self = $('#element').raty({
            precision  : true,
            target     : '#target',
            targetType : 'number'
          });

          // when
          self.raty('move', 6.7);

          // then
          expect(this.target.text()).toEqual('5.0');
        });
      });

      describe('with class selection', function() {
        beforeEach(function() {
          this.element1 = $('<div data-target="#target1" class="element"></div>').appendTo('body');
          this.element2 = $('<div data-target="#target2" class="element"></div>').appendTo('body');
          this.target1  = $('<div id="target1"></div>').appendTo('body');
          this.target2  = $('<div id="target2"></div>').appendTo('body');
        });

        afterEach(function() {
          this.element1.remove();
          this.element2.remove();
          this.target1.remove();
          this.target2.remove();
        });

        // TODO: set taget with callback.
        xit ('moves to the right point on all of them', function() {
          // given
          var els = $('.element').raty({
            precision  : true,
            target     : function() {
              return this.getAttribute('data-target');
            },
            targetType : 'number'
          });

          // when
          $('.element').raty('move', 1.7);

          // then
          expect(this.target.text()).toEqual('1.7');
          expect(this.target2.text()).toEqual('1.7');
        });
      });
    });

    describe('#starType', function() {
      it ('creates the default markup', function() {
        // given
        var self = $('#element');

        // when
        self.raty({ starType: 'i' });

        // then
        expect(self[0].opt.path).toEqual('');
      });

      context('when "img"', function() {
        it ('creates the default markup', function() {
          // given
          var self = $('#element');

          // when
          self.raty();

          // then
          var stars = self.children('img'),
              score = self.children('input');

          expect(stars.eq(0)).toHaveAttr('title', 'bad');
          expect(stars.eq(1)).toHaveAttr('title', 'poor');
          expect(stars.eq(2)).toHaveAttr('title', 'regular');
          expect(stars.eq(3)).toHaveAttr('title', 'good');
          expect(stars.eq(4)).toHaveAttr('title', 'gorgeous');

          expect(stars.eq(0)).toHaveAttr('alt', '1');
          expect(stars.eq(1)).toHaveAttr('alt', '2');
          expect(stars.eq(2)).toHaveAttr('alt', '3');
          expect(stars.eq(3)).toHaveAttr('alt', '4');
          expect(stars.eq(4)).toHaveAttr('alt', '5');

          expect(stars).toHaveAttr('src', '../lib/images/star-off.png');
          expect(score).toHaveAttr('type', 'hidden');
          expect(score).toHaveAttr('name', 'score');
          expect(score.val()).toEqual('');
        });
      });

      context('when other', function() {
        it ('creates the default markup', function() {
          // given
          var self = $('#element');

          // when
          self.raty({ starType: 'i' });

          // then
          var stars = self.children('i'),
              score = self.children('input');

          expect(stars.eq(0)).toHaveAttr('title', 'bad');
          expect(stars.eq(1)).toHaveAttr('title', 'poor');
          expect(stars.eq(2)).toHaveAttr('title', 'regular');
          expect(stars.eq(3)).toHaveAttr('title', 'good');
          expect(stars.eq(4)).toHaveAttr('title', 'gorgeous');

          expect(stars.eq(0)).toHaveAttr('data-alt', '1');
          expect(stars.eq(1)).toHaveAttr('data-alt', '2');
          expect(stars.eq(2)).toHaveAttr('data-alt', '3');
          expect(stars.eq(3)).toHaveAttr('data-alt', '4');
          expect(stars.eq(4)).toHaveAttr('data-alt', '5');

          expect(stars).not.toHaveAttr('alt');
          expect(stars).not.toHaveAttr('src');

          expect(score).toHaveAttr('type', 'hidden');
          expect(score).toHaveAttr('name', 'score');
          expect(score.val()).toEqual('');
        });
      });
    });
  });
});
