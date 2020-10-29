describe('get #score', function() {
  beforeEach(function() {
    $.raty.path = '../lib/images';

    $('body').append('<div id="element"></div>');
  });

  afterEach(function() {
    $('#element').remove();
    $('#hint').remove();
  });

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
      var score = self.data('raty').score();

      // then
      expect(score).toEqual(1);
    });
  });

  context('with float score', function() {
    it ('gets as float', function() {
      // given
      var self = $('#element').raty({ score: 1.5 });

      // when
      var score = self.data('raty').score();

      // then
      expect(score).toEqual(1.5);
    });
  });

  context('with score zero', function() {
    it('returns an undefined value because it does not exist', function() {
      // given
      var self = $('#element').raty({ score: 0 });

      // when
      var score = self.data('raty').score();

      // then
      expect(score).toBeUndefined();
    });
  });

  context('with score greater than :numberMax', function() {
    it ('gets the max', function() {
      // given
      var self = $('#element').raty({ number: 50, score: 50 });

      // when
      var score = self.data('raty').score();

      // then
      expect(score).toEqual(self.data('raty').opt.numberMax);
    });
  });
});
