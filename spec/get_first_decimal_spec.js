describe('#getFirstDecimal', function() {
  beforeEach(function() {
    this.el = Helper.create('#el');
  });

  afterEach(function() {
    Helper.clear();
  });

  context('without decimal', function() {
    it ('is zero', function() {
      // given
      var number = 0;

      this.el.raty();

      // when
      var decimal = this.el.raty('_getFirstDecimal', number);

      // then
      expect(decimal).toEqual(0);
    });
  });

  context('with one decimal', function() {
    it ('is that one', function() {
      // given
      var number = 0.1;

      this.el.raty();

      // when
      var decimal = this.el.raty('_getFirstDecimal', number);

      // then
      expect(decimal).toEqual(1);
    });
  });

  context('with two decimal', function() {
    it ('is the first decimal', function() {
      // given
      var number = 0.12;

      this.el.raty();

      // when
      var decimal = this.el.raty('_getFirstDecimal', number);

      // then
      expect(decimal).toEqual(1);
    });
  });

  context('with float round bug with more than three nines consecutives', function() {
    it ('is the first decimal rounded', function() {
      // given
      var number = 0.1999999999999998;

      this.el.raty();

      // when
      var decimal = this.el.raty('_getFirstDecimal', number);

      // then
      expect(decimal).toEqual(2);
    });
  });
});
