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
    this.opt = _objectSpread(_objectSpread(_objectSpread({}, this.defaultOptions()), options), this._parseOptions(element.dataset));
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
      if (!this._isReadOnly()) {
        this[click ? 'click' : 'score'](null);
        this.scoreField.removeAttribute('value');
      }
    }
  }, {
    key: "click",
    value: function click(score) {
      if (!this._isReadOnly()) {
        score = this._adjustedScore(score);

        this._apply(score);

        if (this.opt.click) {
          this.opt.click.call(this, score, this.element);
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
      if (this._isReadOnly() !== readonly) {
        if (readonly) {
          this._lock();
        } else {
          this._binds();

          this._unlock();
        }

        this.element.dataset.readOnly = readonly;
      }
    }
  }, {
    key: "score",
    value: function score() {
      return arguments.length ? this.setScore(arguments[0]) : this.getScore();
    }
  }, {
    key: "setScore",
    value: function setScore(score) {
      if (!this._isReadOnly()) {
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
        this.element.style.cursor = 'pointer';

        this._binds();
      }

      return this;
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
      var _this = this;

      this.stars.forEach(function (value) {
        value.addEventListener('click', function (evt) {
          if (_this._isReadOnly()) {
            return;
          }

          var execute;
          var score = _this.opt.half || _this.opt.precision ? _this.element.dataset.score : value.alt || value.dataset.alt;

          if (_this.opt.half && !_this.opt.precision) {
            score = _this._roundHalfScore(score);
          }

          if (_this.opt.click) {
            execute = _this.opt.click.call(_this, +score, _this.element, evt);
          }

          if (execute || execute === undefined) {
            _this._apply(+score);
          }
        });
      });
    }
  }, {
    key: "_bindClickCancel",
    value: function _bindClickCancel() {
      var _this2 = this;

      this.cancelButton.addEventListener('click', function (evt) {
        _this2.scoreField.removeAttribute('value');

        if (_this2.opt.click) {
          _this2.opt.click.call(_this2, null, _this2.element, evt);
        }
      });
    }
  }, {
    key: "_bindOut",
    value: function _bindOut() {
      var _this3 = this;

      this.element.addEventListener('mouseleave', function (evt) {
        var score = +_this3.scoreField.value || undefined;

        _this3._apply(score);

        _this3._target(score, evt);

        _this3._resetTitle();

        if (_this3.opt.mouseout) {
          _this3.opt.mouseout.call(_this3, score, _this3.element, evt);
        }
      });
    }
  }, {
    key: "_bindOutCancel",
    value: function _bindOutCancel() {
      var _this4 = this;

      this.cancelButton.addEventListener('mouseleave', function (evt) {
        var icon = _this4.opt.cancelOff;

        if (_this4.opt.starType !== 'img') {
          icon = "".concat(_this4.opt.cancelClass, " ").concat(icon);
        }

        _this4._setIcon(_this4.cancelButton, icon);

        if (_this4.opt.mouseout) {
          var score = +_this4.scoreField.value || undefined;

          _this4.opt.mouseout.call(_this4, score, _this4.element, evt);
        }
      });
    }
  }, {
    key: "_bindOver",
    value: function _bindOver() {
      var _this5 = this;

      var action = this.opt.half ? 'mousemove' : 'mouseover';
      this.stars.forEach(function (value) {
        value.addEventListener(action, function (evt) {
          var score = _this5._getScoreByPosition(evt, value);

          _this5._fill(score);

          if (_this5.opt.half) {
            _this5._roundStars(score, evt);

            _this5._setTitle(score, evt);

            _this5.element.dataset.score = score;
          }

          _this5._target(score, evt);

          if (_this5.opt.mouseover) {
            _this5.opt.mouseover.call(_this5, score, _this5.element, evt);
          }
        });
      });
    }
  }, {
    key: "_bindOverCancel",
    value: function _bindOverCancel() {
      var _this6 = this;

      this.cancelButton.addEventListener('mouseover', function (evt) {
        if (_this6._isReadOnly()) {
          return;
        }

        var starOff = _this6.opt.path + _this6.opt.starOff;
        var icon = _this6.opt.cancelOn;

        if (_this6.opt.starType === 'img') {
          _this6.stars.forEach(function (value) {
            value.src = starOff;
          });
        } else {
          icon = _this6.opt.cancelClass + ' ' + icon;

          _this6.stars.forEach(function (value) {
            value.className = starOff;
          });
        }

        _this6._setIcon(_this6.cancelButton, icon);

        _this6._target(null, evt);

        if (_this6.opt.mouseover) {
          _this6.opt.mouseover.call(_this6, null, _this6.element, evt);
        }
      });
    }
  }, {
    key: "_buildScoreField",
    value: function _buildScoreField() {
      var input = document.createElement('input');
      input.name = this.opt.scoreName;
      input.type = 'hidden';
      this.element.appendChild(input);
      return input;
    }
  }, {
    key: "_createCancel",
    value: function _createCancel() {
      var button = document.createElement(this.opt.starType);
      var icon = this.opt.path + this.opt.cancelOff;
      button.setAttribute('class', this.opt.cancelClass);
      button.setAttribute('title', this.opt.cancelHint);

      if (this.opt.starType === 'img') {
        button.setAttribute('alt', 'x');
        button.setAttribute('src', icon);
      } else {
        button.classList.add(icon);
        button.setAttribute('data-alt', 'x');
      }

      if (this.opt.cancelPlace === 'left') {
        this.element.prepend("\xA0");
        this.element.prepend(button);
      } else {
        this.element.append("\xA0");
        this.element.appendChild(button);
      }

      this.cancelButton = button;
    }
  }, {
    key: "_createScore",
    value: function _createScore() {
      this.scoreField = document.querySelector(this.opt.targetScore) || this._buildScoreField();
    }
  }, {
    key: "_createStars",
    value: function _createStars() {
      for (var i = 1; i <= this.opt.number; i++) {
        var attributes = this._attributesForIndex(i);

        var star = document.createElement(this.opt.starType);

        for (var key in attributes) {
          star.setAttribute(key, attributes[key]);
        }

        this.element.appendChild(star);

        if (this.opt.space && i < this.opt.number) {
          this.element.append("\xA0");
        }
      }

      this.stars = this.element.querySelectorAll(this.opt.starType);
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
          var value = this.opt[options[i]].call(this, this.element);

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
        var star = this.stars[i - 1];

        var turnOn = this._turnOn(i, score);

        var icon = void 0;

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

      var integer = Math.ceil(score);
      var group = this.opt.hints[(integer || 1) - 1];
      var set = !evt || this.isMove;

      var decimal = this._getDecimal(score, 1);

      var hint = group;

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
      var width = parseFloat(this.stars[0].offsetWidth) || 16;

      if (!width) {
        this._error('Could not get the icon width!');
      }

      return width;
    }
  }, {
    key: "_isReadOnly",
    value: function _isReadOnly() {
      return {
        "true": true
      }[this.element.dataset.readOnly] || false;
    }
  }, {
    key: "_lock",
    value: function _lock() {
      var hint = this._getHint(this.scoreField.value);

      this.element.style.pointerEvents = 'none';
      this.element.title = hint;
      this.scoreField.readOnly = true;
      this.stars.forEach(function (value) {
        value.title = hint;
      });

      if (this.cancelButton) {
        this.cancelButton.style.display = 'none';
      }

      this.element.dataset.readOnly = true;
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
    key: "_parseOptions",
    value: function _parseOptions(dataset) {
      return Object.keys(dataset).reduce(function (acc, key) {
        var value = {
          "true": true,
          "false": false
        }[dataset[key]];
        value = value !== null && value !== undefined ? value : dataset[key];

        if (!isNaN(value) && Number.isInteger(parseFloat(value))) {
          value = Number(value);
        }

        acc[key] = value;
        return acc;
      }, {});
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

      if (this.opt.path && this.opt.path.slice(-1) !== '/') {
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
      this.element.style.cursor = 'pointer';
      this.element.style.pointerEvents = 'auto';
      this.element.removeAttribute('title');
      this.element.dataset.readOnly = false;
      this.scoreField.readOnly = false;

      this._resetTitle();

      if (this.cancelButton) {
        this.cancelButton.style.display = '';
      }
    }
  }]);

  return Raty;
}();