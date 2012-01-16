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

				var opt		= $.extend(true, {}, $.fn.raty.defaults, options),
					$this	= $(this).data('options', opt);

				if (opt.number > 20) {
					opt.number = 20;
				} else if (opt.number < 0) {
					opt.number = 0;
				}

				if (opt.path.substring(opt.path.length - 1, opt.path.length) != '/') {
					opt.path += '/';
				}

				if (typeof opt.start == 'function') {
					opt.start = opt.start.call(this);
				}

				var isValidStart	= !isNaN(parseInt(opt.start, 10)),
					start			= '';

				if (isValidStart) {
					start = (opt.start > opt.number) ? opt.number : opt.start;
				} 

				var starFile	= opt.starOn,
					space		= (opt.space) ? 4 : 0,
					hint		= '';

				for (var i = 1; i <= opt.number; i++) {
					starFile = (start < i) ? opt.starOff : opt.starOn;

					hint = (i <= opt.hintList.length && opt.hintList[i - 1] !== null) ? opt.hintList[i - 1] : i;

					$this.append('<img src="' + opt.path + starFile + '" alt="' + i + '" title="' + hint + '" />');

					if (opt.space) {
						$this.append((i < opt.number) ? '&nbsp;' : '');
					}
				}

				var $score = $('<input/>', { type: 'hidden', name: opt.scoreName}).appendTo($this);

				if (isValidStart) {
					if (opt.start > 0) {
						$score.val(start);
					}

					methods.roundStar.call($this, start);
				}

				if (opt.iconRange) {
					methods.fillStar.call($this, start);	
				}

				methods.setTarget.call($this, start, opt.targetKeep);

				var width = opt.width || (opt.number * opt.size + opt.number * space);

				if (opt.cancel) {
					var $cancel = $('<img src="' + opt.path + opt.cancelOff + '" alt="x" title="' + opt.cancelHint + '" class="raty-cancel"/>');

					if (opt.cancelPlace == 'left') {
						$this.prepend('&nbsp;').prepend($cancel);
					} else {
						$this.append('&nbsp;').append($cancel);
					}

					width += opt.size + space;
				}

				if (opt.readOnly) {
					methods.fixHint.call($this);

					$this.children('.raty-cancel').hide();
				} else {
					$this.css('cursor', 'pointer');

					methods.bindAction.call($this);
				}

				$this.css('width', width);
			});
		}, bindAction: function() {
			var self	= this,
				opt		= this.data('options'),
				$score	= this.children('input');

			self.mouseleave(function() {
				methods.initialize.call(self, $score.val());

				methods.setTarget.call(self, $score.val(), opt.targetKeep);
			});

			var $stars	= this.children('img').not('.raty-cancel'),
				action	= (opt.half) ? 'mousemove' : 'mouseover';

			if (opt.cancel) {
				self.children('.raty-cancel').mouseenter(function() {
					$(this).attr('src', opt.path + opt.cancelOn);

					$stars.attr('src', opt.path + opt.starOff);

					methods.setTarget.call(self, null, true);
				}).mouseleave(function() {
					$(this).attr('src', opt.path + opt.cancelOff);

					self.mouseout();
				}).click(function(evt) {
					$score.removeAttr('value');

					if (opt.click) {
			          opt.click.call(self[0], null, evt);
			        }
				});
			}

			$stars.bind(action, function(evt) {
				var value = parseInt(this.alt, 10);

				if (opt.half) {
					var position	= parseFloat((evt.pageX - $(this).offset().left) / opt.size),
						diff		= (position > .5) ? 1 : .5;

					value = parseFloat(this.alt) - 1 + diff;

					methods.fillStar.call(self, value);

					if (opt.precision) {
						value = value - diff + position;
					}

					methods.showHalf.call(self, value);
				} else {
					methods.fillStar.call(self, value);
				}

				self.data('score', value);

				methods.setTarget.call(self, value, true);
			}).click(function(evt) {
				$score.val((opt.half || opt.precision) ? self.data('score') : this.alt);

				if (opt.click) {
					opt.click.call(self[0], $score.val(), evt);
				}
			});
		}, cancel: function(isClick) {
			return this.each(function() {
				var $this = $(this);

				if ($this.data('readonly') == 'readonly') {
					return false;
				}

				if (isClick) {
					methods.click.call($this, null);
				} else {
					methods.start.call($this, null);
				}

				$this.mouseleave().children('input').removeAttr('value');
			});
		}, click: function(score) {
			return this.each(function() {
				var $this = $(this);

				if ($this.data('readonly') == 'readonly') {
					return false;
				}

				methods.initialize.call($this, score);

				var opt = $this.data('options');

				if (opt.click) {
					opt.click.call($this[0], score);
				} else {
					$.error('you must add the "click: function(score, evt) { }" callback.');
				}

				methods.setTarget.call($this, score, true);
			});
		}, fillStar: function(score) {
			var opt		= this.data('options'),
				$stars	= this.children('img').not('.raty-cancel'),
				qtyStar	= $stars.length,
				count	= 0,
				$star	,
				star	,
				icon	;

			for (var i = 1; i <= qtyStar; i++) {
				$star = $stars.eq(i - 1);

				if (opt.iconRange && opt.iconRange.length > count) {
					star = opt.iconRange[count];

					if (opt.single) {
						icon = (i == score) ? (star.on || opt.starOn) : (star.off || opt.starOff);
					} else {
						icon = (i <= score) ? (star.on || opt.starOn) : (star.off || opt.starOff);
					}

					if (i <= star.range) {
						$star.attr('src', opt.path + icon);
					}

					if (i == star.range) {
						count++;
					}
				} else {
					if (opt.single) {
						icon = (i == score) ? opt.starOn : opt.starOff;
					} else {
						icon = (i <= score) ? opt.starOn : opt.starOff;
					}

					$star.attr('src', opt.path + icon);
				}
			}
		}, fixHint: function() {
			var opt		= this.data('options'),
				$score	= this.children('input'),
				score	= parseInt($score.val(), 10),
				hint	= opt.noRatedMsg;

			if (!isNaN(score) && score > 0) {
				hint = (score <= opt.hintList.length && opt.hintList[score - 1] !== null) ? opt.hintList[score - 1] : score;
			}

			$score.attr('readonly', 'readonly');
			this.css('cursor', 'default').data('readonly', 'readonly').attr('title', hint).children('img').attr('title', hint);
		}, readOnly: function(isReadOnly) {
			return this.each(function() {
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

					methods.fixHint.call($this);
				} else {
					methods.bindAction.call($this);

					methods.unfixHint.call($this);
				}
			});
		}, roundStar: function(score) {
			var opt		= this.data('options'),
				diff	= (score - Math.floor(score)).toFixed(2);

			if (diff > opt.round.down) {
				var icon = opt.starOn;						// Full up: [x.76 .. x.99]

				if (diff < opt.round.up && opt.halfShow) {	// Half: [x.26 .. x.75]
					icon = opt.starHalf;
				} else if (diff < opt.round.full) {			// Full down: [x.00 .. x.5]
					icon = opt.starOff;
				}

				this.children('img').not('.raty-cancel').eq(Math.ceil(score) - 1).attr('src', opt.path + icon);
			}												// Full down: [x.00 .. x.25]
		}, score: function() {
			var score	= [],
				value	;

			this.each(function() {
				value = $(this).children('input').val();
				value = (value == '') ? null : parseFloat(value);

				score.push(value);
			});

			return (score.length > 1) ? score : score[0];
		}, setTarget: function(value, isKeep) {
			var opt = this.data('options');

			if (opt.target) {
				var $target = $(opt.target);

				if ($target.length == 0) {
					$.error('target selector invalid or missing!');
				} else {
					var score = value;

					if (score == null && !opt.cancel) {
						$.error('you must enable the "cancel" option to set hint on target.');
					} else {
						if (!isKeep || score == '') {
							score = opt.targetText;
						} else {
							if (opt.targetType == 'hint') {
								if (score === null && opt.cancel) {
									score = opt.cancelHint;
								} else {
									score = opt.hintList[Math.ceil(score - 1)];
								}
							} else {
								if (score != '' && !opt.precision) {
									score = parseInt(score, 10);
								} else {
									score = parseFloat(score).toFixed(1);
								}
							}
						}

						if (opt.targetFormat.indexOf('{score}') < 0) {
							$.error('template "{score}" missing!');
						} else if (value !== null) {
							score = opt.targetFormat.toString().replace('{score}', score);
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
			var opt		= this.data('options'),
				diff	= (score - Math.floor(score)).toFixed(1);

			if (diff > 0 && diff < .6) {
				this.children('img').not('.raty-cancel').eq(Math.ceil(score) - 1).attr('src', opt.path + opt.starHalf);
			}
		}, start: function(score) {
			return this.each(function() {
				var $this = $(this);

				if ($this.data('readonly') == 'readonly') {
					return false;
				}

				methods.initialize.call($this, score);

				var opt = $this.data('options');

				methods.setTarget.call($this, score, true);
			});
		}, initialize: function(score) {
			var opt	= this.data('options');

			if (score < 0) {
				score = 0;
			} else if (score > opt.number) {
				score = opt.number;
			}

			methods.fillStar.call(this, score);

			if (score != '') {
				if (opt.halfShow) {
					methods.roundStar.call(this, score);
				}

				this.children('input').val(score);
			}
		}, unfixHint: function() {
			var opt		= this.data('options'),
				$imgs	= this.children('img').filter(':not(.raty-cancel)');

			for (var i = 0; i < opt.number; i++) {
				$imgs.eq(i).attr('title', (i < opt.hintList.length && opt.hintList[i] !== null) ? opt.hintList[i] : i);
			}

			this.css('cursor', 'pointer').removeData('readonly').removeAttr('title').children('input').attr('readonly', 'readonly');
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
