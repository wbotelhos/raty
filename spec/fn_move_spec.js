describe('#move', function() {
  beforeEach(function() {
    $.fn.raty.defaults.path = '../lib/images';

    this.el     = Helper.create('#el');
    this.target = Helper.create('#target');
  });

  afterEach(function() {
    Helper.clear();
  });

  it ('sets *move to true then turns it false ', function() {
    // given
    this.el.raty();

    // when
    this.el.raty('move', 1);

    // then
    expect(this.el[0].move).toBeFalsy();
  });

  describe('with interger score', function() {
    it ('moves to the right point', function(done) {
      // given
      this.el.raty({
        precision  : true,
        target     : '#target',
        targetType : 'number'
      });

      var star = this.el.children('img:first'),
          that = this;

      setTimeout(function() {
        // when
        that.el.raty('move', 1);

        // then
        expect(that.target.text()).toEqual('1.0');

        done();
      }, 100);
    });
  });

  describe('with float score', function() {
    context('with one decimal', function() {
      it ('moves to the right point', function(done) {
        // given
        this.el.raty({
          precision  : true,
          target     : '#target',
          targetType : 'number'
        });

        var star = this.el.children('img:first'),
            that = this;

        setTimeout(function() {
          // when
          that.el.raty('move', 1.7);

          // then
          expect(that.target.text()).toEqual('1.7');

          done()
        }, 100);
      });
    });

    context('with two decimal', function() {
      it ('moves to the right point', function(done) {
        // given
        this.el.raty({
          precision  : true,
          target     : '#target',
          targetType : 'number'
        });

        var star = this.el.children('img:first'),
            that = this;

        setTimeout(function() {
          // when
          that.el.raty('move', 1.79);

          // then
          expect(that.target.text()).toEqual('1.7');

          done()
        }, 100);
      });
    });
  });

  describe('with string score', function() {
    it ('moves to the right point', function(done) {
      // given
      this.el.raty({
        precision  : true,
        target     : '#target',
        targetType : 'number'
      });

      var star = this.el.children('img:first'),
          that = this;

      setTimeout(function() {
        // when
        that.el.raty('move', '1.7');

        // then
        expect(that.target.text()).toEqual('1.7');

        done()
      }, 100);
    });
  });

  describe('when score is bigger then the number of stars', function() {
    it ('moves to the and of the last star', function(done) {
      // given
      this.el.raty({
        precision  : true,
        target     : '#target',
        targetType : 'number'
      });

      var star = this.el.children('img:first'),
          that = this;

      setTimeout(function() {
        // when
        that.el.raty('move', 6.7);

        // then
        expect(that.target.text()).toEqual('5.0');

        done()
      }, 100);
    });
  });

  describe('with class selection', function() {
    beforeEach(function() {
      this.target1 = Helper.create('#target1');
      this.target2 = Helper.create('#target2');
      this.el1     = Helper.create('.el', 'div', { 'data-target': '#target1' });
      this.el2     = Helper.create('.el', 'div', { 'data-target': '#target2' });
    });

    afterEach(function() {
      this.target1.remove();
      this.target2.remove();
      this.el1.remove();
      this.el2.remove();
    });

    // TODO: set taget as callback.
    // TODO: set taget as object.
    it ('moves to the right point on all of them', function(done) {
      // given
      this.el = $('.el');

      this.el.raty({
        precision  : true,
        target     : function() {
          return this.getAttribute('data-target');
        },
        targetType : 'number'
      });

      var star = this.el.children('img:first'),
          that = this;

      setTimeout(function() {
        // when
        that.el.raty('move', 1.7);

        // then
        expect(that.target1.text()).toEqual('1.7');
        expect(that.target2.text()).toEqual('1.7');

        done()
      }, 100);
    });
  });
});
