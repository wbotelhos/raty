describe('common', function() {
  beforeEach(function() {
    $.fn.raty.defaults.path = '../lib/images';

    this.el = Helper.create('#el');
  });

  afterEach(function() {
    Helper.clear();
  });

  it ('is chainable', function() {
    // given
    // when
    var ref = this.el.raty();

    // then
    expect(ref).toBe(this.el);
  });
});
