describe('#targetFormat', function () {
  beforeEach(function () {
    var body = $('body');

    body.append('<div id="element"></div>');
    body.append('<div id="hint"></div>');
  });

  afterEach(function () {
    $('#element').remove();
    $('#hint').remove();
  });

  it('stars empty', function () {
    // given
    var raty = new Raty(document.querySelector('#element', { target: '#hint', targetFormat: 'score: {score}' })).init();

    // when
    raty.init();

    // then
    expect(document.querySelector('#hint').innerHTML).toEqual('');
  });

  context('on mouseover', function () {
    it('set target with format on mouseover', function () {
      // given
      var raty = new Raty(document.querySelector('#element'), {
        target: '#hint',
        targetFormat: 'score: {score}',
      }).init();

      // when
      Helper.trigger(raty.element.querySelector('img'), 'mouseover');

      // then
      expect(document.querySelector('#hint').innerHTML).toEqual('score: bad');
    });
  });

  context('on mouseout', function () {
    it('clears the target', function () {
      // given
      var raty = new Raty(document.querySelector('#element'), {
        target: '#hint',
        targetFormat: 'score: {score}',
      }).init();

      // when
      Helper.trigger(raty.element, 'mouseover');
      Helper.trigger(raty.element, 'mouseleave');

      // then
      expect(document.querySelector('#hint').innerText).toEqual('');
    });

    context('with :targetKeep', function () {
      context('without score', function () {
        it('clears the target', function () {
          // given
          var raty = new Raty(document.querySelector('#element'), {
            target: '#hint',
            targetFormat: 'score: {score}',
            targetKeep: true,
          }).init();

          // when
          Helper.trigger(raty.element, 'mouseover');
          Helper.trigger(raty.element, 'mouseleave');

          // then
          expect(document.querySelector('#hint').innerHTML).toEqual('');
        });
      });

      context('with score', function () {
        it('keeps the template', function () {
          // given
          var raty = new Raty(document.querySelector('#element'), {
            score: 1,
            target: '#hint',
            targetFormat: 'score: {score}',
            targetKeep: true,
          }).init();

          // when
          Helper.trigger(raty.element, 'mouseover');
          Helper.trigger(raty.element, 'mouseleave');

          // then
          expect(document.querySelector('#hint').innerHTML).toEqual('score: bad');
        });
      });
    });
  });
});
