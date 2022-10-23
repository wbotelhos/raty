describe('#move', () => {
  jest.useFakeTimers();

  let testContext;

  beforeEach(() => {
    testContext = {};
  });

  beforeEach(() => {
    Helper.create('#el');

    testContext.target = Helper.create('#target');
  });

  it('sets *move to true then turns it false ', () => {
    // given
    var raty = new Raty(document.querySelector('#el')).init();

    // when
    raty.move(1);

    // then
    expect(raty.isMove).toEqual(false);
  });

  describe('with interger score', () => {
    it('moves to the right point', (done) => {
      // given
      var raty = new Raty(document.querySelector('#el'), {
        precision: true,
        target: '#target',
        targetType: 'number',
      }).init();

      setTimeout(function () {
        // when
        raty.move(1);

        // then
        expect(testContext.target.textContent).toEqual('1.0');

        done();
      }, 100);

      jest.advanceTimersByTime(100);
    });
  });

  describe('with float score', () => {
    context('with one decimal', function () {
      it('moves to the right point', (done) => {
        // given
        var raty = new Raty(document.querySelector('#el'), {
          precision: true,
          target: '#target',
          targetType: 'number',
        }).init();

        setTimeout(function () {
          // when
          raty.move(1.7);

          // then
          expect(testContext.target.textContent).toEqual('1.7');

          done();
        }, 100);

        jest.advanceTimersByTime(100);
      });
    });

    context('with two decimal', function () {
      it('moves to the right point', (done) => {
        // given
        var raty = new Raty(document.querySelector('#el'), {
          precision: true,
          target: '#target',
          targetType: 'number',
        }).init();

        setTimeout(function () {
          // when
          raty.move(1.79);

          // then
          expect(testContext.target.textContent).toEqual('1.7');

          done();
        }, 100);

        jest.advanceTimersByTime(100);
      });
    });
  });

  describe('with string score', () => {
    it('moves to the right point', (done) => {
      jest.advanceTimersByTime(100);
      // given
      var raty = new Raty(document.querySelector('#el'), {
        precision: true,
        target: '#target',
        targetType: 'number',
      }).init();

      setTimeout(function () {
        // when
        raty.move('1.7');

        // then
        expect(testContext.target.textContent).toEqual('1.7');

        done();
      }, 100);

      jest.advanceTimersByTime(100);
    });
  });

  describe('when score is bigger then the number of stars', () => {
    it('moves to the and of the last star', (done) => {
      // given
      var raty = new Raty(document.querySelector('#el'), {
        precision: true,
        target: '#target',
        targetType: 'number',
      }).init();

      setTimeout(function () {
        // when
        raty.move(6.7);

        // then
        expect(testContext.target.textContent).toEqual('5.0');

        done();
      }, 100);

      jest.advanceTimersByTime(100);
    });
  });
});
