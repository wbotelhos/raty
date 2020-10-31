/*!
 * jQuery Taby - A Textarea Tabulator
 * ----------------------------------------------------------------
 *
 * jQuery Taby is a plugin to enable tabulation in textarea fields.
 *
 * Licensed under The MIT License
 *
 * @version        1.0.0
 * @since          2012.01.10
 * @author         Washington Botelho
 * @documentation  wbotelhos.com/taby
 *
 * ----------------------------------------------------------------
 *
 *  $('textarea').taby();
 *
 *  <textarea></textarea>
 *
 */

;(function($) {

  var methods = {
    init: function(settings) {
      return this.each(function() {
        this.opt = $.extend({}, $.fn.taby.defaults, settings);

        var $this = $(this).off('.taby');

        methods._adjustTab.call(this);
        methods._bind.call(this);

        $this.data({ 'settings': this.opt, 'taby': true });
      });
    }, _adjustTab: function() {
      this.opt['tab'] = '';

      for (var i = 0; i < this.opt.space; i++) {
        this.opt.tab += ' ';
      }
    }, _backspace: function() {
      var opt   = $(this).data('settings'),
          start = this.selectionStart;

      if (opt.backspace && this.value.slice(start - opt.tab.length, start) == opt.tab) {
        this.evt.preventDefault();

        this.value = this.value.slice(0, start - opt.tab.length) + this.value.slice(start);

        this.selectionStart = start - opt.tab.length;
        this.selectionEnd   = start - opt.tab.length;
      }
    }, _bind: function() {
      $(this).on(methods._eventName(), function(evt) {
        var key = evt.keyCode || evt.which;

        if (evt.metaKey) {
          return;
        }

        this.evt = evt;

        if (key == 9) {
          if (evt.shiftKey) {
            methods._shiftTab.call(this);
          } else {
            methods._tab.call(this);
          }
        } else if (key == 8) {
          methods._backspace.call(this);
        } else if (key == 46) {
          methods._del.call(this);
        } else if (key == 37) {
          methods._left.call(this);
        } else if (key == 39) {
          methods._right.call(this);
        }
      });
    }, _del: function() {
      var opt   = $(this).data('settings'),
          start = this.selectionStart,
          end   = this.selectionEnd;

      if (opt.del && this.value.slice(start, start + opt.tab.length) == opt.tab) {
        this.evt.preventDefault();

        this.value = this.value.slice(0, start) + this.value.slice(start + opt.tab.length);

        this.selectionStart = start;
        this.selectionEnd   = end;
      }
    }, _eventName: function() {
      return methods._isFirefox() ? 'keypress.taby' : 'keydown.taby'
    }, _isFirefox: function() {
      return /firefox/.test(navigator.userAgent.toLowerCase());
    }, _left: function() {
      var opt   = $(this).data('settings'),
          start = this.selectionStart,
          end   = this.selectionEnd;

      if (!this.evt.shiftKey) {
        start = end;
      }

      if (opt.left === true && this.value.slice(start - opt.tab.length, start) == opt.tab) {
        this.evt.preventDefault();

        var toStartTake = opt.tab.length,
            toEndTake   = opt.tab.length;

        if (this.evt.shiftKey) {
          toEndTake = 0;
        }

        this.selectionStart = start - toStartTake;
        this.selectionEnd   = end - toEndTake;
      }
    }, _right: function() {
      var opt    = $(this).data('settings'),
          start  = this.selectionStart,
          end    = this.selectionEnd;

      if (!this.evt.shiftKey) {
        end = start;
      }

      if (opt.right === true && this.value.slice(end, end + opt.tab.length) == opt.tab) {
        this.evt.preventDefault();

        this.selectionStart = start + (this.evt.shiftKey ? 0 : opt.tab.length);
        this.selectionEnd   = end + opt.tab.length;
      }
    }, _shiftTab: function() {
      this.evt.preventDefault();

      var opt               = $(this).data('settings'),
          start             = this.selectionStart,
          end               = this.selectionEnd;
          preselection      = this.value.slice(0, start),
          selection         = this.value.slice(start, end),
          postselection     = this.value.slice(end),
          isMultipleLine    = selection.indexOf("\n") >= 0,
          lineStart         = preselection.lastIndexOf("\n"),
          lineEnd           = end + postselection.indexOf("\n"),
          isFirst           = start == 0,
          previousCharacter = (isFirst) ? '' : this.value.slice(start - 1, start);

      if (lineStart < 0) {
        lineStart = 0;
      } else {
        lineStart++;
      }

      if (lineEnd < 0) {
        lineEnd = this.value.length;
      }

      if (isMultipleLine) {
        if (selection.lastIndexOf("\n") == selection.length - 1) {
          lineEnd       = end - 1;
          postselection = "\n" + postselection;
        }

        var line    = this.value.slice(lineStart, lineEnd),
            result  = line;

        result = result.replace(new RegExp('^' + opt.tab), '').replace(new RegExp("\n" + opt.tab, 'g'), "\n");

        if (line == result) {
          return;
        }

        this.value = this.value.slice(0, lineStart) + result + this.value.slice(lineEnd);

        var blankRemoved  = line.length - result.length,
            startTaked    = start,
            endTaked      = end - blankRemoved;

        if (!isFirst && previousCharacter != "\n") {
          startTaked -= opt.tab.length;
        }

        if (startTaked < lineStart) {
          startTaked = lineStart;
        }

        var toStartTake = (startTaked < 0) ? 0 : startTaked,
            toEndTake   = (endTaked < 0) ? 0 : endTaked;

        this.selectionStart = toStartTake;
        this.selectionEnd   = toEndTake;
      } else {
        var line    = this.value.slice(lineStart, lineEnd),
            result  = line;

        if (line.indexOf(opt.tab) == 0) {
          result = line.slice(opt.tab.length);
        }

        if (line == result) {
          return;
        }

        this.value = this.value.slice(0, lineStart) + result + this.value.slice(lineEnd);

        var takedStart = takedEnd = opt.tab.length;

        if (start - lineStart < opt.tab.length) {
          takedStart = start - lineStart;

          if (start == end) {
            takedEnd = takedStart;
          }
        }

        this.selectionStart = start - takedStart;
        this.selectionEnd   = end - takedEnd;
      }
    }, _tab: function() {
      this.evt.preventDefault();

      var opt               = $(this).data('settings'),
          start             = this.selectionStart,
          end               = this.selectionEnd,
          preselection      = this.value.slice(0, start),
          selection         = this.value.slice(start, end),
          postselection     = this.value.slice(end),
          lineStart         = preselection.lastIndexOf("\n"),
          lineEnd           = end + postselection.indexOf("\n"),
          isFirst           = start == 0,
          isLast            = end == this.value.length,
          previousCharacter = (isFirst) ? '' : this.value.slice(start - 1, start),
          nextCharacter     = (isLast) ? '' : this.value.slice(end, end + 1);

      if (lineStart < 0) {
        lineStart = 0;
      } else {
        lineStart++;
      }

      if (lineEnd < 0) {
        lineEnd = this.value.length;
      }

      if (selection.indexOf("\n") >= 0) {
          if (selection.lastIndexOf("\n") == selection.length - 1) {
            lineEnd       = end - 1;
            postselection = "\n" + postselection;
          }

          var line    = this.value.slice(lineStart, lineEnd),
              result  = line;

          result = opt.tab + result.replace(new RegExp("\n", 'g'), "\n" + opt.tab);

          if (line == result) {
            return;
          }

          this.value = this.value.slice(0, lineStart) + result + this.value.slice(lineEnd);

        var blankAdded  = result.length - line.length,
            startAdded  = start,
            endAdded    = end + blankAdded;

        if (!isFirst && previousCharacter != "\n") {
          startAdded += opt.tab.length;
        }

        this.selectionStart = startAdded;
        this.selectionEnd   = endAdded;
      } else if ((isFirst || previousCharacter == "\n") && (isLast || nextCharacter == "\n") && selection != '') {
        var line = this.value.slice(lineStart, lineEnd);

        this.value          = preselection + opt.tab + line + postselection;
        this.selectionStart = start;
        this.selectionEnd   = end + opt.tab.length;
      } else {
        this.value          = preselection + opt.tab + postselection;
        this.selectionStart = start + opt.tab.length;
        this.selectionEnd   = start + opt.tab.length;
      }
    }, goTo: function(position) {
      return this.each(function() {
        this.focus();
        this.selectionStart = position;
        this.selectionEnd   = position;
      });
    }, select: function(start, end) {
      return this.each(function() {
        this.focus();
        this.selectionStart = start;
        this.selectionEnd   = (end === undefined) ? this.value.length : end;
      });
    }, set: function(settings) {
      return this.each(function() {
        var $this   = $(this),
            actual  = $this.data('settings'),
            news    = $.extend({}, actual, settings);

        $this.taby(news);
      });
    }
  };

  $.fn.taby = function(method) {
    if (methods[method]) {
      return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error('Method ' + method + ' does not exist!');
    }
  };

  $.fn.taby.defaults = {
    backspace : true,
    del       : true,
    left      : true,
    right     : true,
    space     : 2
  };

})(jQuery);
var AntiBOT = { // eslint-disable-line no-unused-vars
  init: function(form) {
    this.form   = $(form);
    this.field  = this.form.find('.not-human input');
    this.bot    = $('#bot');
    this.label  = this.form.find('.not-human label');
    this.submit = this.form.find(':submit');

    this.binds();
    this.lock();
  },

  binds: function() {
    var that = this;

    that.field.on('change', function() {
      if (that.field.is(':checked')) {
        that.label.text('Sério?');
        that.lock();
      } else {
        that.unlock();
      }
    });
  },

  lock: function() {
    var that = this;

    that.bot.val(true);

    that.submit.on('click', function(evt) {
      evt.preventDefault();
      that.label.text('Hey! Me desmarque.');
      that.field.focus();
    });
  },

  unlock: function() {
    var that = this;

    that.submit.off('click');
    that.bot.removeAttr('value');
    that.label.text('Humanos! <3');
  }
};
var CommentResponder = { // eslint-disable-line no-unused-vars
  init: function() {
    this.body     = $('#comment_body');
    this.comments = $('.comments');
    this.parent   = $('#comment_parent_id');
    this.cancel   = $('.commenter__cancel');
    this.replying = $('.commenter__replying');

    this.binds();
  },

  binds: function() {
    var that = this;

    that.comments.on('click', '.comments__reply', function() {
      var self = $(this);
      var id   = self.data('id');
      var name = self.data('name');

      that.setParent(id);
      that.write(name + ',\n\n');
      that.showReplying(id, name);
      that.showCancel();
      that.focuz();
    });

    that.cancel.on('click', function() {
      that.replying.css('visibility', 'hidden');
      that.body.val('');
      that.cancel.css('visibility', 'hidden');
      that.parent.removeAttr('value');

      that.focuz();
    });
  },

  focuz: function() {
    this.body.trigger('blur').trigger('focus');
  },

  setParent: function(id) {
    this.parent.val(id);
  },

  showCancel: function() {
    this.cancel.css('visibility', 'visible');
  },

  showReplying: function(id, name) {
    var anchor = '#comment-' + id;
    var text   = '#' + id;

    this
      .replying
      .css('visibility', 'visible')
      .children('strong')
      .html('<a href="' + anchor + '">' + text + '</a> ' + name);
  },

  write: function(text) {
    this.body.val(text);
  }
};
$(function() {
  var donations = $('.donations');

  $('.i-heart').on('click', function() {
    donations.slideToggle('fast');
  });
});
var Expandy = { // eslint-disable-line no-unused-vars
  init: function(selector) {
    this.selector = selector;

    this.binds();
  },

  binds: function() {
    $(document)
      .one('focus.expandy', this.selector, function(){
        var savedValue = this.value;

        this.baseScrollHeight = this.scrollHeight;
        this.value            = '';
        this.value            = savedValue;
      })
      .on('input.expandy', this.selector, function() {
        var minRows = parseInt(this.getAttribute('data-spandy-rows'), 10) || 0; var rows;

        this.rows = minRows;
        rows      = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 17);
        this.rows = minRows + rows;
      });
  }
};






