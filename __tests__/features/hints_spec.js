describe('#hints', () => {
  let testContext;

  beforeEach(() => {
    testContext = {};
  });

  beforeEach(() => {
    Helper.create('#el');
  });

  context('with :halfShow', function () {
    context('as *true', function () {
      context('when null', function () {
        it('initializes all with null', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), { halfShow: true, hints: null });
          var expected = [null, null];

          // when
          raty.init();

          // then
          expect(raty.opt.hints[0]).toEqual(expected);
          expect(raty.opt.hints[1]).toEqual(expected);
          expect(raty.opt.hints[2]).toEqual(expected);
          expect(raty.opt.hints[3]).toEqual(expected);
          expect(raty.opt.hints[4]).toEqual(expected);
        });
      });

      context('with empty as group', function () {
        it('replicates the empty value', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), { halfShow: true, hints: [''] });

          // when
          raty.init();

          // then
          expect(raty.opt.hints[0]).toEqual(['', '']);
        });
      });

      context('the stars', function () {
        it('changes the title', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), { halfShow: true, hints: ['1', '/', 'c', '-', '#'] });

          // when
          raty.init();

          // then
          var stars = raty.element.querySelectorAll('img');

          expect(stars[0].title).toEqual('1');
          expect(stars[1].title).toEqual('/');
          expect(stars[2].title).toEqual('c');
          expect(stars[3].title).toEqual('-');
          expect(stars[4].title).toEqual('#');
        });

        context('with undefined as group', function () {
          it('receives the number of the star', () => {
            // given
            var raty = new Raty(document.querySelector('#el'), { halfShow: true, hints: [undefined] });

            // when
            raty.init();

            // then
            expect(raty.element.querySelector('img').title).toEqual('1');
          });
        });

        context('with null as group', function () {
          it('receives the number of star', () => {
            // given
            var raty = new Raty(document.querySelector('#el'), { halfShow: true, hints: [null] });

            // when
            raty.init();

            // then
            expect(raty.element.querySelector('img').title).toEqual('1');
          });
        });

        context('with array as group with only half value', function () {
          it('receives the last value', () => {
            // given
            var raty = new Raty(document.querySelector('#el'), { halfShow: true, hints: [['half']] });

            // when
            raty.init();

            // then
            expect(raty.element.querySelector('img').title).toEqual('half');
          });
        });

        context('with array as group with both value', function () {
          it('receives the last value', () => {
            // given
            var raty = new Raty(document.querySelector('#el'), { halfShow: true, hints: [['half', 'one']] });

            // when
            raty.init();

            // then
            expect(raty.element.querySelector('img').title).toEqual('one');
          });
        });

        context('with less hints than stars', function () {
          it('receives the score value', () => {
            // given
            var raty = new Raty(document.querySelector('#el'), { halfShow: true, hints: ['a', 'b', 'c', 'd'] });

            // when
            raty.init();

            // then
            var stars = raty.element.querySelectorAll('img');

            expect(stars[0].title).toEqual('a');
            expect(stars[1].title).toEqual('b');
            expect(stars[2].title).toEqual('c');
            expect(stars[3].title).toEqual('d');
            expect(stars[4].title).toEqual('5');
          });
        });

        context('with more stars than hints', function () {
          it('receives the :score value', () => {
            // given
            var raty = new Raty(document.querySelector('#el'), {
              halfShow: true,
              hints: ['a', 'b', 'c', 'd', 'e'],
              number: 6,
            });

            // when
            raty.init();

            // then
            var stars = raty.element.querySelectorAll('img');

            expect(stars[0].title).toEqual('a');
            expect(stars[1].title).toEqual('b');
            expect(stars[2].title).toEqual('c');
            expect(stars[3].title).toEqual('d');
            expect(stars[4].title).toEqual('e');
            expect(stars[5].title).toEqual('6');
          });
        });
      });
    });

    context('as *false', function () {
      context('when null', function () {
        it('initializes with an empty array', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), { halfShow: false, hints: null });

          // when
          raty.init();

          // then
          expect(raty.opt.hints).toEqual([]);
        });
      });

      context('with undefined value', function () {
        it('receives the default corresponding hint', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), { halfShow: false, hints: [undefined] });

          // when
          raty.init();

          // then
          expect(raty.element.querySelector('img').title).toEqual('1');
        });
      });

      context('the stars', function () {
        it('changes the hints', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), { halfShow: false, hints: ['1', '/', 'c', '-', '#'] });

          // when
          raty.init();

          // then
          var stars = raty.element.querySelectorAll('img');

          expect(stars[0].title).toEqual('1');
          expect(stars[1].title).toEqual('/');
          expect(stars[2].title).toEqual('c');
          expect(stars[3].title).toEqual('-');
          expect(stars[4].title).toEqual('#');
        });

        context('with empty value', function () {
          it('receives an empty value', () => {
            // given
            var raty = new Raty(document.querySelector('#el'), { halfShow: false, hints: [''] });

            // when
            raty.init();

            // then
            expect(raty.element.querySelector('img').title).toEqual('');
          });
        });

        context('with null value', function () {
          it('receives the score', () => {
            // given
            var raty = new Raty(document.querySelector('#el'), { halfShow: false, hints: [null] });

            // when
            raty.init();

            // then
            expect(raty.element.querySelector('img').title).toEqual('1');
          });
        });

        context('with less hints than stars', function () {
          it('receives the score value', () => {
            // given
            var raty = new Raty(document.querySelector('#el'), { halfShow: false, hints: ['a', 'b', 'c', 'd'] });

            // when
            raty.init();

            // then
            var stars = raty.element.querySelectorAll('img');

            expect(stars[0].title).toEqual('a');
            expect(stars[1].title).toEqual('b');
            expect(stars[2].title).toEqual('c');
            expect(stars[3].title).toEqual('d');
            expect(stars[4].title).toEqual('5');
          });
        });

        context('with more stars than hints', function () {
          it('receives the :score value', () => {
            // given
            var raty = new Raty(document.querySelector('#el'), {
              halfShow: false,
              hints: ['a', 'b', 'c', 'd', 'e'],
              number: 6,
            });

            // when
            raty.init();

            // then
            var stars = raty.element.querySelectorAll('img');

            expect(stars[0].title).toEqual('a');
            expect(stars[1].title).toEqual('b');
            expect(stars[2].title).toEqual('c');
            expect(stars[3].title).toEqual('d');
            expect(stars[4].title).toEqual('e');
            expect(stars[5].title).toEqual('6');
          });
        });
      });
    });
  });

  context('with :half', function () {
    context('and value is null', function () {
      it('populates all with null', () => {
        // given
        var raty = new Raty(document.querySelector('#el'), { half: true, hints: null });

        // when
        raty.init();

        // then
        var expected = [null, null];

        expect(raty.opt.hints[0]).toEqual(expected);
        expect(raty.opt.hints[1]).toEqual(expected);
        expect(raty.opt.hints[2]).toEqual(expected);
        expect(raty.opt.hints[3]).toEqual(expected);
        expect(raty.opt.hints[4]).toEqual(expected);
      });
    });

    context('and value is an empty array', function () {
      it('populates all float arrays with original hint', () => {
        // given
        var raty = new Raty(document.querySelector('#el'), { half: true, hints: [] });

        // when
        raty.init();

        // then

        expect(raty.opt.hints[0]).toEqual([null, null]);
        expect(raty.opt.hints[1]).toEqual([null, null]);
        expect(raty.opt.hints[2]).toEqual([null, null]);
        expect(raty.opt.hints[3]).toEqual([null, null]);
        expect(raty.opt.hints[4]).toEqual([null, null]);
      });
    });

    context('with some integer hint', function () {
      it('populates all group with given hint', () => {
        // given
        var raty = new Raty(document.querySelector('#el'), { half: true, hints: ['hint'] });

        // when
        raty.init();

        // then

        expect(raty.opt.hints[0][0]).toEqual('hint');
        expect(raty.opt.hints[0][1]).toEqual('hint');
      });
    });

    context('with some float hint', function () {
      it('populates the other with last defined hint', () => {
        // given
        var raty = new Raty(document.querySelector('#el'), { half: true, hints: [['hint']] });

        // when
        raty.init();

        // then

        expect(raty.opt.hints[0][1]).toEqual('hint');
        expect(raty.opt.hints[0][1]).toEqual('hint');
      });
    });

    context('on #move', function () {
      beforeEach(() => {
        testContext.target = Helper.create('#target');
      });

      context('on 1.1', function () {
        it('receives the first position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['1,5', '2,0']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.1);

          // then
          expect(testContext.target.textContent).toEqual('1,5');
        });

        it('changes the title to first position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['1,5', '2,0']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.1);

          // then
          var star = raty.element.querySelectorAll('img')[1];

          expect(star.title).toEqual('1,5');
        });
      });

      context('on 1.2', function () {
        it('receives the first position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['1,5', '2,0']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.2);

          // then
          expect(testContext.target.textContent).toEqual('1,5');
        });

        it('changes the title to first position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['1,5', '2,0']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.2);

          // then
          var star = raty.element.querySelectorAll('img')[1];

          expect(star.title).toEqual('1,5');
        });
      });

      context('on 1.3', function () {
        it('receives the first position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['1,5', '2,0']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.3);

          // then
          expect(testContext.target.textContent).toEqual('1,5');
        });

        it('changes the title to first position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['1,5', '2,0']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.3);

          // then
          var star = raty.element.querySelectorAll('img')[1];

          expect(star.title).toEqual('1,5');
        });
      });

      context('on 1.4', function () {
        it('receives the first position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['1,5', '2,0']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.4);

          // then
          expect(testContext.target.textContent).toEqual('1,5');
        });

        it('changes the title to first position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['1,5', '2,0']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.4);

          // then
          var star = raty.element.querySelectorAll('img')[1];

          expect(star.title).toEqual('1,5');
        });
      });

      context('on 1.5', function () {
        it('receives the first position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['1,5', '2,0']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.5);

          // then
          expect(testContext.target.textContent).toEqual('1,5');
        });

        it('changes the title to first position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['1,5', '2,0']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.5);

          // then
          var star = raty.element.querySelectorAll('img')[1];

          expect(star.title).toEqual('1,5');
        });
      });

      context('on 1.6', function () {
        it('receives the second position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['1,5', '2,0']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.6);

          // then
          expect(testContext.target.textContent).toEqual('2,0');
        });

        it('changes the title to first position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['1,5', '2,0']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.6);

          // then
          var star = raty.element.querySelectorAll('img')[1];

          expect(star.title).toEqual('2,0');
        });
      });

      context('on 1.7', function () {
        it('receives the second position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['1,5', '2,0']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.7);

          // then
          expect(testContext.target.textContent).toEqual('2,0');
        });

        it('changes the title to first position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['1,5', '2,0']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.7);

          // then
          var star = raty.element.querySelectorAll('img')[1];

          expect(star.title).toEqual('2,0');
        });
      });

      context('on 1.8', function () {
        it('receives the second position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['1,5', '2,0']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.8);

          // then
          expect(testContext.target.textContent).toEqual('2,0');
        });

        it('changes the title to first position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['1,5', '2,0']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.8);

          // then
          var star = raty.element.querySelectorAll('img')[1];

          expect(star.title).toEqual('2,0');
        });
      });

      context('on 1.9', function () {
        it('receives the second position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['1,5', '2,0']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.9);

          // then
          expect(testContext.target.textContent).toEqual('2,0');
        });

        it('changes the title to first position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['1,5', '2,0']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.9);

          // then
          var star = raty.element.querySelectorAll('img')[1];

          expect(star.title).toEqual('2,0');
        });
      });

      context('on 2.0', function () {
        it('receives the second position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['1,5', '2,0']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(2.0);

          // then
          expect(testContext.target.textContent).toEqual('2,0');
        });

        it('changes the title to first position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['1,5', '2,0']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(2.0);

          // then
          var star = raty.element.querySelectorAll('img')[1];

          expect(star.title).toEqual('2,0');
        });
      });

      context('on 2', function () {
        it('receives the second position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['1,5', '2,0']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(2);

          // then
          expect(testContext.target.textContent).toEqual('2,0');
        });
      });

      it('changes the title to first position', () => {
        // given
        var raty = new Raty(document.querySelector('#el'), {
          half: true,
          hints: [null, ['1,5', '2,0']],
          target: '#target',
          targetKeep: true,
        }).init();

        // when
        raty.move(2);

        // then
        var star = raty.element.querySelectorAll('img')[1];

        expect(star.title).toEqual('2,0');
      });
    });

    // TODO: mousemove event is not working during test
    xcontext('on mousemove', function () {
      beforeEach(() => {
        testContext.target = Helper.create('#target');
      });

      context('on 1.0 fraction', function () {
        it('receives the first position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['half', 'integer']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(document.querySelector('#el'), 1, 0);

          // then
          expect(testContext.target.textContent).toEqual('half');
        });

        it('receives the first position as title', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['half', 'integer']],
            target: '#target',
            targetKeep: true,
          }).init();

          var star = raty.element.querySelectorAll('img')[1];

          // when
          Helper.mousemove(document.querySelector('#el'), 1, 0);

          // then
          expect(star.title).toEqual('half');
        });
      });

      context('on 1.1 fraction', function () {
        it('receives the first position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['half', 'integer']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(document.querySelector('#el'), 1, 1);

          // then
          expect(testContext.target.textContent).toEqual('half');
        });

        it('receives the first position as title', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['half', 'integer']],
            target: '#target',
            targetKeep: true,
          }).init();

          var star = raty.element.querySelectorAll('img')[1];

          // when
          Helper.mousemove(document.querySelector('#el'), 1, 1);

          // then
          expect(star.title).toEqual('half');
        });
      });

      context('on 1.2 fraction', function () {
        it('receives the first position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['half', 'integer']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(document.querySelector('#el'), 1, 2);

          // then
          expect(testContext.target.textContent).toEqual('half');
        });

        it('receives the first position as title', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['half', 'integer']],
            target: '#target',
            targetKeep: true,
          }).init();

          var star = raty.element.querySelectorAll('img')[1];

          // when
          Helper.mousemove(document.querySelector('#el'), 1, 2);

          // then
          expect(star.title).toEqual('half');
        });
      });

      context('on 1.3 fraction', function () {
        it('receives the first position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['half', 'integer']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(document.querySelector('#el'), 1, 3);

          // then
          expect(testContext.target.textContent).toEqual('half');
        });

        it('receives the first position as title', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['half', 'integer']],
            target: '#target',
            targetKeep: true,
          }).init();

          var star = raty.element.querySelectorAll('img')[1];

          // when
          Helper.mousemove(document.querySelector('#el'), 1, 3);

          // then
          expect(star.title).toEqual('half');
        });
      });

      context('on 1.4 fraction', function () {
        it('receives the first position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['half', 'integer']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(document.querySelector('#el'), 1, 4);

          // then
          expect(testContext.target.textContent).toEqual('half');
        });

        it('receives the first position as title', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['half', 'integer']],
            target: '#target',
            targetKeep: true,
          }).init();

          var star = raty.element.querySelectorAll('img')[1];

          // when
          Helper.mousemove(document.querySelector('#el'), 1, 4);

          // then
          expect(star.title).toEqual('half');
        });
      });

      context('on 1.5 fraction', function () {
        it('receives the first position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['half', 'integer']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(document.querySelector('#el'), 1, 5);

          // then
          expect(testContext.target.textContent).toEqual('half');
        });

        it('receives the first position as title', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['half', 'integer']],
            target: '#target',
            targetKeep: true,
          }).init();

          var star = raty.element.querySelectorAll('img')[1];

          // when
          Helper.mousemove(document.querySelector('#el'), 1, 5);

          // then
          expect(star.title).toEqual('half');
        });
      });

      context('on 1.6 fraction', function () {
        it('receives the second position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['half', 'integer']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(document.querySelector('#el'), 1, 6);

          // then
          expect(testContext.target.textContent).toEqual('integer');
        });

        it('receives the second position as title', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['half', 'integer']],
            target: '#target',
            targetKeep: true,
          }).init();

          var star = raty.element.querySelectorAll('img')[1];

          // when
          Helper.mousemove(document.querySelector('#el'), 1, 6);

          // then
          expect(star.title).toEqual('integer');
        });
      });

      context('on 1.7 fraction', function () {
        it('receives the second position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['half', 'integer']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(document.querySelector('#el'), 1, 7);

          // then
          expect(testContext.target.textContent).toEqual('integer');
        });

        it('receives the second position as title', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['half', 'integer']],
            target: '#target',
            targetKeep: true,
          }).init();

          var star = raty.element.querySelectorAll('img')[1];

          // when
          Helper.mousemove(document.querySelector('#el'), 1, 7);

          // then
          expect(star.title).toEqual('integer');
        });
      });

      context('on 1.8 fraction', function () {
        it('receives the second position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['half', 'integer']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(document.querySelector('#el'), 1, 8);

          // then
          expect(testContext.target.textContent).toEqual('integer');
        });

        it('receives the second position as title', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['half', 'integer']],
            target: '#target',
            targetKeep: true,
          }).init();

          var star = raty.element.querySelectorAll('img')[1];

          // when
          Helper.mousemove(document.querySelector('#el'), 1, 8);

          // then
          expect(star.title).toEqual('integer');
        });
      });

      context('on 1.9 fraction', function () {
        it('receives the second position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['half', 'integer']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(document.querySelector('#el'), 1, 9);

          // then
          expect(testContext.target.textContent).toEqual('integer');
        });

        it('receives the second position as title', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['half', 'integer']],
            target: '#target',
            targetKeep: true,
          }).init();

          var star = raty.element.querySelectorAll('img')[1];

          // when
          Helper.mousemove(document.querySelector('#el'), 1, 9);

          // then
          expect(star.title).toEqual('integer');
        });
      });
    });

    context('on :score', function () {
      beforeEach(() => {
        testContext.target = Helper.create('#target');
      });

      context('on 1.1', function () {
        it('receives the first position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['1,5', '2,0']],
            score: 1.1,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.init();

          // then
          expect(testContext.target.textContent).toEqual('1,5');
        });

        it('receives the first position as title', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['1,5', '2,0']],
            score: 1.1,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.init();

          // then
          var star = raty.element.querySelectorAll('img')[1];

          expect(star.title).toEqual('1,5');
        });
      });

      context('on 1.2', function () {
        it('receives the first position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['1,5', '2,0']],
            score: 1.2,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.init();

          // then
          expect(testContext.target.textContent).toEqual('1,5');
        });

        it('receives the first position as title', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['1,5', '2,0']],
            score: 1.2,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.init();

          // then
          var star = raty.element.querySelectorAll('img')[1];

          expect(star.title).toEqual('1,5');
        });
      });

      context('on 1.3', function () {
        it('receives the first position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['1,5', '2,0']],
            score: 1.3,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.init();

          // then
          expect(testContext.target.textContent).toEqual('1,5');
        });

        it('receives the first position as title', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['1,5', '2,0']],
            score: 1.3,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.init();

          // then
          var star = raty.element.querySelectorAll('img')[1];

          expect(star.title).toEqual('1,5');
        });
      });

      context('on 1.4', function () {
        it('receives the first position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['1,5', '2,0']],
            score: 1.4,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.init();

          // then
          expect(testContext.target.textContent).toEqual('1,5');
        });

        it('receives the first position as title', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['1,5', '2,0']],
            score: 1.4,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.init();

          // then
          var star = raty.element.querySelectorAll('img')[1];

          expect(star.title).toEqual('1,5');
        });
      });

      context('on 1.5', function () {
        it('receives the first position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['1,5', '2,0']],
            score: 1.5,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.init();

          // then
          expect(testContext.target.textContent).toEqual('1,5');
        });

        it('receives the first position as title', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['1,5', '2,0']],
            score: 1.5,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.init();

          // then
          var star = raty.element.querySelectorAll('img')[1];

          expect(star.title).toEqual('1,5');
        });
      });

      context('on 1.6', function () {
        it('receives the second position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['1,5', '2,0']],
            score: 1.6,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.init();

          // then
          expect(testContext.target.textContent).toEqual('2,0');
        });

        it('receives the second position as title', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['1,5', '2,0']],
            score: 1.6,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.init();

          // then
          var star = raty.element.querySelectorAll('img')[1];

          expect(star.title).toEqual('2,0');
        });
      });

      context('on 1.7', function () {
        it('receives the second position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['1,5', '2,0']],
            score: 1.7,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.init();

          // then
          expect(testContext.target.textContent).toEqual('2,0');
        });

        it('receives the second position as title', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['1,5', '2,0']],
            score: 1.7,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.init();

          // then
          var star = raty.element.querySelectorAll('img')[1];

          expect(star.title).toEqual('2,0');
        });
      });

      context('on 1.8', function () {
        it('receives the second position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['1,5', '2,0']],
            score: 1.8,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.init();

          // then
          expect(testContext.target.textContent).toEqual('2,0');
        });

        it('receives the second position as title', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['1,5', '2,0']],
            score: 1.8,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.init();

          // then
          var star = raty.element.querySelectorAll('img')[1];

          expect(star.title).toEqual('2,0');
        });
      });

      context('on 1.9', function () {
        it('receives the second position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['1,5', '2,0']],
            score: 1.9,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.init();

          // then
          expect(testContext.target.textContent).toEqual('2,0');
        });

        it('receives the second position as title', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['1,5', '2,0']],
            score: 1.9,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.init();

          // then
          var star = raty.element.querySelectorAll('img')[1];

          expect(star.title).toEqual('2,0');
        });
      });

      context('on 2.0', function () {
        it('receives the second position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['1,5', '2,0']],
            score: 2.0,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.init();

          // then
          expect(testContext.target.textContent).toEqual('2,0');
        });

        it('receives the second position as title', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['1,5', '2,0']],
            score: 2.0,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.init();

          // then
          var star = raty.element.querySelectorAll('img')[1];

          expect(star.title).toEqual('2,0');
        });
      });

      context('on 2', function () {
        it('receives the second position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['1,5', '2,0']],
            score: 2,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.init();

          // then
          expect(testContext.target.textContent).toEqual('2,0');
        });

        it('receives the second position as title', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            half: true,
            hints: [null, ['1,5', '2,0']],
            score: 2,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.init();

          // then
          var star = raty.element.querySelectorAll('img')[1];

          expect(star.title).toEqual('2,0');
        });
      });
    });
  });

  context('with :precision', function () {
    context('and value is null', function () {
      it('populates all with null', () => {
        // given
        var raty = new Raty(document.querySelector('#el'), {
          hints: null,
          precision: true,
        });

        // when
        raty.init();

        // then
        var expected = [null, null, null, null, null, null, null, null, null, null];

        expect(raty.opt.hints[0]).toEqual(expected);
        expect(raty.opt.hints[1]).toEqual(expected);
        expect(raty.opt.hints[2]).toEqual(expected);
        expect(raty.opt.hints[3]).toEqual(expected);
        expect(raty.opt.hints[4]).toEqual(expected);
      });
    });

    context('and value is an empty array', function () {
      xit('populates all float arrays with original hint', function () {
        // given
        var raty = new Raty(document.querySelector('#el'), { hints: [], precision: true });

        // when
        raty.init();

        // then

        expect(raty.opt.hints[0]).toEqual(['bad', 'bad', 'bad', 'bad', 'bad', 'bad', 'bad', 'bad', 'bad', 'bad']);
        expect(raty.opt.hints[1]).toEqual([
          'poor',
          'poor',
          'poor',
          'poor',
          'poor',
          'poor',
          'poor',
          'poor',
          'poor',
          'poor',
        ]);
        expect(raty.opt.hints[2]).toEqual([
          'regular',
          'regular',
          'regular',
          'regular',
          'regular',
          'regular',
          'regular',
          'regular',
          'regular',
          'regular',
        ]);
        expect(raty.opt.hints[3]).toEqual([
          'good',
          'good',
          'good',
          'good',
          'good',
          'good',
          'good',
          'good',
          'good',
          'good',
        ]);
        expect(raty.opt.hints[4]).toEqual([
          'gorgeous',
          'gorgeous',
          'gorgeous',
          'gorgeous',
          'gorgeous',
          'gorgeous',
          'gorgeous',
          'gorgeous',
          'gorgeous',
          'gorgeous',
        ]);
      });
    });

    context('with some integer hint', function () {
      it('populates all group with given hint', () => {
        // given
        var raty = new Raty(document.querySelector('#el'), {
          hints: [null, null, 'hint', null, null],
          precision: true,
        });

        // when
        raty.init();

        // then
        var expectedHint = ['hint', 'hint', 'hint', 'hint', 'hint', 'hint', 'hint', 'hint', 'hint', 'hint'];
        var expectedNull = [null, null, null, null, null, null, null, null, null, null];

        expect(raty.opt.hints[0]).toEqual(expectedNull);
        expect(raty.opt.hints[1]).toEqual(expectedNull);
        expect(raty.opt.hints[2]).toEqual(expectedHint);
        expect(raty.opt.hints[3]).toEqual(expectedNull);
        expect(raty.opt.hints[4]).toEqual(expectedNull);
      });
    });

    context('with some float hint', function () {
      xit('populates the other with last defined hint', function () {
        // given
        var raty = new Raty(document.querySelector('#el'), {
          hints: [null, null, [null, 'two', null, 'four', undefined], null, null],
          precision: true,
        });

        var expectedHint = [null, 'two', null, 'four', 'four', 'four', 'four', 'four', 'four', 'four'];
        var expectedNull = [null, null, null, null, null, null, null, null, null, null];

        // when
        raty.init();

        // then
        expect(raty.opt.hints[0]).toEqual(expectedNull);
        expect(raty.opt.hints[1]).toEqual(expectedNull);
        expect(raty.opt.hints[2]).toEqual(expectedHint);
        expect(raty.opt.hints[3]).toEqual(expectedNull);
        expect(raty.opt.hints[4]).toEqual(expectedNull);
      });
    });

    context('on #move', function () {
      beforeEach(() => {
        testContext.target = Helper.create('#target');
      });

      context('on 1.1', function () {
        it('receives the [1][0] position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.1);

          // then
          expect(testContext.target.textContent).toEqual('1,1');
        });

        it('receives the [1][0] position as title', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.1);

          // then
          expect(raty.element.querySelectorAll('img')[1].title).toEqual('1,1');
        });
      });

      context('on 1.2', function () {
        it('receives the [1][1] position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.2);

          // then
          expect(testContext.target.textContent).toEqual('1,2');
        });

        it('receives the [1][1] position as title', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.2);

          // then
          expect(raty.element.querySelectorAll('img')[1].title).toEqual('1,2');
        });
      });

      context('on 1.3', function () {
        it('receives the [1][2] position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.3);

          // then
          expect(testContext.target.textContent).toEqual('1,3');
        });

        it('receives the [1][2] position as title', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.3);

          // then
          expect(raty.element.querySelectorAll('img')[1].title).toEqual('1,3');
        });
      });

      context('on 1.4', function () {
        it('receives the [1][3] position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.4);

          // then
          expect(testContext.target.textContent).toEqual('1,4');
        });

        it('receives the [1][3] position as title', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.4);

          // then
          expect(raty.element.querySelectorAll('img')[1].title).toEqual('1,4');
        });
      });

      context('on 1.5', function () {
        it('receives the [1][4] position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.5);

          // then
          expect(testContext.target.textContent).toEqual('1,5');
        });

        it('receives the [1][4] position as title', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.5);

          // then
          expect(raty.element.querySelectorAll('img')[1].title).toEqual('1,5');
        });
      });

      context('on 1.6', function () {
        it('receives the [1][5] position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.6);

          // then
          expect(testContext.target.textContent).toEqual('1,6');
        });

        it('receives the [1][5] position as title', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.6);

          // then
          expect(raty.element.querySelectorAll('img')[1].title).toEqual('1,6');
        });
      });

      context('on 1.7', function () {
        it('receives the [1][6] position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.7);

          // then
          expect(testContext.target.textContent).toEqual('1,7');
        });

        it('receives the [1][7] position as title', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.7);

          // then
          expect(raty.element.querySelectorAll('img')[1].title).toEqual('1,7');
        });
      });

      context('on 1.8', function () {
        it('receives the [1][7] position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.8);

          // then
          expect(testContext.target.textContent).toEqual('1,8');
        });

        it('receives the [1][7] position as title', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.8);

          // then
          expect(raty.element.querySelectorAll('img')[1].title).toEqual('1,8');
        });
      });

      context('on 1.9', function () {
        it('receives the [1][8] position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.9);

          // then
          expect(testContext.target.textContent).toEqual('1,9');
        });

        it('receives the [1][8] position as title', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.9);

          // then
          expect(raty.element.querySelectorAll('img')[1].title).toEqual('1,9');
        });
      });

      context('on 2.0', function () {
        it('receives the [1][9] position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(2.0);

          // then
          expect(testContext.target.textContent).toEqual('2,0');
        });

        it('receives the [1][9] position as title', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(2.0);

          // then
          expect(raty.element.querySelectorAll('img')[1].title).toEqual('2,0');
        });
      });

      context('on 2', function () {
        it('receives the [1][9] position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(2);

          // then
          expect(testContext.target.textContent).toEqual('2,0');
        });

        it('receives the [1][9] position as title', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(2);

          // then
          expect(raty.element.querySelectorAll('img')[1].title).toEqual('2,0');
        });
      });
    });

    // TODO: mousemove event is not working during test
    xcontext('on mousemove', function () {
      beforeEach(() => {
        testContext.target = Helper.create('#target');
      });

      context('on 1.0 fraction', function () {
        it('receives the [1][0] position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(document.querySelector('#el'), 1, 0);

          // then
          expect(testContext.target.textContent).toEqual('1,1');
        });

        it('receives the [1][0] position as title', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(document.querySelector('#el'), 1, 0);

          // then
          expect(raty.element.querySelectorAll('img')[1].title).toEqual('1,1');
        });
      });

      context('on 1.1 fraction', function () {
        it('receives the [1][1] position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(document.querySelector('#el'), 1, 1);

          // then
          expect(testContext.target.textContent).toEqual('1,2');
        });

        it('receives the [1][1] position as title', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(document.querySelector('#el'), 1, 1);

          // then
          expect(raty.element.querySelectorAll('img')[1].title).toEqual('1,2');
        });
      });

      context('on 1.2 fraction', function () {
        it('receives the [1][2] position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(document.querySelector('#el'), 1, 2);

          // then
          expect(testContext.target.textContent).toEqual('1,3');
        });

        it('receives the [1][2] position as title', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(document.querySelector('#el'), 1, 2);

          // then
          expect(raty.element.querySelectorAll('img')[1].title).toEqual('1,3');
        });
      });

      context('on 1.3 fraction', function () {
        it('receives the [1][3] position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(document.querySelector('#el'), 1, 3);

          // then
          expect(testContext.target.textContent).toEqual('1,4');
        });

        it('receives the [1][3] position as title', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(document.querySelector('#el'), 1, 3);

          // then
          expect(raty.element.querySelectorAll('img')[1].title).toEqual('1,4');
        });
      });

      context('on 1.4 fraction', function () {
        it('receives the [1][4] position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(document.querySelector('#el'), 1, 4);

          // then
          expect(testContext.target.textContent).toEqual('1,5');
        });

        it('receives the [1][4] position as title', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(document.querySelector('#el'), 1, 4);

          // then
          expect(raty.element.querySelectorAll('img')[1].title).toEqual('1,5');
        });
      });

      context('on 1.5 fraction', function () {
        it('receives the [1][5] position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(document.querySelector('#el'), 1, 5);

          // then
          expect(testContext.target.textContent).toEqual('1,6');
        });

        it('receives the [1][5] position as title', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(document.querySelector('#el'), 1, 5);

          // then
          expect(raty.element.querySelectorAll('img')[1].title).toEqual('1,6');
        });
      });

      context('on 1.6 fraction', function () {
        it('receives the [1][6] position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(document.querySelector('#el'), 1, 6);

          // then
          expect(testContext.target.textContent).toEqual('1,7');
        });

        it('receives the [1][6] position as title', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(document.querySelector('#el'), 1, 6);

          // then
          expect(raty.element.querySelectorAll('img')[1].title).toEqual('1,7');
        });
      });

      context('on 1.7 fraction', function () {
        it('receives the [1][7] position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(document.querySelector('#el'), 1, 7);

          // then
          expect(testContext.target.textContent).toEqual('1,8');
        });

        it('receives the [1][7] position as title', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(document.querySelector('#el'), 1, 7);

          // then
          expect(raty.element.querySelectorAll('img')[1].title).toEqual('1,8');
        });
      });

      context('on 1.8 fraction', function () {
        it('receives the [1][8] position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(document.querySelector('#el'), 1, 8);

          // then
          expect(testContext.target.textContent).toEqual('1,9');
        });

        it('receives the [1][8] position as title', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(document.querySelector('#el'), 1, 8);

          // then
          expect(raty.element.querySelectorAll('img')[1].title).toEqual('1,9');
        });
      });

      context('on 1.9 fraction', function () {
        it('receives the [1][9] position', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(document.querySelector('#el'), 1, 9);

          // then
          expect(testContext.target.textContent).toEqual('2,0');
        });

        it('receives the [1][9] position as title', () => {
          // given
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(document.querySelector('#el'), 1, 9);

          // then
          expect(raty.element.querySelectorAll('img')[1].title).toEqual('2,0');
        });
      });
    });

    context('on score', function () {
      beforeEach(() => {
        testContext.target = Helper.create('#target');
      });

      context('on 1.1', function () {
        it('receives the [1][0] position', () => {
          // given

          // when
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            score: 1.1,
            target: '#target',
            targetKeep: true,
          }).init();

          // then
          expect(testContext.target.textContent).toEqual('1,1');
        });

        it('receives the [1][0] position as title', () => {
          // given

          // when
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            score: 1.1,
            target: '#target',
            targetKeep: true,
          }).init();

          // then
          expect(raty.element.querySelectorAll('img')[1].title).toEqual('1,1');
        });
      });

      context('on 1.2', function () {
        it('receives the [1][1] position', () => {
          // given

          // when
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            score: 1.2,
            target: '#target',
            targetKeep: true,
          }).init();

          // then
          expect(testContext.target.textContent).toEqual('1,2');
        });

        it('receives the [1][1] position as title', () => {
          // given

          // when
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            score: 1.2,
            target: '#target',
            targetKeep: true,
          }).init();

          // then
          expect(raty.element.querySelectorAll('img')[1].title).toEqual('1,2');
        });
      });

      context('on 1.3', function () {
        it('receives the [1][2] position', () => {
          // given

          // when
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            score: 1.3,
            target: '#target',
            targetKeep: true,
          }).init();

          // then
          expect(testContext.target.textContent).toEqual('1,3');
        });

        it('receives the [1][2] position as title', () => {
          // given

          // when
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            score: 1.3,
            target: '#target',
            targetKeep: true,
          }).init();

          // then
          expect(raty.element.querySelectorAll('img')[1].title).toEqual('1,3');
        });
      });

      context('on 1.4', function () {
        it('receives the [1][3] position', () => {
          // given

          // when
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            score: 1.4,
            target: '#target',
            targetKeep: true,
          }).init();

          // then
          expect(testContext.target.textContent).toEqual('1,4');
        });

        it('receives the [1][3] position as title', () => {
          // given

          // when
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            score: 1.4,
            target: '#target',
            targetKeep: true,
          }).init();

          // then
          expect(raty.element.querySelectorAll('img')[1].title).toEqual('1,4');
        });
      });

      context('on 1.5', function () {
        it('receives the [1][4] position', () => {
          // given

          // when
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            score: 1.5,
            target: '#target',
            targetKeep: true,
          }).init();

          // then
          expect(testContext.target.textContent).toEqual('1,5');
        });

        it('receives the [1][4] position as title', () => {
          // given

          // when
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            score: 1.5,
            target: '#target',
            targetKeep: true,
          }).init();

          // then
          expect(raty.element.querySelectorAll('img')[1].title).toEqual('1,5');
        });
      });

      context('on 1.6', function () {
        it('receives the [1][5] position', () => {
          // given

          // when
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            score: 1.6,
            target: '#target',
            targetKeep: true,
          }).init();

          // then
          expect(testContext.target.textContent).toEqual('1,6');
        });

        it('receives the [1][5] position as title', () => {
          // given

          // when
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            score: 1.6,
            target: '#target',
            targetKeep: true,
          }).init();

          // then
          expect(raty.element.querySelectorAll('img')[1].title).toEqual('1,6');
        });
      });

      context('on 1.7', function () {
        it('receives the [1][6] position', () => {
          // given

          // when
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            score: 1.7,
            target: '#target',
            targetKeep: true,
          }).init();

          // then
          expect(testContext.target.textContent).toEqual('1,7');
        });

        it('receives the [1][6] position as title', () => {
          // given

          // when
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            score: 1.7,
            target: '#target',
            targetKeep: true,
          }).init();

          // then
          expect(raty.element.querySelectorAll('img')[1].title).toEqual('1,7');
        });
      });

      context('on 1.8', function () {
        it('receives the [1][7] position', () => {
          // given

          // when
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            score: 1.8,
            target: '#target',
            targetKeep: true,
          }).init();

          // then
          expect(testContext.target.textContent).toEqual('1,8');
        });

        it('receives the [1][7] position as title', () => {
          // given

          // when
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            score: 1.8,
            target: '#target',
            targetKeep: true,
          }).init();

          // then
          expect(raty.element.querySelectorAll('img')[1].title).toEqual('1,8');
        });
      });

      context('on 1.9', function () {
        it('receives the [1][8] position', () => {
          // given

          // when
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            score: 1.9,
            target: '#target',
            targetKeep: true,
          }).init();

          // then
          expect(testContext.target.textContent).toEqual('1,9');
        });

        it('receives the [1][8] position as title', () => {
          // given

          // when
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            score: 1.9,
            target: '#target',
            targetKeep: true,
          }).init();

          // then
          expect(raty.element.querySelectorAll('img')[1].title).toEqual('1,9');
        });
      });

      context('on 1.0', function () {
        it('receives the [1][9] position', () => {
          // given

          // when
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            score: 2.0,
            target: '#target',
            targetKeep: true,
          }).init();

          // then
          expect(testContext.target.textContent).toEqual('2,0');
        });

        it('receives the [1][9] position as title', () => {
          // given

          // when
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            score: 2.0,
            target: '#target',
            targetKeep: true,
          }).init();

          // then
          expect(raty.element.querySelectorAll('img')[1].title).toEqual('2,0');
        });
      });

      context('on 2', function () {
        it('receives the [1][9] position', () => {
          // given

          // when
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            score: 2,
            target: '#target',
            targetKeep: true,
          }).init();

          // then
          expect(testContext.target.textContent).toEqual('2,0');
        });

        it('receives the [1][9] position as title', () => {
          // given

          // when
          var raty = new Raty(document.querySelector('#el'), {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            score: 1,
            target: '#target',
            targetKeep: true,
          }).init();

          // then
          expect(raty.element.querySelectorAll('img')[1].title).toEqual('2,0');
        });
      });
    });

    context('on leave', function () {
      it('reset all stars to the last hint', () => {
        // given
        var raty = new Raty(document.querySelector('#el'), {
          hints: null,
          precision: true,
        }).init();

        var stars = raty.element.querySelectorAll('img');

        raty.move(4.1);
        raty.move(3.1);
        raty.move(2.1);
        raty.move(1.1);
        raty.move(0.1);

        // when
        Helper.trigger(raty.element, 'mouseleave');

        // then
        expect(stars[0].title).toEqual('1');
        expect(stars[1].title).toEqual('2');
        expect(stars[2].title).toEqual('3');
        expect(stars[3].title).toEqual('4');
        expect(stars[4].title).toEqual('5');
      });
    });
  });
});
