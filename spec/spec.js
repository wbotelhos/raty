isClear = true;

function context(description, spec) {
  describe(description, spec);
};

function build() {
  $('body').append('<div id="element"></div>');
};

function buildDivTarget() {
  $('body').append('<div id="hint"></div>');
};

function buildComboboxTarget() {
  $('body').append(
    '<select id="hint">' +
      '<option value="cancel this rating!">cancel hint default</option>' +
      '<option value="cancel-hint-custom">cancel hint custom</option>' +

      '<option value="">cancel number default</option>' +
      '<option value="0">cancel number custom</option>' +

      '<option value="bad">bad hint imutable</option>' +
      '<option value="1">bad number imutable</option>' +

      '<option value="targetText">targetText is setted without targetKeep</option>' +

      '<option value="score: bad">targetFormat</option>' +
    '</select>'
  );
};

function buildTextareaTarget() {
  $('body').append('<textarea id="hint"></textarea>');
};

function buildTextTarget() {
  $('body').append('<input id="hint" type="text" />');
};

function clear() {
  if (isClear) {
    $('#element').remove();
    $('#hint').remove();
  }
};

describe('Raty', function() {
	beforeEach(function() { build(); });
  afterEach(function()  { clear(); });

  describe('default options', function() {
    it ('has the right values', function() {
      // given
      var raty = $.fn.raty

      // when
      var opt = raty.defaults

      // then
      expect(opt.cancel).toBeFalsy();
      expect(opt.cancelHint).toEqual('cancel this rating!');
      expect(opt.cancelOff).toEqual('cancel-off.png');
      expect(opt.cancelOn).toEqual('cancel-on.png');
      expect(opt.cancelPlace).toEqual('left');
      expect(opt.click).toBeUndefined();
      expect(opt.half).toBeFalsy();
      expect(opt.halfShow).toBeTruthy();
      expect(opt.hints).toContain('bad', 'poor', 'regular', 'good', 'gorgeous');
      expect(opt.iconRange).toBeUndefined();
      expect(opt.mouseover).toBeUndefined();
      expect(opt.noRatedMsg).toEqual('not rated yet');
      expect(opt.number).toBe(5);
      expect(opt.path).toEqual('img/');
      expect(opt.precision).toBeFalsy();
      expect(opt.readOnly).toBeFalsy();
      expect(opt.round.down).toEqual(.25);
      expect(opt.round.full).toEqual(.6);
      expect(opt.round.up).toEqual(.76);
      expect(opt.score).toBeUndefined();
      expect(opt.scoreName).toEqual('score');
      expect(opt.single).toBeFalsy();
      expect(opt.size).toBe(16);
      expect(opt.space).toBeTruthy();
      expect(opt.starHalf).toEqual('star-half.png');
      expect(opt.starOff).toEqual('star-off.png');
      expect(opt.starOn).toEqual('star-on.png');
      expect(opt.target).toBeUndefined();
      expect(opt.targetFormat).toEqual('{score}');
      expect(opt.targetKeep).toBeFalsy();
      expect(opt.targetText).toEqual('');
      expect(opt.targetType).toEqual('hint');
      expect(opt.width).toBeUndefined();
    });
  });

  describe('common features', function() {
    it ('is chainable', function() {
      // given
      var self = $('#element');

      // when
      var clone = self.raty();

      // then
      expect(clone).toBe(self);
    });

    it ('creates the default markup', function() {
      // given
      var self = $('#element');

      // when
      self.raty();

      // then
      var imgs  = self.children('img'),
          score = self.children('input');

      expect(imgs.eq(0)).toHaveAttr('title', 'bad');
      expect(imgs.eq(1)).toHaveAttr('title', 'poor');
      expect(imgs.eq(2)).toHaveAttr('title', 'regular');
      expect(imgs.eq(3)).toHaveAttr('title', 'good');
      expect(imgs.eq(4)).toHaveAttr('title', 'gorgeous');
      expect(imgs).toHaveAttr('src', 'img/star-off.png');
      expect(score).toHaveAttr('type', 'hidden');
      expect(score).toHaveAttr('name', 'score');
      expect(score.val()).toEqual('');
    });
  });

  describe('#star', function() {
    context('on :readOnly', function() {
      it ('does not trigger mouseover', function() {
        // given
        var self = $('#element');

        // when
        self.raty({ readOnly: true });

        var imgs = self.children('img');

        imgs.eq(4).mouseover();

        // then
        expect(imgs.eq(0)).toHaveAttr('src', 'img/star-off.png');
        expect(imgs.eq(1)).toHaveAttr('src', 'img/star-off.png');
        expect(imgs.eq(2)).toHaveAttr('src', 'img/star-off.png');
        expect(imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
        expect(imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');
      });

      it ('does not trigger click', function() {
        // given
        var self = $('#element');

        // when
        self.raty({ readOnly: true });

        var imgs = self.children('img');

        imgs.eq(4).mouseover().click().mouseleave();

        // then
        expect(imgs.eq(0)).toHaveAttr('src', 'img/star-off.png');
        expect(imgs.eq(1)).toHaveAttr('src', 'img/star-off.png');
        expect(imgs.eq(2)).toHaveAttr('src', 'img/star-off.png');
        expect(imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
        expect(imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');

        expect(self.children('input').val()).toEqual('');
      });

      context('and :score', function() {
        it ('applies the score title on stars', function() {
          // given
          var self = $('#element');

          // when
          self.raty({ readOnly: true, score: 3 });

          // then
          expect(self.children('img')).toHaveAttr('title', 'regular');
        });
      });
    });

    context('on :mouseover', function() {
      context('2 stars', function() {
        it ('turns on 2 stars', function() {
          // given
          var self = $('#element').raty(),
              imgs = self.children('img');

          // when
          imgs.eq(1).mouseover();

          // then
          expect(imgs.eq(0)).toHaveAttr('src', 'img/star-on.png');
          expect(imgs.eq(1)).toHaveAttr('src', 'img/star-on.png');
          expect(imgs.eq(2)).toHaveAttr('src', 'img/star-off.png');
          expect(imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
          expect(imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');
        });
      });
    });

    context('on :click', function() {
      context('on second star', function() {
        it ('register 2 stars and score 2', function() {
          // given
          var self = $('#element').raty(),
              imgs = self.children('img');

          // when
          imgs.eq(1).mouseover().click().mouseleave();

          // then
          expect(imgs.eq(0)).toHaveAttr('src', 'img/star-on.png');
          expect(imgs.eq(1)).toHaveAttr('src', 'img/star-on.png');
          expect(imgs.eq(2)).toHaveAttr('src', 'img/star-off.png');
          expect(imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
          expect(imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');

          expect(self.children('input')).toHaveValue(2);
        });
      });
    });
  });

  describe('options', function() {
  	describe('#numberMax', function() {
	  	it ('limits to 20 stars', function() {
		    // given
		    var self = $('#element').raty({ number: 50, score: 50 });

		    // when
		    var score = self.raty('score');

		    // then
		    var imgs  = self.children('img'),
	          score = self.children('input');

		    expect(imgs.length).toEqual(20);
		    expect(score).toHaveValue(20);
		  });

		  context('with custom numberMax', function() {
		  	it ('limits to numberMax', function() {
			    // given
			    var self = $('#element').raty({ numberMax: 10, number: 50, score: 50 });

			    // when
			    var score = self.raty('score');

			    // then
			    var imgs  = self.children('img'),
		          score = self.children('input');

			    expect(imgs.length).toEqual(10);
			    expect(score).toHaveValue(10);
			  });
		  });
		});

    describe('#starOff', function() {
      it ('changes the icons', function() {
        // given
        var self = $('#element');

        // when
        self.raty({ starOff: 'icon.png' });

        // then
        expect(self.children('img')).toHaveAttr('src', 'img/icon.png');
      });
    });

    describe('#starOn', function() {
      it ('changes the icons', function() {
        // given
        var self = $('#element').raty({ starOn: 'icon.png' }),
            imgs = self.children('img');

        // when
        imgs.eq(3).mouseover();

        // then
        expect(imgs.eq(0)).toHaveAttr('src', 'img/icon.png');
        expect(imgs.eq(1)).toHaveAttr('src', 'img/icon.png');
        expect(imgs.eq(2)).toHaveAttr('src', 'img/icon.png');
        expect(imgs.eq(3)).toHaveAttr('src', 'img/icon.png');
        expect(imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');
      });
    });

    describe('#iconRange', function() {
      it ('uses icon intervals', function() {
        // given
        var self = $('#element');

        // when
        self.raty({
          iconRange: [
            { range: 2, on: 'a.png', off: 'a-off.png' },
            { range: 3, on: 'b.png', off: 'b-off.png' },
            { range: 4, on: 'c.png', off: 'c-off.png' },
            { range: 5, on: 'd.png', off: 'd-off.png' }
          ]
        });

        // then
        var imgs = self.children('img');

        expect(imgs.eq(0)).toHaveAttr('src', 'img/a-off.png');
        expect(imgs.eq(1)).toHaveAttr('src', 'img/a-off.png');
        expect(imgs.eq(2)).toHaveAttr('src', 'img/b-off.png');
        expect(imgs.eq(3)).toHaveAttr('src', 'img/c-off.png');
        expect(imgs.eq(4)).toHaveAttr('src', 'img/d-off.png');
      });

      context('on mouseover', function() {
        it ('uses the on icon', function() {
          // given
          var self = $('#element').raty({
              iconRange: [
                { range: 2, on: 'a.png', off: 'a-off.png' },
                { range: 3, on: 'b.png', off: 'b-off.png' },
                { range: 4, on: 'c.png', off: 'c-off.png' },
                { range: 5, on: 'd.png', off: 'd-off.png' }
              ]
            }),
            imgs = self.children('img');

          // when
          imgs.eq(4).mouseover();

          // then
          expect(imgs.eq(0)).toHaveAttr('src', 'img/a.png');
          expect(imgs.eq(1)).toHaveAttr('src', 'img/a.png');
          expect(imgs.eq(2)).toHaveAttr('src', 'img/b.png');
          expect(imgs.eq(3)).toHaveAttr('src', 'img/c.png');
          expect(imgs.eq(4)).toHaveAttr('src', 'img/d.png');
        });

        context('when on icon is not especified', function() {
          it ('uses the :starOn icon', function() {
            // given
            var self = $('#element').raty({
                  iconRange: [
                    { range: 2, off: 'off.png', on: 'on.png' },
                    { range: 3, off: 'off.png', on: 'on.png' },
                    { range: 4, off: 'off.png', on: 'on.png' },
                    { range: 5, off: 'off.png' }
                  ]
                }),
                imgs = self.children('img');

            // when
            imgs.eq(4).mouseover();

            // then
            expect(imgs.eq(0)).toHaveAttr('src', 'img/on.png');
            expect(imgs.eq(1)).toHaveAttr('src', 'img/on.png');
            expect(imgs.eq(2)).toHaveAttr('src', 'img/on.png');
            expect(imgs.eq(3)).toHaveAttr('src', 'img/on.png');
            expect(imgs.eq(4)).toHaveAttr('src', 'img/star-on.png');
          });
        });
      });

      context('on mouseout', function() {
        it ('set off range icons on mouseleave', function() {
          // given
          var self = $('#element').raty({
                iconRange: [
                  { range: 2, on: 'a.png', off: 'a-off.png' },
                  { range: 3, on: 'b.png', off: 'b-off.png' },
                  { range: 4, on: 'c.png', off: 'c-off.png' },
                  { range: 5, on: 'd.png', off: 'd-off.png' },
                ]
              }),
              imgs = self.children('img');

          // when
          imgs.eq(4).mouseover();

          self.mouseleave();

          // then
          expect(imgs.eq(0)).toHaveAttr('src', 'img/a-off.png');
          expect(imgs.eq(1)).toHaveAttr('src', 'img/a-off.png');
          expect(imgs.eq(2)).toHaveAttr('src', 'img/b-off.png');
          expect(imgs.eq(3)).toHaveAttr('src', 'img/c-off.png');
          expect(imgs.eq(4)).toHaveAttr('src', 'img/d-off.png');
        });

        it ('keeps the score value', function() {
          // given
          var self = $('#element').raty({
                iconRange: [
                  { range: 2, on: 'a.png', off: 'a-off.png' },
                  { range: 3, on: 'b.png', off: 'b-off.png' },
                  { range: 4, on: 'c.png', off: 'c-off.png' },
                  { range: 5, on: 'd.png', off: 'd-off.png' }
                ],
                starOff: 'off.png',
                score: 1
              }),
              imgs = self.children('img');

          // when
          imgs.eq(4).mouseover();

          self.mouseleave();

          // then
          expect(imgs.eq(0)).toHaveAttr('src', 'img/a.png');
          expect(imgs.eq(1)).toHaveAttr('src', 'img/a-off.png');
          expect(imgs.eq(2)).toHaveAttr('src', 'img/b-off.png');
          expect(imgs.eq(3)).toHaveAttr('src', 'img/c-off.png');
          expect(imgs.eq(4)).toHaveAttr('src', 'img/d-off.png');

          expect(self.children('input')).toHaveValue(1);
        });
      });

      context('when off icon is not especified', function() {
        it ('uses the :starOff icon', function() {
          // given
          var self = $('#element');

          // when
          self.raty({
            iconRange: [
              { range: 2, on: 'on.png', off: 'off.png' },
              { range: 3, on: 'on.png', off: 'off.png' },
              { range: 4, on: 'on.png', off: 'off.png' },
              { range: 5, on: 'on.png' }
            ]
          });

          // then
          expect(self.children('img').eq(4)).toHaveAttr('src', 'img/star-off.png');
        });
      });
    });

    describe('#click', function() {
      it ('has this as the self element', function() {
        // given
        var self = $('#element').raty({
            click: function() {
              $(this).data('self', this);
            }
          });

        // when
        self.children('img:first').mouseover().click();

        // then
        expect(self.data('self')).toBe(self);
      });

      it ('is called on star click', function() {
        // given
        var self = $('#element').raty({
              click: function() {
                $(this).data('clicked', true);
              }
            });

        // when
        self.children('img:first').mouseover().click();

        // then
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
        self.children('img:first').mouseover().click();

        // then
        expect(self.data('score')).toEqual(1);
      });
    });

    describe('#score', function() {
      it ('starts with 3 stars', function() {
        // given
        var self = $('#element');

        // when
        self.raty({ score: 3 });

        // then
        var imgs = self.children('img');

        expect(imgs.eq(0)).toHaveAttr('src', 'img/star-on.png');
        expect(imgs.eq(1)).toHaveAttr('src', 'img/star-on.png');
        expect(imgs.eq(2)).toHaveAttr('src', 'img/star-on.png');
        expect(imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
        expect(imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');
      });

      context('with negative number', function() {
				it ('gets none score', function() {
			    // given
			    var self = $('#element');

			    // when
			    self.raty({ score: -50 });

			    // then
			    expect(self.children('input').val()).toEqual('');
			  });
			});

      context('when start is :readOnly', function() {
        it ('becomes readOnly', function() {
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
      it ('changes the score field name', function() {
        // given
        var self = $('#element');

        // when
        self.raty({ scoreName: 'entity.score' });

        // then
        expect(self.children('input')).toHaveAttr('name', 'entity.score');
      });
    });

    describe('#readOnly', function() {
      it ('starts applying "not rated yet" on stars', function() {
        // given
        var self = $('#element');

        // when
        self.raty({ readOnly: true });

        // then
        expect(self.children('img')).toHaveAttr('title', 'not rated yet');
      });
    });

    describe('#hint', function() {
      it ('changes the hints', function() {
        // given
        var self = $('#element');

        // when
        self.raty({ hints: ['1', '/', 'c', '-', '#'] });

        // then
        var imgs = self.children('img');

        expect(imgs.eq(0)).toHaveAttr('title', 1);
        expect(imgs.eq(1)).toHaveAttr('title', '/');
        expect(imgs.eq(2)).toHaveAttr('title', 'c');
        expect(imgs.eq(3)).toHaveAttr('title', '-');
        expect(imgs.eq(4)).toHaveAttr('title', '#');
      });

      it ('sets the star number when hint is null', function() {
        // given
        var self = $('#element');

        // when
        self.raty({ hints: [null, '2', '3', '4', '5'] });

        // then
        var imgs = self.children('img');

        expect(imgs.eq(0)).toHaveAttr('title', 1);
        expect(imgs.eq(1)).toHaveAttr('title', 2);
        expect(imgs.eq(2)).toHaveAttr('title', 3);
        expect(imgs.eq(3)).toHaveAttr('title', 4);
        expect(imgs.eq(4)).toHaveAttr('title', 5);
      });

      context('whe has less hint than stars', function() {
        it ('uses default index hint', function() {
          // given
          var self = $('#element');

          // when
          self.raty({ hints: ['1', '2', '3', '4'] });

          // then
          var imgs = self.children('img');

          expect(imgs.eq(0)).toHaveAttr('title', 1);
          expect(imgs.eq(1)).toHaveAttr('title', 2);
          expect(imgs.eq(2)).toHaveAttr('title', 3);
          expect(imgs.eq(3)).toHaveAttr('title', 4);
          expect(imgs.eq(4)).toHaveAttr('title', 'gorgeous');
        });
      });

      context('whe has more stars than hints', function() {
        it ('sets star number', function() {
          // given
          var self = $('#element');

          // when
          self.raty({ number: 6, hints: ['1', '2', '3', '4', '5'] });

          // then
          var imgs = self.children('img');

          expect(imgs.eq(0)).toHaveAttr('title', 1);
          expect(imgs.eq(1)).toHaveAttr('title', 2);
          expect(imgs.eq(2)).toHaveAttr('title', 3);
          expect(imgs.eq(3)).toHaveAttr('title', 4);
          expect(imgs.eq(4)).toHaveAttr('title', 5);
          expect(imgs.eq(5)).toHaveAttr('title', 6);
        });
      });
    });

    describe('#number', function() {
      it ('changes the number of stars', function() {
        // given
        var self = $('#element');

        // when
        self.raty({ number: 7 });

        // then
        var imgs = self.children('img');

        expect(imgs.eq(0)).toHaveAttr('title', 'bad');
        expect(imgs.eq(1)).toHaveAttr('title', 'poor');
        expect(imgs.eq(2)).toHaveAttr('title', 'regular');
        expect(imgs.eq(3)).toHaveAttr('title', 'good');
        expect(imgs.eq(4)).toHaveAttr('title', 'gorgeous');
        expect(imgs.eq(5)).toHaveAttr('title', '6');
        expect(imgs.eq(6)).toHaveAttr('title', '7');

        expect(imgs).toHaveAttr('src', 'img/star-off.png');
      });
    });

    describe('#path', function() {
      it ('changes the path', function() {
        // given
        var self = $('#element');

        // when
        self.raty({ path: 'path' });

        // then
        expect(self.children('img')).toHaveAttr('src', 'path/star-off.png');
      });
    });

    describe('#cancel', function() {
	      context('as false', function() {
	        it ('creates the element', function() {
	          // given
	          var self = $('#element');

	          // when
	          self.raty({ cancel: false });

	          var cancel = self.children('img:first');

	          // then
	          expect(cancel).not.toHaveClass('raty-cancel');
	          expect(cancel).not.toHaveAttr('title', 'cancel this rating!');
	          expect(cancel).not.toHaveAttr('alt', 'x');
	          expect(cancel).not.toHaveAttr('src', 'img/cancel-off.png');
	        });
	      });

      context('as true', function() {
        it ('creates the element', function() {
          // given
          var self = $('#element');

          // when
          self.raty({ cancel: true });

          var cancel = self.children('img:first');

          // then
          expect(cancel).toHaveClass('raty-cancel');
          expect(cancel).toHaveAttr('title', 'cancel this rating!');
          expect(cancel).toHaveAttr('alt', 'x');
          expect(cancel).toHaveAttr('src', 'img/cancel-off.png');
        });

        context('on mouseover', function() {
          it ('turns off the stars', function() {
            // given
            var self  = $('#element').raty({ score: 3, cancel: true }),
                imgs  = self.children('img');

            // when
            self.children('img:first').mouseenter();

            // then
            expect(imgs.eq(1)).toHaveAttr('src', 'img/star-off.png');
            expect(imgs.eq(2)).toHaveAttr('src', 'img/star-off.png');
            expect(imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
            expect(imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');
            expect(imgs.eq(5)).toHaveAttr('src', 'img/star-off.png');
          });

          context('with :mouseover', function() {
            it ('receives the cancel value', function() {
              // given
              var self = $('#element').raty({
                    cancel    : true,
                    mouseover : function(score) {
                      self.data('null', score);
                    }
                  });

              // when
              self.children('.raty-cancel').mouseover();

              // then
              expect(self.data('null')).toBeNull();
            });
          });

          context('with :size', function() {
            it ('calculates the right icon size with cancel button', function() {
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

          context('with #space off', function() {
            it ('takes off the space between the start and the cancel button', function() {
              // given
              var self     = $('#element');
                  size    = 16,
                  stars   = 5;

              // when
              self.raty({ cancel: true, space: false });

              // then
              expect(self.width()).toEqual(size + (size * stars));
            });
          });
        });

        context('when mouseout', function() {
          context('with :mouseout', function() {
            context('with score setted', function() {
              it ('pass the score on callback', function() {
                // given
                var self = $('#element').raty({
                      cancel   : true,
                      score     : 1,
                      mouseout: function(score) {
                        self.data('one', score);
                      }
                    });

                // when
                self.children('.raty-cancel').mouseenter().mouseleave();

                // then
                expect(self.data('one')).toEqual(1);
              });
            });

            context('without score setted', function() {
              it ('pass undefined on callback', function() {
                // given
                var self = $('#element').raty({
                      cancel   : true,
                      mouseout: function(score) {
                        self.data('undefined', score === undefined);
                      }
                    });

                // when
                self.children('.raty-cancel').mouseenter().mouseleave();

                // then
                expect(self.data('undefined')).toBeTruthy();
              });
            });
          });
        });

        context('when starts :readOnly', function() {
          it ('starts hidden', function() {
            // given
            var self = $('#element').raty({ cancel: true, readOnly: true });

            // when
            self.raty('readOnly', true);

            // then
            expect(self.children('.raty-cancel')).toBeHidden();
          });

          context('on click', function() {
            it ('does not cancel the rating', function() {
              // given
              var self = $('#element').raty({ readOnly: true, score: 1 });

              // when
              self.children('.raty-cancel').click();

              // then
              var imgs = self.children('img');

              expect(imgs.eq(0)).toHaveAttr('src', 'img/star-on.png');
              expect(imgs.eq(1)).toHaveAttr('src', 'img/star-off.png');
              expect(imgs.eq(2)).toHaveAttr('src', 'img/star-off.png');
              expect(imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
              expect(imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');
              expect(self.children('input').val()).toEqual('1');
            });
          });

          context('when :readOnly becomes off', function() {
            it ('becomes visible', function() {
              // given
              var self = $('#element').raty({ cancel: true, readOnly: true, path: '../img' });

              // when
              self.raty('readOnly', false);

              // then
              expect(self.children('.raty-cancel')).toBeVisible();
              expect(self.children('.raty-cancel')).not.toHaveCss({ display: 'none' });
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

        context('on click', function() {
          it ('cancels the rating', function() {
            // given
            var self  = $('#element').raty({ score: 1, cancel: true }),
                imgs  = self.children('img');

            // when
            self.children('img:first').mouseover().click().mouseleave();

            // then
            expect(imgs.eq(1)).toHaveAttr('src', 'img/star-off.png');
            expect(imgs.eq(2)).toHaveAttr('src', 'img/star-off.png');
            expect(imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
            expect(imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');
            expect(imgs.eq(5)).toHaveAttr('src', 'img/star-off.png');
          });

           it ('executes cancel click callback', function() {
            // given
            var self = $('#element').raty({
                cancel: true,
                click  : function(score) {
                  $(this).attr('title', score === null);
                }
               });

            // when
            self.children('.raty-cancel').mouseover().click().mouseleave();

            // then
            expect(self).toHaveAttr('title', 'true');
          });
        });

        describe('#cancelOff', function() {
          it ('changes the icon', function() {
            // given
            var self = $('#element');

            // when
            self.raty({ cancel: true, cancelOff: 'off.png' });

            // then
            var cancel = self.children('.raty-cancel');

            expect(cancel).toHaveAttr('src', 'img/off.png');
          });
        });

        describe('#cancelOn', function() {
          it ('changes the icon', function() {
            // given
            var self = $('#element');

            // when
            self.raty({ cancel: true, cancelOn: 'cancel.png' });

            var cancel = self.children('.raty-cancel').mouseenter();

            // then
            expect(cancel).toHaveAttr('src', 'img/cancel.png');
          });
        });

        describe('#cancelHint', function() {
          it ('changes the hint', function() {
            // given
            var self = $('#element');

            // when
            self.raty({ cancel: true, cancelHint: 'hint' });

            var cancel = self.children('.raty-cancel');

            // then
            expect(cancel).toHaveAttr('title', 'hint');
          });
        });

        describe('#cancelPlace', function() {
          it ('creates the element on the right side', function() {
            // given
            var self = $('#element');

            // when
            self.raty({ cancel: true, cancelPlace: 'right' });

            var cancel = self.children('img:last');

            // then
            expect(cancel).toHaveClass('raty-cancel');
            expect(cancel).toHaveAttr('title', 'cancel this rating!');
            expect(cancel).toHaveAttr('alt', 'x');
            expect(cancel).toHaveAttr('src', 'img/cancel-off.png');
          });
         });
      });
    });

	  describe('#target', function() {
	  	context('on start', function() {
	  		context('with :targetKeep', function() {
	  			context('with a div as target', function() {
          	beforeEach(function() { buildDivTarget(); });

			  	  it ('set target with none value', function() {
					    // given
					    var hint  = $('#hint'),
					        self = $('#element');

					    // when
					    self.raty({ target: '#hint', targetKeep: true, targetText: 'none' });

					    // then
					    expect(hint).toHaveHtml('none');
					  });
					});
				});
			});

      context('on mouseover', function() {
        context('with a div as target', function() {
          beforeEach(function() { buildDivTarget(); });

          it ('receives the hint value', function() {
            // given
            var target = $('#hint'),
                self   = $('#element').raty({ target: '#hint' });

            // when
            self.children('img:first').mouseover();

            // then
            expect(target).toHaveHtml('bad');
          });

          context('with :targetType as number', function() {
            it ('receives the number value', function() {
              // given
              var target = $('#hint'),
                  self   = $('#element').raty({ target: '#hint', targetType: 'number' });

              // when
              self.children('img:first').mouseover();

              // then
              expect(target).toHaveHtml('1');
            });
          });

          context('with :cancel', function() {
            it ('receives the hint value', function() {
              // given
              var self = $('#element').raty({ cancel: true, target: '#hint' });

              // when
              self.children('.raty-cancel').mouseenter();

              // then
              expect($('#hint')).toHaveHtml('cancel this rating!');
            });

            context('with :targetType as number', function() {
              it ('receives an empty value', function() {
                // given
                var target = $('#hint'),
                    self   = $('#element').raty({ cancel: true, target: '#hint', targetType: 'number' });

                // when
                self.children('.raty-cancel').mouseenter();

                // then
                expect(target).toHaveHtml('');
              });
            });

            context('and :cancelHint', function() {
              it ('receives the cancel hint', function() {
                // given
                var self = $('#element').raty({
                      cancel    : true,
                      cancelHint: 'cancel-hint-custom',
                      target    : '#hint',
                    });

                // when
                self.children('.raty-cancel').mouseenter();

                // then
                expect($('#hint')).toHaveHtml('cancel-hint-custom');
              });
            });
          });

          context('with :precision', function() {
            context('with :targetKeep', function() {
              context('with :targetType as number', function() {
                context('with a big :score', function() {
                  it ('receives the float with one fractional number', function() {
                    // given
                    var hint = $('#hint'),
                        self = $('#element');

                    // when
                    self.raty({
                      precision  : true,
                      score      : 1.2333,
                      target    : '#hint',
                      targetKeep: true,
                      targetType: 'number'
                    });

                    // then
                    expect(hint).toHaveHtml('1.2');
                  });
                });
              });
            });
          });

          context('with :targetFormat', function() {
            it ('set target with format on mouseover', function() {
              // given
              var hint = $('#hint'),
                  self = $('#element').raty({ target: '#hint', targetFormat: 'score: {score}' });

              // when
              self.children('img:first').mouseover();

              // then
              expect(hint).toHaveHtml('score: bad');
            });
          });
        });

        context('with a text as target', function() {
          beforeEach(function() { buildTextTarget(); });

          it ('receives the hint value', function() {
            // given
            var target = $('#hint'),
                self    = $('#element').raty({ target: '#hint' });

            // when
            self.children('img:first').mouseover();

            // then
            expect(target).toHaveValue('bad');
          });

          context('with :targetType as number', function() {
            it ('receives the number value', function() {
              // given
              var target = $('#hint'),
                  self   = $('#element').raty({ target: '#hint', targetType: 'number' });

              // when
              self.children('img:first').mouseover();

              // then
              expect(target.val()).toEqual('1');
            });
          });

          context('with :cancel', function() {
            it ('receives the hint value', function() {
              // given
              var self = $('#element').raty({ cancel: true, target: '#hint' });

              // when
              self.children('.raty-cancel').mouseenter();

              // then
              expect($('#hint')).toHaveValue('cancel this rating!');
            });

            context('with :targetType as number', function() {
              it ('receives the number value', function() {
                // given
                var target = $('#hint'),
                    self   = $('#element').raty({ cancel: true, target: '#hint', targetType: 'number' });

                // when
                self.children('.raty-cancel').mouseenter();

                // then
                expect(target).toHaveValue('');
              });
            });

            context('and :cancelHint', function() {
              it ('receives the cancel hint', function() {
                // given
                var self = $('#element').raty({
                      cancel    : true,
                      cancelHint: 'hint',
                      target    : '#hint',
                    });

                // when
                self.children('.raty-cancel').mouseenter();

                // then
                expect($('#hint')).toHaveValue('hint');
              });
            });
          });

          context('with :targetFormat', function() {
            it ('set target with format on mouseover', function() {
              // given
              var hint = $('#hint'),
                  self = $('#element').raty({ target: '#hint', targetFormat: 'score: {score}' });

              // when
              self.children('img:first').mouseover();

              // then
              expect(hint).toHaveValue('score: bad');
            });
          });
        });

        context('with a textarea as target', function() {
          beforeEach(function() { buildTextareaTarget(); });

          it ('receives the hint value', function() {
            // given
            var target = $('#hint'),
                self    = $('#element').raty({ target: '#hint' });

            // when
            self.children('img:first').mouseover();

            // then
            expect(target).toHaveValue('bad');
          });

          context('with :targetType as number', function() {
            it ('receives the number value', function() {
              // given
              var target = $('#hint'),
                  self   = $('#element').raty({ target: '#hint', targetType: 'number' });

              // when
              self.children('img:first').mouseover();

              // then
              expect(target).toHaveValue('1');
            });
          });

          context('with :cancel', function() {
            it ('receives the hint value', function() {
              // given
              var self = $('#element').raty({ cancel: true, target: '#hint' });

              // when
              self.children('.raty-cancel').mouseenter();

              // then
              expect($('#hint')).toHaveValue('cancel this rating!');
            });

            context('with :targetType as number', function() {
              it ('receives the number value', function() {
                // given
                var target = $('#hint'),
                    self   = $('#element').raty({ cancel: true, target: '#hint', targetType: 'number' });

                // when
                self.children('.raty-cancel').mouseenter();

                // then
                expect(target).toHaveValue('');
              });
            });

            context('and :cancelHint', function() {
              it ('receives the cancel hint', function() {
                // given
                var self = $('#element').raty({
                      cancel    : true,
                      cancelHint: 'hint',
                      target    : '#hint',
                    });

                // when
                self.children('.raty-cancel').mouseenter();

                // then
                expect($('#hint')).toHaveValue('hint');
              });
            });
          });

          context('with :targetFormat', function() {
            it ('set target with format on mouseover', function() {
              // given
              var hint = $('#hint'),
                  self = $('#element').raty({ target: '#hint', targetFormat: 'score: {score}' });

              // when
              self.children('img:first').mouseover();

              // then
              expect(hint).toHaveValue('score: bad');
            });
          });
        });

        context('with a combobox as target', function() {
          beforeEach(function() { buildComboboxTarget(); });

          it ('receives the hint value', function() {
            // given
            var target = $('#hint'),
                self    = $('#element').raty({ target: '#hint' });

            // when
            self.children('img:first').mouseover();

            // then
            expect(target).toHaveValue('bad');
          });

          context('with :targetType as number', function() {
            it ('receives the number value', function() {
              // given
              var target = $('#hint'),
                  self   = $('#element').raty({ target: '#hint', targetType: 'number' });

              // when
              self.children('img:first').mouseover();

              // then
              expect(target).toHaveValue('1');
            });
          });

          context('with :cancel', function() {
            it ('receives the hint value', function() {
              // given
              var self = $('#element').raty({ cancel: true, target: '#hint' });

              // when
              self.children('.raty-cancel').mouseenter();

              // then
              expect($('#hint')).toHaveValue('cancel this rating!');
            });

            context('with :targetType as number', function() {
              it ('receives the number value', function() {
                // given
                var target = $('#hint'),
                    self   = $('#element').raty({ cancel: true, target: '#hint', targetType: 'number' });

                // when
                self.children('img:first').mouseover();

                // then
                expect(target).toHaveValue('');
              });
            });

            context('and :cancelHint', function() {
              it ('receives the cancel hint', function() {
                // given
                var self = $('#element').raty({
                      cancel    : true,
                      cancelHint: 'cancel-hint-custom',
                      target    : '#hint',
                    });

                // when
                self.children('.raty-cancel').mouseenter();

                // then
                expect($('#hint')).toHaveValue('cancel-hint-custom');
              });
            });
          });

          context('with :targetFormat', function() {
            it ('set target with format on mouseover', function() {
              // given
              var hint = $('#hint'),
                  self = $('#element').raty({ target: '#hint', targetFormat: 'score: {score}' });

              // when
              self.children('img:first').mouseover();

              // then
              expect(hint).toHaveValue('score: bad');
            });
          });
        });
      });

      context('on mouseout', function() {
        context('with a div as target', function() {
          beforeEach(function() { buildDivTarget(); });

          it ('gets clear', function() {
            // given
            var target = $('#hint'),
                self   = $('#element').raty({ target: '#hint' });

            // when
            self.children('img:first').click().mouseover().mouseleave();

            // then
            expect(target).toBeEmpty();
          });

          context('with :targetKeep', function() {
            it ('keeps the score', function() {
              // given
              var target = $('#hint'),
                  self   = $('#element').raty({ target: '#hint', targetKeep: true });

              // when
              self.children('img:first').click().mouseover().mouseleave();

              // then
              expect(target).toHaveHtml('bad');
            });

            context('with :targetFormat', function() {
              context('with :score setted', function() {
                it ('keeps the pre score with template', function() {
                  // given
                  var self = $('#element').raty({
                        cancel      : true,
                        score       : 1,
                        target      : '#hint',
                        targetFormat: 'score: {score}',
                        targetKeep  : true
                      });

                  // when
                  self.children('.raty-cancel').mouseenter().mouseout();

                  // then
                  expect($('#hint')).toHaveHtml('score: bad');
                });
              });

              context('with :score clicked', function() {
                it ('keeps the new score with template', function() {
                  // given
                  var hint = $('#hint'),
                      self = $('#element').raty({
                        target      : '#hint',
                        targetFormat: 'score: {score}',
                        targetKeep  : true
                      });

                  // when
                  self.children('img:first').mouseover().click().mouseleave();

                  // then
                  expect(hint).toHaveHtml('score: bad');
                });
              });
            });

            context('with :targetText', function() {
              it ('does ignores targetText', function() {
                // given
                var hint = $('#hint'),
                    self = $('#element').raty({
                      score      : 1,
                      target    : '#hint',
                      targetKeep: true,
                      targetText: 'score has prior over it'
                    });

                // when
                self.children('img:first').mouseover().mouseleave();

                // then
                expect(hint).toHaveHtml('bad');
              });
            });
          });

          context('without :targetKeep', function() {
            context('with :targetText', function() {
              context('without :score', function() {
                it ('receives the targetKeep', function() {
                  // given
                  var hint = $('#hint'),
                      self = $('#element').raty({
                        score: 1,
                        target    : '#hint',
                        targetText: 'targetText'
                      });

                  // when
                  self.children('img:first').mouseover().mouseleave();

                  // then
                  expect(hint).toHaveHtml('targetText');
                });
              });

              context('with :score', function() {
                it ('receives the targetKeep', function() {
                  // given
                  var hint = $('#hint'),
                      self = $('#element').raty({
                        score      : 1,
                        target    : '#hint',
                        targetText: 'targetText'
                      });

                  // when
                  self.children('img:first').mouseover().mouseleave();

                  // then
                  expect(hint).toHaveHtml('targetText');
                });
              });
            });
          });
        });

        context('with a textarea as target', function() {
          beforeEach(function() { buildTextareaTarget(); });

          it ('gets clear', function() {
            // given
            var target = $('#hint'),
                self   = $('#element').raty({ target: '#hint' });

            // when
            self.children('img:first').click().mouseover().mouseleave();

            // then
            expect(target).toHaveValue('');
          });

          context('with :targetKeep', function() {
            it ('keeps the score', function() {
              // given
              var target = $('#hint'),
                  self   = $('#element').raty({ target: '#hint', targetKeep: true });

              // when
              self.children('img:first').click().mouseover().mouseleave();

              // then
              expect(target).toHaveValue('bad');
            });

            context('with :targetText', function() {
              it ('does ignores targetText', function() {
                // given
                var hint = $('#hint'),
                    self = $('#element').raty({
                      score      : 1,
                      target    : '#hint',
                      targetKeep: true,
                      targetText: 'score has prior over it'
                    });

                // when
                self.children('img:first').mouseover().mouseleave();

                // then
                expect(hint).toHaveValue('bad');
              });
            });
          });

          context('without :targetKeep', function() {
            context('with :targetText', function() {
              context('without :score', function() {
                it ('receives the targetKeep', function() {
                  // given
                  var hint = $('#hint'),
                      self = $('#element').raty({
                        score: 1,
                        target    : '#hint',
                        targetText: 'targetText'
                      });

                  // when
                  self.children('img:first').mouseover().mouseleave();

                  // then
                  expect(hint).toHaveValue('targetText');
                });
              });

              context('with :score', function() {
                it ('receives the targetKeep', function() {
                  // given
                  var hint = $('#hint'),
                      self = $('#element').raty({
                        score      : 1,
                        target    : '#hint',
                        targetText: 'targetText'
                      });

                  // when
                  self.children('img:first').mouseover().mouseleave();

                  // then
                  expect(hint).toHaveValue('targetText');
                });
              });
            });
          });
        });

        context('with a text as target', function() {
          beforeEach(function() { buildTextTarget(); });

          it ('gets clear', function() {
            // given
            var target = $('#hint'),
                self   = $('#element').raty({ target: '#hint' });

            // when
            self.children('img:first').click().mouseover().mouseleave();

            // then
            expect(target).toHaveValue('');
          });

          context('with :targetKeep', function() {
            it ('keeps the score', function() {
              // given
              var target = $('#hint'),
                  self   = $('#element').raty({ target: '#hint', targetKeep: true });

              // when
              self.children('img:first').click().mouseover().mouseleave();

              // then
              expect(target).toHaveValue('bad');
            });

            context('with :targetText', function() {
              it ('does ignores targetText', function() {
                // given
                var hint = $('#hint'),
                    self = $('#element').raty({
                      score      : 1,
                      target    : '#hint',
                      targetKeep: true,
                      targetText: 'score has prior over it'
                    });

                // when
                self.children('img:first').mouseover().mouseleave();

                // then
                expect(hint).toHaveValue('bad');
              });
            });
          });

          context('without :targetKeep', function() {
            context('with :targetText', function() {
              context('without :score', function() {
                it ('receives the targetKeep', function() {
                  // given
                  var hint = $('#hint'),
                      self = $('#element').raty({
                        score: 1,
                        target    : '#hint',
                        targetText: 'targetText'
                      });

                  // when
                  self.children('img:first').mouseover().mouseleave();

                  // then
                  expect(hint).toHaveValue('targetText');
                });
              });

              context('with :score', function() {
                it ('receives the targetKeep', function() {
                  // given
                  var hint = $('#hint'),
                      self = $('#element').raty({
                        score      : 1,
                        target    : '#hint',
                        targetText: 'targetText'
                      });

                  // when
                  self.children('img:first').mouseover().mouseleave();

                  // then
                  expect(hint).toHaveValue('targetText');
                });
              });
            });
          });
        });

        context('with a combobox as target', function() {
          beforeEach(function() { buildComboboxTarget(); });

          it ('gets clear', function() {
            // given
            var target = $('#hint'),
                self   = $('#element').raty({ target: '#hint' });

            // when
            self.children('img:first').click().mouseover().mouseleave();

            // then
            expect(target).toHaveValue('');
          });

          context('with :targetKeep', function() {
            it ('keeps the score', function() {
              // given
              var target = $('#hint'),
                  self   = $('#element').raty({ target: '#hint', targetKeep: true });

              // when
              self.children('img:first').click().mouseover().mouseleave();

              // then
              expect(target).toHaveValue('bad');
            });

            context('with :targetText', function() {
              it ('does ignores targetText', function() {
                // given
                var hint = $('#hint'),
                    self = $('#element').raty({
                      score      : 1,
                      target    : '#hint',
                      targetKeep: true,
                      targetText: 'score has prior over it'
                    });

                // when
                self.children('img:first').mouseover().mouseleave();

                // then
                expect(hint).toHaveValue('bad');
              });
            });
          });

          context('without :targetKeep', function() {
            context('with :targetText', function() {
              context('without :score', function() {
                it ('receives the targetKeep', function() {
                  // given
                  var hint = $('#hint'),
                      self = $('#element').raty({
                        score: 1,
                        target    : '#hint',
                        targetText: 'targetText'
                      });

                  // when
                  self.children('img:first').mouseover().mouseleave();

                  // then
                  expect(hint).toHaveValue('targetText');
                });
              });

              context('with :score', function() {
                it ('receives the targetKeep', function() {
                  // given
                  var hint = $('#hint'),
                      self = $('#element').raty({
                        score      : 1,
                        target    : '#hint',
                        targetText: 'targetText'
                      });

                  // when
                  self.children('img:first').mouseover().mouseleave();

                  // then
                  expect(hint).toHaveValue('targetText');
                });
              });
            });
          });
        });
      });
    });

    describe('#size', function() {
      it ('calculate the right icon size', function() {
        // given
        var self   = $('#element'),
            size  = 24,
            stars = 5,
            space  = 4;

        // when
        self.raty({ size: size });

        // then
        expect(self.width()).toEqual((stars * size) + (stars * space));
      });
    });

		describe('#single', function() {
			context('on mouseover', function() {
			  it ('turns on just one icon', function() {
			    // given
			    var self = $('#element').raty({ single: true }),
							imgs = self.children('img');

			    // when
			    imgs.eq(2).mouseover();

			    // then
			    expect(imgs.eq(0)).toHaveAttr('src', 'img/star-off.png');
			    expect(imgs.eq(1)).toHaveAttr('src', 'img/star-off.png');
			    expect(imgs.eq(2)).toHaveAttr('src', 'img/star-on.png');
			    expect(imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
			    expect(imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');
			  });

			  context('with :iconRange', function() {
				  it ('shows just on icon', function() {
				    // given
				    var self = $('#element').raty({
				    			single		: true,
						      iconRange	: [
						        { range: 2, on: 'a.png', off: 'a-off.png' },
						        { range: 3, on: 'b.png', off: 'b-off.png' },
						        { range: 4, on: 'c.png', off: 'c-off.png' },
						        { range: 5, on: 'd.png', off: 'd-off.png' }
						      ]
						    }),
				    		imgs = self.children('img');

				    // when
				    imgs.eq(3).mouseover();

				    // then
				    expect(imgs.eq(0)).toHaveAttr('src', 'img/a-off.png');
				    expect(imgs.eq(1)).toHaveAttr('src', 'img/a-off.png');
				    expect(imgs.eq(2)).toHaveAttr('src', 'img/b-off.png');
				    expect(imgs.eq(3)).toHaveAttr('src', 'img/c.png');
				    expect(imgs.eq(4)).toHaveAttr('src', 'img/d-off.png');
				  });
				});
			});

			context('on click', function() {
				context('on mouseout', function() {
					it ('keeps the score', function() {
				    // given
				    var self = $('#element').raty({ single: true })
				    		imgs = self.children('img');

				    // when
				    imgs.eq(2).mouseover().click().mouseleave();

				    // then
				    expect(imgs.eq(0)).toHaveAttr('src', 'img/star-off.png');
				    expect(imgs.eq(1)).toHaveAttr('src', 'img/star-off.png');
				    expect(imgs.eq(2)).toHaveAttr('src', 'img/star-on.png');
				    expect(imgs.eq(3)).toHaveAttr('src', 'img/star-off.png');
				    expect(imgs.eq(4)).toHaveAttr('src', 'img/star-off.png');
				  });

					context('with :iconRange', function() {
				  	it ('keeps the score', function() {
					    // given
					    var self = $('#element').raty({
							    	single		: true,
							      iconRange	: [
							        { range: 2, on: 'a.png', off: 'a-off.png' },
							        { range: 3, on: 'b.png', off: 'b-off.png' },
							        { range: 4, on: 'c.png', off: 'c-off.png' },
							        { range: 5, on: 'd.png', off: 'd-off.png' }
							      ]
							    }),
							    imgs = self.children('img');

					    // when
					    imgs.eq(3).mouseover().click().mouseleave();

					    // then
					    expect(imgs.eq(0)).toHaveAttr('src', 'img/a-off.png');
					    expect(imgs.eq(1)).toHaveAttr('src', 'img/a-off.png');
					    expect(imgs.eq(2)).toHaveAttr('src', 'img/b-off.png');
					    expect(imgs.eq(3)).toHaveAttr('src', 'img/c.png');
					    expect(imgs.eq(4)).toHaveAttr('src', 'img/d-off.png');
					  });
					});
				});
			});
		});

    describe('#size', function() {
      it ('builds without space', function() {
        // given
        var self   = $('#element');
            size   = 16,
            stars  = 5,
            space   = 0;

        // when
        self.raty({ space: false });

         // then
        expect(self.width()).toEqual((stars * size) + (stars * space));
      });

      context('with :cancel button', function() {
        it ('builds without space', function() {
          // given
          var self   = $('#element');
              size   = 16,
              stars  = 5,
              space   = 0,
              cancel = 16;

          // when
          self.raty({ cancel: true, space: false });

           // then
          expect(self.width()).toEqual(cancel + space + (stars * size) + (stars * space));
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
                round    : { down: .25, full: .6, up: .76 },
                score    : .5 // score.5 < full.6 === 0
              });

              var imgs = self.children('img');

              // then
              expect(imgs.eq(0)).toHaveAttr('src', 'img/star-off.png');
              expect(imgs.eq(1)).toHaveAttr('src', 'img/star-off.png');
            });

            it ('rounds full when equal the full limit', function() {
              // given
              var self = $('#element');

              // when
              self.raty({
                half    : false,
                halfShow: false,
                round    : { down: .25, full: .6, up: .76 },
                score    : .6 // score.6 == full.6 === 1
              });

              var imgs = self.children('img');

              // then
              expect(imgs.eq(0)).toHaveAttr('src', 'img/star-on.png');
            });
          });
        });

        context('with :precision', function() {
          context('with :target', function() {
            beforeEach(function() { buildDivTarget(); });

            context('with :targetKeep', function() {
              it ('keeps the hint precision', function() {
                // given
                var hint = $('#hint'),
                    self = $('#element').raty({ target: '#hint', targetKeep: true, precision: true });

                // when
                self.children('img:first').mouseover().click().mouseleave();

                // then
                expect(hint).toHaveHtml('bad');
              });
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
                round    : { down: .25, full: .6, up: .76 },
                score    : .24 // score.24 < down.25 === 0
              });

              var imgs = self.children('img');

              // then
              expect(imgs.eq(0)).toHaveAttr('src', 'img/star-off.png');
              expect(self.children('input').val()).toEqual('0.24');
            });

            it ('ignores half while greater then down limit', function() {
              // given
              var self = $('#element');

              // when
              self.raty({
                half    : true,
                halfShow: false,
                round    : { down: .25, full: .6, up: .76 },
                score    : .26 // score.26 > down.25 and score.6 < up.76 === .5
              });

              var imgs = self.children('img');

              // then
              expect(imgs.eq(0)).toHaveAttr('src', 'img/star-off.png');
              expect(self.children('input').val()).toEqual('0.26');
            });

            it ('ignores half while equal full limit, ignoring it', function() {
              // given
              var self = $('#element');

              // when
              self.raty({
                half    : true,
                halfShow: false,
                round    : { down: .25, full: .6, up: .76 },
                score    : .6 // score.6 > down.25 and score.6 < up.76 === .5
              });

              var imgs = self.children('img');

              // then
              expect(imgs.eq(0)).toHaveAttr('src', 'img/star-on.png');
              expect(self.children('input').val()).toEqual('0.6');
            });

            it ('ignores half while greater than down limit and less than up limit', function() {
              // given
              var self = $('#element');

              // when
              self.raty({
                half    : true,
                halfShow: false,
                round    : { down: .25, full: .6, up: .76 },
                score    : .75 // score.75 > down.25 and score.75 < up.76 === .5
              });

              var imgs = self.children('img');

              // then
              expect(imgs.eq(0)).toHaveAttr('src', 'img/star-on.png');
              expect(self.children('input').val()).toEqual('0.75');
            });

            it ('ignores full while equal or greater than up limit', function() {
              // given
              var self = $('#element');

              // when
              self.raty({
                half    : true,
                halfShow: false,
                round    : { down: .25, full: .6, up: .76 },
                score    : .76 // score.76 == up.76 === 1
              });

              var imgs = self.children('img');

              // then
              expect(imgs.eq(0)).toHaveAttr('src', 'img/star-on.png');
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
                round    : { down: .25, full: .6, up: .76 },
                score    : .24 // score.24 < down.25 === 0
              });

              var imgs = self.children('img');

              // then
              expect(imgs.eq(0)).toHaveAttr('src', 'img/star-off.png');
            });

            it ('receives half while greater then down limit', function() {
              // given
              var self = $('#element');

              // when
              self.raty({
                half    : true,
                halfShow: true,
                round    : { down: .25, full: .6, up: .76 },
                score    : .26 // score.26 > down.25 and score.6 < up.76 === .5
              });

              var imgs = self.children('img');

              // then
              expect(imgs.eq(0)).toHaveAttr('src', 'img/star-half.png');
            });

            it ('receives half while equal full limit, ignoring it', function() {
              // given
              var self = $('#element');

              // when
              self.raty({
                half    : true,
                halfShow: true,
                round    : { down: .25, full: .6, up: .76 },
                score    : .6 // score.6 > down.25 and score.6 < up.76 === .5
              });

              var imgs = self.children('img');

              // then
              expect(imgs.eq(0)).toHaveAttr('src', 'img/star-half.png');
            });

            it ('receives half while greater than down limit and less than up limit', function() {
              // given
              var self = $('#element');

              // when
              self.raty({
                half    : true,
                halfShow: true,
                round    : { down: .25, full: .6, up: .76 },
                score    : .75 // score.75 > down.25 and score.75 < up.76 === .5
              });

              var imgs = self.children('img');

              // then
              expect(imgs.eq(0)).toHaveAttr('src', 'img/star-half.png');
            });

            it ('receives full while equal or greater than up limit', function() {
              // given
              var self = $('#element');

              // when
              self.raty({
                half    : true,
                halfShow: true,
                round    : { down: .25, full: .6, up: .76 },
                score    : .76 // score.76 == up.76 === 1
              });

              var imgs = self.children('img');

              // then
              expect(imgs.eq(0)).toHaveAttr('src', 'img/star-on.png');
            });
          });
        });

        context('with :target', function() {
          beforeEach(function() { buildDivTarget(); });

          context('with :precision', function() {
            context('with :targetType as number', function() {
              context('with :targetKeep', function() {
                context('with :targetType as number', function() {
                  it ('set .5 increment value target with half option and no precision', function() {
                    // given
                    var hint = $('#hint'),
                        self = $('#element');

                    // when
                    self.raty({
                      half      : true,
                      precision : false,
                      score     : 1.5,
                      target    : '#hint',
                      targetKeep: true,
                      targetType: 'number'
                    });

                    // then
                    expect(hint).toHaveHtml('1.5');
                  });
                });
              });
            });
          });
        });
      });
    });
  });

	describe('functions', function() {
		describe('#score', function() {
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
			  it ('gets null to emulate cancel', function() {
			    // given
			    var self = $('#element').raty({ score: 0 });

			    // when
			    var score = self.raty('score');

			    // then
			    expect(score).toEqual(null);
			  });
			});

		  context('with score greater than :numberMax', function() {
				it ('gets the max', function() {
			    // given
			    var self = $('#element').raty({ number: 50, score: 50 });

			    // when
			    var score = self.raty('score');

			    // then
			    expect(score).toEqual(self.data('settings').numberMax);
			  });
			});
		});
	});
});

