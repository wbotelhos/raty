describe('#numberMax', function() {
  beforeEach(function() {
    $.fn.raty.defaults.path = '../lib/images';

    this.el = Helper.create('#el');
  });

  afterEach(function() {
    Helper.clear();
  });

  it ('limits the max of "number" option', function() {
    // given
    var self = this.el;

    // when
    self.raty({ number: 2, numberMax: 1 });

    // then
    expect(self[0].opt.number).toEqual(1);
  });

  it ('limits the min of "number" option', function() {
    // given
    var self = this.el;

    // when
    self.raty({ number: -1 });

    // then
    expect(self[0].opt.number).toEqual(1);
  });
});
