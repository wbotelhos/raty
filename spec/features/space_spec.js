describe('#space', function() {
  beforeEach(function() {
    $.raty.path = '../lib/images';

    $('body').append('<div id="element"></div>');
  });

  afterEach(function() {
    $('#element').remove();
    $('#hint').remove();
  });

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
        self.raty({ cancelButton: true, space: true });

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
        self.raty({ cancelButton: true, space: false });

        // then
        expect(self.text().length).toEqual(1);
      });
    });
  });
});
