describe('#readOnly', function() {
  beforeEach(function() {
    $.fn.raty.defaults.path = '../lib/images';

    this.el = Helper.create('#el');
  });

  afterEach(function() {
    Helper.clear();
  });

  it ('Applies :noRatedMsg message on stars', function() {
    // given

    // when
    this.el.raty({ readOnly: true });

    // then
    expect(this.el.children('img')).toHaveAttr('title', this.el[0].opt.noRatedMsg);
  });

  it ('removes the pointer style', function() {
    // given

    // when
    this.el.raty({ readOnly: true });

    // then
    expect(this.el[0].style.cursor).toEqual('');
  });

  it ('accepts callback', function() {
    // given

    // when
    this.el.raty({ readOnly: function() { return 'double'; } });

    // then
    expect(this.el[0].opt.readOnly).toEqual('double');
  });

  it ('blocks mouseover', function() {
    // given
    this.el.raty({ readOnly: true });

    var stars = this.el.children('img');

    // when
    stars.last().trigger('mouseover');

    // then
    expect(stars).toHaveAttr('src', '../lib/images/star-off.png');
  });

  it ('blocks click', function() {
    // given
    this.el.raty({ readOnly: true });

    var
      stars = this.el.children('img'),
      input = this.el.children('input');

    // when
    stars.last().trigger('click');

    // then
    expect(stars).toHaveAttr('src', '../lib/images/star-off.png');
    expect(input).toHaveValue('');
  });

  it ('blocks mouseleave', function() {
    // given
    this.el.raty({
      readOnly : true,
      mouseout : function() {
        $(this).data('called', true);
      }
    });

    var stars = this.el.children('img');

    // when
    this.el.trigger('mouseleave');

    // then
    expect(this.el.data('called')).toBeFalsy();
  });

  context('with :score', function() {
    context('as integer', function() {
      it ('applies the score hint on stars', function() {
        // given

        // when
        this.el.raty({ readOnly: true, score: 1 });

        // then
        expect(this.el.children('img')).toHaveAttr('title', 'bad');
      });
    });

    context('as float', function() {
      it ('applies the score integer hint on stars', function() {
        // given

        // when
        this.el.raty({ readOnly: true, score: 1.1 });

        // then
        expect(this.el.children('img')).toHaveAttr('title', 'bad');
      });
    });
  });

  context('with :cancel', function() {
    it ('is hidded', function() {
      // given

      // when
      this.el.raty({ cancel: true, readOnly: true });

      // then
      expect(this.el.children('.raty-cancel')).toBeHidden();
    });
  });
});
