/*!
 * jQuery Raty - A Star Rating Plugin
 *
 * The MIT License
 *
 * @author  : Washington Botelho
 * @doc     : http://wbotelhos.com/raty
 * @version : 2.6.0
 *
 */

;(function($) {

  var methods = {
    init: function(options) {
      return this.each(function() {
        methods.destroy.call(this);

        this.opt  = $.extend(true, {}, $.fn.raty.defaults, options);
        this.self = $(this);

        methods._adjustCallback.call(this);

        methods._adjustNumber.call(this);
        methods._adjustWidth.call(this);

        if (this.opt.starType !== 'img') {
          methods._adjustStarType.call(this);
        }

        methods._adjustPath.call(this);
        methods._createStars.call(this);

        if (this.opt.cancel) {
          methods._createCancel.call(this);
        }

        if (this.opt.precision) {
          methods._adjustPrecision.call(this);
        }

        methods._createScore.call(this);
        methods._apply.call(this, this.opt.score);
        methods._target.call(this, this.opt.score);

        if (this.opt.readOnly) {
          methods._lock.call(this);
        } else {
          this.style.cursor = 'pointer';

          methods._binds.call(this);
        }

        this.self.data('options', this.opt);
      });
    },

    _adjustCallback: function() {
      var options = ['number', 'readOnly', 'score', 'scoreName'];

      for (var i = 0; i < options.length; i++) {
        if (typeof this.opt[options[i]] === 'function') {
          this.opt[options[i]] = this.opt[options[i]].call(this);
        }
      }
    },

    _adjustNumber: function() {
      this.opt.number = methods._between(this.opt.number, 0, this.opt.numberMax);
    },

    _adjustPath: function() {
      this.opt.path = this.opt.path || '';

      if (this.opt.path && this.opt.path.charAt(this.opt.path.length - 1) !== '/') {
        this.opt.path += '/';
      }
    },

    _adjustPrecision: function() {
      this.opt.half       = true;
      this.opt.targetType = 'score';
    },

    _adjustStarType: function() {
      this.opt.path = '';

      var replaces = ['cancelOff', 'cancelOn', 'starHalf', 'starOff', 'starOn'];

      for (var i = 0; i < replaces.length; i++) {
        this.opt[replaces[i]] = this.opt[replaces[i]].replace('.', '-');
      }
    },

    _adjustWidth: function() {
      if (this.opt.width !== false && this.opt.starType === 'img') {
        var
          space = this.opt.space ? 4 : 0,
          width = this.opt.width || (this.opt.number * this.opt.size + this.opt.number * space)

        if (this.opt.cancel) {
          width += this.opt.size + space;
        }

        this.style.width = width + 'px';
      }
    },

    _apply: function(score) {
      methods._fill.call(this, score);

      if (score) {
        if (score > 0) {
          this.score.val(methods._between(score, 0, this.opt.number));
        }

        methods._roundStars.call(this, score);
      }
    },

    _between: function(value, min, max) {
      return Math.min(Math.max(parseFloat(value), min), max);
    },

    _binds: function() {
      if (this.cancel) {
        methods._bindOverCancel.call(this);
        methods._bindClickCancel.call(this);
        methods._bindOutCancel.call(this);
      }

      methods._bindOver.call(this);
      methods._bindClick.call(this);
      methods._bindOut.call(this);
    },

    _bindClick: function() {
      var that = this;

      that.stars.on('click.raty', function(evt) {
        var star = $(this);

        that.score.val((that.opt.half || that.opt.precision) ? that.self.data('score') : (this.alt || star.data('alt')));

        if (that.opt.click) {
          that.opt.click.call(that, +that.score.val(), evt);
        }
      });
    },

    _bindClickCancel: function() {
      var that = this;

      that.cancel.on('click.raty', function(evt) {
        that.score.removeAttr('value');

        if (that.opt.click) {
          that.opt.click.call(that, null, evt);
        }
      });
    },

    _bindOut: function() {
      var that = this;

      that.self.on('mouseleave.raty', function(evt) {
        var score = +that.score.val() || undefined;

        methods._apply.call(that, score);
        methods._target.call(that, score, evt);

        if (that.opt.mouseout) {
          that.opt.mouseout.call(that, score, evt);
        }
      });
    },

    _bindOutCancel: function() {
      var that = this;

      that.cancel.on('mouseleave.raty', function(evt) {
        var
          cancel    = $(this),
          cancelOff = that.opt.path + that.opt.cancelOff;

        if (that.opt.starType === 'img') {
          cancel.attr('src', cancelOff);
        } else {
          var cancelOn = that.opt.path + that.opt.cancelOn;

          cancel.removeClass(cancelOn).addClass(cancelOff);
        }

        if (that.opt.mouseout) {
          var score = +that.score.val() || undefined;

          that.opt.mouseout.call(that, score, evt);
        }
      });
    },

    _bindOver: function() {
      var that   = this,
          action = that.opt.half ? 'mousemove.raty' : 'mouseover.raty';

      that.stars.on(action, function(evt) {
        var
          star  = $(this),
          score = parseInt(this.alt || star.data('alt'), 10);

        if (that.opt.half) {
          var percent = parseFloat((evt.pageX - star.offset().left) / that.opt.size);

          if (that.opt.precision) {
            score = score - 1 + percent;
          } else {
            score = score - 1 + (percent > 0.5 ? 1 : 0.5);
          }

          methods._fill.call(that, score);
          methods._roundStars.call(that, score);

          that.self.data('score', score);
        } else {
          methods._fill.call(that, score);
        }

        methods._target.call(that, score, evt);

        if (that.opt.mouseover) {
          that.opt.mouseover.call(that, score, evt);
        }
      });
    },

    _bindOverCancel: function() {
      var that = this;

      that.cancel.on('mouseover.raty', function(evt) {
        var
          cancelOn  = that.opt.path + that.opt.cancelOn,
          star      = $(this),
          starOff   = that.opt.path + that.opt.starOff;

        if (that.opt.starType === 'img') {
          star.attr('src', cancelOn);
          that.stars.attr('src', starOff);
        } else {
          that.stars.attr('class', starOff);

          var cancelOff = that.opt.path + that.opt.cancelOff;

          star.removeClass(cancelOff).addClass(cancelOn);
        }

        methods._target.call(that, null, evt);

        if (that.opt.mouseover) {
          that.opt.mouseover.call(that, null);
        }
      });
    },

    _buildScoreField: function() {
      return $('<input />', { name: this.opt.scoreName, type: 'hidden' }).appendTo(this);
    },

    _createCancel: function() {
      var icon   = this.opt.path + this.opt.cancelOff,
          cancel = $('<' + this.opt.starType + ' />', { title: this.opt.cancelHint, 'class': 'raty-cancel' });

      if (this.opt.starType === 'img') {
        cancel.attr({ src: icon, alt: 'x' });
      } else {
        // TODO: use $.data
        cancel.attr('data-alt', 'x').addClass(icon);
      }

      if (this.opt.cancelPlace === 'left') {
        this.self.prepend('&#160;').prepend(cancel);
      } else {
        this.self.append('&#160;').append(cancel);
      }

      this.cancel = cancel;
    },

    _createScore: function() {
      var score = $(this.opt.targetScore);

      this.score = score.length ? score : methods._buildScoreField.call(this);
    },

    _createStars: function() {
      for (var i = 1; i <= this.opt.number; i++) {
        var
          attrs ,
          icon  = (this.opt.score && this.opt.score >= i) ? 'starOn' : 'starOff',
          title = methods._getHint.call(this, i);

        // TODO: extract as icon: && alt:
        icon = this.opt.path + this.opt[icon];

        if (this.opt.starType !== 'img') {
          // TODO: use $.data.
          attrs = { 'data-alt': i, 'class': icon };
        } else {
          attrs = { src: icon, alt: i };
        }

        attrs.title = title;

        $('<' + this.opt.starType + ' />', attrs).appendTo(this);

        if (this.opt.space) {
          this.self.append(i < this.opt.number ? '&#160;' : '');
        }
      }

      this.stars = this.self.children(this.opt.starType);
    },

    _error: function(message) {
      $(this).text(message);

      $.error(message);
    },

    _fill: function(score) {
      var hash = 0;

      for (var i = 1; i <= this.stars.length; i++) {
        var star   = this.stars.eq(i - 1),
            turnOn = methods._turnOn.call(this, i, score);

        if (this.opt.iconRange && this.opt.iconRange.length > hash) {
          var irange = this.opt.iconRange[hash],
              icon   = methods._getIconRange.call(this, irange, turnOn);

          if (i <= irange.range) {
            // TODO: extract.
            if (this.opt.starType === 'img') {
              star.attr('src', icon);
            } else {
              star.attr('class', icon);
            }
          }

          if (i === irange.range) {
            hash++;
          }
        } else {
          var icon = this.opt.path + this.opt[turnOn ? 'starOn' : 'starOff'];

          // TODO: extract.
          if (this.opt.starType === 'img') {
            star.attr('src', icon);
          } else {
            star.attr('class', icon);
          }
        }
      }
    },

    _getIconRange: function(irange, turnOn) {
      return this.opt.path + (turnOn ? irange.on || this.opt.starOn : irange.off || this.opt.starOff);
    },

    _turnOn: function(i, score) {
      return this.opt.single ? (i === score) : (i <= score);
    },

    _getHint: function(score) {
      var hint = this.opt.hints[score - 1];

      return hint === '' ? '' : hint || score;
    },

    _lock: function() {
      var score = parseInt(this.score.val(), 10), // TODO: 3.1 >> [['1'], ['2'], ['3', '.1', '.2']]
          hint  = score ? methods._getHint.call(this, score) : this.opt.noRatedMsg;

      this.style.cursor   = '';
      this.title          = hint;

      this.score.prop('readonly', true);
      this.stars.prop('title', hint);

      if (this.cancel) {
        this.cancel.hide();
      }

      this.self.data('readonly', true);
    },

    _roundStars: function(score) {
      var rest = (score - Math.floor(score)).toFixed(2);

      if (rest > this.opt.round.down) {
        var icon = 'starOn';                                 // Up:   [x.76 .. x.99]

        if (this.opt.halfShow && rest < this.opt.round.up) { // Half: [x.26 .. x.75]
          icon = 'starHalf';
        } else if (rest < this.opt.round.full) {             // Down: [x.00 .. x.5]
          icon = 'starOff';
        }
        if (this.opt.starType === 'img') {
          this.stars.eq(Math.ceil(score) - 1).attr('src', this.opt.path + this.opt[icon]);
        } else {
          this.stars.eq(Math.ceil(score) - 1).attr('class', '');
          this.stars.eq(Math.ceil(score) - 1).addClass(this.opt[icon]);
        }
      }                              // Full down: [x.00 .. x.25]
    },

    _target: function(score, evt) {
      if (this.opt.target) {
        var target = $(this.opt.target);

        if (!target.length) {
          methods._error.call(this, 'Target selector invalid or missing!');
        }

        // TODO: remove this check.
        if (this.opt.targetFormat.indexOf('{score}') < 0) {
          methods._error.call(this, 'Template "{score}" missing!');
        }

        var mouseover = evt && evt.type === 'mouseover';

        if (score === undefined) {
          score = this.opt.targetText;
        } else if (score === null) {
          score = mouseover ? this.opt.cancelHint : this.opt.targetText;
        } else {
          if (this.opt.targetType === 'hint') {
            score = methods._getHint.call(this, Math.ceil(score));
          } else if (this.opt.precision) {
            score = parseFloat(score).toFixed(1);
          }

          var mousemove = evt && evt.type === 'mousemove';

          if (!mouseover && !mousemove && !this.opt.targetKeep) {
            score = this.opt.targetText;
          }
        }

        if (score) {
          score = this.opt.targetFormat.toString().replace('{score}', score);
        }

        if (target.is(':input')) {
          target.val(score);
        } else {
          target.html(score);
        }
      }
    },

    _unlock: function() {
      $(this).data('readonly', false).css('cursor', 'pointer').removeAttr('title');

      this.score.removeAttr('readonly', 'readonly');

      for (var i = 0; i < this.opt.number; i++) {
        this.stars.eq(i).attr('title', methods._getHint.call(this, i + 1));
      }

      if (this.cancel) {
        this.cancel.css('display', '');
      }
    }, cancel: function(click) {
      return this.each(function() {
        if ($(this).data('readonly') !== true) {
          methods[click ? 'click' : 'score'].call(this, null);
          this.score.removeAttr('value');
        }
      });
    }, click: function(score) {
      return $(this).each(function() {
        if ($(this).data('readonly') !== true) {
          methods._apply.call(this, score);

          if (!this.opt.click) {
            methods._error.call(this, 'You must add the "click: function(score, evt) { }" callback.');
          }


          this.opt.click.call(this, score, $.Event('click'));

          methods._target.call(this, score);
        }
      });
    }, destroy: function() {
      return $(this).each(function() {
        var that = $(this),
            raw  = that.data('raw');

        if (raw) {
          that.off('.raty').empty().css({ cursor: raw.style.cursor, width: raw.style.width }).removeData('readonly');
        } else {
          that.data('raw', that.clone()[0]);
        }
      });
    }, getScore: function() {
      var score = [],
          value ;

      $(this).each(function() {
        value = this.score.val();

        score.push(value ? parseFloat(value) : undefined);
      });

      return (score.length > 1) ? score : score[0];
    },

    move: function(score) {
      return $(this).each(function() {
        var
          integer  = parseInt(score, 10),
          opt      = $(this).data('options'),
          decimal  = Number(score).toFixed(1).split('.')[1];

        if (integer > opt.number) {
          integer = opt.number - 1;
          decimal = 10;
        }

        var
          point    = opt.size / 10,
          star     = $(this.stars[integer]),
          percent = star.offset().left + point * parseInt(decimal, 10),
          evt      = $.Event('mousemove', { pageX: percent });

        star.trigger(evt);
      });
    },

    readOnly: function(readonly) {
      return this.each(function() {
        var that = $(this);

        if (that.data('readonly') !== readonly) {
          if (readonly) {
            that.off('.raty').children('img').off('.raty');

            methods._lock.call(this);
          } else {
            methods._binds.call(this);
            methods._unlock.call(this);
          }

          that.data('readonly', readonly);
        }
      });
    }, reload: function() {
      return methods.set.call(this, {});
    }, score: function() {
      return arguments.length ? methods.setScore.apply(this, arguments) : methods.getScore.call(this);
    }, set: function(options) {
      return this.each(function() {
        var that   = $(this),
            actual = that.data('options'),
            news   = $.extend({}, actual, options);

        that.raty(news);
      });
    }, setScore: function(score) {
      return $(this).each(function() {
        if ($(this).data('readonly') !== true) {
          methods._apply.call(this, score);
          methods._target.call(this, score);
        }
      });
    }
  };

  $.fn.raty = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist!');
    }
  };

  $.fn.raty.defaults = {
    cancel       : false,
    cancelHint   : 'Cancel this rating!',
    cancelOff    : 'cancel-off.png',
    cancelOn     : 'cancel-on.png',
    cancelPlace  : 'left',
    click        : undefined,
    half         : false,
    halfShow     : true,
    hints        : ['bad', 'poor', 'regular', 'good', 'gorgeous'],
    iconRange    : undefined,
    mouseout     : undefined,
    mouseover    : undefined,
    noRatedMsg   : 'Not rated yet!',
    number       : 5,
    numberMax    : 20,
    path         : undefined,
    precision    : false,
    readOnly     : false,
    round        : { down: .25, full: .6, up: .76 },
    score        : undefined,
    scoreName    : 'score',
    single       : false,
    size         : 16,
    space        : true,
    starHalf     : 'star-half.png',
    starOff      : 'star-off.png',
    starOn       : 'star-on.png',
    starType     : 'img',
    target       : undefined,
    targetFormat : '{score}',
    targetKeep   : false,
    targetScore  : undefined,
    targetText   : '',
    targetType   : 'hint',
    width        : undefined
  };

})(jQuery);
