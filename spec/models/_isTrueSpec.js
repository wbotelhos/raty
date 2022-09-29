describe('#_isTrue', function () {
  xit('return a boolean type', function () {
    // given
    this.el = Helper.create('#el');

    var raty = new Raty('#el');

    // when / then
    expect(raty._isTrue('true')).toEqual(true);
    expect(raty._isTrue('false')).toEqual(false);
    expect(raty._isTrue('')).toEqual(false);
    expect(raty._isTrue(null)).toEqual(false);
    expect(raty._isTrue(undefined)).toEqual(false);
  });
});
