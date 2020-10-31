describe('#move', function() {
  beforeEach(function() {
    $.raty.path = '../lib/images';

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
    this.el.data('raty').move(1);

    // then
    expect(this.el[0].isMove).toBeFalsy();
  });

  describe('with interger score', function() {
    it ('moves to the right point', function(done) {
      // given
      this.el.raty({
        precision  : true,
        target     : '#target',
        targetType : 'number'
      });

      this.el.children('img:first');

      var that = this;

      setTimeout(function() {
        // when
        that.el.data('raty').move(1);

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

        this.el.children('img:first');

        var that = this;

        setTimeout(function() {
          // when
          that.el.data('raty').move(1.7);

          // then
          expect(that.target.text()).toEqual('1.7');

          done();
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

        this.el.children('img:first');

        var that = this;

        setTimeout(function() {
          // when
          that.el.data('raty').move(1.79);

          // then
          expect(that.target.text()).toEqual('1.7');

          done();
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

      this.el.children('img:first');

      var that = this;

      setTimeout(function() {
        // when
        that.el.data('raty').move('1.7');

        // then
        expect(that.target.text()).toEqual('1.7');

        done();
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

      this.el.children('img:first');

      var that = this;

      setTimeout(function() {
        // when
        that.el.data('raty').move(6.7);

        // then
        expect(that.target.text()).toEqual('5.0');

        done();
      }, 100);
    });
  });
});
