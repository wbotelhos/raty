describe('#targetFormat', function () {
  beforeEach(function () {
    $('body').append('<div id="element"></div>');
    $('body').append('<div id="hint"></div>');
  });

  afterEach(function () {
    $('#element').remove();
    $('#hint').remove();
  });

  xit('stars empty', function () {
    // given
    var raty = new Raty('#element', { target: '#hint', targetFormat: 'score: {score}' });

    // when
    raty.init();

    // then
    expect($('#hint')).toBeEmpty();
  });

  context('on mouseover', function () {
    xit('set target with format on mouseover', function () {
      // given
      var raty = new Raty('#element', { target: '#hint', targetFormat: 'score: {score}' });

      // when
      Helper.trigger(raty.self.querySelector('img:first-child'), 'mouseover');

      // then
      expect($('#hint')).toHaveHtml('score: bad');
    });
  });

  context('on mouseout', function () {
    xit('clears the target', function () {
      // given
      var raty = new Raty('#element', {
        target: '#hint',
        targetFormat: 'score: {score}',
      });

      // when
      var star = raty.self.querySelector('img:first-child');

      Helper.trigger(star, 'mouseover');
      Helper.trigger(star, 'mouseleave');

      // then
      expect($('#hint')).toBeEmpty();
    });

    context('with :targetKeep', function () {
      context('without score', function () {
        xit('clears the target', function () {
          // given
          var raty = new Raty('#element', {
            target: '#hint',
            targetFormat: 'score: {score}',
            targetKeep: true,
          });

          // when
          var star = raty.self.querySelector('img:first-child');

          Helper.trigger(star, 'mouseover');
          Helper.trigger(star, 'mouseleave');

          // then
          expect($('#hint')).toBeEmpty();
        });
      });

      context('with score', function () {
        xit('keeps the template', function () {
          // given
          var raty = new Raty('#element', {
            score: 1,
            target: '#hint',
            targetFormat: 'score: {score}',
            targetKeep: true,
          });

          // when
          var star = raty.self.querySelector('img:first-child');

          Helper.trigger(star, 'mouseover');
          Helper.trigger(star, 'mouseleave');

          // then
          expect($('#hint')).toHaveHtml('score: bad');
        });
      });
    });
  });
});
