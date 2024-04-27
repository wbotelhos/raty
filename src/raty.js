/*!
 * Raty - A Star Rating Plugin
 *
 * author: Washington Botelho
 * github: wbotelhos/raty
 * version: 4.3.0
 */
class Raty {
  /**
   *
   * @param {object} element
   * @param {object} options
   *
   */
  constructor(element, options = {}) {
    this.element = element;
    this.opt = { ...this.defaultOptions(), ...options, ...this._parseOptions(element.dataset) };
  }

  defaultOptions() {
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
      round: { down: 0.25, full: 0.6, up: 0.76 },
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
      targetType: 'hint',
    };
  }

  cancel(click) {
    if (!this._isReadOnly()) {
      this[click ? 'click' : 'score'](null);
      this.scoreField.removeAttribute('value');
    }
  }

  // TODO: model spec
  click(score) {
    if (!this._isReadOnly()) {
      score = this._adjustedScore(score);

      this._apply(score);

      if (this.opt.click) {
        this.opt.click.call(this, score, this.element);
      }

      this._target(score);
    }
  }

  // TODO: model spec
  move(score) {
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

  // TODO: model spec
  readOnly(readonly) {
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

  score() {
    return arguments.length ? this.setScore(arguments[0]) : this.getScore();
  }

  setScore(score) {
    if (!this._isReadOnly()) {
      score = this._adjustedScore(score);

      this._apply(score);
      this._target(score);
    }
  }
  // TODO: model spec
  getScore() {
    var score = [];
    var value;

    value = this.scoreField.value;

    score.push(value ? +value : undefined);

    return score.length > 1 ? score : score[0];
  }

  init() {
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

  // private

  // TODO: model spec
  _adjustedScore(score) {
    if (score || score === 0) {
      return this._between(score, 0, this.opt.number);
    }
  }

  _adjustHints() {
    // TODO: is it possible `hints` does not exist?
    if (!this.opt.hints) {
      this.opt.hints = [];
    }

    if (!this.opt.halfShow && !this.opt.half) {
      return;
    }

    var steps = this.opt.precision ? 10 : 2;

    for (let i = 0; i < this.opt.number; i++) {
      var group = this.opt.hints[i];

      if (Object.prototype.toString.call(group) !== '[object Array]') {
        group = [group];
      }

      this.opt.hints[i] = [];

      for (let j = 0; j < steps; j++) {
        var hint = group[j];
        var last = group[group.length - 1];

        if (last === undefined) {
          last = null;
        }

        this.opt.hints[i][j] = hint === undefined ? last : hint;
      }
    }
  }

  _adjustNumber() {
    this.opt.number = this._between(this.opt.number, 1, this.opt.numberMax);
  }

  _adjustPrecision() {
    this.opt.half = true;
  }

  _adjustStarName() {
    const replaces = ['cancelOff', 'cancelOn', 'starHalf', 'starOff', 'starOn'];

    this.opt.path = '';

    for (let i = 0; i < replaces.length; i++) {
      this.opt[replaces[i]] = this.opt[replaces[i]].replace('.', '-');
    }
  }

  // TODO: model spec
  _apply(score) {
    this._fill(score);

    if (score) {
      if (score > 0) {
        this.scoreField.value = score;
      }

      this._roundStars(score);
    }
  }

  _attributesForIndex(i) {
    var name = this._nameForIndex(i);
    var attributes = { alt: i, src: this.opt.path + this.opt[name] };

    if (this.opt.starType !== 'img') {
      attributes = { 'data-alt': i, 'class': this.opt[name] };
    }

    attributes.title = this._getHint(i);

    return attributes;
  }

  _between(value, min, max) {
    return Math.min(Math.max(parseFloat(value), min), max);
  }

  // TODO: model spec
  _binds() {
    if (this.cancelButton) {
      this._bindOverCancel();
      this._bindClickCancel();
      this._bindOutCancel();
    }
    this._bindOver();
    this._bindClick();
    this._bindOut();
  }

  // TODO: model spec
  _bindClick() {
    this.stars.forEach((value) => {
      value.addEventListener('click', (evt) => {
        if (this._isReadOnly()) {
          return;
        }

        let execute;
        let score = this.opt.half || this.opt.precision ? this.element.dataset.score : value.alt || value.dataset.alt;

        if (this.opt.half && !this.opt.precision) {
          score = this._roundHalfScore(score);
        }

        if (this.opt.click) {
          execute = this.opt.click.call(this, +score, this.element, evt);
        }

        if (execute || execute === undefined) {
          this._apply(+score);
        }
      });
    });
  }

  // TODO: model spec
  _bindClickCancel() {
    this.cancelButton.addEventListener('click', (evt) => {
      this.scoreField.removeAttribute('value');

      if (this.opt.click) {
        this.opt.click.call(this, null, this.element, evt);
      }
    });
  }

  // TODO: model spec
  _bindOut() {
    this.element.addEventListener('mouseleave', (evt) => {
      const score = +this.scoreField.value || undefined;

      this._apply(score);
      this._target(score, evt);
      this._resetTitle();

      if (this.opt.mouseout) {
        this.opt.mouseout.call(this, score, this.element, evt);
      }
    });
  }

  // TODO: model spec
  _bindOutCancel() {
    this.cancelButton.addEventListener('mouseleave', (evt) => {
      let icon = this.opt.cancelOff;

      if (this.opt.starType !== 'img') {
        icon = `${this.opt.cancelClass} ${icon}`;
      }

      this._setIcon(this.cancelButton, icon);

      if (this.opt.mouseout) {
        const score = +this.scoreField.value || undefined;

        this.opt.mouseout.call(this, score, this.element, evt);
      }
    });
  }

  // TODO: model spec
  _bindOver() {
    const action = this.opt.half ? 'mousemove' : 'mouseover';

    this.stars.forEach((value) => {
      value.addEventListener(action, (evt) => {
        const score = this._getScoreByPosition(evt, value);

        this._fill(score);

        if (this.opt.half) {
          this._roundStars(score, evt);
          this._setTitle(score, evt);

          this.element.dataset.score = score;
        }

        this._target(score, evt);

        if (this.opt.mouseover) {
          this.opt.mouseover.call(this, score, this.element, evt);
        }
      });
    });
  }

  // TODO: model spec
  _bindOverCancel() {
    this.cancelButton.addEventListener('mouseover', (evt) => {
      if (this._isReadOnly()) {
        return;
      }

      const starOff = this.opt.path + this.opt.starOff;

      let icon = this.opt.cancelOn;

      if (this.opt.starType === 'img') {
        this.stars.forEach((value) => {
          value.src = starOff;
        });
      } else {
        icon = this.opt.cancelClass + ' ' + icon;

        this.stars.forEach((value) => {
          value.className = starOff;
        });
      }

      this._setIcon(this.cancelButton, icon);
      this._target(null, evt);

      if (this.opt.mouseover) {
        this.opt.mouseover.call(this, null, this.element, evt);
      }
    });
  }

  // TODO: model spec
  _buildScoreField() {
    const input = document.createElement('input');

    input.name = this.opt.scoreName;
    input.type = 'hidden';

    this.element.appendChild(input);

    return input;
  }

  // TODO: model spec
  _createCancel() {
    const button = document.createElement(this.opt.starType);
    const icon = this.opt.path + this.opt.cancelOff;

    button.setAttribute('class', this.opt.cancelClass);
    button.setAttribute('title', this.opt.cancelHint);

    if (this.opt.starType === 'img') {
      button.setAttribute('alt', 'x');
      button.setAttribute('src', icon);
    } else {
      button.classList.add(icon);

      // TODO: use the dataset
      button.setAttribute('data-alt', 'x');
    }

    if (this.opt.cancelPlace === 'left') {
      this.element.prepend('\u00A0');
      this.element.prepend(button);
    } else {
      this.element.append('\u00A0');
      this.element.appendChild(button);
    }

    this.cancelButton = button;
  }

  // TODO: model spec
  _createScore() {
    this.scoreField = document.querySelector(this.opt.targetScore) || this._buildScoreField();
  }

  _createStars() {
    for (let i = 1; i <= this.opt.number; i++) {
      const attributes = this._attributesForIndex(i);

      let star = document.createElement(this.opt.starType);

      for (const key in attributes) {
        star.setAttribute(key, attributes[key]);
      }

      this.element.appendChild(star);

      if (this.opt.space && i < this.opt.number) {
        this.element.append('\u00A0');
      }
    }

    this.stars = this.element.querySelectorAll(this.opt.starType);
  }

  // TODO: model spec
  _error(message) {
    throw new Error(message);
  }

  _executeCallbacks() {
    const options = ['number', 'readOnly', 'score', 'scoreName', 'target', 'path'];

    for (let i = 0; i < options.length; i++) {
      if (typeof this.opt[options[i]] === 'function') {
        const value = this.opt[options[i]].call(this, this.element);

        if (value) {
          this.opt[options[i]] = value;
        } else {
          delete this.opt[options[i]];
        }
      }
    }
  }

  // TODO: model spec
  _fill(score) {
    let hash = 0;

    if (this.opt.iconRangeSame && this.opt.iconRange) {
      while (hash < this.opt.iconRange.length && this.opt.iconRange[hash].range < score) {
        hash++;
      }
    }

    for (let i = 1; i <= this.stars.length; i++) {
      const star = this.stars[i - 1];
      const turnOn = this._turnOn(i, score);

      let icon;

      if (this.opt.iconRange && this.opt.iconRange.length > hash) {
        const irange = this.opt.iconRange[hash];

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

  _getDecimal(number, fractions) {
    const decimal = number.toString().split('.')[1];

    let result = 0;

    if (decimal) {
      result = parseInt(decimal.slice(0, fractions), 10);

      if (decimal.slice(1, 5) === '9999') {
        result++;
      }
    }

    return result;
  }

  // TODO: model spec
  _getRangeIcon(irange, turnOn) {
    return turnOn ? irange.on || this.opt.starOn : irange.off || this.opt.starOff;
  }

  // TODO: model spec
  _getScoreByPosition(evt, icon) {
    let score = parseInt(icon.alt || icon.getAttribute('data-alt'), 10);

    if (this.opt.half) {
      const size = this._getWidth();
      const percent = parseFloat((evt.pageX - icon.getBoundingClientRect().x) / size);

      score = score - 1 + percent;
    }

    return score;
  }

  // TODO: model spec
  _getHint(score, evt) {
    if (score !== 0 && !score) {
      return this.opt.noRatedMsg;
    }

    const integer = Math.ceil(score);
    const group = this.opt.hints[(integer || 1) - 1];
    const set = !evt || this.isMove;

    let decimal = this._getDecimal(score, 1);
    let hint = group;

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

  // TODO: model spec
  _getWidth() {
    // 16 is the default font-size px when icons is not redered yet
    const width = parseFloat(this.stars[0].offsetWidth) || 16;

    if (!width) {
      this._error('Could not get the icon width!');
    }

    return width;
  }

  _isReadOnly() {
    return { true: true }[this.element.dataset.readOnly] || false;
  }

  // TODO: model spec
  _lock() {
    const hint = this._getHint(this.scoreField.value);

    this.element.style.pointerEvents = 'none';
    this.element.title = hint;

    this.scoreField.readOnly = true;

    this.stars.forEach((value) => {
      value.title = hint;
    });

    if (this.cancelButton) {
      this.cancelButton.style.display = 'none';
    }

    this.element.dataset.readOnly = true;
  }

  _nameForIndex(i) {
    return this.opt.score && this.opt.score >= i ? 'starOn' : 'starOff';
  }

  // TODO: model spec
  _resetTitle() {
    for (let i = 0; i < this.opt.number; i++) {
      this.stars[i].title = this._getHint(i + 1);
    }
  }

  _parseOptions(dataset) {
    return Object.keys(dataset).reduce((acc, key) => {
      let value = { true: true, false: false }[dataset[key]];

      value = value !== null && value !== undefined ? value : dataset[key];

      if (!isNaN(value) && Number.isInteger(parseFloat(value))) {
        value = Number(value);
      }

      acc[key] = value;

      return acc;
    }, {});
  }

  // TODO: model spec
  _roundHalfScore(score) {
    const integer = parseInt(score, 10);

    let decimal = this._getDecimal(score, 1);

    if (decimal !== 0) {
      decimal = decimal > 5 ? 1 : 0.5;
    }

    return integer + decimal;
  }

  // TODO: model spec
  _roundStars(score, evt) {
    const name = this._starName(score, evt);

    if (name) {
      const icon = this.opt[name];
      const star = this.stars[Math.ceil(score) - 1];

      star && this._setIcon(star, icon);
    } // Full down: [x.00 .. x.25]
  }

  // TODO: model spec
  _setIcon(star, icon) {
    star[this.opt.starType === 'img' ? 'src' : 'className'] = this.opt.path + icon;
  }

  _setPath() {
    this.opt.path = this.opt.path || '';

    if (this.opt.path && this.opt.path.slice(-1) !== '/') {
      this.opt.path += '/';
    }
  }

  // TODO: model spec
  _setTarget(target, score) {
    if (score) {
      score = this.opt.targetFormat.toString().replace('{score}', score);
    }
    if (target instanceof HTMLInputElement || target instanceof HTMLSelectElement) {
      target.value = score;
    } else {
      target.textContent = score;
    }
  }

  // TODO: model spec
  _setTitle(score, evt) {
    if (score) {
      const integer = parseInt(Math.ceil(score), 10);
      const star = this.stars.item(integer - 1);

      star.title = this._getHint(score, evt);
    }
  }

  _starName(score, evt) {
    const decimal = +(score % 1).toFixed(2);

    if (evt || this.isMove) {
      return decimal > 0.5 ? 'starOn' : 'starHalf';
    }

    if (decimal <= this.opt.round.down) {
      // Down: [x.00 ... x.25]
      return;
    }

    if (this.opt.halfShow && decimal < this.opt.round.up) {
      // Half: [x.26 ... x.75]
      return 'starHalf';
    }

    if (decimal < this.opt.round.full) {
      // Off: [x.26 .. x.6]
      return 'starOff';
    }

    return 'starOn'; // Up: [x.26 ...] || [x.6 ...]
  }

  // TODO: model spec
  _target(score, evt) {
    if (this.opt.target) {
      const target = document.querySelector(this.opt.target);

      if (!target) {
        this._error('Target selector invalid or missing!');
      }

      const mouseover = evt && evt.type === 'mouseover';

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

        const mousemove = evt && evt.type === 'mousemove';

        if (!mouseover && !mousemove && !this.opt.targetKeep) {
          score = this.opt.targetText;
        }
      }

      this._setTarget(target, score);
    }
  }

  // TODO: model spec
  _turnOn(i, score) {
    return this.opt.single ? i === score : i <= score;
  }

  // TODO: model spec
  _unlock() {
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
}

export default Raty;
