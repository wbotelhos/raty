describe('#target', function() {
  beforeEach(function() {
    $.fn.raty.defaults.path = '../lib/images';

    this.el = Helper.create('#el');
  });

  afterEach(function() {
    Helper.clear();
  });

  context('on mouseover', function() {
    context('with callback', function() {
      beforeEach(function() {
        this.el[0].setAttribute('data-target', '#target');

        this.target = Helper.target('#target');
      });

      it ('accepts the return as value', function() {
        // given
        this.el.raty({
          target: function() {
            return this.getAttribute('data-target');
          }
        });

        var star = this.el.children('img:last');

        // when
        star.trigger('mouseover');

        // then
        expect(this.target).toHaveHtml('gorgeous');
      });
    });

    context('as div', function() {
      beforeEach(function() {
        this.target = Helper.target('#target');
      });

      it ('sets the hint', function() {
        // given
        this.el.raty({ target: '#' + this.target[0].id });

        var star = this.el.children('img:last');

        // when
        star.trigger('mouseover');

        // then
        expect(this.target).toHaveHtml('gorgeous');
      });
    });

    context('as input', function() {
      beforeEach(function() {
        this.target = Helper.target('#target', 'input');
      });

      it ('sets the hint', function() {
        // given
        this.el.raty({ target: '#' + this.target[0].id });

        var star = this.el.children('img:last');

        // when
        star.trigger('mouseover');

        // then
        expect(this.target).toHaveValue('gorgeous');
      });
    });

    context('as textarea', function() {
      beforeEach(function() {
        this.target = Helper.target('#target', 'textarea');
      });

      it ('sets the hint', function() {
        // given
        this.el.raty({ target: '#' + this.target[0].id });

        var star = this.el.children('img:last');

        // when
        star.trigger('mouseover');

        // then
        expect(this.target).toHaveValue('gorgeous');
      });
    });

    context('as select', function() {
      beforeEach(function() {
        this.target = Helper.target('#target', 'select');
      });

      it ('sets the hint', function() {
        // given
        this.el.raty({ target: '#' + this.target[0].id });

        var star = this.el.children('img:last');

        // when
        star.trigger('mouseover');

        // then
        expect(this.target).toHaveValue('gorgeous');
      });
    });

    context('and mouseout', function() {
      context('as div', function() {
        beforeEach(function() {
          this.target = Helper.target('#target');
        });

        it ('gets clear', function() {
          // given
          this.el.raty({ target: '#' + this.target[0].id });

          var star = this.el.children('img:last');

          // when
          star.trigger('mouseover').trigger('mouseout');

          // then
          expect(this.target).toBeEmpty();
        });
      });

      context('as textarea', function() {
        beforeEach(function() {
          this.target = Helper.target('#textarea');
        });

        it ('gets clear', function() {
          // given
          this.el.raty({ target: '#' + this.target[0].id });

          var star = this.el.children('img:last');

          // when
          star.trigger('mouseover').trigger('mouseout');

          // then
          expect(this.target).toHaveValue('');
        });
      });

      context('as input', function() {
        beforeEach(function() {
          this.target = Helper.target('#target', 'input');
        });

        it ('gets clear', function() {
          // given
          this.el.raty({ target: '#' + this.target[0].id });

          var star = this.el.children('img:last');

          // when
          star.trigger('mouseover').trigger('mouseout');

          // then
          expect(this.target).toHaveValue('');
        });
      });

      context('as select', function() {
        beforeEach(function() {
          this.target = Helper.target('#select');
        });

        it ('gets clear', function() {
          // given
          this.el.raty({ target: '#' + this.target[0].id });

          var star = this.el.children('img:last');

          // when
          star.trigger('mouseover').trigger('mouseout');

          // then
          expect(this.target).toHaveValue('');
        });
      });
    });

    context('and click', function() {
      context('and mouseout', function() {
        context('as div', function() {
          beforeEach(function() {
            this.target = Helper.target('#target');
          });

          it ('gets clear', function() {
            // given
            this.el.raty({ target: '#' + this.target[0].id });

            var star = this.el.children('img:last');

            // when
            star.trigger('mouseover').trigger('click').trigger('mouseout');

            // then
            expect(this.target).toBeEmpty();
          });
        });

        context('as textarea', function() {
          beforeEach(function() {
            this.target = Helper.target('#textarea');
          });

          it ('gets clear', function() {
            // given
            this.el.raty({ target: '#' + this.target[0].id });

            var star = this.el.children('img:last');

            // when
            star.trigger('mouseover').trigger('click').trigger('mouseout');

            // then
            expect(this.target).toHaveValue('');
          });
        });

        context('as input', function() {
          beforeEach(function() {
            this.target = Helper.target('#target', 'input');
          });

          it ('gets clear', function() {
            // given
            this.el.raty({ target: '#' + this.target[0].id });

            var star = this.el.children('img:last');

            // when
            star.trigger('mouseover').trigger('click').trigger('mouseout');

            // then
            expect(this.target).toHaveValue('');
          });
        });

        context('as select', function() {
          beforeEach(function() {
            this.target = Helper.target('#select');
          });

          it ('gets clear', function() {
            // given
            this.el.raty({ target: '#' + this.target[0].id });

            var star = this.el.children('img:last');

            // when
            star.trigger('mouseover').trigger('click').trigger('mouseout');

            // then
            expect(this.target).toHaveValue('');
          });
        });
      });
    });
  });
});
