describe('#mouseover', function () {
  beforeEach(function () {
    $.raty.path = '../lib/images';

    Helper.create('#el');
  });

  afterEach(function () {
    Helper.clear();
  });

  it('receives the score as int', function () {
    // given
    var raty = new Raty('#el', {
      mouseover: function (score) {
        this.result = score;
      },
    });

    var star = raty.self.querySelector('img:last');

    // when
    star.trigger('mouseover');

    // then
    expect(this.el[0].result).toEqual(5);
  });

  it('receives the mouse event', function () {
    // given
    var raty = new Raty('#el', {
      mouseover: function (_, evt) {
        this.result = evt;
      },
    });

    var star = raty.self.querySelector('img:last');

    // when
    star.trigger('mouseover');

    // then
    expect(this.el[0].result.type).toEqual('mouseover');
  });

  context('with :cancel', function () {
    it('receives null as score', function () {
      // given
      var raty = new Raty('#el', {
        cancelButton: true,
        mouseover: function (score) {
          this.result = score;
        },
      });

      var cancel = raty.self.querySelector('.raty-cancel');

      // when
      cancel.trigger('mouseover');

      // then
      expect(this.el[0].result).toBeNull();
    });
  });
});
