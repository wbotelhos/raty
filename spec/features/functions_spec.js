describe('functions', function() {
  beforeEach(function() {
    $.raty.path = '../lib/images';

    $('body').append('<div id="element"></div>');
  });

  afterEach(function() {
    $('#element').remove();
    $('#hint').remove();
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
        var score = self.data('raty').fnScore();

        // then
        expect(score).toEqual(1);
      });
    });

    context('with float score', function() {
      it ('gets as float', function() {
        // given
        var self = $('#element').raty({ score: 1.5 });

        // when
        var score = self.data('raty').fnScore();

        // then
        expect(score).toEqual(1.5);
      });
    });

    context('with score zero', function() {
      it('returns an undefined value because it does not exist', function() {
        // given
        var self = $('#element').raty({ score: 0 });

        // when
        var score = self.data('raty').fnScore();

        // then
        expect(score).toBeUndefined();
      });
    });

    context('with score greater than :numberMax', function() {
      it ('gets the max', function() {
        // given
        var self = $('#element').raty({ number: 50, score: 50 });

        // when
        var score = self.data('raty').fnScore();

        // then
        expect(score).toEqual(self.data('raty').opt.numberMax);
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
      self.data('raty').click(1);

      // then
      expect(self.children('img')).toHaveAttr('src', '../lib/images/star-on.png');
      expect(self.data('clicked')).toBeTruthy();
    });

    it ('receives the score', function() {
      // given
      var self = $('#element').raty({
        click: function(score) {
          this.result = score;
        }
      });

      // when
      self.data('raty').click(1);

      // then
      expect(self[0].result).toEqual(1);
    });

    it ('receives the event', function() {
      // given
      var self = $('#element').raty({
        click: function(score, evt) {
          $(this).data('evt', evt);
        }
      });

      // when
      self.data('raty').click(1);

      // then
      expect(self.data('evt').type).toEqual('click');
    });

    describe('with :readOnly', function() {
      it ('does not set the score', function() {
        // given
        var self = $('#element').raty({ readOnly: true });

        // when
        self.data('raty').click(1);

        // then
        expect(self.children('img')).toHaveAttr('src', '../lib/images/star-off.png');
      });
    });

    context('without :click', function() {
      it('ignores the callback', function() {
        // given
        var self = $('#element').raty();

        // when
        var lambda = function() { self.data('raty').click(1); };

        // then
        expect(lambda).not.toThrow();
      });
    });

    context('with :target', function() {
      beforeEach(function() {
        $('body').append('<div id="hint"></div>');
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
          self.data('raty').click(1);

          // then
          expect($('#hint')).toHaveHtml('bad');
        });
      });
    });
  });
});
