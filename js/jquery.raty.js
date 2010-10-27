/**
 * jQuery Raty - A Star Rating Plugin - http://wbotelhos.com/raty
 * ---------------------------------------------------------------------------------
 *
 * jQuery Raty is a plugin that generates a customizable star rating automatically.
 *
 * Licensed under The MIT License
 *
 * @version			0.7
 * @since			06.11.2010
 * @author			Washington Botelho dos Santos
 * @documentation	wbotelhos.com/raty
 * @twitter			twitter.com/wbotelhos
 * @license			opensource.org/licenses/mit-license.php MIT
 * @package			jQuery Plugins
 *
 * Usage with default values:
 * ---------------------------------------------------------------------------------
 * $('div#star').raty();
 *
 * <div id="star"></div>
 *
 */

;(function($) {

	$.fn.raty = function(settings) {
		options = $.extend({}, $.fn.raty.defaults, settings);

		if (this.attr('id') === undefined) {
			debug('Invalid selector!'); return;
		}

		if (options.number > 20) {
			options.number = 20;
		} else if (options.number < 0) {
			options.number = 0;
		}

		if (options.path.substring(options.path.length - 1, options.path.length) != '/') {
			options.path += '/';
		}

		// Public functions need a global variable to keep de context.
		$global = $(this);

		// Local variables to keep the current value and not the last one. Why, Mr. Anderson? Why? 
		var $this		= $global,
			id			= $this.attr('id'),
			start		= 0,
			starFile	= options.starOn,
			hint		= '';

		if (!isNaN(options.start) && options.start > 0) {
			start = (options.start > options.number) ? options.number : options.start;
		}

		for (var i = 1; i <= options.number; i++) {
			starFile = (start >= i) ? options.starOn : options.starOff;

			hint = (options.number <= options.hintList.length && options.hintList[i - 1] !== null) ? options.hintList[i - 1] : i;	// Avoids a nonexistent index (undefined) and ensures that the hint will be applied, it means different from null. Otherwise applies the current number.

			$this
			.append('<img id="' + id + '-' + i + '" src="' + options.path + starFile + '" alt="' + i + '" title="' + hint + '" class="' + id + '"/>')
			.append((i < options.number) ? '&nbsp;' : '');
		}

		$('<input id="' + id + '-score" type="hidden" name="' + options.scoreName + '"/>').appendTo($this).val(start);

		if (options.showHalf) {
			var score = $('input#' + id + '-score').val();
			splitStar($this, score, options);
		}

		if (!options.readOnly) {
			if (options.showCancel) {
				var star	= $('img.' + id),
					cancel	= '<img src="' + options.path + options.cancelOff + '" alt="x" title="' + options.cancelHint + '" class="button-cancel"/>'; 

				if (options.cancelPlace == 'left') {
					$this.prepend(cancel + '&nbsp;');
				} else {
					$this.append('&nbsp;').append(cancel);
				}

				$('#' + id + ' img.button-cancel').live('mouseenter', function() {
					$(this).attr('src', options.path + options.cancelOn);
					star.attr('src', options.path + options.starOff);
				}).live('mouseleave', function() {
					$(this).attr('src', options.path + options.cancelOff);
					star.trigger('mouseout');
				}).live('click', function() {
					$('input#' + id + '-score').val(0);
					if (options.onClick) { 
			          options.onClick.apply($this, [0]);
			        }
				});

				$this.css('width', options.number * 20 + 20);
			} else {
				$this.css('width', options.number * 20);
			}

			$this.css('cursor', 'pointer');
			bindAll($this, options);
		} else {
			$this.css('cursor', 'default');
			fixHint($this, start, options);
		}

		return $this;
	};
	
	$.fn.raty.defaults = {
		cancelHint:		'cancel this rating!',
		cancelOff:		'cancel-off.png',
		cancelOn:		'cancel-on.png',
		cancelPlace:	'left',
		hintList:		['bad', 'poor', 'regular', 'good', 'gorgeous'],
		noRatedMsg:		'not rated yet',
		number:			5,
		path:			'img/',
		readOnly:		false,
		scoreName:		'score',
		showCancel:		false,
		showHalf:		false,
		starHalf:		'star-half.png',
		start:			0,
		starOff:		'star-off.png',
		starOn:			'star-on.png'
		//onClick:		function(score) { alert('score: ' + score); }
	};

	$.fn.raty.readOnly = function(boo) {
		if (boo) {
			$('img.' + $global.attr('id')).die();
			$global.css('cursor', 'default').die();
		} else { 
			bindAll($global, options);
			$global.css('cursor', 'pointer');
		}
		return $.fn.raty;
	};

	$.fn.raty.start = function(score) {
		initialize($global, score, options);
		return $.fn.raty;
	};

	$.fn.raty.click = function(score) {
		initialize($global, score, options);

		if (options.onClick) {
			options.onClick.apply($global, [score]);
		} else {
			debug('You should add the "onClick: function(score) { }" option.');
		}
		return $.fn.raty;
	};

	function bindAll(context, options) {
		var id		= context.attr('id'),
			score	= $('input#' + id + '-score'),
			qtyStar	= $('img.' + id).length;

		context.live('mouseleave', function() { 
			initialize(context, score.val(), options);
		});

		$('img.' + id)
		.live('mouseenter', function() {
			for (var i = 1; i <= qtyStar; i++) {
				if (i <= this.alt) {
					$('img#' + id + '-' + i).attr('src', options.path + options.starOn);
				} else {
					$('img#' + id + '-' + i).attr('src', options.path + options.starOff);
				}
			}
		}).live('click', function() {
			score.val(this.alt);
			if (options.onClick) {
				options.onClick.apply(context, [this.alt]);
			}
		});
	};

	function initialize(context, score, options) {
		var id		= context.attr('id'),
			qtyStar	= $('img.' + id).length;

		if (score < 0 || isNaN(score)) {
			score = 0;
		} else if (score > options.number) {
			score = options.number;
		}

		$('input#' + id + '-score').val(score);

		for (var i = 1; i <= qtyStar; i++) {
			if (i <= score) {
				$('img#' + id + '-' + i).attr('src', options.path + options.starOn);
			} else {
				$('img#' + id + '-' + i).attr('src', options.path + options.starOff);
			}
		}

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

	function fixHint(context, score, options) {
		if (score != 0) {
			score = parseInt(score);
			hint = (score > 0 && options.number <= options.hintList.length && options.hintList[score - 1] !== null) ? options.hintList[score - 1] : score;
		} else {
			hint = options.noRatedMsg;
		}

		context.attr('title', hint).children('img').attr('title', hint);		
	};

	function debug(message) {
		if (window.console && window.console.log) {
			window.console.log(message);
		}
	};

})(jQuery);