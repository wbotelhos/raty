/*!
 * jQuery Raty - A Star Rating Plugin - http://wbotelhos.com/raty
 * ---------------------------------------------------------------------
 *
 * jQuery Raty is a plugin that generates a customizable star rating.
 *
 * Licensed under The MIT License
 *
 * @version        2.1.0
 * @since          2010.06.11
 * @author         Washington Botelho
 * @documentation  wbotelhos.com/raty
 * @twitter        twitter.com/wbotelhos
 *
 * Usage with default values:
 * ---------------------------------------------------------------------
 * $('#star').raty();
 *
 * <div id="star"></div>
 *
 * $('.star').raty();
 *
 * <div class="star"></div>
 * <div class="star"></div>
 * <div class="star"></div>
 *
 */

;(function($) {

	var methods = {
		init: function(options) {
			return this.each(function() {

				var $this = $(this);

				this.opt = $.extend(true, {}, $.fn.raty.defaults, options);

				if (this.opt.number > 20) {
					this.opt.number = 20;
				} else if (this.opt.number < 0) {
					this.opt.number = 0;
				}

				if (this.opt.path.substring(this.opt.path.length - 1, this.opt.path.length) != '/') {
					this.opt.path += '/';
				}

				if (typeof this.opt.start == 'function') {
					this.opt.start = this.opt.start.call(this);
				}

				var isValidStart	= !isNaN(parseInt(this.opt.start, 10)),
					start			= '';

				if (isValidStart) {
					start = (this.opt.start > this.opt.number) ? this.opt.number : this.opt.start;
				} 

				var starFile	= this.opt.starOn,
					space		= (this.opt.space) ? 4 : 0,
					hint		= '';

				for (var i = 1; i <= this.opt.number; i++) {
					starFile = (start < i) ? this.opt.starOff : this.opt.starOn;

					hint = (i <= this.opt.hintList.length && this.opt.hintList[i - 1] !== null) ? this.opt.hintList[i - 1] : i;

					$this.append('<img src="' + this.opt.path + starFile + '" alt="' + i + '" title="' + hint + '" />');

					if (this.opt.space) {
						$this.append((i < this.opt.number) ? '&#160;' : '');
					}
				}

				var $score = $('<input/>', { type: 'hidden', name: this.opt.scoreName}).appendTo(this);

				if (isValidStart) {
					if (this.opt.start > 0) {
						$score.val(start);
					}

					methods.roundStar.call(this, start);
				}

				if (this.opt.iconRange) {
					methods.fillStar.call(this, start);	
				}

				methods.setTarget.call(this, start, this.opt.targetKeep);

				var width = this.opt.width || (this.opt.number * this.opt.size + this.opt.number * space);

				if (this.opt.cancel) {
					var $cancel = $('<img src="' + this.opt.path + this.opt.cancelOff + '" alt="x" title="' + this.opt.cancelHint + '" class="raty-cancel"/>');

					if (this.opt.cancelPlace == 'left') {
						$this.prepend('&#160;').prepend($cancel);
					} else {
						$this.append('&#160;').append($cancel);
					}

					width += this.opt.size + space;
				}

				if (this.opt.readOnly) {
					methods.fixHint.call(this);

					$this.children('.raty-cancel').hide();
				} else {
					$this.css('cursor', 'pointer');

					methods.bindAction.call(this);
				}

				$this.css('width', width);
			});
		}, bindAction: function() {
			var self	= this,
				$this	= $(self),
				$score	= $this.children('input');

			$this.mouseleave(function() {
				methods.initialize.call(self, $score.val());

				methods.setTarget.call(self, $score.val(), self.opt.targetKeep);
			});

			var $stars	= $this.children('img').not('.raty-cancel'),
				action	= (self.opt.half) ? 'mousemove' : 'mouseover';

			if (self.opt.cancel) {
				$this.children('.raty-cancel').mouseenter(function() {
					$(this).attr('src', self.opt.path + self.opt.cancelOn);

					$stars.attr('src', self.opt.path + self.opt.starOff);

					methods.setTarget.call(self, null, true);
				}).mouseleave(function() {
					$(this).attr('src', self.opt.path + self.opt.cancelOff);

					$this.mouseout();
				}).click(function(evt) {
					$score.removeAttr('value');

					if (self.opt.click) {
			          self.opt.click.call(self, null, evt);
			        }
				});
			}

			$stars.bind(action, function(evt) {
				var value = parseInt(this.alt, 10);

				if (self.opt.half) {
					var position	= parseFloat((evt.pageX - $(this).offset().left) / self.opt.size),
						diff		= (position > .5) ? 1 : .5;

					value = parseFloat(this.alt) - 1 + diff;

					methods.fillStar.call(self, value);

					if (self.opt.precision) {
						value = value - diff + position;
					}

					methods.showHalf.call(self, value);
				} else {
					methods.fillStar.call(self, value);
				}

				$this.data('score', value);

				methods.setTarget.call(self, value, true);
			}).click(function(evt) {
				$score.val((self.opt.half || self.opt.precision) ? $this.data('score') : this.alt);

				if (self.opt.click) {
					self.opt.click.call(self, $score.val(), evt);
				}
			});
		}, cancel: function(isClick) {
			return $(this).each(function() {
				var $this = $(this);

				if ($this.data('readonly') == 'readonly') {
					return false;
				}

				if (isClick) {
					methods.click.call(this, null);
				} else {
					methods.start.call(this, null);
				}

				$this.mouseleave().children('input').removeAttr('value');
			});
		}, click: function(score) {
			return $(this).each(function() {
				if ($(this).data('readonly') == 'readonly') {
					return false;
				}

				methods.initialize.call(this, score);

				if (this.opt.click) {
					this.opt.click.call(this, score);
				} else {
					$.error('you must add the "click: function(score, evt) { }" callback.');
				}

				methods.setTarget.call(this, score, true);
			});
		}, fillStar: function(score) {
			var self	= this,
				$this	= $(self),
				$stars	= $this.children('img').not('.raty-cancel'),
				qtyStar	= $stars.length,
				count	= 0,
				$star	,
				star	,
				icon	;

			for (var i = 1; i <= qtyStar; i++) {
				$star = $stars.eq(i - 1);

				if (self.opt.iconRange && self.opt.iconRange.length > count) {
					star = self.opt.iconRange[count];

					if (self.opt.single) {
						icon = (i == score) ? (star.on || self.opt.starOn) : (star.off || self.opt.starOff);
					} else {
						icon = (i <= score) ? (star.on || self.opt.starOn) : (star.off || self.opt.starOff);
					}

					if (i <= star.range) {
						$star.attr('src', self.opt.path + icon);
					}

					if (i == star.range) {
						count++;
					}
				} else {
					if (self.opt.single) {
						icon = (i == score) ? self.opt.starOn : self.opt.starOff;
					} else {
						icon = (i <= score) ? self.opt.starOn : self.opt.starOff;
					}

					$star.attr('src', self.opt.path + icon);
				}
			}
		}, fixHint: function() {
			var self	= this,
			 	$this	= $(self),
				$score	= $this.children('input'),
				score	= parseInt($score.val(), 10),
				hint	= self.opt.noRatedMsg;

			if (!isNaN(score) && score > 0) {
				hint = (score <= self.opt.hintList.length && self.opt.hintList[score - 1] !== null) ? self.opt.hintList[score - 1] : score;
			}

			$score.attr('readonly', 'readonly');
			$this.css('cursor', 'default').data('readonly', 'readonly').attr('title', hint).children('img').attr('title', hint);
		}, readOnly: function(isReadOnly) {
			return $(this).each(function() {
				var $this	= $(this),
					$cancel	= $this.children('.raty-cancel');

				if ($cancel.length) {
					if (isReadOnly) {
						$cancel.hide();
					} else {
						$cancel.show();
					}
				}

				if (isReadOnly) {
					$this.unbind();

					$this.children('img').unbind();

					methods.fixHint.call(this);
				} else {
					methods.bindAction.call(this);
					methods.unfixHint.call(this);
				}
			});
		}, roundStar: function(score) {
			var diff = (score - Math.floor(score)).toFixed(2);

			if (diff > this.opt.round.down) {
				var icon = this.opt.starOn;								// Full up: [x.76 .. x.99]

				if (diff < this.opt.round.up && this.opt.halfShow) {	// Half: [x.26 .. x.75]
					icon = this.opt.starHalf;
				} else if (diff < this.opt.round.full) {				// Full down: [x.00 .. x.5]
					icon = this.opt.starOff;
				}

				$(this).children('img').not('.raty-cancel').eq(Math.ceil(score) - 1).attr('src', this.opt.path + icon);
			}															// Full down: [x.00 .. x.25]
		}, score: function() {
			var score	= [],
				value	;

			$(this).each(function() {
				value = $(this).children('input').val();
				value = (value == '') ? null : parseFloat(value);

				score.push(value);
			});

			return (score.length > 1) ? score : score[0];
		}, setTarget: function(value, isKeep) {
			if (this.opt.target) {
				var $target = $(this.opt.target);

				if ($target.length == 0) {
					$.error('target selector invalid or missing!');
				} else {
					var score = value;

					if (score == null && !this.opt.cancel) {
						$.error('you must enable the "cancel" option to set hint on target.');
					} else {
						if (!isKeep || score == '') {
							score = this.opt.targetText;
						} else {
							if (this.opt.targetType == 'hint') {
								if (score === null && this.opt.cancel) {
									score = this.opt.cancelHint;
								} else {
									score = this.opt.hintList[Math.ceil(score - 1)];
								}
							} else {
								if (score != '' && !this.opt.precision) {
									score = parseInt(score, 10);
								} else {
									score = parseFloat(score).toFixed(1);
								}
							}
						}

						if (this.opt.targetFormat.indexOf('{score}') < 0) {
							$.error('template "{score}" missing!');
						} else if (value !== null) {
							score = this.opt.targetFormat.toString().replace('{score}', score);
						}

						if ($target.is(':input')) {
							$target.val(score);
						} else {
							$target.html(score);
						}
					}
				}
			}
		}, showHalf: function(score) {
			var diff = (score - Math.floor(score)).toFixed(1);

			if (diff > 0 && diff < .6) {
				$(this).children('img').not('.raty-cancel').eq(Math.ceil(score) - 1).attr('src', this.opt.path + this.opt.starHalf);
			}
		}, start: function(score) {
			return $(this).each(function() {
				if ($(this).data('readonly') == 'readonly') {
					return false;
				}

				methods.initialize.call(this, score);
				methods.setTarget.call(this, score, true);
			});
		}, initialize: function(score) {
			if (score < 0) {
				score = 0;
			} else if (score > this.opt.number) {
				score = this.opt.number;
			}

			methods.fillStar.call(this, score);

			if (score != '') {
				if (this.opt.halfShow) {
					methods.roundStar.call(this, score);
				}

				$(this).children('input').val(score);
			}
		}, unfixHint: function() {
			var $this	= $(this),
				$imgs	= $this.children('img').filter(':not(.raty-cancel)');

			for (var i = 0; i < this.opt.number; i++) {
				$imgs.eq(i).attr('title', (i < this.opt.hintList.length && this.opt.hintList[i] !== null) ? this.opt.hintList[i] : i);
			}

			$this.css('cursor', 'pointer').removeData('readonly').removeAttr('title').children('input').attr('readonly', 'readonly');
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
		cancel:			false,
		cancelHint:		'cancel this rating!',
		cancelOff:		'cancel-off.png',
		cancelOn:		'cancel-on.png',
		cancelPlace:	'left',
		click:			undefined,
		half:			false,
		halfShow:		true,
		hintList:		['bad', 'poor', 'regular', 'good', 'gorgeous'],
		iconRange:		undefined,
		noRatedMsg:		'not rated yet',
		number:			5,
		path:			'img/',
		precision:		false,
		round:			{ down: .25, full: .6, up: .76 },
		readOnly:		false,
		scoreName:		'score',
		single:			false,
		size:			16,
		space:			true,
		starHalf:		'star-half.png',
		starOff:		'star-off.png',
		starOn:			'star-on.png',
		start:			0,
		target:			undefined,
		targetFormat:	'{score}',
		targetKeep:		false,
		targetText:		'',
		targetType:		'hint',
		width:			undefined
	};

})(jQuery);
