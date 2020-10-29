describe('#targetScore', function() {
  beforeEach(function() {
    $.raty.path = '../lib/images';

    $('body').append('<div id="element"></div>');

    this.scoreField = $('<input id="score" type="text" />').appendTo('body');
  });

  afterEach(function() {
    $('#element').remove();
    $('#hint').remove();

    this.scoreField.remove();
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
    expect(this.scoreField).toHaveValue('1');
  });
});
