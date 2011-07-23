# jQuery Raty - A Star Rating Plugin - http://wbotelhos.com/raty

jQuery Raty is a plugin that generates a customizable star rating automatically.

## License

The jQuery Raty is licensed under [The MIT License](http://www.opensource.org/licenses/mit-license.php)

## Version

	@version         1.4.3
	@since           06.11.2010
	@author          Washington Botelho dos Santos
	@documentation   wbotelhos.com/raty
	@twitter         twitter.com/wbotelhos
	@package         jQuery Plugins

## Default values

	cancel:       false                                           // Show a button to cancel the rating or not.   
	cancelHint:   'cancel this rating!'                           // The hint information.
	cancelOff:    'cancel-off.png'                                // Name of the cancel image off.
	cancelOn:     'cancel-on.png'                                 // Name of the cancel image on.
	cancelPlace:  'left'                                          // Position of the cancel button.
	click:        null                                            // Default callback function.
	half:         false                                           // Active the half star.
	hintList:     ['bad', 'poor', 'regular', 'good', 'gorgeous']  // A hint information for default 5 stars.
	iconRange:    []                                              // A range of custom icons that you can set.
	noRatedMsg:   'not rated yet'                                 // A hint for no rated elements when it's read-only.
	number:       5                                               // Number of star.
	path:         'img                                            // Path of images.
	readOnly:     false                                           // read-only or not.
	scoreName:    'score'                                         // The name of target score.
	size:         16                                              // The icons size.
	starHalf:     'star-half.png'                                 // The image of the half star.
	starOff:      'star-off.png'                                  // Name of the star image on.
	starOn:       'star-on.png'                                   // Name of the star image on.
	start:        0                                               // Start with a score value.
	target:       null                                            // Number of stars to be selected.
	targetKeep:   false                                           // If the last choose value will be keeped on mouseout.
	targetType:   'hint'                                          // What display on target element: hint or number.
	width:        null                                            // The container width of the stars.

## Usage with default values

	$('#star').raty();

	<div id="star"></div>


	$('.star').raty();

	<div class="star"></div>
	<div class="star"></div>
	<div class="star"></div>

## Public functions

You must pass a ID or a class to be the target of the action:

	$.fn.raty.start(3, '#raty');        // Starting the rating with 3 stars.

	$.fn.raty.readOnly(true, '.raty');  // Adjusts the ratings for read-only.

	$.fn.raty.click(2, '#raty');        // Click on the second star.

	$.fn.raty.cancel('#raty', true);    // Cancel the rating. The second optional parameter enables the click callback.

## Buy me a coffee

You can do it by [PayPal](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=X8HEP2878NDEG&item_name=jQuery%20Raty). Thanks! (:

## Contributors

+ emwendelin
+ Francisco Souza
+ Gabriel Benz
+ jeongee
+ Olle Jonsson