describe('#click', function() {
  beforeEach(function() {
    $.raty.path = '../lib/images';

    $('body').append('<div id="element"></div>');
  });

  afterEach(function() {
    $('#element').remove();
    $('#hint').remove();
  });

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
