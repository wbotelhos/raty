describe('#_adjustHints', function() {
  beforeEach(function() {
    this.el = Helper.create('#el');
  });

  context('when :halfShow and :half is false', function() {
    var half     = false;
    var halfShow = false;

    context('and hints is null', function() {
      var hints = null;

      it ('receives an empty array', function() {
        // given
        var
          element  = this.el[0];
        var options  = { half: half, halfShow: halfShow, hints: hints };
        var instance = new $.raty.Raty(element, options);

        // when
        instance._adjustHints();

        // then
        expect(instance.opt.hints).toEqual([]);
      });
    });

    context('and hints is empty', function() {
      var hints = '';

      it ('receives an empty array', function() {
        // given
        var element  = this.el[0];
        var options  = { half: half, halfShow: halfShow, hints: hints };
        var instance = new $.raty.Raty(element, options);

        // when
        instance._adjustHints();

        // then
        expect(instance.opt.hints).toEqual([]);
      });
    });

    context('and hints is undefined', function() {
      it ('receives an empty array', function() {
        // given
        var element  = this.el[0];
        var options  = { half: half, halfShow: halfShow };
        var instance = new $.raty.Raty(element, options);

        delete instance.opt.hints;

        // when
        instance._adjustHints();

        // then
        expect(instance.opt.hints).toEqual([]);
      });
    });
  });

  context('when :halfShow is true', function() {
    var halfShow = true;

    context('and hints is string or number', function() {
      var hints = [1, '2', 3, '4', 5];

      it ('uses the hint on the first and second position', function() {
        // given
        var element  = this.el[0];
        var options  = { halfShow: halfShow, hints: hints };
        var instance = new $.raty.Raty(element, options);

        // when
        instance._adjustHints();

        // then
        var expected = [[1, 1], ['2', '2'], [3, 3], ['4', '4'], [5, 5]];

        expect(instance.opt.hints).toEqual(expected);
      });
    });

    context('and hints is an array of one position of string or number', function() {
      var hints = [[1], ['2'], [3], ['4'], [5]];

      it ('replicates the first position to second one', function() {
        // given
        var element  = this.el[0];
        var options  = { halfShow: halfShow, hints: hints };
        var instance = new $.raty.Raty(element, options);

        // when
        instance._adjustHints();

        // then
        var expected = [[1, 1], ['2', '2'], [3, 3], ['4', '4'], [5, 5]];

        expect(instance.opt.hints).toEqual(expected);
      });
    });

    context('and hints is an array of two positions of string or number', function() {
      var hints = [[0.5, 1], ['1.5', '2'], [2.5, 3], ['3.5', '4'], [4.5, 5]];

      it ('keeps the original values', function() {
        // given
        var element  = this.el[0];
        var options  = { halfShow: halfShow, hints: hints };
        var instance = new $.raty.Raty(element, options);

        // when
        instance._adjustHints();

        // then
        expect(instance.opt.hints).toEqual(hints);
      });
    });

    context('and hints is an array of three or more positions of string or number', function() {
      var hints = [[0.5, 1, 'extra'], ['1.5', '2', 'extra'], [2.5, 3, 'extra'], ['3.5', '4', 'extra'], [4.5, 5, 'extra']];

      it ('removes the extra hints', function() {
        // given
        var element  = this.el[0];
        var options  = { halfShow: halfShow, hints: hints };
        var instance = new $.raty.Raty(element, options);

        // when
        instance._adjustHints();

        // then
        var expected = [[0.5, 1], ['1.5', '2'], [2.5, 3], ['3.5', '4'], [4.5, 5]];

        expect(instance.opt.hints).toEqual(expected);
      });
    });
  });
});
