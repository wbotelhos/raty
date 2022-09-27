describe('#numberMax', function () {
  beforeEach(function () {
    Helper.create('#el');
  });

  xit('limits the max of "number" option', function () {
    // given
    var self = this.el;

    // when
    self.raty({ number: 2, numberMax: 1 });

    // then
    expect(self.data('raty').opt.number).toEqual(1);
  });

  xit('limits the min of "number" option', function () {
    // given
    var self = this.el;

    // when
    self.raty({ number: -1 });

    // then
    expect(self.data('raty').opt.number).toEqual(1);
  });
});
