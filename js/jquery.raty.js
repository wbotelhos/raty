/*!
 * jQuery Raty - A Star Rating Plugin - http://wbotelhos.com/raty
 * ---------------------------------------------------------------------------------
 *
 * jQuery Raty is a plugin that generates a customizable star rating automatically.
 *
 * Licensed under The MIT License
 *
 * @version			1.4.3
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
 * $('.star').raty();
 *
 * <div class="star"></div>
 * <div class="star"></div>
 * <div class="star"></div>
 *
 */

;(function($) {

	$.fn.raty = function(settings) {

		if (this.length == 0) {
			debug('Selector invalid or missing!');
			return;
		} else if (this.length > 1) {
			return this.each(function() {
				$.fn.raty.apply($(this), [settings]);
			});
		}

		var opt			= $.extend({}, $.fn.raty.defaults, settings),
			$this		= $(this),
			id			= $this.attr('id'),
			width		= (opt.width) ? opt.width : (opt.number * opt.size + opt.number * 4);

		if (id === undefined || id == '') {
			id = 'raty-' + $this.index();
			$this.attr('id', id); 
		}

		$this.data('options', opt);

		if (opt.number > 20) {
			opt.number = 20;
		} else if (opt.number < 0) {
			opt.number = 0;
		}

		if (opt.path.substring(opt.path.length - 1, opt.path.length) != '/') {
			opt.path += '/';
		}

		var isValidStart	= !isNaN(parseInt(opt.start, 10)) && opt.start > 0, 
			start			= 0;

		if (isValidStart) {
			start = (opt.start > opt.number) ? opt.number : opt.start;
		}

		var starFile	= opt.starOn,
			hint		= '';

		for (var i = 1; i <= opt.number; i++) {
			starFile = (start < i) ? opt.starOff : opt.starOn;

			hint = (i <= opt.hintList.length && opt.hintList[i - 1] !== null) ? opt.hintList[i - 1] : i;

			$this
			.append('<img id="' + id + '-' + i + '" src="' + opt.path + starFile + '" alt="' + i + '" title="' + hint + '" class="' + id + '"/>')
			.append((i < opt.number) ? '&nbsp;' : ''); // TODO: space: true/false;
		}

		if (opt.iconRange && isValidStart) {
			fillStar($this, start);	
		}

		if (opt.halfShow) {
			roundStar($this, start);
		}

		var $score = $('<input/>', {
			id:		id + '-score',
			type:	'hidden',
			name:	opt.scoreName
		}).appendTo($this);

		if (isValidStart) {
			$score.val(start);
		}

		if (!opt.readOnly) {

			var target = opt.target;

			if (target !== null) {
				target = $(target);

				if (target.length == 0) {
					debug(id + ': target selector invalid or missing!');
				}
			}

			if (opt.cancel) {
				var stars	= $this.children('img.' + id),
					cancel	= '<img src="' + opt.path + opt.cancelOff + '" alt="x" title="' + opt.cancelHint + '" class="button-cancel"/>';

				if (opt.cancelPlace == 'left') {
					$this.prepend(cancel + '&nbsp;');
				} else {
					$this.append('&nbsp;').append(cancel);
				}

				$this.children('img.button-cancel').mouseenter(function() {
					$(this).attr('src', opt.path + opt.cancelOn);

					stars.attr('src', opt.path + opt.starOff);

					setTarget(target, '', opt);
				}).mouseleave(function() {
					$(this).attr('src', opt.path + opt.cancelOff);

					$this.mouseout();
				}).click(function(evt) {
					$score.removeAttr('value');

					if (opt.click) {
			          opt.click.apply($this, [null, evt]);
			        }
				});

				$this.css('width', width + opt.size + 4);
			} else {
				$this.css('width', width);
			}

			$this.css('cursor', 'pointer');

			bindAll($this, opt, target);
		} else {
			$this.css('cursor', 'default');
			fixHint($this, start);
		}

		return $this;
	};
	
	function bindAll(context, opt, target) {
		var id		= context.attr('id'),
			$score	= $('input#' + id + '-score'),
			$stars	= context.children('img.' + id);

		context.mouseleave(function() {
			initialize(context, $score.val());
			clearTarget(target, $score, opt);
		});

		$stars.bind(((opt.half) ? 'mousemove' : 'mouseover'), function(e) {
			var alt = parseInt(this.alt, 10);

			if (opt.half) {
				var position	= parseFloat(((e.pageX - $(this).offset().left) / opt.size).toFixed(2)),
					diff		= (position > .5) ? 1 : .5,
					value		= parseFloat(this.alt) - 1 + diff; // TODO: precission true/false (diff || position.fixed(1))

				context.data('score', value);

				fillStar(context, value);

				roundStar(context, value);
			} else {
				fillStar(context, alt);
			}

			setTarget(target, alt, opt);
		}).click(function(evt) {
			$score.val(opt.half ? context.data('score') : this.alt);

			if (opt.click) {
				opt.click.apply(context, [$score.val(), evt]);
			}
		});
	};

	function clearTarget(target, score, opt) {
		if (target !== null) {
			var value = '';

			if (opt.targetKeep) {
				value = score.val();

				if (opt.targetType == 'hint') {
					if (score.val() == '' && opt.cancel) {
						value = opt.cancelHint;
					} else {
						value = opt.hintList[Math.ceil(score.val()) - 1];
					}
				}
			}

			if (isField(target)) {
				target.val(value);
			} else {
				target.html(value);
			}
		}
	};

	function fillStar(context, score) {
		var opt		= context.data('options'),
			id		= context.attr('id'),
			qtyStar	= context.children('img.' + id).length,
			item	= 0,
			range	= 0,
			star,
			starOn;

		for (var i = 1; i <= qtyStar; i++) {
			star = context.children('img#' + id + '-' + i);

			if (i <= score) {
				if (opt.iconRange && opt.iconRange.length > item) {

					starOn = opt.iconRange[item][0];
					range = opt.iconRange[item][1];

					if (i <= range) {
						star.attr('src', opt.path + starOn);
					}

					if (i == range) {
						item++;
					}
				} else {
					star.attr('src', opt.path + opt.starOn);
				}
			} else {
				star.attr('src', opt.path + opt.starOff);
			}
		}
	};

	function fixHint(context, score) {
		var opt		= context.data('options'),
			hint	= '';

		if (score != 0) {
			score = parseInt(score, 10);
			hint = (score > 0 && opt.number <= opt.hintList.length && opt.hintList[score - 1] !== null) ? opt.hintList[score - 1] : score;
		} else {
			hint = opt.noRatedMsg;
		}

		context.attr('title', hint).children('img').attr('title', hint);
	};

	function isField(target) {
		return target.is('input') || target.is('select') || target.is('textarea');
	};

	function initialize(context, score) {
		var opt	= context.data('options'),
			id	= context.attr('id');

		if (isNaN(parseInt(score, 10))) {
			context.children('img.' + id).attr('src', opt.path + opt.starOff);
			$('input#' + id + '-score').removeAttr('value');
			return;
		}

		if (score < 0) {
			score = 0;
		} else if (score > opt.number) {
			score = opt.number;
		}

		fillStar(context, score);

		if (opt.halfShow) {
			roundStar(context, score);
		}

		$('input#' + id + '-score').val(score);

		if (opt.readOnly || context.css('cursor') == 'default') {
			fixHint(context, score);
		}
	};

	function setTarget(target, alt, opt) {
		if (target !== null) {
			var value = alt;

			if (opt.targetType == 'hint') {
				if (alt == 0 && opt.cancel) {
					value = opt.cancelHint;
				} else {
					value = opt.hintList[alt - 1];
				}
			}

			if (isField(target)) {
				target.val(value);
			} else {
				target.html(value);
			}
		}
	};

	function roundStar(context, score) {
		var diff = (score - Math.floor(score)).toFixed(2);

		if (diff > .25) {
			var opt		= context.data('options'),
				icon	= opt.starOn;			// Rounded up: [x.76 ... x.99]

			if (diff < .76 && (opt.half || opt.halfShow)) {	// Half star: [x.26 ... x.75]
				icon = opt.starHalf;
			}

			$('img#' + context.attr('id') + '-' + Math.ceil(score)).attr('src', opt.path + icon);
		}										// Rounded down: [x.00 ... x.25]
	};

	$.fn.raty.cancel = function(idOrClass, isClickIn) {
		var isClick = (isClickIn === undefined) ? false : true;

		if (isClick) {
			return $.fn.raty.click('', idOrClass, 'cancel');
		} else {
			return $.fn.raty.start('', idOrClass, 'cancel');
		}
	};

	$.fn.raty.click = function(score, idOrClass) {
		var context = getContext(score, idOrClass, 'click');

		if (idOrClass.indexOf('.') >= 0) {
			return;
		}

		initialize(context, score);

		var opt = $(idOrClass).data('options');

		setTarget($(opt.target), score, opt);

		if (opt.click) {
			opt.click.apply(context, [score]);
		} else {
			debug(idOrClass + ': you must add the "click: function(score, evt) { }" callback.');
		}

		return context;
	};

	$.fn.raty.readOnly = function(boo, idOrClass) {
		var context	= getContext(boo, idOrClass, 'readOnly');

		if (idOrClass.indexOf('.') >= 0) {
			return;
		}

		var cancel = context.children('img.button-cancel');

		if (cancel[0]) {
			(boo) ? cancel.hide() : cancel.show();
		}

		if (boo) {
			$('img.' + context.attr('id')).unbind();
			context.css('cursor', 'default').unbind();
		} else {
			var options = $(idOrClass).data('options');

			bindAll(context, options);
			context.css('cursor', 'pointer');
		}

		return context;
	};

	$.fn.raty.start = function(score, idOrClass) {
		var context = getContext(score, idOrClass, 'start');

		if (idOrClass.indexOf('.') >= 0) {
			return;
		}

		initialize(context, score);

		var opt = $(idOrClass).data('options');

		setTarget($(opt.target), score, opt);

		return context;
	};

	function getContext(value, idOrClass, name) {
		var context = undefined;

		if (idOrClass == undefined) {
			debug('Specify an ID or class to be the target of the action.');
			return;
		}

		if (idOrClass) {
			if (idOrClass.indexOf('.') >= 0) {
				var idEach;

				return $(idOrClass).each(function() {
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

			context = $(idOrClass);

			if (!context.length) {
				debug('"' + idOrClass + '" is a invalid identifier for the public funtion $.fn.raty.' + name + '().');
				return;
			}
		}

		return context;
	};

	function debug(message) {
		if (window.console && window.console.log) {
			window.console.log(message);
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
		noRatedMsg:		'not rated yet',
		number:			5,
		path:			'img/',
		iconRange:		[],
		readOnly:		false,
		scoreName:		'score',
		size:			16,
		starHalf:		'star-half.png',
		starOff:		'star-off.png',
		starOn:			'star-on.png',
		start:			0,
		target:			null,
		targetKeep:		false,
		targetType:		'hint',
		width:			null
	};

})(jQuery);