/*!
 * jQuery Raty - A Star Rating Plugin
 * ------------------------------------------------------------------
 *
 * jQuery Raty is a plugin that generates a customizable star rating.
 *
 * Licensed under The MIT License
 *
 * @version        2.5.0.rc1
 * @since          2010.06.11
 * @author         Washington Botelho
 * @documentation  wbotelhos.com/raty
 *
 * ----------------------------------------------------------------------
 *
 *  $('#star').raty();
 *
 *  <div id="star"></div>
 *
 */

;(function($) {

  var methods = {
    init: function(settings) {
      return this.each(function() {
        this.opt = $.extend(true, {}, $.fn.raty.defaults, settings);

        var self  = this,
            $this = $(self).empty(),
            inits = ['number', 'readOnly', 'score', 'scoreName'];

        methods._callback.call(this, inits);

        if (self.opt.precision) {
          methods._adjustPrecision.call(self);
        }

        self.opt.number = methods.between(self.opt.number, 0, self.opt.numberMax)

        if (self.opt.path && !self.opt.path.endsWith('/')) {
          self.opt.path += '/';
        }

        self.stars = methods._createStars.call(this);
        self.score = methods._createScore.call(this);

        methods._initialize.call(this, this.opt.score);

        $this.data('settings', self.opt);

        if (self.opt.iconRange) {
          methods.fill.call(self, self.opt.score);
        }

        methods._setTarget.call(self, self.opt.score);

        var space  = self.opt.space ? 4 : 0,
            width  = self.opt.width || (self.opt.number * self.opt.size + self.opt.number * space);

        if (self.opt.cancel) {
          var icon = (self.opt.path || '') + self.opt.cancelOff

          self.cancel = $('<img />', { src: icon, alt: 'x', title: self.opt.cancelHint, 'class': 'raty-cancel' });

          if (self.opt.cancelPlace == 'left') {
            $this.prepend('&#160;').prepend(self.cancel);
          } else {
            $this.append('&#160;').append(self.cancel);
          }

          width += (self.opt.size + space);
        }

        if (self.opt.readOnly) {
          methods.fixHint.call(self);

          if (self.cancel) {
            self.cancel.hide();
          }
        } else {
          $this.css('cursor', 'pointer');

          methods.bindAction.call(self);
        }

        if (self.opt.width !== false) {
          $this.css('width', width);
        }
      });
    }, _adjustPrecision: function() {
      this.opt.targetType = 'score';
      this.opt.half       = true;
    }, _createScore: function() {
      return $('<input />', { type: 'hidden', name: this.opt.scoreName }).appendTo(this);
    }, _createStars: function() {
      var that = $(this);

      for (var i = 1; i <= this.opt.number; i++) {
        var title = methods._getHint.call(this, i),
            icon  = (this.opt.score && this.opt.score >= i) ? 'starOn' : 'starOff';

        icon = methods._getPath.call(this, icon);

        $('<img />', { src : icon, alt: i, title: title }).appendTo(this);

        if (this.opt.space) {
          that.append((i < this.opt.number) ? '&#160;' : '');
        }
      }

      return that.children('img');
    }, _getHint: function(score) {
      var hint = this.opt.hints[score - 1];
      return (hint === '') ? '' : (hint || score);
    }, _getPath: function(icon) {
      return (this.opt.path || '') + this.opt[icon];
    }, _callback: function(options) {
      for (i in options) {
        if (typeof this.opt[options[i]] === 'function') {
          this.opt[options[i]] = this.opt[options[i]].call(this);
        }
      }
    }, _initialize: function(score) {
      if (score && score > 0) {
        score = methods.between(score, 0, this.opt.number);
        this.score.val(score);
      }

      methods.fill.call(this, score);

      if (score) {
        methods._roundStars.call(this, score);
      }
    }, _roundStars: function(score) {
      var rest = (score - Math.floor(score)).toFixed(2);

      if (rest > this.opt.round.down) {
        var icon = 'starOn';                                 // Up:   [x.76 .. x.99]

        if (this.opt.halfShow && rest < this.opt.round.up) { // Half: [x.26 .. x.75]
          icon = 'starHalf';
        } else if (rest < this.opt.round.full) {             // Down: [x.00 .. x.5]
          icon = 'starOff';
        }

        this.stars.eq(Math.ceil(score) - 1).attr('src', methods._getPath.call(this, icon));
      }                              // Full down: [x.00 .. x.25]
    }, between: function(value, min, max) {
      return Math.min(Math.max(parseFloat(value), min), max);
    }, bindAction: function() {
      var self  = this,
        $this  = $(self);

      $this.mouseleave(function(evt) {
        var score = parseFloat(self.score.val()) || undefined;

        methods._initialize.call(self, score);
        methods._setTarget.call(self, score, evt);

        if (self.opt.mouseout) {
          self.opt.mouseout.call(self, score, evt);
        }
      });

      var action = self.opt.half ? 'mousemove' : 'mouseover';

      if (self.opt.cancel) {
        self.cancel.mouseenter(function(evt) {
          $(this).attr('src', methods._getPath.call(self, 'cancelOn'));

          self.stars.attr('src', methods._getPath.call(self, 'starOff'));

          methods._setTarget.call(self, null, evt);

          if (self.opt.mouseover) {
            self.opt.mouseover.call(self, null);
          }
        }).mouseleave(function(evt) {
          $(this).attr('src', methods._getPath.call(self, 'cancelOff'));

          if (self.opt.mouseout) {
            self.opt.mouseout.call(self, self.score.val() || null, evt);
          }
        }).click(function(evt) {
          self.score.removeAttr('value');

          if (self.opt.click) {
            self.opt.click.call(self, null, evt);
          }
        });
      }

      self.stars.bind(action, function(evt) {
        var value = parseInt(this.alt, 10);

        if (self.opt.half) {
          var position  = parseFloat((evt.pageX - $(this).offset().left) / self.opt.size),
            diff    = (position > .5) ? 1 : .5;

          value = parseFloat(this.alt) - 1 + diff;

          methods.fill.call(self, value);

          if (self.opt.precision) {
            value = value - diff + position;
          }

          methods.showHalf.call(self, value);
        } else {
          methods.fill.call(self, value);
        }

        $this.data('score', value);

        methods._setTarget.call(self, value, evt);

        if (self.opt.mouseover) {
          self.opt.mouseover.call(self, value, evt);
        }
      }).click(function(evt) {
        self.score.val((self.opt.half || self.opt.precision) ? $this.data('score') : this.alt);

        if (self.opt.click) {
          self.opt.click.call(self, parseFloat(self.score.val()), evt);
        }
      });
    }, cancel: function(isClick) {
      return $(this).each(function() {
        var self  = this,
          $this  = $(self);

        if ($this.data('readonly') === true) {
          return this;
        }

        if (isClick) {
          methods.click.call(self, null);
        } else {
          methods.score.call(self, null);
        }

        self.score.removeAttr('value');
      });
    }, click: function(score) {
      return $(this).each(function() {
        if ($(this).data('readonly') === true) {
          return this;
        }

        methods._initialize.call(this, score);

        var evt = { type: 'click' };

        if (this.opt.click) {
          this.opt.click.call(this, score, evt);
        } else {
          methods.error.call(this, 'You must add the "click: function(score, evt) { }" callback.');
        }

        methods._setTarget.call(this, score, evt);
      });
    }, error: function(message) {
      $(this).html(message);

      $.error(message);
    }, fill: function(score) {
      var self  = this,
        number  = self.stars.length,
        count  = 0,
        $star  ,
        star  ,
        icon  ;

      for (var i = 1; i <= number; i++) {
        $star = self.stars.eq(i - 1);

        if (self.opt.iconRange && self.opt.iconRange.length > count) {
          star = self.opt.iconRange[count];

          if (self.opt.single) {
            icon = (i == score) ? (star.on || self.opt.starOn) : (star.off || self.opt.starOff);
          } else {
            icon = (i <= score) ? (star.on || self.opt.starOn) : (star.off || self.opt.starOff);
          }

          if (i <= star.range) {
            $star.attr('src', (self.opt.path || '') + icon);
          }

          if (i == star.range) {
            count++;
          }
        } else {
          if (self.opt.single) {
            icon = (i == score) ? 'starOn' : 'starOff';
          } else {
            icon = (i <= score) ? 'starOn' : 'starOff';
          }

          $star.attr('src', methods._getPath.call(this, icon));
        }
      }
    }, fixHint: function() {
      var $this  = $(this),
        score  = parseInt(this.score.val(), 10),
        hint  = this.opt.noRatedMsg;

      if (!isNaN(score) && score > 0) {
        hint = methods._getHint.call(this, score);
      }

      $this.data('readonly', true).css('cursor', 'default').attr('title', hint);

      this.score.attr('readonly', 'readonly');
      this.stars.attr('title', hint);
    }, getScore: function() {
      var score  = [],
        value  ;

      $(this).each(function() {
        value = this.score.val();

        score.push(value ? parseFloat(value) : undefined);
      });

      return (score.length > 1) ? score : score[0];
    }, readOnly: function(isReadOnly) {
      return this.each(function() {
        var $this = $(this);

        if ($this.data('readonly') === isReadOnly) {
          return this;
        }

        if (this.cancel) {
          if (isReadOnly) {
            this.cancel.hide();
          } else {
            this.cancel.css('display', '');
          }
        }

        if (isReadOnly) {
          $this.unbind();

          $this.children('img').unbind();

          methods.fixHint.call(this);
        } else {
          methods.bindAction.call(this);
          methods._unfixHint.call(this);
        }

        $this.data('readonly', isReadOnly);
      });
    }, reload: function() {
      return methods.set.call(this, {});
    }, score: function() {
      return arguments.length ? methods.setScore.apply(this, arguments) : methods.getScore.call(this);
    }, set: function(settings) {
      this.each(function() {
        var $this  = $(this),
          actual  = $this.data('settings'),
          clone  = $this.clone().removeAttr('style').insertBefore($this);

        $this.remove();

        clone.raty($.extend(actual, settings));
      });

      return $(this.selector);
    }, setScore: function(score) {
      return $(this).each(function() {
        if ($(this).data('readonly') === true) {
          return this;
        }

        methods._initialize.call(this, score);
        methods._setTarget.call(this, score);
      });
    }, _setTarget: function(score, evt) {
      if (this.opt.target) {
        var target = $(this.opt.target);

        if (target.length === 0) {
          methods.error.call(this, 'Target selector invalid or missing!');
        }

        if (this.opt.targetFormat.indexOf('{score}') < 0) {
          methods.error.call(this, 'Template "{score}" missing!');
        }

        if (score === undefined) {
          score = this.opt.targetText;
        } else {
          if (score === null) {
            score = this.opt.cancelHint;
          } else if (this.opt.targetType == 'hint') {
            score = methods._getHint.call(this, Math.ceil(score));
          } else if (this.opt.precision) {
            score = parseFloat(score).toFixed(1);
          }
        }

        if (!this.opt.targetKeep) {
          if (!evt || (!this.opt.targetKeep && (evt.type == 'mouseout' || evt.type == 'mouseleave'))) {
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
    }, showHalf: function(score) {
      var diff = (score - Math.floor(score)).toFixed(1);

      if (diff > 0 && diff < .6) {
        this.stars.eq(Math.ceil(score) - 1).attr('src', methods._getPath.call(this, 'starHalf'));
      }
    }, _unfixHint: function() {
      for (var i = 0; i < this.opt.number; i++) {
        this.stars.eq(i).attr('title', methods._getHint.call(this, i + 1));
      }

      $(this).css('cursor', 'pointer').removeAttr('title');

      this.score.removeAttr('readonly', 'readonly');
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
    cancel        : false,
    cancelHint    : 'Cancel this rating!',
    cancelOff     : 'cancel-off.png',
    cancelOn      : 'cancel-on.png',
    cancelPlace   : 'left',
    click         : undefined,
    half          : false,
    halfShow      : true,
    hints         : ['bad', 'poor', 'regular', 'good', 'gorgeous'],
    iconRange     : undefined,
    mouseout      : undefined,
    mouseover     : undefined,
    noRatedMsg    : 'Not rated yet!',
    number        : 5,
    numberMax     : 20,
    path          : undefined,
    precision     : false,
    readOnly      : false,
    round         : { down: .25, full: .6, up: .76 },
    score         : undefined,
    scoreName     : 'score',
    single        : false,
    size          : 16,
    space         : true,
    starHalf      : 'star-half.png',
    starOff       : 'star-off.png',
    starOn        : 'star-on.png',
    target        : undefined,
    targetFormat  : '{score}',
    targetKeep    : false,
    targetText    : '',
    targetType    : 'hint',
    width         : undefined
  };

})(jQuery);
