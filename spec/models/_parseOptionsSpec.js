describe('#_parseOptions', function () {
  it('parses options', function () {
    // given
    Helper.create('#el');

    var raty = new Raty('#el');

    // when

    var options = raty._parseOptions({
      param1: 'true',
      param2: 'false',
      param3: '',
    });

    // then
    expect(options).toEqual({
      param1: true,
      param2: false,
      param3: '',
    });
  });
});
