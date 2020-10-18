describe('options', function() {
  beforeEach(function() {
    $.raty.path = '../lib/images';

    $('body').append('<div id="element"></div>');
  });

  afterEach(function() {
    $('#element').remove();
    $('#hint').remove();
  });

  describe('#targetText', function() {
    beforeEach(function() {
      $('body').append('<div id="hint"></div>');
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
        $('body').append('<div id="hint"></div>');
      });

      it ('stars empty', function() {
        // given
        var self = $('#element');

        // when
        self.raty({ target: '#hint', targetFormat: 'score: {score}' });

        // then
        expect($('#hint')).toBeEmpty();
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
        self = $('#element').raty({ targetScore: '#score' });
      var stars = self.children('img');

      // when
      stars.eq(0).trigger('click');

      // then
      expect(this.score).toHaveValue('1');
    });
  });

  describe('#space', function() {
    context('when off', function() {
      it('keeps the spaces', function() {
        // given
        var self = $('#element');

        // when
        self.raty({ space: true });

        // then
        expect(self.text().length).toEqual(4);
      });

      context('with :cancel', function() {
        it('adds on more space', function() {
          // given
          var self = $('#element');

          // when
          self.raty({ cancel: true, space: true });

          // then
          expect(self.text().length).toEqual(5);
        });
      });
    });

    context('when off', function() {
      it('takes off the spaces', function() {
        // given
        var self = $('#element');

        // when
        self.raty({ space: false });

        // then
        expect(self.text().length).toEqual(0);
      });

      context('with :cancel', function() {
        it('keeps the cancel space', function() {
          // given
          var self = $('#element');

          // when
          self.raty({ cancel: true, space: false });

          // then
          expect(self.text().length).toEqual(1);
        });
      });
    });
  });

  describe('#single', function() {
    context('on mouseover', function() {
      it ('turns on just one icon', function() {
        // given
        var self = $('#element').raty({ single: true });
        var stars = self.children('img');

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
          });
          var stars = self.children('img');

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
      it ('turns on the star', function() {
        // given
        var self  = $('#element').raty({ single: true });
        var stars = self.children('img');

        // when
        stars.eq(2).trigger('mouseover').trigger('click');

        // then
        expect(stars.eq(0)).toHaveAttr('src', '../lib/images/star-off.png');
        expect(stars.eq(1)).toHaveAttr('src', '../lib/images/star-off.png');
        expect(stars.eq(2)).toHaveAttr('src', '../lib/images/star-on.png');
        expect(stars.eq(3)).toHaveAttr('src', '../lib/images/star-off.png');
        expect(stars.eq(4)).toHaveAttr('src', '../lib/images/star-off.png');
      });

      context('on mouseout', function() {
        it ('keeps the score', function() {
          // given
          var self = $('#element').raty({ single: true });
          var stars = self.children('img');

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
            });
            var stars = self.children('img');

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
          });
          var stars = self.children('img');

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
            });
            var stars = self.children('img');

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
          });
          var stars = self.children('img');

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
            });
            var img = self.children('img').eq(4);

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
