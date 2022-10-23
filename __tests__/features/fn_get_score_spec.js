describe('get #score', () => {
  beforeEach(() => {
    var element = document.createElement('div');
    element.id = 'element';
    document.querySelector(`body`).appendChild(element);
  });

  afterEach(() => {
    document.querySelector('#element').remove();
  });

  it('accepts number as string', () => {
    // given
    var raty = new Raty(document.querySelector('#element'), { score: '1' });

    // when
    raty.init();

    // then
    expect(raty.element.querySelector('input').value).toEqual('1');
  });

  it('accepts float string', () => {
    // given
    var raty = new Raty(document.querySelector('#element'), { score: '1.5' });

    // when
    raty.init();

    // then
    expect(raty.element.querySelector('input').value).toEqual('1.5');
  });

  context('with integer score', function () {
    it('gets as int', () => {
      // given
      var raty = new Raty(document.querySelector('#element'), { score: 1 }).init();

      // when
      var score = raty.score();

      // then
      expect(score).toEqual(1);
    });
  });

  context('with float score', function () {
    it('gets as float', () => {
      // given
      var raty = new Raty(document.querySelector('#element'), { score: 1.5 }).init();

      // when
      var score = raty.score();

      // then
      expect(score).toEqual(1.5);
    });
  });

  context('with score zero', function () {
    it('returns an undefined value because it does not exist', () => {
      // given
      var raty = new Raty(document.querySelector('#element'), { score: 0 }).init();

      // when
      var score = raty.score();

      // then
      expect(score).toEqual(undefined);
    });
  });

  context('with score greater than :numberMax', function () {
    it('gets the max', () => {
      // given
      var raty = new Raty(document.querySelector('#element'), { number: 50, score: 50 }).init();

      // when
      var score = raty.score();

      // then
      expect(score).toEqual(raty.opt.numberMax);
    });
  });
});
