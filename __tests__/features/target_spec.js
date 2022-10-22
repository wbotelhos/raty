describe('#target', () => {
  let testContext;

  beforeEach(() => {
    testContext = {};
  });

  beforeEach(() => {
    Helper.create('#el');
  });

  it('accepts callback return and has the correct arguments', () => {
    // given
    Helper.create('#target');

    var raty = new Raty(document.querySelector('#el'), {
      target: function (element) {
        this._this = this;
        this._element = element;

        return '#target';
      },
    });

    // when
    raty.init();

    // then
    expect(raty.opt.target).toEqual('#target');
    expect(raty._this).toBe(raty);
    expect(raty._element).toEqual(document.querySelector('#el'));
  });

  context('on mouseover', function () {
    context('as div', function () {
      beforeEach(() => {
        testContext.target = Helper.target('#target');
      });

      it('sets the hint', () => {
        // given
        var raty = new Raty(document.querySelector('#el'), { target: '#' + testContext.target.id }).init();
        var star = Helper.last(raty.element.querySelectorAll('img'));

        // when
        Helper.trigger(star, 'mouseover');

        // then
        expect(testContext.target.innerHTML).toEqual('gorgeous');
      });
    });

    context('as input', function () {
      beforeEach(() => {
        testContext.target = Helper.target('#target', 'input');
      });

      it('sets the hint', () => {
        // given
        var raty = new Raty(document.querySelector('#el'), { target: '#' + testContext.target.id }).init();
        var star = Helper.last(raty.element.querySelectorAll('img'));

        // when
        Helper.trigger(star, 'mouseover');

        // then
        expect(document.querySelector('#target').value).toEqual('gorgeous');
      });
    });

    context('as textarea', function () {
      beforeEach(() => {
        testContext.target = Helper.target('#target', 'textarea');
      });

      it('sets the hint', () => {
        // given
        var raty = new Raty(document.querySelector('#el'), { target: '#' + testContext.target.id }).init();
        var star = Helper.last(raty.element.querySelectorAll('img'));

        // when
        Helper.trigger(star, 'mouseover');

        // then
        expect(document.querySelector('#target').value).toEqual('gorgeous');
      });
    });

    context('as select', function () {
      beforeEach(() => {
        testContext.target = Helper.target('#target', 'select');
      });

      it('sets the hint', () => {
        // given
        var raty = new Raty(document.querySelector('#el'), { target: '#' + testContext.target.id }).init();
        var star = Helper.last(raty.element.querySelectorAll('img'));

        // when
        Helper.trigger(star, 'mouseover');

        // then
        expect(document.querySelector('#target').value).toEqual('gorgeous');
      });
    });

    context('and mouseout', function () {
      context('as div', function () {
        beforeEach(() => {
          testContext.target = Helper.target('#target');
        });

        it('gets clear', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), { target: '#' + testContext.target.id }).init();

          // when
          Helper.trigger(raty.element, 'mouseover');
          Helper.trigger(raty.element, 'mouseout');

          // then
          expect(testContext.target.innerHTML).toEqual('');
        });
      });

      context('as textarea', function () {
        beforeEach(() => {
          testContext.target = Helper.target('#textarea');
        });

        it('gets clear', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), { target: '#' + testContext.target.id }).init();

          // when
          Helper.trigger(raty.element, 'mouseover');
          Helper.trigger(raty.element, 'mouseout');

          // then
          expect(testContext.target.innerHTML).toEqual('');
        });
      });

      context('as input', function () {
        beforeEach(() => {
          testContext.target = Helper.target('#target', 'input');
        });

        it('gets clear', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), { target: '#' + testContext.target.id }).init();

          // when
          Helper.trigger(raty.element, 'mouseover');

          // then
          expect(testContext.target.innerHTML).toEqual('');
        });
      });

      context('as select', function () {
        beforeEach(() => {
          testContext.target = Helper.target('#select');
        });

        it('gets clear', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), { target: '#' + testContext.target.id }).init();

          // when
          Helper.trigger(raty.element, 'mouseout');

          // then
          expect(testContext.target.innerHTML).toEqual('');
        });
      });
    });

    context('and click', function () {
      context('and mouseout', function () {
        context('as div', function () {
          beforeEach(() => {
            testContext.target = Helper.target('#target');
          });

          it('gets clear', () => {
            // given
            var raty = new Raty(document.querySelector('#el'), { target: '#' + testContext.target.id }).init();

            // when
            Helper.trigger(raty.element, 'mouseover');
            Helper.trigger(raty.element, 'click');
            Helper.trigger(raty.element, 'mouseout');

            // then
            expect(testContext.target.innerHTML).toEqual('');
          });
        });

        context('as textarea', function () {
          beforeEach(() => {
            testContext.target = Helper.target('#textarea');
          });

          it('gets clear', () => {
            // given
            var raty = new Raty(document.querySelector('#el'), { target: '#' + testContext.target.id }).init();

            // when
            Helper.trigger(raty.element, 'mouseover');
            Helper.trigger(raty.element, 'click');
            Helper.trigger(raty.element, 'mouseout');

            // then
            expect(testContext.target.innerHTML).toEqual('');
          });
        });

        context('as input', function () {
          beforeEach(() => {
            testContext.target = Helper.target('#target', 'input');
          });

          it('gets clear', () => {
            // given
            var raty = new Raty(document.querySelector('#el'), { target: '#' + testContext.target.id }).init();

            var star = Helper.last(raty.element.querySelectorAll('img'));

            // when
            Helper.trigger(raty.element, 'mouseover');
            Helper.trigger(raty.element, 'click');
            Helper.trigger(raty.element, 'mouseout');

            // then
            expect(testContext.target.innerHTML).toEqual('');
          });
        });

        context('as select', function () {
          beforeEach(() => {
            testContext.target = Helper.target('#select');
          });

          it('gets clear', () => {
            // given
            var raty = new Raty(document.querySelector('#el'), { target: '#' + testContext.target.id }).init();

            // when
            Helper.trigger(raty.element, 'mouseover');
            Helper.trigger(raty.element, 'click');
            Helper.trigger(raty.element, 'mouseout');

            // then
            expect(testContext.target.innerHTML).toEqual('');
          });
        });
      });
    });
  });
});
