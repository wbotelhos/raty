/**
 * jQuery Raty - A Star Rating Plugin - http://wbotelhos.com/raty
 * ---------------------------------------------------------------------------------
 *
 * jQuery Raty is a plugin that generates a customizable star rating automatically.
 *
 * Licensed under The MIT License
 *
 * @version			1.0.1
 * @since			06.11.2010
 * @author			Washington Botelho dos Santos
 * @documentation	http://wbotelhos.com/raty
 * @twitter			http://twitter.com/wbotelhos
 * @license			http://opensource.org/licenses/mit-license.php
 * @package			jQuery Plugins
 *
 * Usage with default values:
 * ---------------------------------------------------------------------------------
 * $('#star').raty();
 *
 * <div id="star"></div>
 *
 *
 * $('.group').raty();
 *
 * <div class="group"></div>
 * <div class="group"></div>
 * <div class="group"></div>
 *
 */

;(function($) {

	$.fn.raty = function(settings) {
		// Public functions need a global variable to use the last element raty. In functions this not happen because it's become a static value as parameter.
		options = $.extend({}, $.fn.raty.defaults, settings);

		if (this.length == 0) {
			debug('Invalid selector!');
			return;
		} else if (this.length > 1) {
			return this.each(function() {
				$.fn.raty.apply($(this), [settings]);
			});
		}

		if (options.number > 20) {
			options.number = 20;
		} else if (options.number < 0) {
			options.number = 0;
		}

		if (options.path.substring(options.path.length - 1, options.path.length) != '/') {
			options.path += '/';
		}

		// Public functions need a global variable to use the last element raty.
		$global = $(this);

		// Local variables to keep the current value and not the last one. Why, Mr. Anderson? Why? 
		var id			= this.attr('id'),
			start		= 0,
			starFile	= options.starOn,
			hint		= '';

		if (id == '') {
			id = 'raty-' + $global.index();
			$global.attr('id', id);
		}

		if (!isNaN(options.start) && options.start > 0) {
			start = (options.start > options.number) ? options.number : options.start;
		}

		for (var i = 1; i <= options.number; i++) {
			starFile = (start >= i) ? options.starOn : options.starOff;

			hint = (i <= options.hintList.length && options.hintList[i - 1] !== null) ? options.hintList[i - 1] : i;

			$global
			.append('<img id="' + id + '-' + i + '" src="' + options.path + starFile + '" alt="' + i + '" title="' + hint + '" class="' + id + '"/>')
			.append((i < options.number) ? '&nbsp;' : '');
		}

		$('<input/>', {
			id:		id + '-score',
			type:	'hidden',
			name:	options.scoreName
		})
		.appendTo($global).val(start);

		if (options.showHalf) {
			splitStar($global, $('input#' + id + '-score').val(), options);
		}

		if (!options.readOnly) {
			if (options.showCancel) {
				var star	= $('img.' + id),
					cancel	= '<img src="' + options.path + options.cancelOff + '" alt="x" title="' + options.cancelHint + '" class="button-cancel"/>',

					// Local variables to keep the current value and not the last one in the live functions.
					opt		= options,
					$this	= $global;

				if (opt.cancelPlace == 'left') {
					$global.prepend(cancel + '&nbsp;');
				} else {
					$global.append('&nbsp;').append(cancel);
				}

				$('#' + id + ' img.button-cancel').mouseenter(function() {
					$(this).attr('src', opt.path + opt.cancelOn);
					star.attr('src', opt.path + opt.starOff);
				}).mouseleave(function() {
					$(this).attr('src', opt.path + opt.cancelOff);
					star.mouseout();
				}).click(function() {
					$('input#' + id + '-score').val(0);
					if (opt.onClick) { 
			          opt.onClick.apply($this, [0]);
			        }
				});

				$global.css('width', opt.number * 20 + 20);
			} else {
				$global.css('width', options.number * 20);
			}

			$global.css('cursor', 'pointer');
			bindAll($global, options);
		} else {
			$global.css('cursor', 'default');
			fixHint($global, start, options);
		}

		return $global;
	};
	
	$.fn.raty.defaults = {
		cancelHint:		'cancel this rating!',
		cancelOff:		'cancel-off.png',
		cancelOn:		'cancel-on.png',
		cancelPlace:		'left',
		hintList:		['bad', 'poor', 'regular', 'good', 'gorgeous'],
		noRatedMsg:		'not rated yet',
		number:			5,
		path:			'img/',
		iconRange:		[],
		readOnly:		false,
		scoreName:		'score',
		showCancel:		false,
		showHalf:		false,
		starHalf:		'star-half.png',
		starOff:		'star-off.png',
		starOn:			'star-on.png',
		start:			0,
		onClick:		null
	};

	$.fn.raty.click = function(score, id) {
		var context = getContext(score, id, 'click');

		initialize(context, score, options);

		if (options.onClick) {
			options.onClick.apply(context, [score]);
		} else {
			debug('You must add the "onClick: function(score) { }" option.');
		}
		return $.fn.raty;
	};

	$.fn.raty.readOnly = function(boo, id) {
		var context	= getContext(boo, id, 'readOnly'),
			cancel	= context.children('img.button-cancel');

		if (cancel[0]) {
			(boo) ? cancel.hide() : cancel.show();
		}

		if (boo) {
			$('img.' + context.attr('id')).unbind();
			context.css('cursor', 'default').unbind();
		} else { 
			bindAll(context, options);
			context.css('cursor', 'pointer');
		}
		return $.fn.raty;
	};

	$.fn.raty.start = function(score, id) {
		initialize(getContext(score, id, 'start'), score, options);
		return $.fn.raty;
	};

	function bindAll(context, options) {
		var id		= context.attr('id'),
			score	= $('input#' + id + '-score'),
			qtyStar	= $('img.' + id).length;

		// context.
		$('#' + id).mouseleave(function() { 
			initialize(context, score.val(), options);
		});

		$('img.' + id)
		.mouseenter(function() {
			fillStar(id, this.alt, options);
		}).click(function() {
			score.val(this.alt);
			if (options.onClick) {
				options.onClick.apply(context, [this.alt]);
			}
		});
	};

	function getContext(value, id, name) {
		var context = $global;

		if (id) {
			if (id.indexOf('.') == 0) {
				var idEach;

				return $(id).each(function() {
					idEach = '#' + $(this).attr('id');

					if (name == 'start') {
						$.fn.raty.start(value, idEach);
					} else if (name == 'click') {
						$.fn.raty.click(value, idEach);
					} else if (name == 'readOnly') {
						$.fn.raty.readOnly(value, idEach);
					}
				});
			}

			context	= $(id);

			if (!context.length) {
				debug('"' + id + '" is a invalid ID for the public funtion $.fn.raty.' + name + '().');
				return;
			}
		}

		return context;
	};

	function debug(message) {
		if (console && console.log) {
			console.log(message);
		}
	};

	function fillStar(id, score, options) {
		var qtyStar	= $('img.' + id).length,
			item	= 0,
			range	= 0,
			star,
			starOn;

		for (var i = 1; i <= qtyStar; i++) {
			star = $('img#' + id + '-' + i);

			if (i <= score) {
				if (options.iconRange && options.iconRange.length > item) {

					starOn = options.iconRange[item][0];
					range = options.iconRange[item][1];

					if (i <= range) {
						star.attr('src', options.path + starOn);
					}

					if (i == range) {
						item++;
					}
				} else {
					star.attr('src', options.path + options.starOn);
				}
			} else {
				star.attr('src', options.path + options.starOff);
			}
		}
	};

	function fixHint(context, score, options) {
		if (score != 0) {
			score = parseInt(score);
			hint = (score > 0 && options.number <= options.hintList.length && options.hintList[score - 1] !== null) ? options.hintList[score - 1] : score;
		} else {
			hint = options.noRatedMsg;
		}

		$('#' + context.attr('id')).attr('title', hint).children('img').attr('title', hint);
	};

	function initialize(context, score, options) {
		var id = context.attr('id');

		if (score < 0 || isNaN(score)) {
			score = 0;
		} else if (score > options.number) {
			score = options.number;
		}

		$('input#' + id + '-score').val(score);

		fillStar(id, score, options);

		if (options.showHalf) {
			splitStar(context, score, options);
		}

		if (options.readOnly || context.css('cursor') == 'default') {
			fixHint(context, score, options);
		}
	};

	function splitStar(context, score, options) {
		var id		= context.attr('id'),
			rounded	= Math.ceil(score),
			diff	= (rounded - score).toFixed(1);

		if (diff >= 0.3 && diff <= 0.7) {
			rounded = rounded - 0.5;
			$('img#' + id + '-' + Math.ceil(rounded)).attr('src', options.path + options.starHalf);
		} else if (diff >= 0.8) {
			rounded--;
		} else {
			$('img#' + id + '-' + rounded).attr('src', options.path + options.starOn);
		}
	};

})(jQuery);