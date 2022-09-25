'use strict';
//initial configuration
const defaultoptions = Object.seal( {
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
    initialize:true
});
class Raty {
    /**
     * 
     * @param {object} options 
     * @param {string} element 
     * 
     */
    constructor(element, options) {
        //overwrite basic configuration 
        if (options) {
            if (typeof options === "object" && !Array.isArray(options)) {
                this.opt = {
                    ...defaultoptions,
                    ...options
                };
            } else {
                throw new Error("Illegal parameter")
            }
        } else {
            this.opt = defaultoptions;
        }
        this.self = document.querySelector(element);
        this.element = element;

        if(this.opt.initialize){
            this.init();
        }
    }

    cancel(click) {
        if (!this.opt.readOnly) {
            this[click ? 'click' : 'score'].call();
            this.scoreField.removeAttribute('value');
        }
    }

    // TODO: model spec
    click(score) {
        if (!this.opt.readOnly) {
            score = this._adjustedScore(score);

            this._apply(score);

            if (this.opt.click) {
                this.opt.click.call(this.self, score, new Event('click'));
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
        var evt = new Event("mousemove");
        evt.pageX=percent;
        this.isMove = true;
        star.dispatchEvent(evt);
        this.isMove = false;
    }

    // TODO: model spec
    readOnly(readonly) {
        if (this.opt.readOnly !== readonly) {
            if (readonly) {
                this._lock();
            } else {
                this._binds();
                this._unlock();
            }
            this.self.readOnly=this.readOnly;
        }
    }

    score() {
        return arguments.length
            ? this.setScore.apply(this, arguments)
            : this.getScore();
    }

    setScore(score) {
        if (!this.opt.readOnly) {
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
    // initialize raty
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
            this.self.style.cursor = 'pointer';
            this._binds();
        }
    }

    //helper functions
    // TODO: model spec
    _adjustedScore(score) {
        if (score || score === 0) {
            return this._between(score, 0, this.opt.number);
        }
    }

    _adjustHints() {
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

    _adjustNumber() {
        this.opt.number = this._between(this.opt.number, 1, this.opt.numberMax);
    }

    _adjustPrecision() {
        this.opt.half = true;
    }

    _adjustStarName() {
        var replaces = [
            'cancelOff',
            'cancelOn',
            'starHalf',
            'starOff',
            'starOn',
        ];

        this.opt.path = '';

        for (var i = 0; i < replaces.length; i++) {
            this.opt[replaces[i]] = this.opt[replaces[i]].replace('.', '-');
        }
    }

    // TODO: model spec
    _apply(score) {
        this._fill(score);

        if (score) {
            if (score > 0) {
                this.scoreField.value=score;
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
        let that=this;
        this.stars.forEach(value => {
            
            value.addEventListener("click", function (evt) {
                if (that.opt.readOnly) {
                    return;
                }
                var execute = true;
                var score =
                    that.opt.half || that.opt.precision
                        ? that.opt.score
                        : value.alt;

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

    // TODO: model spec
    _bindClickCancel() {
        this.cancelButton.addEventListener(
            'click',
            function (evt) {
                this.scoreField.removeAttribute('value');
                if (this.opt.click) {
                    this.opt.click.call(this.self, null, evt);
                }
            }.bind(this)
        );
    }

    // TODO: model spec
    _bindOut() {
        this.self.addEventListener(
            'mouseleave',
            function (evt) {
                var score = +this.scoreField.value || undefined;
                this._apply(score);
                this._target(score, evt);
                this._resetTitle();

                if (this.opt.mouseout) {
                    this.opt.mouseout.call(this.self, score, evt);
                }
            }.bind(this)
        );
    }

    // TODO: model spec
    _bindOutCancel() {
        var that = this;

        this.cancelButton.addEventListener('mouseleave', function (evt) {
            var icon = that.opt.cancelOff;

            if (that.opt.starType !== 'img') {
                icon = that.opt.cancelClass + ' ' + icon;
            }

            that._setIcon(this, icon);

            if (that.opt.mouseout) {
                var score = +that.scoreField.value || undefined;

                that.opt.mouseout.call(that.self, score, evt);
            }
        });
    }

    // TODO: model spec
    _bindOver() {
        var that = this;
        var action = that.opt.half ? 'mousemove' : 'mouseover';

        this.stars.forEach((value) => {
            value.addEventListener(action, function (evt) {
                
                var score = that._getScoreByPosition(evt, value);
                that._fill(score);

                if (that.opt.half) {
                    that._roundStars(score, evt);
                    that._setTitle(score, evt);
                    that.opt.score = score;
                }

                that._target(score, evt);

                if (that.opt.mouseover) {
                    that.opt.mouseover.call(that.self, score, evt);
                }
            });
        });
    }

    // TODO: model spec
    _bindOverCancel() {
        var that = this;

        this.cancelButton.addEventListener('mouseover', function (evt) {
            if (that.opt.readOnly) {
                return;
            }

            var starOff = that.opt.path + that.opt.starOff;
            var icon = that.opt.cancelOn;

            if (that.opt.starType === 'img') {
                that.stars.forEach(value=>{
                    value.src=starOff;
                });
            } else {
                icon = that.opt.cancelClass + ' ' + icon;
                that.stars.forEach(value => {
                    value.className=starOff;
                });
            }

            that._setIcon(this, icon);
            that._target(null, evt);

            if (that.opt.mouseover) {
                that.opt.mouseover.call(that.self, null);
            }
        });
    }

    // TODO: model spec
    _buildScoreField() {
        const input = document.createElement("input");
        input.name = this.opt.scoreName;
        input.type = "hidden";
        this.self.appendChild(input);
        return input;
    }

    // TODO: model spec
    _createCancel() {
        let icon = this.opt.path + this.opt.cancelOff;
        let button =document.createElement(this.opt.starType);
        const attributes = {
            title: this.opt.cancelHint,
            class: this.opt.cancelClass
        };

        if (this.opt.starType === 'img') {
            document.width="20";
            document.height="20";
            attributes.src = icon;
            attributes.alt = 'x';
        } else {
            button.style.fontSize="100%";
            attributes['data-alt'] = 'x';
            attributes.class= icon;
        }
        for (const key in attributes) {
            button.setAttribute(key, attributes[key]);
        }
        if (this.opt.cancelPlace === 'left') {
            this.self.prepend("\u00A0");
            this.self.prepend(button);
        } else {
            
            this.self.append("\u00A0");
            this.self.appendChild(button);
        }
        button.id="raty-cancel-btn";
        this.cancelButton = document.querySelector('#raty-cancel-btn');
    }

    // TODO: model spec
    _createScore() {
        var score = document.querySelector(this.opt.targetScore);

        this.scoreField = score ?? this._buildScoreField();
    }

    _createStars() {
        for (var i = 1; i <= this.opt.number; i++) {
            var attributes = this._attributesForIndex(i);
            const img=new Image(20,20);
            const element = document.createElement(this.opt.starType);
            element.style.fontSize="100%";
            let el = this.opt.starType==="img"?img:element;
            el.id = "raty-rate-" + i;
            for (const key in attributes) {
                el.setAttribute(key, attributes[key]);
            }
            this.self.appendChild(el);
            if (this.opt.space && i < this.opt.number) {
                this.self.append("\u00A0");
            }
        }
        let stars = document.querySelectorAll(`${this.element} > ${this.opt.starType}[id^="raty-rate"]`);
        if (this.cancelButton) {
            stars.filter(value => (value.id !=="#raty-cancel-btn"));
        }
        this.stars=stars;
    }

    // TODO: model spec
    _error(message) {
        throw new Error(message);
    }

    _executeCallbacks() {
        var options = [
            'number',
            'readOnly',
            'score',
            'scoreName',
            'target',
            'path',
        ];

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

    // TODO: model spec
    _fill(score) {
        var hash = 0;

        if (this.opt.iconRangeSame && this.opt.iconRange) {
            while (
                hash < this.opt.iconRange.length &&
                this.opt.iconRange[hash].range < score
            ) {
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

    _getDecimal(number, fractions) {
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

    // TODO: model spec
    _getRangeIcon(irange, turnOn) {
        return turnOn
            ? irange.on || this.opt.starOn
            : irange.off || this.opt.starOff;
    }

    // TODO: model spec
    _getScoreByPosition(evt, icon) {
        var score = parseInt(icon.alt || icon.getAttribute('data-alt'), 10);
        if (this.opt.half) {
            var size = this._getWidth();
            var percent = parseFloat((evt.pageX - icon.offsetLeft) / size);
            score = score - 1 + percent;
        }
        return score;
    }

    // TODO: model spec
    _getHint(score, evt) {
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

    // TODO: model spec
    _getWidth() {
        var width = this.stars[0].width || parseFloat(this.stars[0].style.fontSize);
        if (!width) {
            this._error('Could not get the icon width!');
        }

        return width;
    }

    // TODO: model spec
    _lock() {
        var hint = this._getHint(this?.scoreField?.value);
        this.self.style.pointerEvents = 'none';
        this.self.title = hint;
        this.scoreField.readOnly = true;
        this.stars.forEach(value => {
            value.title = hint;
        });
        if (this.cancelButton) {
            this.cancelButton.style.display = 'none';
        }
        this.opt.readOnly = true;
    }

    _nameForIndex(i) {
        return this.opt.score && this.opt.score >= i ? 'starOn' : 'starOff';
    }

    // TODO: model spec
    _resetTitle() {
        for (var i = 0; i < this.opt.number; i++) {
            this.stars[i].title = this._getHint(i + 1);
        }
    };

    // TODO: model spec
    _roundHalfScore(score) {
        var integer = parseInt(score, 10);
        var decimal = this._getDecimal(score, 1);

        if (decimal !== 0) {
            decimal = decimal > 5 ? 1 : 0.5;
        }

        return integer + decimal;
    }

    // TODO: model spec
    _roundStars(score, evt) {
        var name = this._starName(score, evt);
        if (name) {
            var icon = this.opt[name];
            var star = this.stars[Math.ceil(score) - 1];
            this._setIcon(star, icon);
        } // Full down: [x.00 .. x.25]
    }

    // TODO: model spec
    _setIcon(star, icon) {
        star[this.opt.starType === 'img' ? 'src' : 'className']=this.opt.path + icon;
    }

    _setPath() {
        this.opt.path = this.opt.path || '';

        if (this.opt.path && this.opt.path.slice(-1)[0] !== '/') {
            this.opt.path += '/';
        }
    }

    // TODO: model spec
    _setTarget(target, score) {
        if (score) {
            score = this.opt.targetFormat.toString().replace('{score}', score);
        }
        if (target instanceof HTMLInputElement || target instanceof HTMLSelectElement ) {
            target.value=score;
        } else {
            target.textContent=score;
        }
    }

    // TODO: model spec
    _setTitle(score, evt) {
        if (score) {
            var integer = parseInt(Math.ceil(score), 10);
            var star = this.stars[integer - 1];

            star.title = this._getHint(score, evt);
        }
    }

    _starName(score, evt) {
        var decimal = +(score % 1).toFixed(2);

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

    // TODO: model spec
    _turnOn(i, score) {
        return this.opt.single ? i === score : i <= score;
    }

    // TODO: model spec
    _unlock() {
        this.self.style.pointerEvents = 'auto';
        this.self.removeAttribute('title');
        this.scoreField.readOnly = false;
        this._resetTitle();
        this.opt.readOnly = false;
        if (this.cancelButton) {
            this.cancelButton.style.display = '';
        }
    }
}

export default Raty;