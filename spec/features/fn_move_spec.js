describe('#move', function () {
  beforeEach(function () {
    Helper.create('#el');

    this.target = Helper.create('#target');
  });

  xit('sets *move to true then turns it false ', function () {
    // given
    var raty = new Raty('#el');

    // when
    raty.move(1);

    // then
    expect(raty.self.isMove).toBeFalsy();
  });

  describe('with interger score', function () {
    xit('moves to the right point', function (done) {
      // given
      var raty = new Raty('#el', {
        precision: true,
        target: '#target',
        targetType: 'number',
      });

      var that = this;

      setTimeout(function () {
        // when
        that.el.data('raty').move(1);

        // then
        expect(that.target.text()).toEqual('1.0');

        done();
      }, 100);
    });
  });

  describe('with float score', function () {
    context('with one decimal', function () {
      xit('moves to the right point', function (done) {
        // given
        var raty = new Raty('#el', {
          precision: true,
          target: '#target',
          targetType: 'number',
        });

        var that = this;

        setTimeout(function () {
          // when
          that.el.data('raty').move(1.7);

          // then
          expect(that.target.text()).toEqual('1.7');

          done();
        }, 100);
      });
    });

    context('with two decimal', function () {
      xit('moves to the right point', function (done) {
        // given
        var raty = new Raty('#el', {
          precision: true,
          target: '#target',
          targetType: 'number',
        });

        var that = this;

        setTimeout(function () {
          // when
          that.el.data('raty').move(1.79);

          // then
          expect(that.target.text()).toEqual('1.7');

          done();
        }, 100);
      });
    });
  });

  describe('with string score', function () {
    xit('moves to the right point', function (done) {
      // given
      var raty = new Raty('#el', {
        precision: true,
        target: '#target',
        targetType: 'number',
      });

      var that = this;

      setTimeout(function () {
        // when
        that.el.data('raty').move('1.7');

        // then
        expect(that.target.text()).toEqual('1.7');

        done();
      }, 100);
    });
  });

  describe('when score is bigger then the number of stars', function () {
    xit('moves to the and of the last star', function (done) {
      // given
      var raty = new Raty('#el', {
        precision: true,
        target: '#target',
        targetType: 'number',
      });

      var that = this;

      setTimeout(function () {
        // when
        that.el.data('raty').move(6.7);

        // then
        expect(that.target.text()).toEqual('5.0');

        done();
      }, 100);
    });
  });
});
