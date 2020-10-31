describe('#targetFormat', function() {
  beforeEach(function() {
    $.raty.path = '../lib/images';

    $('body').append('<div id="element"></div>');
    $('body').append('<div id="hint"></div>');
  });

  afterEach(function() {
    $('#element').remove();
    $('#hint').remove();
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
