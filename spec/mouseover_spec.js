describe('#mouseover', function() {
  beforeEach(function() {
    $.fn.raty.defaults.path = '../lib/images';

    this.el = Helper.create('#el');
  });

  afterEach(function() {
    Helper.clear();
  });

  it ('receives the score as int', function() {
    // given
    this.el.raty({
      mouseover: function(score) {
        $(this).data('score', score);
      }
    });

    var star = this.el.children('img:last');

    // when
    star.trigger('mouseover');

    // then
    expect(this.el.data('score')).toEqual(5);
  });

  it ('receives the mouse event', function() {
    // given
    this.el.raty({
      mouseover: function(_, evt) {
        $(this).data('evt', evt);
      }
    });

    var star = this.el.children('img:last');

    // when
    star.trigger('mouseover');

    // then
    expect(this.el.data('evt').type).toEqual('mouseover');
  });

  context('with :cancel', function() {
    it ('receives null as score', function() {
      // given
      this.el.raty({
        cancel    : true,
        mouseover : function(score) {
          $(this).data('score', score);
        }
      });

      var cancel = this.el.children('.raty-cancel');

      // when
      cancel.trigger('mouseover');

      // then
      expect(this.el.data('score')).toBeNull();
    });
  });
});
