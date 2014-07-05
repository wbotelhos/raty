describe('#hints', function() {
  beforeEach(function() {
    $.fn.raty.defaults.path = '../lib/images';

    this.el = Helper.create('#el');
  });

  afterEach(function() {
    Helper.clear();
  });

  context('with :halfShow', function() {
    context('as *true', function() {
      context('when null', function() {
        it ('initializes all with null', function() {
          // given

          // when
          this.el.raty({
            halfShow : true,
            hints    : null
          });

          // then
          var
            expected = [null, null],
            hints    = this.el[0].opt.hints;

          expect(hints[0]).toEqual(expected);
          expect(hints[1]).toEqual(expected);
          expect(hints[2]).toEqual(expected);
          expect(hints[3]).toEqual(expected);
          expect(hints[4]).toEqual(expected);
        });
      });

      context('with empty as group', function() {
        it ('replicates the empty value', function() {
          // given

          // when
          this.el.raty({
            halfShow : true,
            hints    : ['']
          });

          // then
          expect(this.el[0].opt.hints[0]).toEqual(['', '']);
        });
      });

      context('the stars', function() {
        it ('changes the title', function() {
          // given

          // when
          this.el.raty({
            halfShow : true,
            hints    : ['1', '/', 'c', '-', '#']
          });

          // then
          var stars = this.el.children('img');

          expect(stars[0]).toHaveAttr('title', '1');
          expect(stars[1]).toHaveAttr('title', '/');
          expect(stars[2]).toHaveAttr('title', 'c');
          expect(stars[3]).toHaveAttr('title', '-');
          expect(stars[4]).toHaveAttr('title', '#');
        });

        context('with undefined as group', function() {
          it ('receives the number of the star', function() {
            // given

            // when
            this.el.raty({
              halfShow : true,
              hints    : [undefined]
            });

            // then
            expect(this.el.children('img:first')).toHaveAttr('title', 'bad');
          });
        });

        context('with null as group', function() {
          it ('receives the number of star', function() {
            // given

            // when
            this.el.raty({
              halfShow : true,
              hints    : [null]
            });

            // then
            expect(this.el.children('img:first')).toHaveAttr('title', '1');
          });
        });

        context('with array as group with only half value', function() {
          it ('receives the last value', function() {
            // given

            // when
            this.el.raty({
              halfShow : true,
              hints    : [['half']]
            });

            // then
            expect(this.el.children('img:first')).toHaveAttr('title', 'half');
          });
        });

        context('with array as group with both value', function() {
          it ('receives the last value', function() {
            // given

            // when
            this.el.raty({
              halfShow : true,
              hints    : [['half', 'one']]
            });

            // then
            expect(this.el.children('img:first')[0].title).toEqual('one');
          });
        });

        context('with less hints than stars', function() {
          it ('receives the default hint value', function() {
            // given

            // when
            this.el.raty({
              halfShow : true,
              hints    : ['1', '2', '3', '4']
            });

            // then
            var stars = this.el.children('img');

            expect(stars[0]).toHaveAttr('title', '1');
            expect(stars[1]).toHaveAttr('title', '2');
            expect(stars[2]).toHaveAttr('title', '3');
            expect(stars[3]).toHaveAttr('title', '4');
            expect(stars[4]).toHaveAttr('title', 'gorgeous');
          });
        });

        context('with more stars than hints', function() {
          it ('receives the :score value', function() {
            // given

            // when
            this.el.raty({
              halfShow : true,
              hints    : ['a', 'b', 'c', 'd', 'e'],
              number   : 6
            });

            // then
            var stars = this.el.children('img');

            expect(stars[0]).toHaveAttr('title', 'a');
            expect(stars[1]).toHaveAttr('title', 'b');
            expect(stars[2]).toHaveAttr('title', 'c');
            expect(stars[3]).toHaveAttr('title', 'd');
            expect(stars[4]).toHaveAttr('title', 'e');
            expect(stars[5]).toHaveAttr('title', '6');
          });
        });
      });
    });

    context('as *false', function() {
      context('when null', function() {
        it ('initializes with an empty array', function() {
          // given

          // when
          this.el.raty({
            halfShow : false,
            hints    : null
          });

          // then
          expect(this.el[0].opt.hints).toEqual([]);
        });
      });

      context('with undefined value', function() {
        it ('receives the default corresponding hint', function() {
          // given

          // when
          this.el.raty({
            halfShow : false,
            hints    : [undefined]
          });

          // then
          expect(this.el.children('img:first')).toHaveAttr('title', 'bad');
        });
      });

      context('the stars', function() {
        it ('changes the hints', function() {
          // given

          // when
          this.el.raty({
            halfShow : false,
            hints    : ['1', '/', 'c', '-', '#']
          });

          // then
          var stars = this.el.children('img');

          expect(stars[0]).toHaveAttr('title', '1');
          expect(stars[1]).toHaveAttr('title', '/');
          expect(stars[2]).toHaveAttr('title', 'c');
          expect(stars[3]).toHaveAttr('title', '-');
          expect(stars[4]).toHaveAttr('title', '#');
        });

        context('with empty value', function() {
          it ('receives an empty value', function() {
            // given

            // when
            this.el.raty({
              halfShow : false,
              hints    : ['']
            });

            // then
            expect(this.el.children('img:first')).toHaveAttr('title', '');
          });
        });

        context('with null value', function() {
          it ('receives the score', function() {
            // given

            // when
            this.el.raty({
              halfShow : false,
              hints    : [null]
            });

            // then
            expect(this.el.children('img:first')).toHaveAttr('title', '1');
          });
        });

        context('with less hints than stars', function() {
          it ('receives the default hint value', function() {
            // given

            // when
            this.el.raty({
              halfShow : false,
              hints    : ['1', '2', '3', '4']
            });

            // then
            var stars = this.el.children('img');

            expect(stars[0]).toHaveAttr('title', '1');
            expect(stars[1]).toHaveAttr('title', '2');
            expect(stars[2]).toHaveAttr('title', '3');
            expect(stars[3]).toHaveAttr('title', '4');
            expect(stars[4]).toHaveAttr('title', 'gorgeous');
          });
        });

        context('with more stars than hints', function() {
          it ('receives the :score value', function() {
            // given

            // when
            this.el.raty({
              halfShow : false,
              hints    : ['a', 'b', 'c', 'd', 'e'],
              number   : 6
            });

            // then
            var stars = this.el.children('img');

            expect(stars[0]).toHaveAttr('title', 'a');
            expect(stars[1]).toHaveAttr('title', 'b');
            expect(stars[2]).toHaveAttr('title', 'c');
            expect(stars[3]).toHaveAttr('title', 'd');
            expect(stars[4]).toHaveAttr('title', 'e');
            expect(stars[5]).toHaveAttr('title', '6');
          });
        });
      });
    });
  });

  context('with :half', function() {
    context('and value is null', function() {
      it ('populates all with null', function() {
        // given

        // when
        this.el.raty({
          half  : true,
          hints : null
        });

        // then
        var
          expected = [null, null],
          hints    = this.el[0].opt.hints;

        expect(hints[0]).toEqual(expected);
        expect(hints[1]).toEqual(expected);
        expect(hints[2]).toEqual(expected);
        expect(hints[3]).toEqual(expected);
        expect(hints[4]).toEqual(expected);
      });
    });

    context('and value is an empty array', function() {
      it ('populates all float arrays with original hint', function() {
        // given

        // when
        this.el.raty({
          half  : true,
          hints : []
        });

        // then
        var hints = this.el[0].opt.hints;

        expect(hints[0]).toEqual(['bad', 'bad']);
        expect(hints[1]).toEqual(['poor', 'poor']);
        expect(hints[2]).toEqual(['regular', 'regular']);
        expect(hints[3]).toEqual(['good', 'good']);
        expect(hints[4]).toEqual(['gorgeous', 'gorgeous']);
      });
    });

    context('with some integer hint', function() {
      it ('populates all group with given hint', function() {
        // given

        // when
        this.el.raty({
          half  : true,
          hints : ['hint']
        });

        // then
        var hints = this.el[0].opt.hints;

        expect(hints[0][0]).toEqual('hint');
        expect(hints[0][1]).toEqual('hint');
      });
    });

    context('with some float hint', function() {
      it ('populates the other with last defined hint', function() {
        // given

        // when
        this.el.raty({
          half  : true,
          hints : [['hint']],
        });

        // then
        var hints = this.el[0].opt.hints;

        expect(hints[0][1]).toEqual('hint');
        expect(hints[0][1]).toEqual('hint');
      });
    });

    context('on #move', function() {
      beforeEach(function() {
        this.target = Helper.create('#target');
      });

      context('on 1.1', function() {
        it ('receives the second position', function() {
          // given
          this.el.raty({
            half       : true,
            hints      : [null, ['1,5', '2,0']],
            target     : '#target',
            targetKeep : true
          });

          // when
          this.el.raty('move', 1.1);

          // then
          expect(this.target.text()).toEqual('1,5');
        });

        it ('changes the title to first position', function() {
          // given
          this.el.raty({
            half       : true,
            hints      : [null, ['1,5', '2,0']],
            target     : '#target',
            targetKeep : true
          });

          // when
          this.el.raty('move', 1.1);

          // then
          var star = this.el.children().eq(1);

          expect(star[0].title).toEqual('1,5');
        });
      });

      context('on 1.2', function() {
        it ('receives the first position', function() {
          // given
          this.el.raty({
            half       : true,
            hints      : [null, ['1,5', '2,0']],
            target     : '#target',
            targetKeep : true
          });

          // when
          this.el.raty('move', 1.2);

          // then
          expect(this.target.text()).toEqual('1,5');
        });

        it ('changes the title to first position', function() {
          // given
          this.el.raty({
            half       : true,
            hints      : [null, ['1,5', '2,0']],
            target     : '#target',
            targetKeep : true
          });

          // when
          this.el.raty('move', 1.2);

          // then
          var star = this.el.children().eq(1);

          expect(star[0].title).toEqual('1,5');
        });
      });

      context('on 1.3', function() {
        it ('receives the first position', function() {
          // given
          this.el.raty({
            half       : true,
            hints      : [null, ['1,5', '2,0']],
            target     : '#target',
            targetKeep : true
          });

          // when
          this.el.raty('move', 1.3);

          // then
          expect(this.target.text()).toEqual('1,5');
        });

        it ('changes the title to first position', function() {
          // given
          this.el.raty({
            half       : true,
            hints      : [null, ['1,5', '2,0']],
            target     : '#target',
            targetKeep : true
          });

          // when
          this.el.raty('move', 1.3);

          // then
          var star = this.el.children().eq(1);

          expect(star[0].title).toEqual('1,5');
        });
      });

      context('on 1.4', function() {
        it ('receives the first position', function() {
          // given
          this.el.raty({
            half       : true,
            hints      : [null, ['1,5', '2,0']],
            target     : '#target',
            targetKeep : true
          });

          // when
          this.el.raty('move', 1.4);

          // then
          expect(this.target.text()).toEqual('1,5');
        });

        it ('changes the title to first position', function() {
          // given
          this.el.raty({
            half       : true,
            hints      : [null, ['1,5', '2,0']],
            target     : '#target',
            targetKeep : true
          });

          // when
          this.el.raty('move', 1.4);

          // then
          var star = this.el.children().eq(1);

          expect(star[0].title).toEqual('1,5');
        });
      });

      context('on 1.5', function() {
        it ('receives the first position', function() {
          // given
          this.el.raty({
            half       : true,
            hints      : [null, ['1,5', '2,0']],
            target     : '#target',
            targetKeep : true
          });

          // when
          this.el.raty('move', 1.5);

          // then
          expect(this.target.text()).toEqual('1,5');
        });

        it ('changes the title to first position', function() {
          // given
          this.el.raty({
            half       : true,
            hints      : [null, ['1,5', '2,0']],
            target     : '#target',
            targetKeep : true
          });

          // when
          this.el.raty('move', 1.5);

          // then
          var star = this.el.children().eq(1);

          expect(star[0].title).toEqual('1,5');
        });
      });

      context('on 1.6', function() {
        it ('receives the second position', function() {
          // given
          this.el.raty({
            half       : true,
            hints      : [null, ['1,5', '2,0']],
            target     : '#target',
            targetKeep : true
          });

          // when
          this.el.raty('move', 1.6);

          // then
          expect(this.target.text()).toEqual('2,0');
        });

        it ('changes the title to first position', function() {
          // given
          this.el.raty({
            half       : true,
            hints      : [null, ['1,5', '2,0']],
            target     : '#target',
            targetKeep : true
          });

          // when
          this.el.raty('move', 1.6);

          // then
          var star = this.el.children().eq(1);

          expect(star[0].title).toEqual('2,0');
        });
      });

      context('on 1.7', function() {
        it ('receives the second position', function() {
          // given
          this.el.raty({
            half       : true,
            hints      : [null, ['1,5', '2,0']],
            target     : '#target',
            targetKeep : true
          });

          // when
          this.el.raty('move', 1.7);

          // then
          expect(this.target.text()).toEqual('2,0');
        });

        it ('changes the title to first position', function() {
          // given
          this.el.raty({
            half       : true,
            hints      : [null, ['1,5', '2,0']],
            target     : '#target',
            targetKeep : true
          });

          // when
          this.el.raty('move', 1.7);

          // then
          var star = this.el.children().eq(1);

          expect(star[0].title).toEqual('2,0');
        });
      });

      context('on 1.8', function() {
        it ('receives the second position', function() {
          // given
          this.el.raty({
            half       : true,
            hints      : [null, ['1,5', '2,0']],
            target     : '#target',
            targetKeep : true
          });

          // when
          this.el.raty('move', 1.8);

          // then
          expect(this.target.text()).toEqual('2,0');
        });

        it ('changes the title to first position', function() {
          // given
          this.el.raty({
            half       : true,
            hints      : [null, ['1,5', '2,0']],
            target     : '#target',
            targetKeep : true
          });

          // when
          this.el.raty('move', 1.8);

          // then
          var star = this.el.children().eq(1);

          expect(star[0].title).toEqual('2,0');
        });
      });

      context('on 1.9', function() {
        it ('receives the second position', function() {
          // given
          this.el.raty({
            half       : true,
            hints      : [null, ['1,5', '2,0']],
            target     : '#target',
            targetKeep : true
          });

          // when
          this.el.raty('move', 1.9);

          // then
          expect(this.target.text()).toEqual('2,0');
        });

        it ('changes the title to first position', function() {
          // given
          this.el.raty({
            half       : true,
            hints      : [null, ['1,5', '2,0']],
            target     : '#target',
            targetKeep : true
          });

          // when
          this.el.raty('move', 1.9);

          // then
          var star = this.el.children().eq(1);

          expect(star[0].title).toEqual('2,0');
        });
      });

      context('on 2.0', function() {
        it ('receives the second position', function() {
          // given
          this.el.raty({
            half       : true,
            hints      : [null, ['1,5', '2,0']],
            target     : '#target',
            targetKeep : true
          });

          // when
          this.el.raty('move', 2.0);

          // then
          expect(this.target.text()).toEqual('2,0');
        });

        it ('changes the title to first position', function() {
          // given
          this.el.raty({
            half       : true,
            hints      : [null, ['1,5', '2,0']],
            target     : '#target',
            targetKeep : true
          });

          // when
          this.el.raty('move', 2.0);

          // then
          var star = this.el.children().eq(1);

          expect(star[0].title).toEqual('2,0');
        });
      });

      context('on 2', function() {
        it ('receives the second position', function() {
          // given
          this.el.raty({
            half       : true,
            hints      : [null, ['1,5', '2,0']],
            target     : '#target',
            targetKeep : true
          });

          // when
          this.el.raty('move', 2);

          // then
          expect(this.target.text()).toEqual('2,0');
        });
      });

      it ('changes the title to first position', function() {
        // given
        this.el.raty({
          half       : true,
          hints      : [null, ['1,5', '2,0']],
          target     : '#target',
          targetKeep : true
        });

        // when
        this.el.raty('move', 2);

        // then
        var star = this.el.children().eq(1);

        expect(star[0].title).toEqual('2,0');
      });
    });

    context('on mousemove', function() {
      beforeEach(function() {
        this.target = Helper.create('#target');
      });

      context('on 1.0 fraction', function() {
        it ('receives the first position', function() {
          // given
          this.el.raty({
            half       : true,
            hints      : [null, ['half', 'integer']],
            target     : '#target',
            targetKeep : true
          });

          // when
          Helper.mousemove(this.el, 1, 0);

          // then
          expect(this.target.text()).toEqual('half');
        });

        it ('receives the first position as title', function() {
          // given
          this.el.raty({
            half       : true,
            hints      : [null, ['half', 'integer']],
            target     : '#target',
            targetKeep : true
          });

          var star = this.el.children().eq(1);

          // when
          Helper.mousemove(this.el, 1, 0);

          // then
          expect(star[0].title).toEqual('half');
        });
      });

      context('on 1.1 fraction', function() {
        it ('receives the first position', function() {
          // given
          this.el.raty({
            half       : true,
            hints      : [null, ['half', 'integer']],
            target     : '#target',
            targetKeep : true
          });

          // when
          Helper.mousemove(this.el, 1, 1);

          // then
          expect(this.target.text()).toEqual('half');
        });

        it ('receives the first position as title', function() {
          // given
          this.el.raty({
            half       : true,
            hints      : [null, ['half', 'integer']],
            target     : '#target',
            targetKeep : true
          });

          var star = this.el.children().eq(1);

          // when
          Helper.mousemove(this.el, 1, 1);

          // then
          expect(star[0].title).toEqual('half');
        });
      });

      context('on 1.2 fraction', function() {
        it ('receives the first position', function() {
          // given
          this.el.raty({
            half       : true,
            hints      : [null, ['half', 'integer']],
            target     : '#target',
            targetKeep : true
          });

          // when
          Helper.mousemove(this.el, 1, 2);

          // then
          expect(this.target.text()).toEqual('half');
        });

        it ('receives the first position as title', function() {
          // given
          this.el.raty({
            half       : true,
            hints      : [null, ['half', 'integer']],
            target     : '#target',
            targetKeep : true
          });

          var star = this.el.children().eq(1);

          // when
          Helper.mousemove(this.el, 1, 2);

          // then
          expect(star[0].title).toEqual('half');
        });
      });

      context('on 1.3 fraction', function() {
        it ('receives the first position', function() {
          // given
          this.el.raty({
            half       : true,
            hints      : [null, ['half', 'integer']],
            target     : '#target',
            targetKeep : true
          });

          // when
          Helper.mousemove(this.el, 1, 3);

          // then
          expect(this.target.text()).toEqual('half');
        });

        it ('receives the first position as title', function() {
          // given
          this.el.raty({
            half       : true,
            hints      : [null, ['half', 'integer']],
            target     : '#target',
            targetKeep : true
          });

          var star = this.el.children().eq(1);

          // when
          Helper.mousemove(this.el, 1, 3);

          // then
          expect(star[0].title).toEqual('half');
        });
      });

      context('on 1.4 fraction', function() {
        it ('receives the first position', function() {
          // given
          this.el.raty({
            half       : true,
            hints      : [null, ['half', 'integer']],
            target     : '#target',
            targetKeep : true
          });

          // when
          Helper.mousemove(this.el, 1, 4);

          // then
          expect(this.target.text()).toEqual('half');
        });

        it ('receives the first position as title', function() {
          // given
          this.el.raty({
            half       : true,
            hints      : [null, ['half', 'integer']],
            target     : '#target',
            targetKeep : true
          });

          var star = this.el.children().eq(1);

          // when
          Helper.mousemove(this.el, 1, 4);

          // then
          expect(star[0].title).toEqual('half');
        });
      });

      context('on 1.5 fraction', function() {
        it ('receives the first position', function() {
          // given
          this.el.raty({
            half       : true,
            hints      : [null, ['half', 'integer']],
            target     : '#target',
            targetKeep : true
          });

          // when
          Helper.mousemove(this.el, 1, 5);

          // then
          expect(this.target.text()).toEqual('half');
        });

        it ('receives the first position as title', function() {
          // given
          this.el.raty({
            half       : true,
            hints      : [null, ['half', 'integer']],
            target     : '#target',
            targetKeep : true
          });

          var star = this.el.children().eq(1);

          // when
          Helper.mousemove(this.el, 1, 5);

          // then
          expect(star[0].title).toEqual('half');
        });
      });

      context('on 1.6 fraction', function() {
        it ('receives the second position', function() {
          // given
          this.el.raty({
            half       : true,
            hints      : [null, ['half', 'integer']],
            target     : '#target',
            targetKeep : true
          });

          // when
          Helper.mousemove(this.el, 1, 6);

          // then
          expect(this.target.text()).toEqual('integer');
        });

        it ('receives the second position as title', function() {
          // given
          this.el.raty({
            half       : true,
            hints      : [null, ['half', 'integer']],
            target     : '#target',
            targetKeep : true
          });

          var star = this.el.children().eq(1);

          // when
          Helper.mousemove(this.el, 1, 6);

          // then
          expect(star[0].title).toEqual('integer');
        });
      });

      context('on 1.7 fraction', function() {
        it ('receives the second position', function() {
          // given
          this.el.raty({
            half       : true,
            hints      : [null, ['half', 'integer']],
            target     : '#target',
            targetKeep : true
          });

          // when
          Helper.mousemove(this.el, 1, 7);

          // then
          expect(this.target.text()).toEqual('integer');
        });

        it ('receives the second position as title', function() {
          // given
          this.el.raty({
            half       : true,
            hints      : [null, ['half', 'integer']],
            target     : '#target',
            targetKeep : true
          });

          var star = this.el.children().eq(1);

          // when
          Helper.mousemove(this.el, 1, 7);

          // then
          expect(star[0].title).toEqual('integer');
        });
      });

      context('on 1.8 fraction', function() {
        it ('receives the second position', function() {
          // given
          this.el.raty({
            half       : true,
            hints      : [null, ['half', 'integer']],
            target     : '#target',
            targetKeep : true
          });

          // when
          Helper.mousemove(this.el, 1, 8);

          // then
          expect(this.target.text()).toEqual('integer');
        });

        it ('receives the second position as title', function() {
          // given
          this.el.raty({
            half       : true,
            hints      : [null, ['half', 'integer']],
            target     : '#target',
            targetKeep : true
          });

          var star = this.el.children().eq(1);

          // when
          Helper.mousemove(this.el, 1, 8);

          // then
          expect(star[0].title).toEqual('integer');
        });
      });

      context('on 1.9 fraction', function() {
        it ('receives the second position', function() {
          // given
          this.el.raty({
            half       : true,
            hints      : [null, ['half', 'integer']],
            target     : '#target',
            targetKeep : true
          });

          // when
          Helper.mousemove(this.el, 1, 9);

          // then
          expect(this.target.text()).toEqual('integer');
        });

        it ('receives the second position as title', function() {
          // given
          this.el.raty({
            half       : true,
            hints      : [null, ['half', 'integer']],
            target     : '#target',
            targetKeep : true
          });

          var star = this.el.children().eq(1);

          // when
          Helper.mousemove(this.el, 1, 9);

          // then
          expect(star[0].title).toEqual('integer');
        });
      });
    });

    context('on :score', function() {
      beforeEach(function() {
        this.target = Helper.create('#target');
      });

      context('on 1.1', function() {
        it ('receives the first position', function() {
          // given

          // when
          this.el.raty({
            half       : true,
            hints      : [null, ['1,5', '2,0']],
            score      : 1.1,
            target     : '#target',
            targetKeep : true
          });

          // then
          expect(this.target.text()).toEqual('1,5');
        });

        it ('receives the first position as title', function() {
          // given

          // when
          this.el.raty({
            half       : true,
            hints      : [null, ['1,5', '2,0']],
            score      : 1.1,
            target     : '#target',
            targetKeep : true
          });

          // then
          var star = this.el.children().eq(1);

          expect(star[0].title).toEqual('1,5');
        });
      });

      context('on 1.2', function() {
        it ('receives the first position', function() {
          // given

          // when
          this.el.raty({
            half       : true,
            hints      : [null, ['1,5', '2,0']],
            score      : 1.2,
            target     : '#target',
            targetKeep : true
          });

          // then
          expect(this.target.text()).toEqual('1,5');
        });

        it ('receives the first position as title', function() {
          // given

          // when
          this.el.raty({
            half       : true,
            hints      : [null, ['1,5', '2,0']],
            score      : 1.2,
            target     : '#target',
            targetKeep : true
          });

          // then
          var star = this.el.children().eq(1);

          expect(star[0].title).toEqual('1,5');
        });
      });

      context('on 1.3', function() {
        it ('receives the first position', function() {
          // given

          // when
          this.el.raty({
            half       : true,
            hints      : [null, ['1,5', '2,0']],
            score      : 1.3,
            target     : '#target',
            targetKeep : true
          });

          // then
          expect(this.target.text()).toEqual('1,5');
        });

        it ('receives the first position as title', function() {
          // given

          // when
          this.el.raty({
            half       : true,
            hints      : [null, ['1,5', '2,0']],
            score      : 1.3,
            target     : '#target',
            targetKeep : true
          });

          // then
          var star = this.el.children().eq(1);

          expect(star[0].title).toEqual('1,5');
        });
      });

      context('on 1.4', function() {
        it ('receives the first position', function() {
          // given

          // when
          this.el.raty({
            half       : true,
            hints      : [null, ['1,5', '2,0']],
            score      : 1.4,
            target     : '#target',
            targetKeep : true
          });

          // then
          expect(this.target.text()).toEqual('1,5');
        });

        it ('receives the first position as title', function() {
          // given

          // when
          this.el.raty({
            half       : true,
            hints      : [null, ['1,5', '2,0']],
            score      : 1.4,
            target     : '#target',
            targetKeep : true
          });

          // then
          var star = this.el.children().eq(1);

          expect(star[0].title).toEqual('1,5');
        });
      });

      context('on 1.5', function() {
        it ('receives the first position', function() {
          // given

          // when
          this.el.raty({
            half       : true,
            hints      : [null, ['1,5', '2,0']],
            score      : 1.5,
            target     : '#target',
            targetKeep : true
          });

          // then
          expect(this.target.text()).toEqual('1,5');
        });

        it ('receives the first position as title', function() {
          // given

          // when
          this.el.raty({
            half       : true,
            hints      : [null, ['1,5', '2,0']],
            score      : 1.5,
            target     : '#target',
            targetKeep : true
          });

          // then
          var star = this.el.children().eq(1);

          expect(star[0].title).toEqual('1,5');
        });
      });

      context('on 1.6', function() {
        it ('receives the second position', function() {
          // given

          // when
          this.el.raty({
            half       : true,
            hints      : [null, ['1,5', '2,0']],
            score      : 1.6,
            target     : '#target',
            targetKeep : true
          });

          // then
          expect(this.target.text()).toEqual('2,0');
        });

        it ('receives the second position as title', function() {
          // given

          // when
          this.el.raty({
            half       : true,
            hints      : [null, ['1,5', '2,0']],
            score      : 1.6,
            target     : '#target',
            targetKeep : true
          });

          // then
          var star = this.el.children().eq(1);

          expect(star[0].title).toEqual('2,0');
        });
      });

      context('on 1.7', function() {
        it ('receives the second position', function() {
          // given

          // when
          this.el.raty({
            half       : true,
            hints      : [null, ['1,5', '2,0']],
            score      : 1.7,
            target     : '#target',
            targetKeep : true
          });

          // then
          expect(this.target.text()).toEqual('2,0');
        });

        it ('receives the second position as title', function() {
          // given

          // when
          this.el.raty({
            half       : true,
            hints      : [null, ['1,5', '2,0']],
            score      : 1.7,
            target     : '#target',
            targetKeep : true
          });

          // then
          var star = this.el.children().eq(1);

          expect(star[0].title).toEqual('2,0');
        });
      });

      context('on 1.8', function() {
        it ('receives the second position', function() {
          // given

          // when
          this.el.raty({
            half       : true,
            hints      : [null, ['1,5', '2,0']],
            score      : 1.8,
            target     : '#target',
            targetKeep : true
          });

          // then
          expect(this.target.text()).toEqual('2,0');
        });

        it ('receives the second position as title', function() {
          // given

          // when
          this.el.raty({
            half       : true,
            hints      : [null, ['1,5', '2,0']],
            score      : 1.8,
            target     : '#target',
            targetKeep : true
          });

          // then
          var star = this.el.children().eq(1);

          expect(star[0].title).toEqual('2,0');
        });
      });

      context('on 1.9', function() {
        it ('receives the second position', function() {
          // given

          // when
          this.el.raty({
            half       : true,
            hints      : [null, ['1,5', '2,0']],
            score      : 1.9,
            target     : '#target',
            targetKeep : true
          });

          // then
          expect(this.target.text()).toEqual('2,0');
        });

        it ('receives the second position as title', function() {
          // given

          // when
          this.el.raty({
            half       : true,
            hints      : [null, ['1,5', '2,0']],
            score      : 1.9,
            target     : '#target',
            targetKeep : true
          });

          // then
          var star = this.el.children().eq(1);

          expect(star[0].title).toEqual('2,0');
        });
      });

      context('on 2.0', function() {
        it ('receives the second position', function() {
          // given

          // when
          this.el.raty({
            half       : true,
            hints      : [null, ['1,5', '2,0']],
            score      : 2.0,
            target     : '#target',
            targetKeep : true
          });

          // then
          expect(this.target.text()).toEqual('2,0');
        });

        it ('receives the second position as title', function() {
          // given

          // when
          this.el.raty({
            half       : true,
            hints      : [null, ['1,5', '2,0']],
            score      : 2.0,
            target     : '#target',
            targetKeep : true
          });

          // then
          var star = this.el.children().eq(1);

          expect(star[0].title).toEqual('2,0');
        });
      });

      context('on 2', function() {
        it ('receives the second position', function() {
          // given

          // when
          this.el.raty({
            half       : true,
            hints      : [null, ['1,5', '2,0']],
            score      : 2,
            target     : '#target',
            targetKeep : true
          });

          // then
          expect(this.target.text()).toEqual('2,0');
        });

        it ('receives the second position as title', function() {
          // given

          // when
          this.el.raty({
            half       : true,
            hints      : [null, ['1,5', '2,0']],
            score      : 2,
            target     : '#target',
            targetKeep : true
          });

          // then
          var star = this.el.children().eq(1);

          expect(star[0].title).toEqual('2,0');
        });
      });
    })
  });

  context('with :precision', function() {
    context('and value is null', function() {
      it ('populates all with null', function() {
        // given

        // when
        this.el.raty({
          hints     : null,
          precision : true
        });

        // then
        var
          expected = [null, null, null, null, null, null, null, null, null, null],
          hints    = this.el[0].opt.hints;

        expect(hints[0]).toEqual(expected);
        expect(hints[1]).toEqual(expected);
        expect(hints[2]).toEqual(expected);
        expect(hints[3]).toEqual(expected);
        expect(hints[4]).toEqual(expected);
      });
    });

    context('and value is an empty array', function() {
      it ('populates all float arrays with original hint', function() {
        // given

        // when
        this.el.raty({
          hints     : [],
          precision : true
        });

        // then
        var hints = this.el[0].opt.hints;

        expect(hints[0]).toEqual(['bad', 'bad', 'bad', 'bad', 'bad', 'bad', 'bad', 'bad', 'bad', 'bad']);
        expect(hints[1]).toEqual(['poor', 'poor', 'poor', 'poor', 'poor', 'poor', 'poor', 'poor', 'poor', 'poor']);
        expect(hints[2]).toEqual(['regular', 'regular', 'regular', 'regular', 'regular', 'regular', 'regular', 'regular', 'regular', 'regular']);
        expect(hints[3]).toEqual(['good', 'good', 'good', 'good', 'good', 'good', 'good', 'good', 'good', 'good']);
        expect(hints[4]).toEqual(['gorgeous', 'gorgeous', 'gorgeous', 'gorgeous', 'gorgeous', 'gorgeous', 'gorgeous', 'gorgeous', 'gorgeous', 'gorgeous']);
      });
    });

    context('with some integer hint', function() {
      it ('populates all group with given hint', function() {
        // given

        // when
        this.el.raty({
          hints     : [null, null, 'hint', null, null],
          precision : true
        });

        // then
        var
          expectedHint = ['hint', 'hint', 'hint', 'hint', 'hint', 'hint', 'hint', 'hint', 'hint', 'hint'],
          expectedNull = [null, null, null, null, null, null, null, null, null, null],
          hints        = this.el[0].opt.hints;

        expect(hints[0]).toEqual(expectedNull);
        expect(hints[1]).toEqual(expectedNull);
        expect(hints[2]).toEqual(expectedHint);
        expect(hints[3]).toEqual(expectedNull);
        expect(hints[4]).toEqual(expectedNull);
      });
    });

    context('with some float hint', function() {
      it ('populates the other with last defined hint', function() {
        // given

        // when
        this.el.raty({
          hints     : [null, null, [null, 'two', null, 'four', undefined], null, null],
          precision : true
        });

        // then
        var
          expectedHint = [null, 'two', null, 'four', 'four', 'four', 'four', 'four', 'four', 'four'],
          expectedNull = [null, null, null, null, null, null, null, null, null, null],
          hints        = this.el[0].opt.hints;

        expect(hints[0]).toEqual(expectedNull);
        expect(hints[1]).toEqual(expectedNull);
        expect(hints[2]).toEqual(expectedHint);
        expect(hints[3]).toEqual(expectedNull);
        expect(hints[4]).toEqual(expectedNull);
      });
    });

    context('on #move', function() {
      beforeEach(function() {
        this.target = Helper.create('#target');
      });

      context('on 1.1', function() {
        it ('receives the [1][0] position', function() {
          // given
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            target     : '#target',
            targetKeep : true
          });

          // when
          this.el.raty('move', 1.1);

          // then
          expect(this.target.text()).toEqual('1,1');
        });

        it ('receives the [1][0] position as title', function() {
          // given
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            target     : '#target',
            targetKeep : true
          });

          // when
          this.el.raty('move', 1.1);

          // then
          expect(this.el.children()[1].title).toEqual('1,1');
        });
      });

      context('on 1.2', function() {
        it ('receives the [1][1] position', function() {
          // given
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            target     : '#target',
            targetKeep : true
          });

          // when
          this.el.raty('move', 1.2);

          // then
          expect(this.target.text()).toEqual('1,2');
        });

        it ('receives the [1][1] position as title', function() {
          // given
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            target     : '#target',
            targetKeep : true
          });

          // when
          this.el.raty('move', 1.2);

          // then
          expect(this.el.children()[1].title).toEqual('1,2');
        });
      });

      context('on 1.3', function() {
        it ('receives the [1][2] position', function() {
          // given
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            target     : '#target',
            targetKeep : true
          });

          // when
          this.el.raty('move', 1.3);

          // then
          expect(this.target.text()).toEqual('1,3');
        });

        it ('receives the [1][2] position as title', function() {
          // given
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            target     : '#target',
            targetKeep : true
          });

          // when
          this.el.raty('move', 1.3);

          // then
          expect(this.el.children()[1].title).toEqual('1,3');
        });
      });

      context('on 1.4', function() {
        it ('receives the [1][3] position', function() {
          // given
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            target     : '#target',
            targetKeep : true
          });

          // when
          this.el.raty('move', 1.4);

          // then
          expect(this.target.text()).toEqual('1,4');
        });

        it ('receives the [1][3] position as title', function() {
          // given
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            target     : '#target',
            targetKeep : true
          });

          // when
          this.el.raty('move', 1.4);

          // then
          expect(this.el.children()[1].title).toEqual('1,4');
        });
      });

      context('on 1.5', function() {
        it ('receives the [1][4] position', function() {
          // given
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            target     : '#target',
            targetKeep : true
          });

          // when
          this.el.raty('move', 1.5);

          // then
          expect(this.target.text()).toEqual('1,5');
        });

        it ('receives the [1][4] position as title', function() {
          // given
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            target     : '#target',
            targetKeep : true
          });

          // when
          this.el.raty('move', 1.5);

          // then
          expect(this.el.children()[1].title).toEqual('1,5');
        });
      });

      context('on 1.6', function() {
        it ('receives the [1][5] position', function() {
          // given
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            target     : '#target',
            targetKeep : true
          });

          // when
          this.el.raty('move', 1.6);

          // then
          expect(this.target.text()).toEqual('1,6');
        });

        it ('receives the [1][5] position as title', function() {
          // given
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            target     : '#target',
            targetKeep : true
          });

          // when
          this.el.raty('move', 1.6);

          // then
          expect(this.el.children()[1].title).toEqual('1,6');
        });
      });

      context('on 1.7', function() {
        it ('receives the [1][6] position', function() {
          // given
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            target     : '#target',
            targetKeep : true
          });

          // when
          this.el.raty('move', 1.7);

          // then
          expect(this.target.text()).toEqual('1,7');
        });

        it ('receives the [1][7] position as title', function() {
          // given
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            target     : '#target',
            targetKeep : true
          });

          // when
          this.el.raty('move', 1.7);

          // then
          expect(this.el.children()[1].title).toEqual('1,7');
        });
      });

      context('on 1.8', function() {
        it ('receives the [1][7] position', function() {
          // given
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            target     : '#target',
            targetKeep : true
          });

          // when
          this.el.raty('move', 1.8);

          // then
          expect(this.target.text()).toEqual('1,8');
        });

        it ('receives the [1][7] position as title', function() {
          // given
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            target     : '#target',
            targetKeep : true
          });

          // when
          this.el.raty('move', 1.8);

          // then
          expect(this.el.children()[1].title).toEqual('1,8');
        });
      });

      context('on 1.9', function() {
        it ('receives the [1][8] position', function() {
          // given
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            target     : '#target',
            targetKeep : true
          });

          // when
          this.el.raty('move', 1.9);

          // then
          expect(this.target.text()).toEqual('1,9');
        });

        it ('receives the [1][8] position as title', function() {
          // given
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            target     : '#target',
            targetKeep : true
          });

          // when
          this.el.raty('move', 1.9);

          // then
          expect(this.el.children()[1].title).toEqual('1,9');
        });
      });

      context('on 2.0', function() {
        it ('receives the [1][9] position', function() {
          // given
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            target     : '#target',
            targetKeep : true
          });

          // when
          this.el.raty('move', 2.0);

          // then
          expect(this.target.text()).toEqual('2,0');
        });

        it ('receives the [1][9] position as title', function() {
          // given
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            target     : '#target',
            targetKeep : true
          });

          // when
          this.el.raty('move', 2.0);

          // then
          expect(this.el.children()[1].title).toEqual('2,0');
        });
      });

      context('on 2', function() {
        it ('receives the [1][9] position', function() {
          // given
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            target     : '#target',
            targetKeep : true
          });

          // when
          this.el.raty('move', 2);

          // then
          expect(this.target.text()).toEqual('2,0');
        });

        it ('receives the [1][9] position as title', function() {
          // given
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            target     : '#target',
            targetKeep : true
          });

          // when
          this.el.raty('move', 2);

          // then
          expect(this.el.children()[1].title).toEqual('2,0');
        });
      });
    });

    context('on mousemove', function() {
      beforeEach(function() {
        this.target = Helper.create('#target');
      });

      context('on 1.0 fraction', function() {
        it ('receives the [1][0] position', function() {
          // given
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            target     : '#target',
            targetKeep : true
          });

          // when
          Helper.mousemove(this.el, 1, 0);

          // then
          expect(this.target.text()).toEqual('1,1');
        });

        it ('receives the [1][0] position as title', function() {
          // given
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            target     : '#target',
            targetKeep : true
          });

          // when
          Helper.mousemove(this.el, 1, 0);

          // then
          expect(this.el.children()[1].title).toEqual('1,1');
        });
      });

      context('on 1.1 fraction', function() {
        it ('receives the [1][1] position', function() {
          // given
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            target     : '#target',
            targetKeep : true
          });

          // when
          Helper.mousemove(this.el, 1, 1);

          // then
          expect(this.target.text()).toEqual('1,2');
        });

        it ('receives the [1][1] position as title', function() {
          // given
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            target     : '#target',
            targetKeep : true
          });

          // when
          Helper.mousemove(this.el, 1, 1);

          // then
          expect(this.el.children()[1].title).toEqual('1,2');
        });
      });

      context('on 1.2 fraction', function() {
        it ('receives the [1][2] position', function() {
          // given
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            target     : '#target',
            targetKeep : true
          });

          // when
          Helper.mousemove(this.el, 1, 2);

          // then
          expect(this.target.text()).toEqual('1,3');
        });

        it ('receives the [1][2] position as title', function() {
          // given
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            target     : '#target',
            targetKeep : true
          });

          // when
          Helper.mousemove(this.el, 1, 2);

          // then
          expect(this.el.children()[1].title).toEqual('1,3');
        });
      });

      context('on 1.3 fraction', function() {
        it ('receives the [1][3] position', function() {
          // given
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            target     : '#target',
            targetKeep : true
          });

          // when
          Helper.mousemove(this.el, 1, 3);

          // then
          expect(this.target.text()).toEqual('1,4');
        });

        it ('receives the [1][3] position as title', function() {
          // given
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            target     : '#target',
            targetKeep : true
          });

          // when
          Helper.mousemove(this.el, 1, 3);

          // then
          expect(this.el.children()[1].title).toEqual('1,4');
        });
      });

      context('on 1.4 fraction', function() {
        it ('receives the [1][4] position', function() {
          // given
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            target     : '#target',
            targetKeep : true
          });

          // when
          Helper.mousemove(this.el, 1, 4);

          // then
          expect(this.target.text()).toEqual('1,5');
        });

        it ('receives the [1][4] position as title', function() {
          // given
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            target     : '#target',
            targetKeep : true
          });

          // when
          Helper.mousemove(this.el, 1, 4);

          // then
          expect(this.el.children()[1].title).toEqual('1,5');
        });
      });

      context('on 1.5 fraction', function() {
        it ('receives the [1][5] position', function() {
          // given
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            target     : '#target',
            targetKeep : true
          });

          // when
          Helper.mousemove(this.el, 1, 5);

          // then
          expect(this.target.text()).toEqual('1,6');
        });

        it ('receives the [1][5] position as title', function() {
          // given
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            target     : '#target',
            targetKeep : true
          });

          // when
          Helper.mousemove(this.el, 1, 5);

          // then
          expect(this.el.children()[1].title).toEqual('1,6');
        });
      });

      context('on 1.6 fraction', function() {
        it ('receives the [1][6] position', function() {
          // given
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            target     : '#target',
            targetKeep : true
          });

          // when
          Helper.mousemove(this.el, 1, 6);

          // then
          expect(this.target.text()).toEqual('1,7');
        });

        it ('receives the [1][6] position as title', function() {
          // given
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            target     : '#target',
            targetKeep : true
          });

          // when
          Helper.mousemove(this.el, 1, 6);

          // then
          expect(this.el.children()[1].title).toEqual('1,7');
        });
      });

      context('on 1.7 fraction', function() {
        it ('receives the [1][7] position', function() {
          // given
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            target     : '#target',
            targetKeep : true
          });

          // when
          Helper.mousemove(this.el, 1, 7);

          // then
          expect(this.target.text()).toEqual('1,8');
        });

        it ('receives the [1][7] position as title', function() {
          // given
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            target     : '#target',
            targetKeep : true
          });

          // when
          Helper.mousemove(this.el, 1, 7);

          // then
          expect(this.el.children()[1].title).toEqual('1,8');
        });
      });

      context('on 1.8 fraction', function() {
        it ('receives the [1][8] position', function() {
          // given
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            target     : '#target',
            targetKeep : true
          });

          // when
          Helper.mousemove(this.el, 1, 8);

          // then
          expect(this.target.text()).toEqual('1,9');
        });

        it ('receives the [1][8] position as title', function() {
          // given
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            target     : '#target',
            targetKeep : true
          });

          // when
          Helper.mousemove(this.el, 1, 8);

          // then
          expect(this.el.children()[1].title).toEqual('1,9');
        });
      });

      context('on 1.9 fraction', function() {
        it ('receives the [1][9] position', function() {
          // given
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            target     : '#target',
            targetKeep : true
          });

          // when
          Helper.mousemove(this.el, 1, 9);

          // then
          expect(this.target.text()).toEqual('2,0');
        });

        it ('receives the [1][9] position as title', function() {
          // given
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            target     : '#target',
            targetKeep : true
          });

          // when
          Helper.mousemove(this.el, 1, 9);

          // then
          expect(this.el.children()[1].title).toEqual('2,0');
        });
      });
    });

    context('on score', function() {
      beforeEach(function() {
        this.target = Helper.create('#target');
      });

      context('on 1.1', function() {
        it ('receives the [1][0] position', function() {
          // given

          // when
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            score      : 1.1,
            target     : '#target',
            targetKeep : true
          });

          // then
          expect(this.target.text()).toEqual('1,1');
        });

        it ('receives the [1][0] position as title', function() {
          // given

          // when
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            score      : 1.1,
            target     : '#target',
            targetKeep : true
          });

          // then
          expect(this.el.children()[1].title).toEqual('1,1');
        });
      });

      context('on 1.2', function() {
        it ('receives the [1][1] position', function() {
          // given

          // when
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            score      : 1.2,
            target     : '#target',
            targetKeep : true
          });

          // then
          expect(this.target.text()).toEqual('1,2');
        });

        it ('receives the [1][1] position as title', function() {
          // given

          // when
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            score      : 1.2,
            target     : '#target',
            targetKeep : true
          });

          // then
          expect(this.el.children()[1].title).toEqual('1,2');
        });
      });

      context('on 1.3', function() {
        it ('receives the [1][2] position', function() {
          // given

          // when
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            score      : 1.3,
            target     : '#target',
            targetKeep : true
          });

          // then
          expect(this.target.text()).toEqual('1,3');
        });

        it ('receives the [1][2] position as title', function() {
          // given

          // when
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            score      : 1.3,
            target     : '#target',
            targetKeep : true
          });

          // then
          expect(this.el.children()[1].title).toEqual('1,3');
        });
      });

      context('on 1.4', function() {
        it ('receives the [1][3] position', function() {
          // given

          // when
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            score      : 1.4,
            target     : '#target',
            targetKeep : true
          });

          // then
          expect(this.target.text()).toEqual('1,4');
        });

        it ('receives the [1][3] position as title', function() {
          // given

          // when
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            score      : 1.4,
            target     : '#target',
            targetKeep : true
          });

          // then
          expect(this.el.children()[1].title).toEqual('1,4');
        });
      });

      context('on 1.5', function() {
        it ('receives the [1][4] position', function() {
          // given

          // when
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            score      : 1.5,
            target     : '#target',
            targetKeep : true
          });

          // then
          expect(this.target.text()).toEqual('1,5');
        });

        it ('receives the [1][4] position as title', function() {
          // given

          // when
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            score      : 1.5,
            target     : '#target',
            targetKeep : true
          });

          // then
          expect(this.el.children()[1].title).toEqual('1,5');
        });
      });

      context('on 1.6', function() {
        it ('receives the [1][5] position', function() {
          // given

          // when
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            score      : 1.6,
            target     : '#target',
            targetKeep : true
          });

          // then
          expect(this.target.text()).toEqual('1,6');
        });

        it ('receives the [1][5] position as title', function() {
          // given

          // when
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            score      : 1.6,
            target     : '#target',
            targetKeep : true
          });

          // then
          expect(this.el.children()[1].title).toEqual('1,6');
        });
      });

      context('on 1.7', function() {
        it ('receives the [1][6] position', function() {
          // given

          // when
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            score      : 1.7,
            target     : '#target',
            targetKeep : true
          });

          // then
          expect(this.target.text()).toEqual('1,7');
        });

        it ('receives the [1][6] position as title', function() {
          // given

          // when
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            score      : 1.7,
            target     : '#target',
            targetKeep : true
          });

          // then
          expect(this.el.children()[1].title).toEqual('1,7');
        });
      });

      context('on 1.8', function() {
        it ('receives the [1][7] position', function() {
          // given

          // when
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            score      : 1.8,
            target     : '#target',
            targetKeep : true
          });

          // then
          expect(this.target.text()).toEqual('1,8');
        });

        it ('receives the [1][7] position as title', function() {
          // given

          // when
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            score      : 1.8,
            target     : '#target',
            targetKeep : true
          });

          // then
          expect(this.el.children()[1].title).toEqual('1,8');
        });
      });

      context('on 1.9', function() {
        it ('receives the [1][8] position', function() {
          // given

          // when
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            score      : 1.9,
            target     : '#target',
            targetKeep : true
          });

          // then
          expect(this.target.text()).toEqual('1,9');
        });

        it ('receives the [1][8] position as title', function() {
          // given

          // when
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            score      : 1.9,
            target     : '#target',
            targetKeep : true
          });

          // then
          expect(this.el.children()[1].title).toEqual('1,9');
        });
      });

      context('on 1.0', function() {
        it ('receives the [1][9] position', function() {
          // given

          // when
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            score      : 2.0,
            target     : '#target',
            targetKeep : true
          });

          // then
          expect(this.target.text()).toEqual('2,0');
        });

        it ('receives the [1][9] position as title', function() {
          // given

          // when
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            score      : 2.0,
            target     : '#target',
            targetKeep : true
          });

          // then
          expect(this.el.children()[1].title).toEqual('2,0');
        });
      });

      context('on 2', function() {
        it ('receives the [1][9] position', function() {
          // given

          // when
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            score      : 2,
            target     : '#target',
            targetKeep : true
          });

          // then
          expect(this.target.text()).toEqual('2,0');
        });

        it ('receives the [1][9] position as title', function() {
          // given

          // when
          this.el.raty({
            hints      : [null, ['1,1', '1,2', '1,3', '1,4', '1,5', '1,6', '1,7', '1,8', '1,9', '2,0']],
            precision  : true,
            score      : 1,
            target     : '#target',
            targetKeep : true
          });

          // then
          expect(this.el.children()[1].title).toEqual('2,0');
        });
      });
    });

    context('on leave', function() {
      it ('reset all stars to the last hint', function() {
        // given
        this.el.raty({
          hints     : null,
          precision : true
        });

        var stars = this.el.children();

        this.el.raty('move', 4.1);
        this.el.raty('move', 3.1);
        this.el.raty('move', 2.1);
        this.el.raty('move', 1.1);
        this.el.raty('move', 0.1);

        // when
        this.el.trigger('mouseleave');

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
