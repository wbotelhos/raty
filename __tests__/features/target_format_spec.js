describe('#targetFormat', () => {
  beforeEach(() => {
    var element = document.createElement('div');
    element.id = 'element';
    var hint = document.createElement('div');
    hint.id = 'hint';
    document.querySelector(`body`).appendChild(element);
    document.querySelector(`body`).appendChild(hint);
  });

  afterEach(() => {
    document.querySelector('#element').remove();
    document.querySelector('#hint').remove();
  });

  it('stars empty', () => {
    // given
    var raty = new Raty(document.querySelector('#element', { target: '#hint', targetFormat: 'score: {score}' })).init();

    // when
    raty.init();

    // then
    expect(document.querySelector('#hint').innerHTML).toEqual('');
  });

  context('on mouseover', function () {
    it('set target with format on mouseover', () => {
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
    it('clears the target', () => {
      // given
      var raty = new Raty(document.querySelector('#element'), {
        target: '#hint',
        targetFormat: 'score: {score}',
      }).init();

      // when
      Helper.trigger(raty.element, 'mouseover');
      Helper.trigger(raty.element, 'mouseleave');

      // then
      expect(document.querySelector('#hint').textContent).toEqual('');
    });

    context('with :targetKeep', function () {
      context('without score', function () {
        it('clears the target', () => {
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
        it('keeps the template', () => {
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
