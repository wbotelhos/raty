describe('#_parseOptions', function () {
  xit('parses options', function () {
    // given
    Helper.create('#el');

    var raty = new Raty('#el');

    // when

    var options = raty._parseOptions({
      param1: 'true',
      param2: 'false',
      param3: '',
      param4: 'b',
    });

    // then
    expect(options).toEqual({
      param1: true,
      param2: false,
      param3: '',
      param4: 'b',
    });
  });
});
