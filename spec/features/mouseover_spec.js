describe('#mouseover', function () {
  beforeEach(function () {
    this.el = Helper.create('#el');
  });

  it('receives the score as int', function () {
    // given
    var raty = new Raty(document.querySelector('#el'), {
      mouseover: function (score) {
        this.result = score;
      },
    }).init();

    var star = Helper.last(raty.element.querySelectorAll('img'));

    // when
    Helper.trigger(star, 'mouseover');

    // then
    expect(raty.element.result).toEqual(5);
  });

  it('receives the mouse event', function () {
    // given
    var raty = new Raty(document.querySelector('#el'), {
      mouseover: function (_, evt) {
        this.result = evt;
      },
    }).init();

    var star = Helper.last(raty.element.querySelectorAll('img'));

    // when
    Helper.trigger(star, 'mouseover');

    // then
    expect(raty.element.result.type).toEqual('mouseover');
  });

  context('with :cancel', function () {
    it('receives null as score', function () {
      // given
      var raty = new Raty(document.querySelector('#el'), {
        cancelButton: true,
        mouseover: function (score) {
          this.result = score;
        },
      }).init();

      var cancel = raty.element.querySelector('.raty-cancel');

      // when
      Helper.trigger(cancel, 'mouseover');

      // then
      expect(raty.element.result).toBeNull();
    });
  });
});
