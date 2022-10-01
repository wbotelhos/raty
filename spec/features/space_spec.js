describe('#space', function () {
  beforeEach(function () {
    $('body').append('<div id="element"></div>');
  });

  afterEach(function () {
    $('#element').remove();
    $('#hint').remove();
  });

  context('when off', function () {
    it('keeps the spaces', function () {
      // given
      var raty = new Raty(document.querySelector('#element'), { space: true });

      // when
      raty.init();

      // then
      expect(raty.element.innerText.length).toEqual(4);
    });

    context('with :cancel', function () {
      it('adds on more space', function () {
        // given
        var raty = new Raty(document.querySelector('#element'), { cancelButton: true, space: true });

        // when
        raty.init();

        // then
        expect(raty.element.innerText.length).toEqual(5);
      });
    });
  });

  context('when off', function () {
    it('takes off the spaces', function () {
      // given
      var raty = new Raty(document.querySelector('#element'), { space: false });

      // when
      raty.init();

      // then
      expect(raty.element.innerText.length).toEqual(0);
    });

    context('with :cancel', function () {
      it('keeps the cancel space', function () {
        // given
        var raty = new Raty(document.querySelector('#element'), { cancelButton: true, space: false });

        // when
        raty.init();

        // then
        expect(raty.element.innerText.length).toEqual(1);
      });
    });
  });
});
