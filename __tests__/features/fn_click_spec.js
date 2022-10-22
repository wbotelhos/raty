describe('#click', () => {
  beforeEach(() => {
    var element = document.createElement('div');
    element.id = 'element';
    document.querySelector(`body`).appendChild(element);
  });

  afterEach(() => {
    document.querySelector('#element').remove();
  });

  it('clicks on star', () => {
    // given
    var raty = new Raty(document.querySelector('#element'), {
      click: function () {
        this.clicked = true;
      },
    }).init();

    var stars = raty.element.querySelectorAll('img');

    // when
    raty.click(1);

    // then
    expect(stars[0].getAttribute('src')).toEqual('star-on.png');
    expect(stars[1].getAttribute('src')).toEqual('star-off.png');
    expect(stars[2].getAttribute('src')).toEqual('star-off.png');
    expect(stars[3].getAttribute('src')).toEqual('star-off.png');
    expect(stars[4].getAttribute('src')).toEqual('star-off.png');

    expect(raty.clicked).toEqual(true);
  });

  it('receives the score', () => {
    // given
    var raty = new Raty(document.querySelector('#element'), {
      click: function (score) {
        this.result = score;
      },
    }).init();

    // when
    raty.click(1);

    // then
    expect(raty.result).toEqual(1);
  });

  it('does not have an event', () => {
    // given
    var raty = new Raty(document.querySelector('#element'), {
      click: function (_score, _element, evt) {
        this.evt = evt;
      },
    }).init();

    // when
    raty.click(1);

    // then
    expect(raty.evt).toEqual(undefined);
  });

  describe('with :readOnly', () => {
    it('does not set the score', () => {
      // given
      var raty = new Raty(document.querySelector('#element'), { readOnly: true }).init();

      var stars = raty.element.querySelectorAll('img');

      // when
      raty.click(1);

      // then
      expect(stars[0].getAttribute('src')).toEqual('star-off.png');
      expect(stars[1].getAttribute('src')).toEqual('star-off.png');
      expect(stars[2].getAttribute('src')).toEqual('star-off.png');
      expect(stars[3].getAttribute('src')).toEqual('star-off.png');
      expect(stars[4].getAttribute('src')).toEqual('star-off.png');
    });
  });

  context('without :click', function () {
    it('ignores the callback', () => {
      // given
      var raty = new Raty(document.querySelector('#element')).init();

      // when
      var lambda = function () {
        raty.click(1);
      };

      // then
      expect(lambda).not.toThrow();
    });
  });

  context('with :target', function () {
    beforeEach(() => {
      var hint = document.createElement('div');
      hint.id = 'hint';
      document.querySelector(`body`).appendChild(hint);
    });

    afterEach(() => {
      document.querySelector('#hint').remove();
    });

    context('and :targetKeep', function () {
      it('sets the score on target', () => {
        // given
        var raty = new Raty(document.querySelector('#element'), {
          target: '#hint',
          targetKeep: true,
          click: function () {},
        }).init();

        // when
        raty.click(1);

        // then
        expect(document.querySelector('#hint').innerHTML).toEqual('bad');
      });
    });
  });
});
