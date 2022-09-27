describe('#hints', function () {
  beforeEach(function () {
    Helper.create('#el');
  });

  context('with :halfShow', function () {
    context('as *true', function () {
      context('when null', function () {
        xit('initializes all with null', function () {
          // given
          var raty = new Raty('#el', {
            halfShow: true,
            hints: null,
          });

          // when
          raty.init();

          // then
          var expected = [null, null];
          var hints = raty.opt.hints;

          expect(hints[0]).toEqual(expected);
          expect(hints[1]).toEqual(expected);
          expect(hints[2]).toEqual(expected);
          expect(hints[3]).toEqual(expected);
          expect(hints[4]).toEqual(expected);
        });
      });

      context('with empty as group', function () {
        xit('replicates the empty value', function () {
          // given
          var raty = new Raty('#el', { halfShow: true, hints: [''] });

          // when
          raty.init();

          // then
          expect(raty.opt.hints[0]).toEqual(['', '']);
        });
      });

      context('the stars', function () {
        xit('changes the title', function () {
          // given
          var raty = new Raty('#el', { halfShow: true, hints: ['1', '/', 'c', '-', '#'] });

          // when
          raty.init();

          // then
          var stars = raty.self.querySelectorAll('img');

          expect(stars[0].title).toEqual('1');
          expect(stars[1].title).toEqual('/');
          expect(stars[2].title).toEqual('c');
          expect(stars[3].title).toEqual('-');
          expect(stars[4].title).toEqual('#');
        });

        context('with undefined as group', function () {
          xit('receives the number of the star', function () {
            // given
            var raty = new Raty('#el', { halfShow: true, hints: [undefined] });

            // when
            raty.init();

            // then
            expect(raty.self.querySelector('img').title).toEqual('bad');
          });
        });

        context('with null as group', function () {
          xit('receives the number of star', function () {
            // given
            var raty = new Raty('#el', { halfShow: true, hints: [null] });

            // when
            raty.init();

            // then
            expect(raty.self.querySelector('img').title).toEqual('1');
          });
        });

        context('with array as group with only half value', function () {
          xit('receives the last value', function () {
            // given
            var raty = new Raty('#el', { halfShow: true, hints: [['half']] });

            // when
            raty.init();

            // then
            expect(raty.self.querySelector('img').title).toEqual('half');
          });
        });

        context('with array as group with both value', function () {
          xit('receives the last value', function () {
            // given
            var raty = new Raty('#el', { halfShow: true, hints: [['half', 'one']] });

            // when
            raty.init();

            // then
            expect(raty.self.querySelector('img')[0].title).toEqual('one');
          });
        });

        context('with less hints than stars', function () {
          xit('receives the default hint value', function () {
            // given
            var raty = new Raty('#el', { halfShow: true, hints: ['1', '2', '3', '4'] });

            // when
            raty.init();

            // then
            var stars = raty.self.querySelectorAll('img');

            expect(stars[0].title).toEqual('1');
            expect(stars[1].title).toEqual('2');
            expect(stars[2].title).toEqual('3');
            expect(stars[3].title).toEqual('4');
            expect(stars[4].title).toEqual('gorgeous');
          });
        });

        context('with more stars than hints', function () {
          xit('receives the :score value', function () {
            // given
            var raty = new Raty('#el', { halfShow: true, hints: ['a', 'b', 'c', 'd', 'e'], number: 6 });

            // when
            raty.init();

            // then
            var stars = raty.self.querySelectorAll('img');

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
        xit('initializes with an empty array', function () {
          // given
          var raty = new Raty('#el', { halfShow: false, hints: null });

          // when
          raty.init();

          // then
          expect(raty.opt.hints).toEqual([]);
        });
      });

      context('with undefined value', function () {
        xit('receives the default corresponding hint', function () {
          // given
          var raty = new Raty('#el', { halfShow: false, hints: [undefined] });

          // when
          raty.init();

          // then
          expect(raty.self.querySelector('img').title).toEqual('bad');
        });
      });

      context('the stars', function () {
        xit('changes the hints', function () {
          // given
          var raty = new Raty('#el', { halfShow: false, hints: ['1', '/', 'c', '-', '#'] });

          // when
          raty.init();

          // then
          var stars = raty.self.querySelectorAll('img');

          expect(stars[0].title).toEqual('1');
          expect(stars[1].title).toEqual('/');
          expect(stars[2].title).toEqual('c');
          expect(stars[3].title).toEqual('-');
          expect(stars[4].title).toEqual('#');
        });

        context('with empty value', function () {
          xit('receives an empty value', function () {
            // given
            var raty = new Raty('#el', { halfShow: false, hints: [''] });

            // when
            raty.init();

            // then
            expect(raty.self.querySelector('img').title).toEqual('');
          });
        });

        context('with null value', function () {
          xit('receives the score', function () {
            // given
            var raty = new Raty('#el', { halfShow: false, hints: [null] });

            // when
            raty.init();

            // then
            expect(raty.self.querySelector('img').title).toEqual('1');
          });
        });

        context('with less hints than stars', function () {
          xit('receives the default hint value', function () {
            // given
            var raty = new Raty('#el', { halfShow: false, hints: ['1', '2', '3', '4'] });

            // when
            raty.init();

            // then
            var stars = raty.self.querySelectorAll('img');

            expect(stars[0].title).toEqual('1');
            expect(stars[1].title).toEqual('2');
            expect(stars[2].title).toEqual('3');
            expect(stars[3].title).toEqual('4');
            expect(stars[4].title).toEqual('gorgeous');
          });
        });

        context('with more stars than hints', function () {
          xit('receives the :score value', function () {
            // given
            var raty = new Raty('#el', { halfShow: false, hints: ['a', 'b', 'c', 'd', 'e'], number: 6 });

            // when
            raty.init();

            // then
            var stars = raty.self.querySelectorAll('img');

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
      xit('populates all with null', function () {
        // given
        var raty = new Raty('#el', { half: true, hints: null });

        // when
        raty.init();

        // then
        var expected = [null, null];
        var hints = raty.opt.hints;

        expect(hints[0]).toEqual(expected);
        expect(hints[1]).toEqual(expected);
        expect(hints[2]).toEqual(expected);
        expect(hints[3]).toEqual(expected);
        expect(hints[4]).toEqual(expected);
      });
    });

    context('and value is an empty array', function () {
      xit('populates all float arrays with original hint', function () {
        // given
        var raty = new Raty('#el', { half: true, hints: [] });

        // when
        raty.init();

        // then
        var hints = raty.opt.hints;

        expect(hints[0]).toEqual(['bad', 'bad']);
        expect(hints[1]).toEqual(['poor', 'poor']);
        expect(hints[2]).toEqual(['regular', 'regular']);
        expect(hints[3]).toEqual(['good', 'good']);
        expect(hints[4]).toEqual(['gorgeous', 'gorgeous']);
      });
    });

    context('with some integer hint', function () {
      xit('populates all group with given hint', function () {
        // given
        var raty = new Raty('#el', { half: true, hints: ['hint'] });

        // when
        raty.init();

        // then
        var hints = raty.opt.hints;

        expect(hints[0][0]).toEqual('hint');
        expect(hints[0][1]).toEqual('hint');
      });
    });

    context('with some float hint', function () {
      xit('populates the other with last defined hint', function () {
        // given
        var raty = new Raty('#el', { half: true, hints: [['hint']] });

        // when
        raty.init();

        // then
        var hints = raty.opt.hints;

        expect(hints[0][1]).toEqual('hint');
        expect(hints[0][1]).toEqual('hint');
      });
    });

    context('on #move', function () {
      beforeEach(function () {
        this.target = Helper.create('#target');
      });

      context('on 1.1', function () {
        xit('receives the second position', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['1,5', '2,0']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.1);

          // then
          expect(this.target.text()).toEqual('1,5');
        });

        xit('changes the title to first position', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['1,5', '2,0']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.1);

          // then
          var star = raty.self.querySelector()[1];

          expect(star[0].title).toEqual('1,5');
        });
      });

      context('on 1.2', function () {
        xit('receives the first position', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['1,5', '2,0']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.2);

          // then
          expect(this.target.text()).toEqual('1,5');
        });

        xit('changes the title to first position', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['1,5', '2,0']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.2);

          // then
          var star = raty.self.querySelector()[1];

          expect(star[0].title).toEqual('1,5');
        });
      });

      context('on 1.3', function () {
        xit('receives the first position', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['1,5', '2,0']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.3);

          // then
          expect(this.target.text()).toEqual('1,5');
        });

        xit('changes the title to first position', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['1,5', '2,0']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.3);

          // then
          var star = raty.self.querySelector()[1];

          expect(star[0].title).toEqual('1,5');
        });
      });

      context('on 1.4', function () {
        xit('receives the first position', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['1,5', '2,0']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.4);

          // then
          expect(this.target.text()).toEqual('1,5');
        });

        xit('changes the title to first position', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['1,5', '2,0']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.4);

          // then
          var star = raty.self.querySelector()[1];

          expect(star[0].title).toEqual('1,5');
        });
      });

      context('on 1.5', function () {
        xit('receives the first position', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['1,5', '2,0']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.5);

          // then
          expect(this.target.text()).toEqual('1,5');
        });

        xit('changes the title to first position', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['1,5', '2,0']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.5);

          // then
          var star = raty.self.querySelector()[1];

          expect(star[0].title).toEqual('1,5');
        });
      });

      context('on 1.6', function () {
        xit('receives the second position', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['1,5', '2,0']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.6);

          // then
          expect(this.target.text()).toEqual('2,0');
        });

        xit('changes the title to first position', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['1,5', '2,0']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.6);

          // then
          var star = raty.self.querySelector()[1];

          expect(star[0].title).toEqual('2,0');
        });
      });

      context('on 1.7', function () {
        xit('receives the second position', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['1,5', '2,0']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.7);

          // then
          expect(this.target.text()).toEqual('2,0');
        });

        xit('changes the title to first position', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['1,5', '2,0']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.7);

          // then
          var star = raty.self.querySelector()[1];

          expect(star[0].title).toEqual('2,0');
        });
      });

      context('on 1.8', function () {
        xit('receives the second position', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['1,5', '2,0']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.8);

          // then
          expect(this.target.text()).toEqual('2,0');
        });

        xit('changes the title to first position', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['1,5', '2,0']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.8);

          // then
          var star = raty.self.querySelector()[1];

          expect(star[0].title).toEqual('2,0');
        });
      });

      context('on 1.9', function () {
        xit('receives the second position', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['1,5', '2,0']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.9);

          // then
          expect(this.target.text()).toEqual('2,0');
        });

        xit('changes the title to first position', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['1,5', '2,0']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.9);

          // then
          var star = raty.self.querySelector()[1];

          expect(star[0].title).toEqual('2,0');
        });
      });

      context('on 2.0', function () {
        xit('receives the second position', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['1,5', '2,0']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(2.0);

          // then
          expect(this.target.text()).toEqual('2,0');
        });

        xit('changes the title to first position', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['1,5', '2,0']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(2.0);

          // then
          var star = raty.self.querySelector()[1];

          expect(star[0].title).toEqual('2,0');
        });
      });

      context('on 2', function () {
        xit('receives the second position', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['1,5', '2,0']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(2);

          // then
          expect(this.target.text()).toEqual('2,0');
        });
      });

      xit('changes the title to first position', function () {
        // given
        var raty = new Raty('#el', {
          half: true,
          hints: [null, ['1,5', '2,0']],
          target: '#target',
          targetKeep: true,
        }).init();

        // when
        raty.move(2);

        // then
        var star = raty.self.querySelector()[1];

        expect(star[0].title).toEqual('2,0');
      });
    });

    context('on mousemove', function () {
      beforeEach(function () {
        this.target = Helper.create('#target');
      });

      context('on 1.0 fraction', function () {
        xit('receives the first position', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['half', 'integer']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(this.el, 1, 0);

          // then
          expect(this.target.text()).toEqual('half');
        });

        xit('receives the first position as title', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['half', 'integer']],
            target: '#target',
            targetKeep: true,
          }).init();

          var star = raty.self.querySelector()[1];

          // when
          Helper.mousemove(this.el, 1, 0);

          // then
          expect(star[0].title).toEqual('half');
        });
      });

      context('on 1.1 fraction', function () {
        xit('receives the first position', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['half', 'integer']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(this.el, 1, 1);

          // then
          expect(this.target.text()).toEqual('half');
        });

        xit('receives the first position as title', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['half', 'integer']],
            target: '#target',
            targetKeep: true,
          }).init();

          var star = raty.self.querySelector()[1];

          // when
          Helper.mousemove(this.el, 1, 1);

          // then
          expect(star[0].title).toEqual('half');
        });
      });

      context('on 1.2 fraction', function () {
        xit('receives the first position', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['half', 'integer']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(this.el, 1, 2);

          // then
          expect(this.target.text()).toEqual('half');
        });

        xit('receives the first position as title', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['half', 'integer']],
            target: '#target',
            targetKeep: true,
          }).init();

          var star = raty.self.querySelector()[1];

          // when
          Helper.mousemove(this.el, 1, 2);

          // then
          expect(star[0].title).toEqual('half');
        });
      });

      context('on 1.3 fraction', function () {
        xit('receives the first position', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['half', 'integer']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(this.el, 1, 3);

          // then
          expect(this.target.text()).toEqual('half');
        });

        xit('receives the first position as title', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['half', 'integer']],
            target: '#target',
            targetKeep: true,
          }).init();

          var star = raty.self.querySelector()[1];

          // when
          Helper.mousemove(this.el, 1, 3);

          // then
          expect(star[0].title).toEqual('half');
        });
      });

      context('on 1.4 fraction', function () {
        xit('receives the first position', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['half', 'integer']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(this.el, 1, 4);

          // then
          expect(this.target.text()).toEqual('half');
        });

        xit('receives the first position as title', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['half', 'integer']],
            target: '#target',
            targetKeep: true,
          }).init();

          var star = raty.self.querySelector()[1];

          // when
          Helper.mousemove(this.el, 1, 4);

          // then
          expect(star[0].title).toEqual('half');
        });
      });

      context('on 1.5 fraction', function () {
        xit('receives the first position', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['half', 'integer']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(this.el, 1, 5);

          // then
          expect(this.target.text()).toEqual('half');
        });

        xit('receives the first position as title', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['half', 'integer']],
            target: '#target',
            targetKeep: true,
          }).init();

          var star = raty.self.querySelector()[1];

          // when
          Helper.mousemove(this.el, 1, 5);

          // then
          expect(star[0].title).toEqual('half');
        });
      });

      context('on 1.6 fraction', function () {
        xit('receives the second position', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['half', 'integer']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(this.el, 1, 6);

          // then
          expect(this.target.text()).toEqual('integer');
        });

        xit('receives the second position as title', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['half', 'integer']],
            target: '#target',
            targetKeep: true,
          }).init();

          var star = raty.self.querySelector()[1];

          // when
          Helper.mousemove(this.el, 1, 6);

          // then
          expect(star[0].title).toEqual('integer');
        });
      });

      context('on 1.7 fraction', function () {
        xit('receives the second position', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['half', 'integer']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(this.el, 1, 7);

          // then
          expect(this.target.text()).toEqual('integer');
        });

        xit('receives the second position as title', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['half', 'integer']],
            target: '#target',
            targetKeep: true,
          }).init();

          var star = raty.self.querySelector()[1];

          // when
          Helper.mousemove(this.el, 1, 7);

          // then
          expect(star[0].title).toEqual('integer');
        });
      });

      context('on 1.8 fraction', function () {
        xit('receives the second position', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['half', 'integer']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(this.el, 1, 8);

          // then
          expect(this.target.text()).toEqual('integer');
        });

        xit('receives the second position as title', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['half', 'integer']],
            target: '#target',
            targetKeep: true,
          }).init();

          var star = raty.self.querySelector()[1];

          // when
          Helper.mousemove(this.el, 1, 8);

          // then
          expect(star[0].title).toEqual('integer');
        });
      });

      context('on 1.9 fraction', function () {
        xit('receives the second position', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['half', 'integer']],
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(this.el, 1, 9);

          // then
          expect(this.target.text()).toEqual('integer');
        });

        xit('receives the second position as title', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['half', 'integer']],
            target: '#target',
            targetKeep: true,
          }).init();

          var star = raty.self.querySelector()[1];

          // when
          Helper.mousemove(this.el, 1, 9);

          // then
          expect(star[0].title).toEqual('integer');
        });
      });
    });

    context('on :score', function () {
      beforeEach(function () {
        this.target = Helper.create('#target');
      });

      context('on 1.1', function () {
        xit('receives the first position', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['1,5', '2,0']],
            score: 1.1,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.init();

          // then
          expect(this.target.text()).toEqual('1,5');
        });

        xit('receives the first position as title', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['1,5', '2,0']],
            score: 1.1,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.init();

          // then
          var star = raty.self.querySelector()[1];

          expect(star[0].title).toEqual('1,5');
        });
      });

      context('on 1.2', function () {
        xit('receives the first position', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['1,5', '2,0']],
            score: 1.2,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.init();

          // then
          expect(this.target.text()).toEqual('1,5');
        });

        xit('receives the first position as title', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['1,5', '2,0']],
            score: 1.2,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.init();

          // then
          var star = raty.self.querySelector()[1];

          expect(star[0].title).toEqual('1,5');
        });
      });

      context('on 1.3', function () {
        xit('receives the first position', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['1,5', '2,0']],
            score: 1.3,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.init();

          // then
          expect(this.target.text()).toEqual('1,5');
        });

        xit('receives the first position as title', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['1,5', '2,0']],
            score: 1.3,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.init();

          // then
          var star = raty.self.querySelector()[1];

          expect(star[0].title).toEqual('1,5');
        });
      });

      context('on 1.4', function () {
        xit('receives the first position', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['1,5', '2,0']],
            score: 1.4,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.init();

          // then
          expect(this.target.text()).toEqual('1,5');
        });

        xit('receives the first position as title', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['1,5', '2,0']],
            score: 1.4,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.init();

          // then
          var star = raty.self.querySelector()[1];

          expect(star[0].title).toEqual('1,5');
        });
      });

      context('on 1.5', function () {
        xit('receives the first position', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['1,5', '2,0']],
            score: 1.5,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.init();

          // then
          expect(this.target.text()).toEqual('1,5');
        });

        xit('receives the first position as title', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['1,5', '2,0']],
            score: 1.5,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.init();

          // then
          var star = raty.self.querySelector()[1];

          expect(star[0].title).toEqual('1,5');
        });
      });

      context('on 1.6', function () {
        xit('receives the second position', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['1,5', '2,0']],
            score: 1.6,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.init();

          // then
          expect(this.target.text()).toEqual('2,0');
        });

        xit('receives the second position as title', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['1,5', '2,0']],
            score: 1.6,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.init();

          // then
          var star = raty.self.querySelector()[1];

          expect(star[0].title).toEqual('2,0');
        });
      });

      context('on 1.7', function () {
        xit('receives the second position', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['1,5', '2,0']],
            score: 1.7,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.init();

          // then
          expect(this.target.text()).toEqual('2,0');
        });

        xit('receives the second position as title', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['1,5', '2,0']],
            score: 1.7,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.init();

          // then
          var star = raty.self.querySelector()[1];

          expect(star[0].title).toEqual('2,0');
        });
      });

      context('on 1.8', function () {
        xit('receives the second position', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['1,5', '2,0']],
            score: 1.8,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.init();

          // then
          expect(this.target.text()).toEqual('2,0');
        });

        xit('receives the second position as title', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['1,5', '2,0']],
            score: 1.8,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.init();

          // then
          var star = raty.self.querySelector()[1];

          expect(star[0].title).toEqual('2,0');
        });
      });

      context('on 1.9', function () {
        xit('receives the second position', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['1,5', '2,0']],
            score: 1.9,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.init();

          // then
          expect(this.target.text()).toEqual('2,0');
        });

        xit('receives the second position as title', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['1,5', '2,0']],
            score: 1.9,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.init();

          // then
          var star = raty.self.querySelector()[1];

          expect(star[0].title).toEqual('2,0');
        });
      });

      context('on 2.0', function () {
        xit('receives the second position', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['1,5', '2,0']],
            score: 2.0,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.init();

          // then
          expect(this.target.text()).toEqual('2,0');
        });

        xit('receives the second position as title', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['1,5', '2,0']],
            score: 2.0,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.init();

          // then
          var star = raty.self.querySelector()[1];

          expect(star[0].title).toEqual('2,0');
        });
      });

      context('on 2', function () {
        xit('receives the second position', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['1,5', '2,0']],
            score: 2,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.init();

          // then
          expect(this.target.text()).toEqual('2,0');
        });

        xit('receives the second position as title', function () {
          // given
          var raty = new Raty('#el', {
            half: true,
            hints: [null, ['1,5', '2,0']],
            score: 2,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.init();

          // then
          var star = raty.self.querySelector()[1];

          expect(star[0].title).toEqual('2,0');
        });
      });
    });
  });

  context('with :precision', function () {
    context('and value is null', function () {
      xit('populates all with null', function () {
        // given
        var raty = new Raty('#el', {
          hints: null,
          precision: true,
        }).init();

        // when
        raty.init();

        // then
        var expected = [null, null, null, null, null, null, null, null, null, null];
        var hints = raty.opt.hints;

        expect(hints[0]).toEqual(expected);
        expect(hints[1]).toEqual(expected);
        expect(hints[2]).toEqual(expected);
        expect(hints[3]).toEqual(expected);
        expect(hints[4]).toEqual(expected);
      });
    });

    context('and value is an empty array', function () {
      xit('populates all float arrays with original hint', function () {
        // given
        var raty = new Raty('#el', {
          hints: [],
          precision: true,
        }).init();

        // when
        raty.init();

        // then
        var hints = raty.opt.hints;

        expect(hints[0]).toEqual(['bad', 'bad', 'bad', 'bad', 'bad', 'bad', 'bad', 'bad', 'bad', 'bad']);
        expect(hints[1]).toEqual(['poor', 'poor', 'poor', 'poor', 'poor', 'poor', 'poor', 'poor', 'poor', 'poor']);
        expect(hints[2]).toEqual([
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
        expect(hints[3]).toEqual(['good', 'good', 'good', 'good', 'good', 'good', 'good', 'good', 'good', 'good']);
        expect(hints[4]).toEqual([
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
      xit('populates all group with given hint', function () {
        // given
        var raty = new Raty('#el', {
          hints: [null, null, 'hint', null, null],
          precision: true,
        }).init();

        // when
        raty.init();

        // then
        var expectedHint = ['hint', 'hint', 'hint', 'hint', 'hint', 'hint', 'hint', 'hint', 'hint', 'hint'];
        var expectedNull = [null, null, null, null, null, null, null, null, null, null];
        var hints = raty.opt.hints;

        expect(hints[0]).toEqual(expectedNull);
        expect(hints[1]).toEqual(expectedNull);
        expect(hints[2]).toEqual(expectedHint);
        expect(hints[3]).toEqual(expectedNull);
        expect(hints[4]).toEqual(expectedNull);
      });
    });

    context('with some float hint', function () {
      xit('populates the other with last defined hint', function () {
        // given
        var raty = new Raty('#el', {
          hints: [null, null, [null, 'two', null, 'four', undefined], null, null],
          precision: true,
        }).init();

        // when
        raty.init();

        // then
        var expectedHint = [null, 'two', null, 'four', 'four', 'four', 'four', 'four', 'four', 'four'];
        var expectedNull = [null, null, null, null, null, null, null, null, null, null];
        var hints = raty.opt.hints;

        expect(hints[0]).toEqual(expectedNull);
        expect(hints[1]).toEqual(expectedNull);
        expect(hints[2]).toEqual(expectedHint);
        expect(hints[3]).toEqual(expectedNull);
        expect(hints[4]).toEqual(expectedNull);
      });
    });

    context('on #move', function () {
      beforeEach(function () {
        this.target = Helper.create('#target');
      });

      context('on 1.1', function () {
        xit('receives the [1][0] position', function () {
          // given
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.1);

          // then
          expect(this.target.text()).toEqual('1,1');
        });

        xit('receives the [1][0] position as title', function () {
          // given
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.1);

          // then
          expect(raty.self.querySelector()[1].title).toEqual('1,1');
        });
      });

      context('on 1.2', function () {
        xit('receives the [1][1] position', function () {
          // given
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.2);

          // then
          expect(this.target.text()).toEqual('1,2');
        });

        xit('receives the [1][1] position as title', function () {
          // given
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.2);

          // then
          expect(raty.self.querySelector()[1].title).toEqual('1,2');
        });
      });

      context('on 1.3', function () {
        xit('receives the [1][2] position', function () {
          // given
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.3);

          // then
          expect(this.target.text()).toEqual('1,3');
        });

        xit('receives the [1][2] position as title', function () {
          // given
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.3);

          // then
          expect(raty.self.querySelector()[1].title).toEqual('1,3');
        });
      });

      context('on 1.4', function () {
        xit('receives the [1][3] position', function () {
          // given
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.4);

          // then
          expect(this.target.text()).toEqual('1,4');
        });

        xit('receives the [1][3] position as title', function () {
          // given
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.4);

          // then
          expect(raty.self.querySelector()[1].title).toEqual('1,4');
        });
      });

      context('on 1.5', function () {
        xit('receives the [1][4] position', function () {
          // given
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.5);

          // then
          expect(this.target.text()).toEqual('1,5');
        });

        xit('receives the [1][4] position as title', function () {
          // given
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.5);

          // then
          expect(raty.self.querySelector()[1].title).toEqual('1,5');
        });
      });

      context('on 1.6', function () {
        xit('receives the [1][5] position', function () {
          // given
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.6);

          // then
          expect(this.target.text()).toEqual('1,6');
        });

        xit('receives the [1][5] position as title', function () {
          // given
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.6);

          // then
          expect(raty.self.querySelector()[1].title).toEqual('1,6');
        });
      });

      context('on 1.7', function () {
        xit('receives the [1][6] position', function () {
          // given
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.7);

          // then
          expect(this.target.text()).toEqual('1,7');
        });

        xit('receives the [1][7] position as title', function () {
          // given
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.7);

          // then
          expect(raty.self.querySelector()[1].title).toEqual('1,7');
        });
      });

      context('on 1.8', function () {
        xit('receives the [1][7] position', function () {
          // given
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.8);

          // then
          expect(this.target.text()).toEqual('1,8');
        });

        xit('receives the [1][7] position as title', function () {
          // given
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.8);

          // then
          expect(raty.self.querySelector()[1].title).toEqual('1,8');
        });
      });

      context('on 1.9', function () {
        xit('receives the [1][8] position', function () {
          // given
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.9);

          // then
          expect(this.target.text()).toEqual('1,9');
        });

        xit('receives the [1][8] position as title', function () {
          // given
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(1.9);

          // then
          expect(raty.self.querySelector()[1].title).toEqual('1,9');
        });
      });

      context('on 2.0', function () {
        xit('receives the [1][9] position', function () {
          // given
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(2.0);

          // then
          expect(this.target.text()).toEqual('2,0');
        });

        xit('receives the [1][9] position as title', function () {
          // given
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(2.0);

          // then
          expect(raty.self.querySelector()[1].title).toEqual('2,0');
        });
      });

      context('on 2', function () {
        xit('receives the [1][9] position', function () {
          // given
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(2);

          // then
          expect(this.target.text()).toEqual('2,0');
        });

        xit('receives the [1][9] position as title', function () {
          // given
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          raty.move(2);

          // then
          expect(raty.self.querySelector()[1].title).toEqual('2,0');
        });
      });
    });

    context('on mousemove', function () {
      beforeEach(function () {
        this.target = Helper.create('#target');
      });

      context('on 1.0 fraction', function () {
        xit('receives the [1][0] position', function () {
          // given
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(this.el, 1, 0);

          // then
          expect(this.target.text()).toEqual('1,1');
        });

        xit('receives the [1][0] position as title', function () {
          // given
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(this.el, 1, 0);

          // then
          expect(raty.self.querySelector()[1].title).toEqual('1,1');
        });
      });

      context('on 1.1 fraction', function () {
        xit('receives the [1][1] position', function () {
          // given
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(this.el, 1, 1);

          // then
          expect(this.target.text()).toEqual('1,2');
        });

        xit('receives the [1][1] position as title', function () {
          // given
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(this.el, 1, 1);

          // then
          expect(raty.self.querySelector()[1].title).toEqual('1,2');
        });
      });

      context('on 1.2 fraction', function () {
        xit('receives the [1][2] position', function () {
          // given
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(this.el, 1, 2);

          // then
          expect(this.target.text()).toEqual('1,3');
        });

        xit('receives the [1][2] position as title', function () {
          // given
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(this.el, 1, 2);

          // then
          expect(raty.self.querySelector()[1].title).toEqual('1,3');
        });
      });

      context('on 1.3 fraction', function () {
        xit('receives the [1][3] position', function () {
          // given
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(this.el, 1, 3);

          // then
          expect(this.target.text()).toEqual('1,4');
        });

        xit('receives the [1][3] position as title', function () {
          // given
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(this.el, 1, 3);

          // then
          expect(raty.self.querySelector()[1].title).toEqual('1,4');
        });
      });

      context('on 1.4 fraction', function () {
        xit('receives the [1][4] position', function () {
          // given
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(this.el, 1, 4);

          // then
          expect(this.target.text()).toEqual('1,5');
        });

        xit('receives the [1][4] position as title', function () {
          // given
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(this.el, 1, 4);

          // then
          expect(raty.self.querySelector()[1].title).toEqual('1,5');
        });
      });

      context('on 1.5 fraction', function () {
        xit('receives the [1][5] position', function () {
          // given
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(this.el, 1, 5);

          // then
          expect(this.target.text()).toEqual('1,6');
        });

        xit('receives the [1][5] position as title', function () {
          // given
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(this.el, 1, 5);

          // then
          expect(raty.self.querySelector()[1].title).toEqual('1,6');
        });
      });

      context('on 1.6 fraction', function () {
        xit('receives the [1][6] position', function () {
          // given
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(this.el, 1, 6);

          // then
          expect(this.target.text()).toEqual('1,7');
        });

        xit('receives the [1][6] position as title', function () {
          // given
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(this.el, 1, 6);

          // then
          expect(raty.self.querySelector()[1].title).toEqual('1,7');
        });
      });

      context('on 1.7 fraction', function () {
        xit('receives the [1][7] position', function () {
          // given
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(this.el, 1, 7);

          // then
          expect(this.target.text()).toEqual('1,8');
        });

        xit('receives the [1][7] position as title', function () {
          // given
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(this.el, 1, 7);

          // then
          expect(raty.self.querySelector()[1].title).toEqual('1,8');
        });
      });

      context('on 1.8 fraction', function () {
        xit('receives the [1][8] position', function () {
          // given
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(this.el, 1, 8);

          // then
          expect(this.target.text()).toEqual('1,9');
        });

        xit('receives the [1][8] position as title', function () {
          // given
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(this.el, 1, 8);

          // then
          expect(raty.self.querySelector()[1].title).toEqual('1,9');
        });
      });

      context('on 1.9 fraction', function () {
        xit('receives the [1][9] position', function () {
          // given
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(this.el, 1, 9);

          // then
          expect(this.target.text()).toEqual('2,0');
        });

        xit('receives the [1][9] position as title', function () {
          // given
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            target: '#target',
            targetKeep: true,
          }).init();

          // when
          Helper.mousemove(this.el, 1, 9);

          // then
          expect(raty.self.querySelector()[1].title).toEqual('2,0');
        });
      });
    });

    context('on score', function () {
      beforeEach(function () {
        this.target = Helper.create('#target');
      });

      context('on 1.1', function () {
        xit('receives the [1][0] position', function () {
          // given

          // when
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            score: 1.1,
            target: '#target',
            targetKeep: true,
          }).init();

          // then
          expect(this.target.text()).toEqual('1,1');
        });

        xit('receives the [1][0] position as title', function () {
          // given

          // when
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            score: 1.1,
            target: '#target',
            targetKeep: true,
          }).init();

          // then
          expect(raty.self.querySelector()[1].title).toEqual('1,1');
        });
      });

      context('on 1.2', function () {
        xit('receives the [1][1] position', function () {
          // given

          // when
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            score: 1.2,
            target: '#target',
            targetKeep: true,
          }).init();

          // then
          expect(this.target.text()).toEqual('1,2');
        });

        xit('receives the [1][1] position as title', function () {
          // given

          // when
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            score: 1.2,
            target: '#target',
            targetKeep: true,
          }).init();

          // then
          expect(raty.self.querySelector()[1].title).toEqual('1,2');
        });
      });

      context('on 1.3', function () {
        xit('receives the [1][2] position', function () {
          // given

          // when
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            score: 1.3,
            target: '#target',
            targetKeep: true,
          }).init();

          // then
          expect(this.target.text()).toEqual('1,3');
        });

        xit('receives the [1][2] position as title', function () {
          // given

          // when
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            score: 1.3,
            target: '#target',
            targetKeep: true,
          }).init();

          // then
          expect(raty.self.querySelector()[1].title).toEqual('1,3');
        });
      });

      context('on 1.4', function () {
        xit('receives the [1][3] position', function () {
          // given

          // when
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            score: 1.4,
            target: '#target',
            targetKeep: true,
          }).init();

          // then
          expect(this.target.text()).toEqual('1,4');
        });

        xit('receives the [1][3] position as title', function () {
          // given

          // when
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            score: 1.4,
            target: '#target',
            targetKeep: true,
          }).init();

          // then
          expect(raty.self.querySelector()[1].title).toEqual('1,4');
        });
      });

      context('on 1.5', function () {
        xit('receives the [1][4] position', function () {
          // given

          // when
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            score: 1.5,
            target: '#target',
            targetKeep: true,
          }).init();

          // then
          expect(this.target.text()).toEqual('1,5');
        });

        xit('receives the [1][4] position as title', function () {
          // given

          // when
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            score: 1.5,
            target: '#target',
            targetKeep: true,
          }).init();

          // then
          expect(raty.self.querySelector()[1].title).toEqual('1,5');
        });
      });

      context('on 1.6', function () {
        xit('receives the [1][5] position', function () {
          // given

          // when
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            score: 1.6,
            target: '#target',
            targetKeep: true,
          }).init();

          // then
          expect(this.target.text()).toEqual('1,6');
        });

        xit('receives the [1][5] position as title', function () {
          // given

          // when
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            score: 1.6,
            target: '#target',
            targetKeep: true,
          }).init();

          // then
          expect(raty.self.querySelector()[1].title).toEqual('1,6');
        });
      });

      context('on 1.7', function () {
        xit('receives the [1][6] position', function () {
          // given

          // when
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            score: 1.7,
            target: '#target',
            targetKeep: true,
          }).init();

          // then
          expect(this.target.text()).toEqual('1,7');
        });

        xit('receives the [1][6] position as title', function () {
          // given

          // when
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            score: 1.7,
            target: '#target',
            targetKeep: true,
          }).init();

          // then
          expect(raty.self.querySelector()[1].title).toEqual('1,7');
        });
      });

      context('on 1.8', function () {
        xit('receives the [1][7] position', function () {
          // given

          // when
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            score: 1.8,
            target: '#target',
            targetKeep: true,
          }).init();

          // then
          expect(this.target.text()).toEqual('1,8');
        });

        xit('receives the [1][7] position as title', function () {
          // given

          // when
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            score: 1.8,
            target: '#target',
            targetKeep: true,
          }).init();

          // then
          expect(raty.self.querySelector()[1].title).toEqual('1,8');
        });
      });

      context('on 1.9', function () {
        xit('receives the [1][8] position', function () {
          // given

          // when
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            score: 1.9,
            target: '#target',
            targetKeep: true,
          }).init();

          // then
          expect(this.target.text()).toEqual('1,9');
        });

        xit('receives the [1][8] position as title', function () {
          // given

          // when
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            score: 1.9,
            target: '#target',
            targetKeep: true,
          }).init();

          // then
          expect(raty.self.querySelector()[1].title).toEqual('1,9');
        });
      });

      context('on 1.0', function () {
        xit('receives the [1][9] position', function () {
          // given

          // when
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            score: 2.0,
            target: '#target',
            targetKeep: true,
          }).init();

          // then
          expect(this.target.text()).toEqual('2,0');
        });

        xit('receives the [1][9] position as title', function () {
          // given

          // when
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            score: 2.0,
            target: '#target',
            targetKeep: true,
          }).init();

          // then
          expect(raty.self.querySelector()[1].title).toEqual('2,0');
        });
      });

      context('on 2', function () {
        xit('receives the [1][9] position', function () {
          // given

          // when
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            score: 2,
            target: '#target',
            targetKeep: true,
          }).init();

          // then
          expect(this.target.text()).toEqual('2,0');
        });

        xit('receives the [1][9] position as title', function () {
          // given

          // when
          var raty = new Raty('#el', {
            hints: [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision: true,
            score: 1,
            target: '#target',
            targetKeep: true,
          }).init();

          // then
          expect(raty.self.querySelector()[1].title).toEqual('2,0');
        });
      });
    });

    context('on leave', function () {
      xit('reset all stars to the last hint', function () {
        // given
        var raty = new Raty('#el', {
          hints: null,
          precision: true,
        }).init();

        var stars = raty.self.querySelectorAll();

        raty.move(4.1);
        raty.move(3.1);
        raty.move(2.1);
        raty.move(1.1);
        raty.move(0.1);

        // when
        raty.self.trigger('mouseleave');

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
