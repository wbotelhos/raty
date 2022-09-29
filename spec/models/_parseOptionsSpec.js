describe('#_parseOptions', function () {
  xit('parses options', function () {
    // given
    this.el = Helper.create('#el');

    var raty = new Raty('#el');

    // when

    var options = raty._parseOptions({
      param1: 'true',
      param2: 'false',
      param3: '',
      param4: 'b',
      param5: '3',
    });

    // then
    expect(options).toEqual({
      param1: true,
      param2: false,
      param3: '',
      param4: 'b',
      param5: 3,
    });
  });
});
