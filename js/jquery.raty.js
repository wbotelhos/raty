/*!
 * jQuery Raty - A Star Rating Plugin - http://wbotelhos.com/raty
 * ---------------------------------------------------------------------
 *
 * jQuery Raty is a plugin that generates a customizable star rating.
 *
 * Licensed under The MIT License
 *
 * @version        2.0.0 (Development)
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

				var opt		= $.extend({}, $.fn.raty.defaults, options),
					$this	= $(this).data('options', opt),
					id		= $this.attr('id');

				if (id === undefined || id == '') {
					id = 'raty-' + $this.index();
					$this.attr('id', id); 
				}

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
		
					$this.append('<img id="' + id + '-' + i + '" src="' + opt.path + starFile + '" alt="' + i + '" title="' + hint + '" class="' + id + '"/>');
		
					if (opt.space) {
						$this.append((i < opt.number) ? '&nbsp;' : '');
					}
				}
		
				if (opt.iconRange && isValidStart) {
					methods.fillStar.call($this, start);	
				}
		
				methods.roundStar.call($this, start);

				methods.setTarget.call($this, start, opt.targetKeep);
		
				var $score = $('<input/>', {
					id:		id + '-score',
					type:	'hidden',
					name:	opt.scoreName
				}).appendTo($this);
		
				if (isValidStart && opt.start > 0) {
					$score.val(start);
				}

				var width = (opt.width) ? opt.width : (opt.number * opt.size + opt.number * space);

				if (opt.cancel) {
					var stars	= $this.children('img.' + id),
						cancel	= '<img src="' + opt.path + opt.cancelOff + '" alt="x" title="' + opt.cancelHint + '" class="raty-cancel"/>';
	
					if (opt.cancelPlace == 'left') {
						$this.prepend(cancel + '&nbsp;');
					} else {
						$this.append('&nbsp;').append(cancel);
					}
	
					$this.children('.raty-cancel').mouseenter(function() {
						$(this).attr('src', opt.path + opt.cancelOn);
	
						stars.attr('src', opt.path + opt.starOff);

						methods.setTarget.call($this, null, true);
					}).mouseleave(function() {
						$(this).attr('src', opt.path + opt.cancelOff);
	
						$this.mouseout();
					}).click(function(evt) {
						$score.removeAttr('value');

						if (opt.click) {
				          opt.click.call($this[0], null, evt);
				        }
					});

					width += opt.size + space;
				}

				if (opt.readOnly) {
					methods.fixHint.call($this);

					$this.children('.raty-cancel').hide();
				} else {
					$this.css('cursor', 'pointer');

					methods.bindAll.call($this, opt);
				}

				$this.css('width', width);
			});
		}, bindAll: function(opt) {
			var $this	= this,
				id		= this.attr('id'),
				$score	= $('#' + id + '-score'),
				$stars	= this.children('img.' + id);

			this.mouseleave(function() {
				methods.initialize.call($this, $score.val());

				methods.setTarget.call($this, $score.val(), opt.targetKeep);
			});

			$stars.bind(((opt.half) ? 'mousemove' : 'mouseover'), function(e) {
				var value = parseInt(this.alt, 10);
	
				if (opt.half) {
					var position	= parseFloat((e.pageX - $(this).offset().left) / opt.size),
						diff		= (position > .5) ? 1 : .5;
	
					value = parseFloat(this.alt) - 1 + diff;

					methods.fillStar.call($this, value);

					methods.showHalf.call($this, value);
	
					if (opt.precision) {
						value = (value - diff + position).toFixed(1);

						methods.setTarget.call($this, value, true);
					}
	
					$this.data('score', value);
				} else {
					methods.fillStar.call($this, value);

					methods.setTarget.call($this, value, true);
				}
			}).click(function(evt) {
				$score.val((opt.half || opt.precision) ? $this.data('score') : this.alt);

				if (opt.click) {
					opt.click.call($this[0], $score.val(), evt);
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

				$this.children('input').removeAttr('value');
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
					$.error($this.attr('id') + ': you must add the "click: function(score, evt) { }" callback.');
				}

				methods.setTarget.call($this, score, true);
			});
		}, fillStar: function(score) {
			var opt		= this.data('options'),
				id		= this.attr('id'),
				qtyStar	= this.children('img.' + id).length,
				count	= 0,
				$star	,
				star	,
				icon	;

			for (var i = 1; i <= qtyStar; i++) {
				$star = this.children('#' + id + '-' + i);

				if (opt.iconRange && opt.iconRange.length > count) {
					star = opt.iconRange[count];
					icon = (i <= score) ? star.on : star.off;

					if (!icon) {
						icon = opt.starOff;
					}

					if (i <= star.range) {
						$star.attr('src', opt.path + icon);
					}

					if (i == star.range) {
						count++;
					}
				} else {
					icon = (i <= score) ? opt.starOn : opt.starOff;
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
					cancel	= $this.children('.raty-cancel');

				if (cancel.length) {
					(isReadOnly) ? cancel.hide() : cancel.show();
				}

				if (isReadOnly) {
					$this.unbind();

					$('img.' + $this.attr('id')).unbind();

					methods.fixHint.call($this);
				} else {
					var options = $this.data('options');

					methods.bindAll.call($this, options);

					methods.unfixHint.call($this);
				}
			});
		}, roundStar: function(score) {
			var diff = (score - Math.floor(score)).toFixed(2);
			
			if (diff > .25) {
				var opt		= this.data('options'),
					icon	= opt.starOn;						// Full up: [x.76 ... x.99]
	
				if (diff < .76 && opt.halfShow) {				// Half: [x.26 ... x.75]
					icon = opt.starHalf;
				} else if (diff <= .5 ) {						// Full down: [x.00 .. x.5]
					icon = opt.starOff;
				}
	
				$('img#' + this.attr('id') + '-' + Math.ceil(score)).attr('src', opt.path + icon);
			}													// Full down: [x.00 ... x.25]
		}, setTarget: function(value, isKeep) {
			var opt = this.data('options');

			if (opt.target) {
				var $target = $(opt.target);

				if ($target.length == 0) {
					$.error(this.attr('id') + ': target selector invalid or missing!');
				} else {
					if (value == null && !opt.cancel) {
						$.error(this.attr('id') + ': you must enable the "cancel" option to set hint on target.');
					} else {
						if (!isKeep || value == '') {
							value = opt.targetText;
						} else {
							if (opt.targetType == 'hint') {
								if (value === null && opt.cancel) {
									value = opt.cancelHint;
								} else {
									value = opt.hintList[Math.ceil(value - 1)];
								}
							}
						}

						if ($target.is(':input')) {
							$target.val(value);
						} else {
							$target.html(value);
						}
					}
				}
			}
		}, showHalf: function(score) {
			var diff = (score - Math.floor(score)).toFixed(2);

			if (diff > .25 && diff < .76) {
				var opt	= this.data('options');

				$('img#' + this.attr('id') + '-' + Math.ceil(score)).attr('src', opt.path + opt.starHalf);
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
			var opt	= this.data('options'),
				id	= this.attr('id');

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

				$('input#' + id + '-score').val(score);
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
		click:			null,
		half:			false,
		halfShow:		true,
		hintList:		['bad', 'poor', 'regular', 'good', 'gorgeous'],
		iconRange:		undefined,
		noRatedMsg:		'not rated yet',
		number:			5,
		path:			'img/',
		precision:		false,
		readOnly:		false,
		scoreName:		'score',
		size:			16,
		space:			true,
		starHalf:		'star-half.png',
		starOff:		'star-off.png',
		starOn:			'star-on.png',
		start:			0,
		target:			null,
		targetKeep:		false,
		targetText:		'',
		targetType:		'hint',
		width:			null
	};

})(jQuery);
