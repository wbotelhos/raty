describe('#mouseover', function () {
  beforeEach(function () {
    Helper.create('#el');
  });

  xit('receives the score as int', function () {
    // given
    var raty = new Raty('#el', {
      mouseover: function (score) {
        this.result = score;
      },
    });

    var star = Helper.last(raty.self.querySelectorAll('img'));

    // when
    Helper.trigger(star, 'mouseover');

    // then
    expect(this.el[0].result).toEqual(5);
  });

  xit('receives the mouse event', function () {
    // given
    var raty = new Raty('#el', {
      mouseover: function (_, evt) {
        this.result = evt;
      },
    });

    var star = Helper.last(raty.self.querySelectorAll('img'));

    // when
    Helper.trigger(star, 'mouseover');

    // then
    expect(this.el[0].result.type).toEqual('mouseover');
  });

  context('with :cancel', function () {
    xit('receives null as score', function () {
      // given
      var raty = new Raty('#el', {
        cancelButton: true,
        mouseover: function (score) {
          this.result = score;
        },
      });

      var cancel = raty.self.querySelector('.raty-cancel');

      // when
      Helper.trigger(cancel, 'mouseover');

      // then
      expect(this.el[0].result).toBeNull();
    });
  });
});
