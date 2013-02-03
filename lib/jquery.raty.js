/*!
 * jQuery Raty - A Star Rating Plugin
 * ------------------------------------------------------------------
 *
 * jQuery Raty is a plugin that generates a customizable star rating.
 *
 * Licensed under The MIT License
 *
 * @version        2.4.5
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
            $this  = $(self).empty();

        $this.data('settings', self.opt);

        if (typeof self.opt.number == 'function') {
          self.opt.number = self.opt.number.call(self);
        } else {
          self.opt.number = methods.between(self.opt.number, 0, self.opt.numberMax)
        }

        if (self.opt.path && !self.opt.path.endsWith('/')) {
          self.opt.path += '/';
        }

        if (typeof self.opt.score == 'function') {
          self.opt.score = self.opt.score.call(self);
        }

        if (self.opt.score) {
          self.opt.score = methods.between(self.opt.score, 0, self.opt.number);
        }

        for (var i = 1; i <= self.opt.number; i++) {
          var title = methods._getHint.call(this, i),
              icon  = (self.opt.score && self.opt.score >= i) ? 'starOn' : 'starOff';

          icon = methods._getPath.call(this, icon);

          $('<img />', { src : icon, alt: i, title: title }).appendTo(self);

          if (self.opt.space) {
            $this.append((i < self.opt.number) ? '&#160;' : '');
          }
        }

        if (typeof self.opt.scoreName == 'function') {
          self.opt.scoreName = self.opt.scoreName.call(self);
        }

        self.stars = $this.children('img:not(".raty-cancel")');
        self.score = $('<input />', { type: 'hidden', name: self.opt.scoreName }).appendTo(self);

        if (self.opt.score && self.opt.score > 0) {
          self.score.val(self.opt.score);
          methods.roundStar.call(self, self.opt.score);
        }

        if (self.opt.iconRange) {
          methods.fill.call(self, self.opt.score);
        }

        methods.setTarget.call(self, self.opt.score, self.opt.targetKeep);

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

        if (typeof self.opt.readOnly == 'function') {
          self.opt.readOnly = self.opt.readOnly.call(self);
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

        $this.css('width', width);
      });
    }, between: function(value, min, max) {
      return Math.min(Math.max(parseFloat(value), min), max);
    }, _getPath: function(icon) {
      return (this.opt.path || '') + this.opt[icon];
    }, bindAction: function() {
      var self  = this,
        $this  = $(self);

      $this.mouseleave(function(evt) {
        var score = parseFloat(self.score.val()) || undefined;

        methods.initialize.call(self, score);
        methods.setTarget.call(self, score, self.opt.targetKeep);

        if (self.opt.mouseout) {
          self.opt.mouseout.call(self, score, evt);
        }
      });

      var action = self.opt.half ? 'mousemove' : 'mouseover';

      if (self.opt.cancel) {
        self.cancel.mouseenter(function() {
          $(this).attr('src', methods._getPath.call(self, 'cancelOn'));

          self.stars.attr('src', methods._getPath.call(self, 'starOff'));

          methods.setTarget.call(self, null, true);

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

        methods.setTarget.call(self, value, true);

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

        methods.initialize.call(this, score);

        if (this.opt.click) {
          this.opt.click.call(this, score);
        } else {
          methods.error.call(this, 'you must add the "click: function(score, evt) { }" callback.');
        }

        methods.setTarget.call(this, score, true);
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
    }, _getHint: function(score) {
      return (score === null) ? (score) : (this.opt.hints[score - 1] || score);
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
    }, roundStar: function(score) {
      var diff = (score - Math.floor(score)).toFixed(2);

      if (diff > this.opt.round.down) {
        var icon = 'starOn';                // Full up: [x.76 .. x.99]

        if (diff < this.opt.round.up && this.opt.halfShow) {  // Half: [x.26 .. x.75]
          icon = 'starHalf';
        } else if (diff < this.opt.round.full) {        // Full down: [x.00 .. x.5]
          icon = 'starOff';
        }

        this.stars.eq(Math.ceil(score) - 1).attr('src', methods._getPath.call(this, icon));
      }                              // Full down: [x.00 .. x.25]
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

        methods.initialize.call(this, score);
        methods.setTarget.call(this, score, true);
      });
    }, setTarget: function(value, isKeep) {
      if (this.opt.target) {
        var $target = $(this.opt.target);

        if ($target.length == 0) {
          methods.error.call(this, 'target selector invalid or missing!');
        }

        var score = value;

        if (!isKeep || score === undefined) {
          score = this.opt.targetText;
        } else {
          if (this.opt.targetType == 'hint') {
            score = (score === null && this.opt.cancel)
                ? this.opt.cancelHint
                : methods._getHint.call(this, Math.ceil(score));
          } else {
            score = this.opt.precision
                ? parseFloat(score).toFixed(1)
                : score;
          }
        }

        if (this.opt.targetFormat.indexOf('{score}') < 0) {
          methods.error.call(this, 'template "{score}" missing!');
        }

        if (value !== null) {
          score = this.opt.targetFormat.toString().replace('{score}', score);
        }

        if ($target.is(':input')) {
          $target.val(score);
        } else {
          $target.html(score);
        }
      }
    }, showHalf: function(score) {
      var diff = (score - Math.floor(score)).toFixed(1);

      if (diff > 0 && diff < .6) {
        this.stars.eq(Math.ceil(score) - 1).attr('src', methods._getPath.call(this, 'starHalf'));
      }
    }, initialize: function(score) {
      score = !score ? 0 : methods.between(score, 0, this.opt.number);

      methods.fill.call(this, score);

      if (score > 0) {
        if (this.opt.halfShow) {
          methods.roundStar.call(this, score);
        }

        this.score.val(score);
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
    cancelHint    : 'cancel this rating!',
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
