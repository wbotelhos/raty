describe('#click', function () {
  beforeEach(function () {
    $('body').append('<div id="element"></div>');
  });

  afterEach(function () {
    $('#element').remove();
    $('#hint').remove();
  });

  it('clicks on star', function () {
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

  it('receives the score', function () {
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

  it('does not have an event', function () {
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

  describe('with :readOnly', function () {
    it('does not set the score', function () {
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
    it('ignores the callback', function () {
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
    beforeEach(function () {
      $('body').append('<div id="hint"></div>');
    });

    context('and :targetKeep', function () {
      it('sets the score on target', function () {
        // given
        var raty = new Raty(document.querySelector('#element'), {
          target: '#hint',
          targetKeep: true,
          click: function () {},
        }).init();

        // when
        raty.click(1);

        // then
        expect($('#hint')[0].innerHTML).toEqual('bad');
      });
    });
  });
});
