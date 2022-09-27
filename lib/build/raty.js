function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

var Raty = function () {
  function Raty(element) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Raty);

    this.element = element;
    this.opt = _objectSpread(_objectSpread({}, this.defaultOptions()), options);
    this.self = document.querySelector(element);
  }

  _createClass(Raty, [{
    key: "defaultOptions",
    value: function defaultOptions() {
      return {
        cancelButton: false,
        cancelClass: 'raty-cancel',
        cancelHint: 'Cancel this rating!',
        cancelOff: 'cancel-off.png',
        cancelOn: 'cancel-on.png',
        cancelPlace: 'left',
        click: undefined,
        half: false,
        halfShow: true,
        hints: ['bad', 'poor', 'regular', 'good', 'gorgeous'],
        iconRange: undefined,
        iconRangeSame: false,
        mouseout: undefined,
        mouseover: undefined,
        noRatedMsg: 'Not rated yet!',
        number: 5,
        numberMax: 20,
        path: undefined,
        precision: false,
        readOnly: false,
        round: {
          down: 0.25,
          full: 0.6,
          up: 0.76
        },
        score: undefined,
        scoreName: 'score',
        single: false,
        space: true,
        starHalf: 'star-half.png',
        starOff: 'star-off.png',
        starOn: 'star-on.png',
        starType: 'img',
        target: undefined,
        targetFormat: '{score}',
        targetKeep: false,
        targetScore: undefined,
        targetText: '',
        targetType: 'hint'
      };
    }
  }, {
    key: "cancel",
    value: function cancel(click) {
      if (!this._parseBoolean(this.self.dataset.readOnly)) {
        this[click ? 'click' : 'score'].call(this, null);
        this.scoreField.removeAttribute('value');
      }
    }
  }, {
    key: "click",
    value: function click(score) {
      if (!this._parseBoolean(this.self.dataset.readOnly)) {
        score = this._adjustedScore(score);

        this._apply(score);

        if (this.opt.click) {
          this.opt.click.call(this.self, score, new Event('click'));
        }

        this._target(score);
      }
    }
  }, {
    key: "move",
    value: function move(score) {
      var integer = parseInt(score, 10);

      var decimal = this._getDecimal(score, 1);

      if (integer >= this.opt.number) {
        integer = this.opt.number - 1;
        decimal = 10;
      }

      var width = this._getWidth();

      var steps = width / 10;
      var star = this.stars[integer];
      var percent = star.offsetLeft + steps * decimal;
      var evt = new Event('mousemove');
      evt.pageX = percent;
      this.isMove = true;
      star.dispatchEvent(evt);
      this.isMove = false;
    }
  }, {
    key: "readOnly",
    value: function readOnly(readonly) {
      if (this._parseBoolean(this.self.dataset.readOnly) !== readonly) {
        if (readonly) {
          this._lock();
        } else {
          this._binds();

          this._unlock();
        }

        this.self.dataset.readOnly = readonly;
      }
    }
  }, {
    key: "score",
    value: function score() {
      return arguments.length ? this.setScore.apply(this, arguments) : this.getScore();
    }
  }, {
    key: "setScore",
    value: function setScore(score) {
      if (!this._parseBoolean(this.self.dataset.readOnly)) {
        score = this._adjustedScore(score);

        this._apply(score);

        this._target(score);
      }
    }
  }, {
    key: "getScore",
    value: function getScore() {
      var score = [];
      var value;
      value = this.scoreField.value;
      score.push(value ? +value : undefined);
      return score.length > 1 ? score : score[0];
    }
  }, {
    key: "init",
    value: function init() {
      this._executeCallbacks();

      this._adjustNumber();

      this._adjustHints();

      this.opt.score = this._adjustedScore(this.opt.score);

      if (this.opt.starType !== 'img') {
        this._adjustStarName();
      }

      this._setPath();

      this._createStars();

      if (this.opt.cancelButton) {
        this._createCancel();
      }

      if (this.opt.precision) {
        this._adjustPrecision();
      }

      this._createScore();

      this._apply(this.opt.score);

      this._setTitle(this.opt.score);

      this._target(this.opt.score);

      if (this.opt.readOnly) {
        this._lock();
      } else {
        this.self.style.cursor = 'pointer';

        this._binds();
      }

      return this;
    }
  }, {
    key: "_parseBoolean",
    value: function _parseBoolean(str) {
      if (typeof str === "string") {
        str = str.toLowerCase().trim();

        try {
          return JSON.parse(str);
        } catch (err) {
          return;
        }
      } else {
        return;
      }
    }
  }, {
    key: "_adjustedScore",
    value: function _adjustedScore(score) {
      if (score || score === 0) {
        return this._between(score, 0, this.opt.number);
      }
    }
  }, {
    key: "_adjustHints",
    value: function _adjustHints() {
      if (!this.opt.hints) {
        this.opt.hints = [];
      }

      if (!this.opt.halfShow && !this.opt.half) {
        return;
      }

      var steps = this.opt.precision ? 10 : 2;

      for (var i = 0; i < this.opt.number; i++) {
        var group = this.opt.hints[i];

        if (Object.prototype.toString.call(group) !== '[object Array]') {
          group = [group];
        }

        this.opt.hints[i] = [];

        for (var j = 0; j < steps; j++) {
          var hint = group[j];
          var last = group[group.length - 1];

          if (last === undefined) {
            last = null;
          }

          this.opt.hints[i][j] = hint === undefined ? last : hint;
        }
      }
    }
  }, {
    key: "_adjustNumber",
    value: function _adjustNumber() {
      this.opt.number = this._between(this.opt.number, 1, this.opt.numberMax);
    }
  }, {
    key: "_adjustPrecision",
    value: function _adjustPrecision() {
      this.opt.half = true;
    }
  }, {
    key: "_adjustStarName",
    value: function _adjustStarName() {
      var replaces = ['cancelOff', 'cancelOn', 'starHalf', 'starOff', 'starOn'];
      this.opt.path = '';

      for (var i = 0; i < replaces.length; i++) {
        this.opt[replaces[i]] = this.opt[replaces[i]].replace('.', '-');
      }
    }
  }, {
    key: "_apply",
    value: function _apply(score) {
      this._fill(score);

      if (score) {
        if (score > 0) {
          this.scoreField.value = score;
        }

        this._roundStars(score);
      }
    }
  }, {
    key: "_attributesForIndex",
    value: function _attributesForIndex(i) {
      var name = this._nameForIndex(i);

      var attributes = {
        alt: i,
        src: this.opt.path + this.opt[name]
      };

      if (this.opt.starType !== 'img') {
        attributes = {
          'data-alt': i,
          'class': this.opt[name]
        };
      }

      attributes.title = this._getHint(i);
      return attributes;
    }
  }, {
    key: "_between",
    value: function _between(value, min, max) {
      return Math.min(Math.max(parseFloat(value), min), max);
    }
  }, {
    key: "_binds",
    value: function _binds() {
      if (this.cancelButton) {
        this._bindOverCancel();

        this._bindClickCancel();

        this._bindOutCancel();
      }

      this._bindOver();

      this._bindClick();

      this._bindOut();
    }
  }, {
    key: "_bindClick",
    value: function _bindClick() {
      var that = this;
      this.stars.forEach(function (value) {
        value.addEventListener('click', function (evt) {
          if (that._parseBoolean(that.self.dataset.readOnly)) {
            return;
          }

          var execute = true;
          var score = that.opt.half || that.opt.precision ? that.self.dataset.score : value.alt || value.dataset.alt;

          if (that.opt.half && !that.opt.precision) {
            score = that._roundHalfScore(score);
          }

          if (that.opt.click) {
            execute = that.opt.click.call(that.self, +score, evt);
          }

          if (execute || execute === undefined) {
            that._apply(+score);
          }
        });
      });
    }
  }, {
    key: "_bindClickCancel",
    value: function _bindClickCancel() {
      this.cancelButton.addEventListener('click', function (evt) {
        this.scoreField.removeAttribute('value');

        if (this.opt.click) {
          this.opt.click.call(this.self, null, evt);
        }
      }.bind(this));
    }
  }, {
    key: "_bindOut",
    value: function _bindOut() {
      this.self.addEventListener('mouseleave', function (evt) {
        var score = +this.scoreField.value || undefined;

        this._apply(score);

        this._target(score, evt);

        this._resetTitle();

        if (this.opt.mouseout) {
          this.opt.mouseout.call(this.self, score, evt);
        }
      }.bind(this));
    }
  }, {
    key: "_bindOutCancel",
    value: function _bindOutCancel() {
      var that = this;
      this.cancelButton.addEventListener('mouseleave', function (evt) {
        var icon = that.opt.cancelOff;

        if (that.opt.starType !== 'img') {
          icon = that.opt.cancelClass + ' ' + icon;
        }

        that._setIcon(that.cancelButton, icon);

        if (that.opt.mouseout) {
          var score = +that.scoreField.value || undefined;
          that.opt.mouseout.call(that.self, score, evt);
        }
      });
    }
  }, {
    key: "_bindOver",
    value: function _bindOver() {
      var that = this;
      var action = that.opt.half ? 'mousemove' : 'mouseover';
      this.stars.forEach(function (value) {
        value.addEventListener(action, function (evt) {
          var score = that._getScoreByPosition(evt, value);

          that._fill(score);

          if (that.opt.half) {
            that._roundStars(score, evt);

            that._setTitle(score, evt);

            that.self.dataset.score = score;
          }

          that._target(score, evt);

          if (that.opt.mouseover) {
            that.opt.mouseover.call(that.self, score, evt);
          }
        });
      });
    }
  }, {
    key: "_bindOverCancel",
    value: function _bindOverCancel() {
      var that = this;
      this.cancelButton.addEventListener('mouseover', function (evt) {
        if (that._parseBoolean(that.self.dataset.readOnly)) {
          return;
        }

        var starOff = that.opt.path + that.opt.starOff;
        var icon = that.opt.cancelOn;

        if (that.opt.starType === 'img') {
          that.stars.forEach(function (value) {
            value.src = starOff;
          });
        } else {
          icon = that.opt.cancelClass + ' ' + icon;
          that.stars.forEach(function (value) {
            value.className = starOff;
          });
        }

        that._setIcon(that.cancelButton, icon);

        that._target(null, evt);

        if (that.opt.mouseover) {
          that.opt.mouseover.call(that.self, null);
        }
      });
    }
  }, {
    key: "_buildScoreField",
    value: function _buildScoreField() {
      var input = document.createElement('input');
      input.name = this.opt.scoreName;
      input.type = 'hidden';
      this.self.appendChild(input);
      return input;
    }
  }, {
    key: "_createCancel",
    value: function _createCancel() {
      var icon = this.opt.path + this.opt.cancelOff;
      var button = document.createElement(this.opt.starType);
      var attributes = {
        title: this.opt.cancelHint,
        "class": this.opt.cancelClass
      };

      if (this.opt.starType === 'img') {
        attributes.src = icon;
        attributes.alt = 'x';
      } else {
        attributes['data-alt'] = 'x';
        attributes["class"] = icon;
      }

      for (var key in attributes) {
        button.setAttribute(key, attributes[key]);
      }

      if (this.opt.cancelPlace === 'left') {
        this.self.prepend("\xA0");
        this.self.prepend(button);
      } else {
        this.self.append("\xA0");
        this.self.appendChild(button);
      }

      this.cancelButton = button;
    }
  }, {
    key: "_createScore",
    value: function _createScore() {
      var score = document.querySelector(this.opt.targetScore);
      this.scoreField = score || this._buildScoreField();
    }
  }, {
    key: "_createStars",
    value: function _createStars() {
      for (var i = 1; i <= this.opt.number; i++) {
        var attributes = this._attributesForIndex(i);

        var el = document.createElement(this.opt.starType);

        for (var key in attributes) {
          el.setAttribute(key, attributes[key]);
        }

        this.self.appendChild(el);

        if (this.opt.space && i < this.opt.number) {
          this.self.append("\xA0");
        }
      }

      var stars = document.querySelectorAll("".concat(this.element, " > ").concat(this.opt.starType));
      this.stars = stars;
    }
  }, {
    key: "_error",
    value: function _error(message) {
      throw new Error(message);
    }
  }, {
    key: "_executeCallbacks",
    value: function _executeCallbacks() {
      var options = ['number', 'readOnly', 'score', 'scoreName', 'target', 'path'];

      for (var i = 0; i < options.length; i++) {
        if (typeof this.opt[options[i]] === 'function') {
          var value = this.opt[options[i]].call(this.element);

          if (value) {
            this.opt[options[i]] = value;
          } else {
            delete this.opt[options[i]];
          }
        }
      }
    }
  }, {
    key: "_fill",
    value: function _fill(score) {
      var hash = 0;

      if (this.opt.iconRangeSame && this.opt.iconRange) {
        while (hash < this.opt.iconRange.length && this.opt.iconRange[hash].range < score) {
          hash++;
        }
      }

      for (var i = 1; i <= this.stars.length; i++) {
        var icon;
        var star = this.stars[i - 1];

        var turnOn = this._turnOn(i, score);

        if (this.opt.iconRange && this.opt.iconRange.length > hash) {
          var irange = this.opt.iconRange[hash];
          icon = this._getRangeIcon(irange, turnOn);

          if (i <= irange.range) {
            this._setIcon(star, icon);
          }

          if (i === irange.range) {
            hash++;
          }
        } else {
          icon = this.opt[turnOn ? 'starOn' : 'starOff'];

          this._setIcon(star, icon);
        }
      }
    }
  }, {
    key: "_getDecimal",
    value: function _getDecimal(number, fractions) {
      var decimal = number.toString().split('.')[1];
      var result = 0;

      if (decimal) {
        result = parseInt(decimal.slice(0, fractions), 10);

        if (decimal.slice(1, 5) === '9999') {
          result++;
        }
      }

      return result;
    }
  }, {
    key: "_getRangeIcon",
    value: function _getRangeIcon(irange, turnOn) {
      return turnOn ? irange.on || this.opt.starOn : irange.off || this.opt.starOff;
    }
  }, {
    key: "_getScoreByPosition",
    value: function _getScoreByPosition(evt, icon) {
      var score = parseInt(icon.alt || icon.getAttribute('data-alt'), 10);

      if (this.opt.half) {
        var size = this._getWidth();

        var percent = parseFloat((evt.pageX - icon.offsetLeft) / size);
        score = score - 1 + percent;
      }

      return score;
    }
  }, {
    key: "_getHint",
    value: function _getHint(score, evt) {
      if (score !== 0 && !score) {
        return this.opt.noRatedMsg;
      }

      var decimal = this._getDecimal(score, 1);

      var integer = Math.ceil(score);
      var group = this.opt.hints[(integer || 1) - 1];
      var hint = group;
      var set = !evt || this.isMove;

      if (this.opt.precision) {
        if (set) {
          decimal = decimal === 0 ? 9 : decimal - 1;
        }

        hint = group[decimal];
      } else if (this.opt.halfShow || this.opt.half) {
        decimal = set && decimal === 0 ? 1 : decimal > 5 ? 1 : 0;
        hint = group[decimal];
      }

      return hint === '' ? '' : hint || score;
    }
  }, {
    key: "_getWidth",
    value: function _getWidth() {
      var width = parseFloat(this.stars[0].offsetWidth);

      if (!width) {
        this._error('Could not get the icon width!');
      }

      return width;
    }
  }, {
    key: "_lock",
    value: function _lock() {
      var hint = this._getHint(this.scoreField.value);

      this.self.style.pointerEvents = 'none';
      this.self.title = hint;
      this.scoreField.readOnly = true;
      this.stars.forEach(function (value) {
        value.title = hint;
      });

      if (this.cancelButton) {
        this.cancelButton.style.display = 'none';
      }

      this.self.dataset.readOnly = true;
    }
  }, {
    key: "_nameForIndex",
    value: function _nameForIndex(i) {
      return this.opt.score && this.opt.score >= i ? 'starOn' : 'starOff';
    }
  }, {
    key: "_resetTitle",
    value: function _resetTitle() {
      for (var i = 0; i < this.opt.number; i++) {
        this.stars[i].title = this._getHint(i + 1);
      }
    }
  }, {
    key: "_roundHalfScore",
    value: function _roundHalfScore(score) {
      var integer = parseInt(score, 10);

      var decimal = this._getDecimal(score, 1);

      if (decimal !== 0) {
        decimal = decimal > 5 ? 1 : 0.5;
      }

      return integer + decimal;
    }
  }, {
    key: "_roundStars",
    value: function _roundStars(score, evt) {
      var name = this._starName(score, evt);

      if (name) {
        var icon = this.opt[name];
        var star = this.stars[Math.ceil(score) - 1];
        star && this._setIcon(star, icon);
      }
    }
  }, {
    key: "_setIcon",
    value: function _setIcon(star, icon) {
      star[this.opt.starType === 'img' ? 'src' : 'className'] = this.opt.path + icon;
    }
  }, {
    key: "_setPath",
    value: function _setPath() {
      this.opt.path = this.opt.path || '';

      if (this.opt.path && this.opt.path.slice(-1)[0] !== '/') {
        this.opt.path += '/';
      }
    }
  }, {
    key: "_setTarget",
    value: function _setTarget(target, score) {
      if (score) {
        score = this.opt.targetFormat.toString().replace('{score}', score);
      }

      if (target instanceof HTMLInputElement || target instanceof HTMLSelectElement) {
        target.value = score;
      } else {
        target.textContent = score;
      }
    }
  }, {
    key: "_setTitle",
    value: function _setTitle(score, evt) {
      if (score) {
        var integer = parseInt(Math.ceil(score), 10);
        var star = this.stars[integer - 1];
        star.title = this._getHint(score, evt);
      }
    }
  }, {
    key: "_starName",
    value: function _starName(score, evt) {
      var decimal = +(score % 1).toFixed(2);

      if (evt || this.isMove) {
        return decimal > 0.5 ? 'starOn' : 'starHalf';
      }

      if (decimal <= this.opt.round.down) {
        return;
      }

      if (this.opt.halfShow && decimal < this.opt.round.up) {
        return 'starHalf';
      }

      if (decimal < this.opt.round.full) {
        return 'starOff';
      }

      return 'starOn';
    }
  }, {
    key: "_target",
    value: function _target(score, evt) {
      if (this.opt.target) {
        var target = document.querySelector(this.opt.target);

        if (!target) {
          this._error('Target selector invalid or missing!');
        }

        var mouseover = evt && evt.type === 'mouseover';

        if (score === undefined) {
          score = this.opt.targetText;
        } else if (score === null) {
          score = mouseover ? this.opt.cancelHint : this.opt.targetText;
        } else {
          if (this.opt.targetType === 'hint') {
            score = this._getHint(score, evt);
          } else if (this.opt.precision) {
            score = parseFloat(score).toFixed(1);
          }

          var mousemove = evt && evt.type === 'mousemove';

          if (!mouseover && !mousemove && !this.opt.targetKeep) {
            score = this.opt.targetText;
          }
        }

        this._setTarget(target, score);
      }
    }
  }, {
    key: "_turnOn",
    value: function _turnOn(i, score) {
      return this.opt.single ? i === score : i <= score;
    }
  }, {
    key: "_unlock",
    value: function _unlock() {
      this.self.style.pointerEvents = 'auto';
      this.self.removeAttribute('title');
      this.scoreField.readOnly = false;
      this.self.dataset.readOnly = false;

      this._resetTitle();

      if (this.cancelButton) {
        this.cancelButton.style.display = '';
      }
    }
  }]);

  return Raty;
}();