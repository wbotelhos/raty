describe('#half', function() {
  beforeEach(function() {
    $.fn.raty.defaults.path = '../lib/images';

    this.el = Helper.create('#el');
  });

  afterEach(function() {
    Helper.clear();
  });

  context('as *false', function() {
    context('and :halfShow', function() {
      context('as *false', function() {
        it ('rounds down while less the full limit', function() {
          // given

          // when
          this.el.raty({
            half     : false,
            halfShow : false,
            round    : { down: 0.25, full: 0.6, up: 0.76 },
            score    : 0.5
          });

          // then
          var stars = this.el.children('img');

          expect(stars[0]).toHaveAttr('src', '../lib/images/star-off.png');
          expect(stars[1]).toHaveAttr('src', '../lib/images/star-off.png');
        });

        it ('rounds full when equal the full limit', function() {
          // given

          // when
          this.el.raty({
            half     : false,
            halfShow : false,
            round    : { down: 0.25, full: 0.6, up: 0.76 },
            score    : 0.6
          });


          // then
          expect(this.el.children('img:first')).toHaveAttr('src', '../lib/images/star-on.png');
        });
      });
    });
  });

  context('as *true', function() {
    context('and :halfShow', function() {
      context('as *false', function() {
        it ('ignores the round down while less down limit', function() {
          // given

          // when
          this.el.raty({
            half     : true,
            halfShow : false,
            round    : { down: 0.25, full: 0.6, up: 0.76 },
            score    : 0.24
          });

          // then
          expect(this.el.children('img:first')).toHaveAttr('src', '../lib/images/star-off.png');
          expect(this.el.children('input')).toHaveValue('0.24');
        });

        it ('ignores half while greater then down limit', function() {
          // given

          // when
          this.el.raty({
            half     : true,
            halfShow : false,
            round    : { down: 0.25, full: 0.6, up: 0.76 },
            score    : 0.26
          });

          // then
          expect(this.el.children('img:first')).toHaveAttr('src', '../lib/images/star-off.png');
          expect(this.el.children('input').val()).toEqual('0.26');
        });

        it ('ignores half while equal full limit, ignoring it', function() {
          // given

          // when
          this.el.raty({
            half     : true,
            halfShow : false,
            round    : { down: 0.25, full: 0.6, up: 0.76 },
            score    : 0.6
          });

          // then
          expect(this.el.children('img:first')).toHaveAttr('src', '../lib/images/star-on.png');
          expect(this.el.children('input').val()).toEqual('0.6');
        });

        it ('ignores half while greater than down limxit and less than up limit', function() {
          // given

          // when
          this.el.raty({
            half     : true,
            halfShow : false,
            round    : { down: 0.25, full: 0.6, up: 0.76 },
            score    : 0.75
          });

          // then
          expect(this.el.children('img:first')).toHaveAttr('src', '../lib/images/star-on.png');
          expect(this.el.children('input').val()).toEqual('0.75');
        });

        it ('ignores full while equal or greater than up limit', function() {
          // given

          // when
          this.el.raty({
            half     : true,
            halfShow : false,
            round    : { down: 0.25, full: 0.6, up: 0.76 },
            score    : 0.76
          });

          // then
          expect(this.el.children('img:first')).toHaveAttr('src', '../lib/images/star-on.png');
        });
      });

      context('as *true', function() {
        it ('rounds down while less down limit', function() {
          // given

          // when
          this.el.raty({
            half     : true,
            halfShow : true,
            round    : { down: 0.25, full: 0.6, up: 0.76 },
            score    : 0.24
          });

          // then
          expect(this.el.children('img:first')).toHaveAttr('src', '../lib/images/star-off.png');
        });

        it ('receives half while greater then down limit', function() {
          // given

          // when
          this.el.raty({
            half     : true,
            halfShow : true,
            round    : { down: 0.25, full: 0.6, up: 0.76 },
            score    : 0.26
          });

          // then
          expect(this.el.children('img:first')).toHaveAttr('src', '../lib/images/star-half.png');
        });

        it ('receives half while equal full limit, ignoring it', function() {
          // given

          // when
          this.el.raty({
            half     : true,
            halfShow : true,
            round    : { down: 0.25, full: 0.6, up: 0.76 },
            score    : 0.6
          });

          // then
          expect(this.el.children('img:first')).toHaveAttr('src', '../lib/images/star-half.png');
        });

        it ('receives half while greater than down limxit and less than up limit', function() {
          // given

          // when
          this.el.raty({
            half     : true,
            halfShow : true,
            round    : { down: 0.25, full: 0.6, up: 0.76 },
            score    : 0.75
          });

          // then
          expect(this.el.children('img:first')).toHaveAttr('src', '../lib/images/star-half.png');
        });

        it ('receives full while equal or greater than up limit', function() {
          // given

          // when
          this.el.raty({
            half     : true,
            halfShow : true,
            round    : { down: 0.25, full: 0.6, up: 0.76 },
            score    : 0.76
          });

          // then
          expect(this.el.children('img:first')).toHaveAttr('src', '../lib/images/star-on.png');
        });

        context('with :target', function() {
          beforeEach(function() {
            this.target = Helper.create('#target');
          });

          context('and :targetKeep', function() {
            context('and :targetType', function() {
              context('as *score', function() {
                it ('shows the 0.5 float', function() {
                  // given

                  // when
                  this.el.raty({
                    half       : true,
                    halfShow   : true,
                    score      : 1.5,
                    target     : '#target',
                    targetKeep : true,
                    targetType : 'score'
                  });

                  // then
                  expect(this.target).toHaveHtml('1.5');
                });
              });

              context('as *hint', function() {
                context('with half value', function() {
                  var score = 1.5;

                  context('with only integer hints', function() {
                    var hints = ['one', 'two', 'three', 'four', 'five'];

                    it ('shows this hint as [1][0] hint', function() {
                      // given

                      // when
                      this.el.raty({
                        half       : true,
                        halfShow   : true,
                        hints      : hints,
                        score      : score,
                        target     : '#target',
                        targetKeep : true,
                        targetType : 'hint'
                      });

                      // then
                      expect(this.target).toHaveHtml('two');
                    });
                  });

                  context('with one float hint', function() {
                    var hints = ['one', ['two'], 'three', 'four', 'five'];

                    it ('shows this hint as [1][0] hint', function() {
                      // given

                      // when
                      this.el.raty({
                        half       : true,
                        hints      : hints,
                        halfShow   : true,
                        precision  : false,
                        score      : score,
                        target     : '#target',
                        targetKeep : true,
                        targetType : 'hint'
                      });

                      // then
                      expect(this.target).toHaveHtml('two');
                    });
                  });

                  context('with two float hints', function() {
                    var hints = ['one', ['one and half', 'two'], 'three', 'four', 'five'];

                    it ('shows this hint as [1][0] hint', function() {
                      // given

                      // when
                      this.el.raty({
                        half       : true,
                        hints      : hints,
                        halfShow   : true,
                        precision  : false,
                        score      : score,
                        target     : '#target',
                        targetKeep : true,
                        targetType : 'hint'
                      });

                      // then
                      expect(this.target).toHaveHtml('one and half');
                    });
                  });
                });

                context('with integer value', function() {
                  var score = 2;

                  context('with only integer hints', function() {
                    var hints = ['one', 'two', 'three', 'four', 'five'];

                    it ('shows this hint as [1][1] hint', function() {
                      // given

                      // when
                      this.el.raty({
                        half       : true,
                        hints      : hints,
                        halfShow   : true,
                        precision  : false,
                        score      : score,
                        target     : '#target',
                        targetKeep : true,
                        targetType : 'hint'
                      });

                      // then
                      expect(this.target).toHaveHtml('two');
                    });
                  });

                  context('with one float hint', function() {
                    var hints = ['one', ['two'], 'three', 'four', 'five'];

                    it ('shows this hint as [1][1] hint', function() {
                      // given

                      // when
                      this.el.raty({
                        half       : true,
                        hints      : hints,
                        halfShow   : true,
                        precision  : false,
                        score      : score,
                        target     : '#target',
                        targetKeep : true,
                        targetType : 'hint'
                      });

                      // then
                      expect(this.target).toHaveHtml('two');
                    });
                  });

                  context('with two float hints', function() {
                    var hints = ['one', ['one and half', 'two'], 'three', 'four', 'five'];

                    it ('shows this hint as [1][1] hint', function() {
                      // given

                      // when
                      this.el.raty({
                        half       : true,
                        hints      : hints,
                        halfShow   : true,
                        precision  : false,
                        score      : score,
                        target     : '#target',
                        targetKeep : true,
                        targetType : 'hint'
                      });

                      // then
                      expect(this.target).toHaveHtml('two');
                    });
                  });
                });

                context('with float as zero value', function() {
                  var score = 2.0;

                  context('with only integer hints', function() {
                    var hints = ['one', 'two', 'three', 'four', 'five'];

                    it ('shows this hint as [1][1] hint', function() {
                      // given

                      // when
                      this.el.raty({
                        half       : true,
                        hints      : hints,
                        halfShow   : true,
                        precision  : false,
                        score      : score,
                        target     : '#target',
                        targetKeep : true,
                        targetType : 'hint'
                      });

                      // then
                      expect(this.target).toHaveHtml('two');
                    });
                  });

                  context('with one float hint', function() {
                    var hints = ['one', ['two'], 'three', 'four', 'five'];

                    it ('shows this hint as [1][1] hint', function() {
                      // given

                      // when
                      this.el.raty({
                        half       : true,
                        hints      : hints,
                        halfShow   : true,
                        precision  : false,
                        score      : score,
                        target     : '#target',
                        targetKeep : true,
                        targetType : 'hint'
                      });

                      // then
                      expect(this.target).toHaveHtml('two');
                    });
                  });

                  context('with two float hints', function() {
                    var hints = ['one', ['one and half', 'two'], 'three', 'four', 'five'];

                    it ('shows this hint as [1][1] hint', function() {
                      // given

                      // when
                      this.el.raty({
                        half       : true,
                        hints      : hints,
                        halfShow   : true,
                        precision  : false,
                        score      : score,
                        target     : '#target',
                        targetKeep : true,
                        targetType : 'hint'
                      });

                      // then
                      expect(this.target).toHaveHtml('two');
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  });
});
