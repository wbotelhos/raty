describe('#targetText', function() {
  beforeEach(function() {
    $.raty.path = '../lib/images';

    $('body').append('<div id="element"></div>');
    $('body').append('<div id="hint"></div>');
  });

  afterEach(function() {
    $('#element').remove();
    $('#hint').remove();
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
