# jQuery Raty - A Star Rating Plugin - http://wbotelhos.com/raty

jQuery Raty is a plugin that generates a customizable star rating.

## License

The jQuery Raty is licensed under [The MIT License](http://www.opensource.org/licenses/mit-license.php)

## Version

	@version        2.1.0
	@since          2010.06.11
	@author         Washington Botelho
	@documentation  wbotelhos.com/raty
	@twitter        twitter.com/wbotelhos

## Required Files

+ jquery.raty.min.js
+ star-on.png
+ star-off.png

## Default values

	cancel:      false                                          // Show a button to cancel the rating or not.   
	cancelHint:  'cancel this rating!'                          // The hint information.
	cancelOff:   'cancel-off.png'                               // Name of the cancel image off.
	cancelOn:    'cancel-on.png'                                // Name of the cancel image on.
	cancelPlace: 'left'                                         // Position of the cancel button.
	click:       undefined                                      // Default callback function.
	half:        false                                          // Active the half star.
	halfShow:    true                                           // Enables half star display.
	hintList:    ['bad', 'poor', 'regular', 'good', 'gorgeous'] // A hint information for default 5 stars.
	iconRange:   undefined                                      // Object list representing each icon with position and names.
	noRatedMsg:  'not rated yet'                                // A hint for no rated elements when it's read-only.
	number:      5                                              // Number of star.
	path:        'img                                           // Path of images.
	readOnly:    false                                          // read-only or not.
	scoreName:   'score'                                        // The name of target score.
	size:        16                                             // The icons size.
	starHalf:    'star-half.png'                                // The image of the half star.
	space:       true                                           // Option to take off the spaces between the star.
	starOff:     'star-off.png'                                 // Name of the star image on.
	starOn:      'star-on.png'                                  // Name of the star image on.
	start:       0                                              // Start with a score value.
	target:      undefined                                      // Number of stars to be selected.
	targetKeep:  false                                          // If the last choose value will be keeped on mouseout.
	targetText   ''                                             // Default value when there's no score or targetKeep is off.
	targetType:  'hint'                                         // What display on target element: hint or number.
	width:       undefined                                      // The container width of the stars.

## Usage with default values

	$('#star').raty();

	<div id="star"></div>


	$('.star').raty();

	<div class="star"></div>
	<div class="star"></div>
	<div class="star"></div>

## Public functions

	$('#star').raty('start', 3);        // Starts the last Raty with 3 stars.

	$('#star').raty('click', 2);        // Click on the second star of the Raty with ID called 'raty'.

	$('.star').raty('readOnly', true);  // Adjusts all Raty with class called 'raty' for read-only.

	$('#star').raty('cancel', true);    // Cancel the rating. The second optional parameter enable thes click callback.

	$('#star').raty('score');           // Recovers the current score. For class returns an array. No rated returns null.

## Contributors

+ Eric Wendelin
+ Francisco Souza
+ Gabriel Benz
+ hpgihan
+ jeongee
+ Olle Jonsson

## Buy me a coffee

You can do it by [PayPal](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=X8HEP2878NDEG&item_name=jQuery%20Raty). Thanks! (:
