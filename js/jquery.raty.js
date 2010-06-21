/**
 * jQuery Raty - A Star Rating Plugin - http://wbotelhos.com/raty
 * --------------------------------------------------------------------------
 *
 * Licensed under The MIT License
 * 
 * @version     0.2
 * @since       11.06.2010
 * @author      Washington Botelho dos Santos
 * @link        http://wbotelhos.com/raty
 * @twitter     http://twitter.com/wbotelhos
 * @license     http://www.opensource.org/licenses/mit-license.php MIT 
 * @package     jQuery Plugins
 * 
 * Usage (default values):
 * --------------------------------------------------------------------------
 *	$('div#star').raty({
 *		hintList:    ['bad', 'poor', 'regular', 'good', 'gorgeous'],	// A hint information for default 5 stars.
 *		number:      5,													// Number of star.
 *		path:        'img',												// Path of images.
 *		readOnly:    false,												// read-only or not.
 *		scoreName:   'score',											// The name of target score.
 *		start:       0,													// Start with a score value.
 *		starOff:     'star-off.png',									// The image of the off star.
 *		starOn:      'star-on.png',										// The image of the on star.
 *      //onClick:   function() { alert('clicked!'); }					// A default function can to be setted here.
 *	});
 *  
 *	<div id="star"></div>
 *  
 * Public functions:
 * --------------------------------------------------------------------------
 *	$.fn.raty.start(3);                                                // Starting the rating with 3 stars later.
 *	$.fn.raty.readOnly(true);                                          // Adjusts the rating for read-only later.
 *	$.fn.raty.click(2);                                                // Click in a star later.
 *
 *	Should come after the current raty and before the anothers one. Because it takes the last called raty.
 *
 */

(function($) {

	// TODO: Auto submit click;
	// TODO: Submit button;
	// TODO: Cancel button.
	// TODO: How to handle a particular container from a public function and not only the last.
	// TODO: How to get the settings into a public function?

	$.fn.raty = function(settings) {
		options = $.extend({}, $.fn.raty.defaults, settings);															// Merge (no deep) the default with settings, without alter the default. Global!

		if (this.attr('id') === undefined) {																				// If the script is invalid then the script stops and write the error in the console.
			debug('Invalid selector!'); return;
		}

		$this = $(this);																								// Keep the container in a global variable for public functions. Global!

		if (options.number > 30) {																						// A safe value to prevent malicious code.
			options.number = 30;
		}
	
		if (options.path.substring(options.path.length - 1, options.path.length) != '/') {								// Configure the path if it no ends with bar.
			options.path += '/';
		}
		
		// TODO: Using var for values that will be used into a function later, to keep the current value and not the last one. Why, Mr. Anderson? Why? 
		var containerId = $this.attr('id');																				// Used in all components because the ID of the container in theory not be repeated.
		var path = options.path;
		var starOff = options.starOff;
		var starOn = options.starOn;
		var onClick = options.onClick;

		var start = 0;
		if (!isNaN(options.start) && options.start > 0) {																// Start with a default value.
			start = (options.start > options.number) ? options.number : options.start;									// Make sure the start value is not bigger than number of stars.
		}

		var hint = '';
		for (var i = 1; i <= options.number; i++) {																					// Append the img stars into container.
			hint = (options.number <= options.hintList.length && options.hintList[i - 1] !== null) ? options.hintList[i - 1] : i;	// Avoids a nonexistent index (undefined) and Ensures that the hint is to be applied, it means to be different from null. Otherwise applies the current number.

			starFile = (start >= i) ? options.starOn : options.starOff;

			$this
			.append('<img id="' + containerId + '-' + i + '" src="' + options.path + starFile + '" alt="' + i + '" title="' + hint + '" class="' + containerId + '"/>')
			.append((i < options.number) ? '&nbsp;' : '');
		}
		
		$this
		.css('width', options.number * 20)																				// Adjust de width of container. Each star have 16px for default and 4px of space, it is a little bit more for safety Unbuntu's FF.
		.append('<input id="' + containerId + '-score" type="hidden" name="' + options.scoreName + '"/>');				// Field to keep the score of each container.

		$('#' + containerId + '-score').val(start);																		// Put de current score into hidden input, even if it is zero. TODO: empty, null or zero?

		if (!options.readOnly) {																						// If readOnly is true, the mouse functions wont be binded. I don't call de function $.fn.readOnly for otimization, because i don't need bind to after unbind the mouseenter, mouseleave and click.

			$('img.' + containerId).live('mouseenter', function() {														// When mouseover. I used mouseenter for avoid childrens take off the focus.
				//var className = $(this).attr('class');																// Class name of the star selected.
				var qtyStar = $('img.' + containerId).length;															// How many stars have this class name.

				for (var i = 1; i <= qtyStar; i++) {																	// For each img star i ask if it number is less then the selected star and turn its on, or then turn its of.
					if (i <= this.alt) {
						$('img#' + containerId + '-' + i).attr('src', path + starOn);
					} else {
						$('img#' + containerId + '-' + i).attr('src', path + starOff);
					}
				}
			});
			
			$('img.' + containerId).live('click', function() {															// When mouseclick i keep the score of clicked star into a hidden field with name container.id + -score.
				$('input#' + containerId + '-score').val(this.alt);														// Put de current score into hidden input. The class name of the star selected is equals ID container.

				if (onClick) {																							// If onClick is activated, the callback funtion of it is called. 
		          onClick(this.alt);
		        }
			});

			$this.live('mouseleave', function() {																		// When mouseleave container, i get the score value and set the star. I used mouseleave for avoid childrens take off the focus. 
				var qtyStar = $('img.' + containerId).length;																// How many stars have this class name.
				var score = $('input#' + containerId + '-score').val();													// Get the last score.

				for (var i = 1; i <= qtyStar; i++) {
					if (i <= score) {
						$('img#' + containerId + '-' + i).attr('src', path + starOn);
					} else {
						$('img#' + containerId + '-' + i).attr('src', path + starOff);
					}
				}
			}).css('cursor', 'pointer');																				// Set de pointer cursor because de stars are active.
		} else {
			$this.css('cursor', 'default');																				// Set de default cursor because de star are inactive.
		}

		return $this;																									// Return the self container for Method Chaining.
	};
	
	$.fn.raty.defaults = {																								// Sets the defaults settings as an attribute of the function. ($.fn.raty.defaults.start = '3';)
		hintList:		['bad', 'poor', 'regular', 'good', 'gorgeous'],													// A hint information for default 5 stars.
		number:			5,																								// Number of star.
		path:			'img/',																							// Path of images.
		readOnly:		false,																							// read-only or not.
		scoreName:		'score',																						// The name of target score.
		start:			0,																								// Start with a score value.
		starOff:		'star-off.png',																					// The image of the off star.
		starOn:			'star-on.png'																					// The image of the on star.
		//onClick:		function() { alert('clicked!'); }																// A default function can to be setted here.
	};

	$.fn.raty.readOnly = function(boo) {																				// Public function to start a rating read only or not.
		if (boo) {
			$('img.' + $this.attr('id')).die();																			// Unbind all functions of the stars.
			$this.css('cursor', 'default').die();																		// Unbind all functions of the container.
		} else {																										// Otherwise rebind that functions. 
			liveEnter();
			liveLeave();
			liveClick();
			$this.css('cursor', 'pointer');
		}
		return $.fn.raty;
	};

	$.fn.raty.start = function(start) {																					// Public function to initialize with a default value.
		initialize(start);
		return $.fn.raty;
	};

	$.fn.raty.click = function(score) {																					// Public function to click in a star.
		var star = (score >= options.number) ? options.number : score;
		initialize(star);
		if (options.onClick) {																							// If onClick is enabled, it is called automatic when start value is setted.
			options.onClick(star);
		} else {
			debug('You should add the "onClick: function() {}" option.');
		}
		return $.fn.raty;
	};
	
	// TODO: functions are repeated on purpose for now! Because options.xxx should be used here and works as current value, unlike the function body. Why, Mr. Anderson? Why?
	function liveEnter() {
		var id = $this.attr('id');
		$('img.' + id).live('mouseenter', function() {																	// When mouseover. I used mouseenter for avoid childrens take off the focus.
			var qtyStar = $('img.' + id).length;																		// How many stars have this class name.

			for (var i = 1; i <= qtyStar; i++) {																		// For each img star i ask if it number is less then the selected star and turn its on, or then turn its of.
				if (i <= this.alt) {
					$('img#' + id + '-' + i).attr('src', options.path + options.starOn);
				} else {
					$('img#' + id + '-' + i).attr('src', options.path + options.starOff);
				}
			}
		});
	};
	
	function liveLeave() {
		var id = $this.attr('id');
		$this.live('mouseleave', function() {																			// When mouseleave container, i get the score value and set the star. I used mouseleave for avoid childrens take off the focus. 
			var qtyStar = $('img.' + id).length;																		// How many stars have this class name.
			var score = $('input#' + id + '-score').val();																// Get the last score.

			for (var i = 1; i <= qtyStar; i++) {
				if (i <= score) {
					$('img#' + id + '-' + i).attr('src', options.path + options.starOn);
				} else {
					$('img#' + id + '-' + i).attr('src', options.path + options.starOff);
				}
			}
		});																												// Set de pointer cursor because de stars are active.
	};

	function liveClick() {
		var id = $this.attr('id');
		$('img.' + id).live('click', function() {																		// When mouseclick i keep the score of clicked star into a hidden field with name container.id + -score.
			$('input#' + id + '-score').val(this.alt);																	// Put de current score into hidden input. The class name of the star selected is equals ID container.
		});
	};

	function initialize(start) {																						// Initializes with a default value.
		var id = $this.attr('id');
		var qtyStar = $('img.' + id).length;																			// How many stars have this class name.
		$('input#' + id + '-score').val(start);																			// Set de start value.

		for (var i = 1; i <= qtyStar; i++) {
			if (i <= start) {
				$('img#' + id + '-' + i).attr('src', options.path + options.starOn);
			} else {
				$('img#' + id + '-' + i).attr('src', options.path + options.starOff);
			}
		}
	};
	
	function debug(message) {																							// Throws error messages in the browser console.
		if (window.console && window.console.log) {
			window.console.log(message);
		}
	};

})(jQuery);