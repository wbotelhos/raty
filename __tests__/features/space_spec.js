describe('#space', () => {
  beforeEach(() => {
    var element = document.createElement('div');
    element.id = 'element';
    document.querySelector(`body`).appendChild(element);
  });

  afterEach(() => {
    document.querySelector('#element').remove();
  });

  context('when off', function () {
    it('keeps the spaces', () => {
      // given
      var raty = new Raty(document.querySelector('#element'), { space: true });

      // when
      raty.init();

      // then
      expect(raty.element.textContent.length).toEqual(4);
    });

    context('with :cancel', function () {
      it('adds on more space', () => {
        // given
        var raty = new Raty(document.querySelector('#element'), { cancelButton: true, space: true });

        // when
        raty.init();

        // then
        expect(raty.element.textContent.length).toEqual(5);
      });
    });
  });

  context('when off', function () {
    it('takes off the spaces', () => {
      // given
      var raty = new Raty(document.querySelector('#element'), { space: false });

      // when
      raty.init();

      // then
      expect(raty.element.textContent.length).toEqual(0);
    });

    context('with :cancel', function () {
      it('keeps the cancel space', () => {
        // given
        var raty = new Raty(document.querySelector('#element'), { cancelButton: true, space: false });

        // when
        raty.init();

        // then
        expect(raty.element.textContent.length).toEqual(1);
      });
    });
  });
});
